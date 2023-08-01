<template>

 <v-container class=" lighten-5"  >

      <v-row style="justify-content: space-around;">
 
     <v-col
          cols="12"
          sm="5"
        >
  
    </v-col>
          </v-row>

    <v-row no-gutters class="d-flex justify-center" >
       
        <v-col
        cols="24"
        sm="6"
        md="8"
        >
   <br>
       <form  >
      <div > 

      </div>
 <!--  <h1> priyecto{{$store.state.eleccionProyecto}} </h1>  -->
        <v-select
          no-data-text="No hay datos disponibles"
          :items="area"
          item-text="desc"
          item-value="id"
          v-model="informacion.area"
          label="Área"
          prepend-icon="mdi-map"
          required
          outlined
         @change="onChange($event)"
        ></v-select> 

       <div v-show="informacion.area" style="display: flex; ">
             <v-select
                  no-data-text="No hay datos disponibles"
                  :items="opcion"
                  item-text="desc"
                  item-value="id"
                  v-model="informacion.opcion"
                  label="Poligono"
                  prepend-icon="mdi-library-books"       
                  required
                  outlined
       >
       
      </v-select> 
  <ModalPoligono :texto="informacion" @escuchar="variableHijo" />

     
</div>

        <v-select
          no-data-text="No hay datos disponibles"
          v-model="informacion.fecha"
          :items="fecha"
          item-text="desc"
          item-value="id"
          :menu-props="{ maxHeight: '400' }"
          label="Fechas"
          prepend-icon="mdi-calendar"      
          multiple
          hint="Seleccion multiple"
          persistent-hint
          outlined    
          chips
        ></v-select>


          <div v-show="informacion.fecha" style="height: 333px; text-align:center;" > 
    
           <v-btn
                @click="cambio"
                 small
                  fab
                  rigth
                   style=" margin-top: 150px; "
                >
                 <v-color-picker  v-model="informacion.color"   ></v-color-picker>
        
             
                </v-btn>
  

           </div> 
  
            
                <v-file-input
    v-model="informacion.files"
    placeholder="Cargar documento KML"
    multiple
    prepend-icon="mdi-clippy"
     @change="previewFiles"
  >
    <template v-slot:selection="{ text }">
      <v-chip
        small
        label
        color="primary"
      >
        {{ text }}
      </v-chip>
    </template>
  </v-file-input>
   
       <v-alert
      text
      prominent
      type="info"
      icon="mdi-vector-polygon"
    >
      Lectura de documentos KML que incluya LineString, PolyLine, LinearRing o Polygon.
    </v-alert>
   
       </form>

   <mapa :data2="informacion"  ref="mapa_"/> 

                  <div v-show="informacion.opcion" > 
                  <div v-show="informacion.fecha" >  
                  <div v-show="informacion.files" > 
                  <div v-show="informacion.area" >  
                  <div v-show="informacion.color" >
                            <v-dialog
                                v-model="dialog"
                                persistent max-width="290"
                                style="background-color:#111226;">
                                              <template v-slot:activator="{ on }"  style="background-color:#111226;">
                                                <v-btn
                                                    style="margin-top: 10px;"
                                                    block
                                                    color="success"  
                                                    dark v-on="on">Guardar Datos</v-btn>
                                              </template>
                                              <v-card>
                                                <v-card-title class="headline">Nuevo Poligono</v-card-title>
                                                <v-card-text>¿Desea guardar este nuevo poligono? </v-card-text>
                                                <v-card-actions>
                                                  <v-spacer></v-spacer>
                                                  <v-btn color="green darken-1" style="color:white;" flat @click="guardarNuevoPoligono()">Guardar</v-btn>
                                                  <v-btn color="red darken-1"  style="color:white;" flat @click="dialog = false">Cancelar</v-btn>
                                                </v-card-actions>
                                              </v-card>
                                          </v-dialog>
         
                  </div> 
                  </div> 
                  </div>  
                  </div>  
 </div> 
      </v-col>

   </v-row >
 
 </v-container>

  
</template>

<script>

import axios from "axios";
import ModalPoligono from './Poligonos/ModalPoligono.vue';
import UploadButton from 'vuetify-upload-button';
import Mapa from './Poligonos/Mapa.vue';
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let pr_id = urlParams.get('pr_id')
import store from '../store/index'


