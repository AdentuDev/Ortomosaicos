<template>
 <v-container class=" lighten-5"  >
 <v-layout style="height:100%"> 

    <v-row no-gutters class="d-flex justify-center" >
            
        <v-col
        cols="24"
        sm="6"
        md="8"
        >
   
         <v-col cols="12" sm="12">
              <v-select
                item-text="pr_desc"
                item-value="pr_id"
                v-model="datos.seleccion_id"
                :items="$store.state.proyectos"
                menu-props="auto"
                label="Proyecto"
                hide-details
                prepend-icon="mdi-book-open"
                single-line           
                @change="seleccion_pr_id($event) "
              ></v-select>
        </v-col> 
        <v-col cols="12" sm="12"></v-col>
       <form  >
    
 <!--  <h1> priyecto{{$store.state.eleccionProyecto}} </h1>  -->
        <v-select
          no-data-text="No hay datos disponibles"
          :items="area"
          item-text="desc"
          item-value="id"
          v-model="datos.area"
          label="Area"
          prepend-icon="mdi-map"
          required
          outlined
          @change="cambioArea($event)"
        
        ></v-select> 

     <v-select
          no-data-text="No hay datos disponibles"
          :items="fecha"
          item-text="desc"
          item-value="id"
          v-model="datos.fecha"
          label="Fecha"
          prepend-icon="mdi-map"
          required
          outlined
        
        ></v-select> 
   
       <div v-show="datos.area" style="display: flex; ">
                      <v-select
                            :items="opcion"
                            item-text="desc"
                            item-value="id"
                            v-model="datos.opcion"
                            label="Opción"
                            prepend-icon="mdi-library-books"       
                            required
                            outlined
                            
                        ></v-select> 
                        <Modal :texto="datos" @escuchar="variableHijo" />
                </div>


   <v-file-input
    v-model="datos.files"
    placeholder="Cargar documento CSV"
    multiple
    prepend-icon="mdi-clippy"
     @change="previewFiles"
  >
  
  </v-file-input>


   <div v-show="datos.opcion"> 
        <div v-show="datos.fecha">
                  <v-alert
                  text
                  prominent
                  type="info"
                  icon="mdi-file-delimited"
                >
                    Ingresar documento <strong> CSV</strong> delimitado por coma<br>
                    (formato:latitud,longitud,texto)
                </v-alert>
                
               
              <v-btn
                block
                outlined
                color="indigo"
                @click="cargarMapa()"
                v-show="estado"
              >
                Ver anotaciones
              </v-btn>
              
         <v-dialog v-model="dialog" persistent max-width="290"  v-show="estado"   >
          <template v-slot:activator="{ on }">
             <v-btn
               v-show="estado"
                style="margin-top: 10px;"
                block
                color="success"  
                dark v-on="on">Guardar Anotación</v-btn>
                </template>
                   <v-card>
                    <v-card-title class="headline"> Nueva anotación</v-card-title>
                    <v-card-text>¿Desea guardar esta anotación? </v-card-text>
                    <v-card-actions>
                     <v-spacer></v-spacer>
                     <v-btn color="green darken-1" style="color:white;" flat @click="guardarAnotacion()">Guardar</v-btn>
                      <v-btn color="red darken-1"  style="color:white;" flat @click="dialog =false">Cancelar</v-btn>
                      </v-card-actions>
                      </v-card>
                      </v-dialog>


                <div id="map" style="height: 400px;  
                    margin: 0;
                    padding: 0;">
                </div>
      </div>
      </div> 


       </form>


      </v-col>

   </v-row >
 
 </v-layout>
  </v-container  >
</template>
 
<script>
import CsvLoader from "vue-csv-loader";
import Modal from '../ModalMarcador.vue'
import axios from "axios";
import store from '../../store/index'
import Left from '../Left.vue'
import Papa from 'papaparse';
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

export default {

  components: {
    CsvLoader,Left
  },
  data: function() {
    return {
      showCheckbox: true,
      csvHeader: [],
      csvBody: [],
      area:[],
      opcion:[],
      fecha:[],
      dialog :false,
      estado:false,


      datos:{
        area:null,
        opcion:null,
        fecha:null,
        anotacion:[] ,
        coordenadas:null,
        seleccion_id:[],
        files:[]
        
      }
    };
  },
  methods: {
     previewFiles(files) {

         const self_test = this
        this.estado=true
        var file = event.target.files[0];
        let reader = new FileReader();

            reader.onload = function(){
              
              var data = Papa.parse(this.result);
              console.log("dataaa",data)
              console.log("datos?",self_test.datos)
              self_test.datos.coordenadas=data
              console.log("datos? 2 ",self_test.datos.coordenadas.data)

              self_test.datos.coordenadas.data.forEach(element => {
          
             self_test.datos.anotacion.push({"latitud":parseFloat( element[0]),"longitud":parseFloat( element[1]),"desc":element[2]})
           
          });
            }

  
        reader.readAsText(file)
     },



      seleccion_pr_id(event){
            this.datos.seleccion_id= event
              //get  Area
            axios.get(store.state.url_api+'Mantenedores/getAreas/'+event,{

              headers: {
                Authorization:store.state.token
              }
            })

            .then(response => {
                   
                this.area = []
                const prueba =response.data.areas
                prueba.forEach(element => this.area.push({"id" : element.ar_id, "desc":element.ar_desc}))
                console.log("area",this.area)
                  })


              //get Fechas 
            axios.get(store.state.url_api+'Mantenedores/getFechas/'+event)
              .then((response) => 
                {
                  this.fecha=[]
                  const prueba2 =response.data.fechas
                  prueba2.forEach(element => this.fecha.push({"id" : element.fc_id, "desc":element.fc_desc},          
                        ),   
                  );
                })

        },
           cambioArea(event_pr_id){

            this.datos.opcion = null

            //get opciones 
            axios.get(store.state.url_api+'Mantenedores/getOptions/'+event_pr_id)
                  
            .then(response => {
               console.log("opcion",response)
              const opciones =response.data.opciones
              const filtro = opciones.filter(word => word.op_rel == "marcador" );        
              this.opcion = []
              filtro.forEach(element => this.opcion.push({"id" : element.op_id, "desc":element.op_rel+" / "+element.op_desc}))
               
          }) 
     
        },

       variableHijo(value){
            
          this.opcion.push({"id" :value.data.op_id, "desc":value.data.op_rel+" / "+value.data.op_desc})
          this.datos.opcion=(value.data.op_id)

          },

      guardarAnotacion(datos){
      this.dialog=false
    
      var anotaciones={
            "opcion": this.datos.opcion,
            "area_id" :this.datos.area,
            "fecha_id":this.datos.fecha,
            "anotaciones":this.datos.anotacion
        }

     var params = new URLSearchParams();
        params.append("anotaciones",JSON.stringify(anotaciones));
               

    //Post de nuevo poligono
       axios.post(store.state.url_api+'Mantenedores/saveAnotaciones', params).then((params) =>{
      console.log("nueva anotacion",params)
          swal({
                  position:'top-end',
                  icon: 'success',
                  title: 'Datos guardados',
                  timer: 3000
                })
          this.datos.area=[],
          this.datos.fecha="",
          this.datos.opcion=""

        })   

    },

      cargarMapa(datos){

      const anotacion=this.datos.anotacion
        const map = new google.maps.Map(document.getElementById("map"), {
            zoom: 14,
            center: { lat:anotacion[0].latitud, lng:anotacion[0].longitud}, 
            mapTypeId: "satellite",
            streetViewControl: false,
            mapTypeControl: false,
            zoomControl:false,
            panControl:false,
       
        });
 
      anotacion.forEach(element => {

        let anotacion = new google.maps.Marker({
            position:     { lat: element.latitud, lng: element.longitud},

        });

        const infowindow = new google.maps.InfoWindow({
         content: element.desc,
          });

        anotacion.setMap(map);
        anotacion.addListener("click", () => {
        infowindow.open(map, anotacion);

        });
       });
       
            },

  }
};
</script>

<style >


</style>