export default {
   components: { ModalPoligono,Mapa}, 
   name:'Inicio',
 
    data(){
        return{
            informacion:{        
                    tipo:"",
                    opcionDos:"",
                    fecha:"" ,
                    selected:"",
                    area:"",
                    fecha2:[],                                                                     
                    poligonos:[],
                    files: null,
                    proyectos:[],
                    idProyecto:null,
                    opcion:null,
                    id:pr_id, 
                          
                    hex: '#3CA244',
                    hexa: '#FF00FFFF',
                    rgba: { r: 255, g: 0, b: 255, a: 1 },
                    hsla: { h: 300, s: 1, l: 0.5, a: 1 },
                    hsva: { h: 300, s: 1, v: 1, a: 1 },
                    toggle_exclusive: undefined,
                    color:""
            },
            fecha:[],
            area:[],
            id:[],
            opcion:[],
            filtrado:[],
            almacenamiento:[],
            coordenadas:[],
            token:["pruebaa"],
            tipo:["Vuelo","Anotacion","Panoramica"],
            file1: null,
            file2: null,   
            showInfo: true,
            alerta:"",
            dialog:false
    
        } 
        

    },
     
computed:{
  //...mapState(['token']),
     /*  count(){
        return store.state.count
      } */
},


    methods:{

      cambio() {
          let self_test = this
          self_test.$refs.mapa_.initMap(self_test.informacion)
              
              
      },


      toggleInfoWindow (context) {

          this.infoWIndowContext = context
          this.showInfo = true
      },

        /*     infoClicked(context) {
              console.log("contexttt?",context)
            }
          ,
        */

    previewFiles(files) {
    
        var file = event.target.files[0];
        let reader = new FileReader();
       
        const self_test = this
        console.log(reader)
        reader.onload = function(){
         const  parser = new DOMParser();
          const  xmlDoc = parser.parseFromString(this.result, "text/xml");
          console.log(xmlDoc)
        const  googlePolygons = [];
        const  googleMarkers = [];
        const almacenar= googlePolygons 
            
            if (xmlDoc.documentElement.nodeName == "kml") {
            
                for (const item of xmlDoc.getElementsByTagName('Placemark')) {
                        const     polygons = item.getElementsByTagName('LinearRing');
                        const     lineas = item.getElementsByTagName('LineString');
                        const linea2=lineas[0]
               
                    /** POLYGONS PARSE **/        
                    if(linea2 ){
                        for (const polygon of lineas) {
                            const  coords = polygon.getElementsByTagName('coordinates')[0].childNodes[0].nodeValue.trim();
                            const  points = coords.split(" ");
                            const   googlePolygonsPaths = [];
                            
                            for (const point of points) {
                                const     coord = point.split(",");
                                googlePolygonsPaths.push({ lat: +coord[1], lng: +coord[0] });
                            }
                            googlePolygons.push(googlePolygonsPaths);   
                        }
                    }else{
                            for (const polygon of polygons) {
                                const  coords = polygon.getElementsByTagName('coordinates')[0].childNodes[0].nodeValue.trim();
                                const  points = coords.split(" ");
            
                                const   googlePolygonsPaths = [];
                                
                                for (const point of points) {
                                    const     coord = point.split(",");
                                    googlePolygonsPaths.push({ lat: +coord[1], lng: +coord[0] });
                                }
                                
                                googlePolygons.push(googlePolygonsPaths);           
                            }
                    }
                }

            }else {
                  alert('Error ')
            }
         
            self_test.informacion.poligonos = googlePolygons;
            self_test.$refs.mapa_.initMap(self_test.informacion)

        }

        reader.readAsText(file)

    },

    guardarNuevoPoligono(informacion){
      console.log("ingreso a nuevo poligon")
      let self_test = this
      self_test.dialog=false
      const fechaJson=[]
      const guardado =  this.informacion.fecha
      const poligonos2 =this.informacion.poligonos
      const almacenar=[]
      const almacenar2=[]

      
          almacenar.forEach(datos2=>almacenar2.push({datos2}))
          guardado.forEach(element => fechaJson.push({"id":element}),)

          var params = new URLSearchParams();
          params.append("fecha",JSON.stringify(fechaJson));
          params.append("area",this.informacion.area)
          params.append("opcion",this.informacion.opcion)
          params.append("poligonos",JSON.stringify(this.informacion.poligonos)),
          params.append("color",JSON.stringify (this.informacion.color));


          //Post de nuevo poligono
        axios.post(store.state.url_api+'Mantenedores/nuevoPoligono', params).then((params) =>{
      console.log("nuevo poli",params)
          swal({
                  position:'top-end',
                  icon: 'success',
                  title: 'Datos guardados',
                  timer: 3000
                })
          this.informacion.area=[],
          this.informacion.fecha="",
          this.informacion.opcion="",
          this.informacion.poligono=null
            
        })      

    },

    onChange(event_pr_id){
    
        this.informacion.opcion = null
           

          //get opciones 
        axios.get(store.state.url_api+'Mantenedores/getOptions/'+event_pr_id)          
          .then(response => {                
          console.log("opcionnnn",response.data)
          const opciones =response.data.opciones
          this.opcion = []
          const filtro = opciones.filter(word => word.op_rel == "poligono");
          filtro.forEach(element => this.opcion.push({"id" : element.op_id, "desc":element.op_rel+" / "+element.op_desc}))

            
          }) 
    
        },

    seleccion(event){

          this.informacion.idProyecto= event

              axios.get(store.state.url_api+'Mantenedores/getAreas/'+event,{

          headers: {
            Authorization:store.state.token
          }
          })

            .then(response => {
     
              this.area = []
              const prueba =response.data.areas
              
                prueba.forEach(element => this.area.push({"id" : element.ar_id, "desc":element.ar_desc}))
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

         //registro nueva opcion
    variableHijo(value){
           
            this.opcion.push({"id" :value.data.op_id, "desc":value.data.op_rel+" / "+value.data.op_desc})
           this.informacion.opcion=(value.data.op_id)
          },
    }
      
    
    
}

</script>

<style>

</style>