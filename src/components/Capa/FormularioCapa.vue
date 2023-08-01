<template>
       <div style="height:100%" >
     
        <v-layout style="height:100%"> 

            <v-flex  xs2 style="background-color : #111226">
                  <Left />
            </v-flex>


            <v-flex  xs2 
              style=" margin-left: 20px;
                margin-right: 20px;
                margin-top: 20px;"
                
              >
                    
                  <div style="margin-left: 40px;">   

               
                    <h1>Capas</h1>

                  </div>


                   <div v-show="datos.seleccion_id" >  
                      <v-col> 
                      
                          <v-btn 
                           rounded
                              color="  primary"     
                              block
                              @click="crearNuevaCapa(datos)"
                            >
                              Nueva Capa
                            <v-icon dark>
                                  mdi-plus
                            </v-icon>
                          </v-btn>
                      
                      </v-col>
                   </div>

                  <v-list>
                          <v-list-item-group 
                            v-model="datos.editarCapas"
                            item-text="text"
                            item-value="id"

                            >
                              <v-list-item
                              style="    border: 2px solid #d1e7ea;"
                                v-for="(item, i) in capas_tarjetas"
                                :key="i"
                                item-text="text"
                                :item-value=item.id
                              >
                            
                                  <v-list-item-content   @click="click_capa(item)">
                                      <v-list-item-title v-text="item.text"></v-list-item-title>
                                      <v-list-item-title >{{item.fecha}} - {{item.tipo}}</v-list-item-title>
                                  
                                  </v-list-item-content>

                                  <v-list-item-icon>
                                    <v-icon >mdi-wrench</v-icon>
                                  </v-list-item-icon>
                                    
                              </v-list-item>
                          </v-list-item-group>
                   </v-list>

            </v-flex>

    <v-flex xs7>
 
      <form  >
              
      <v-row style="justify-content: space-around;">
 
     <v-col
          cols="12"
          sm="5"
        >
  
      </v-col>
          </v-row>
        <v-col cols="12" sm="8">
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
                                
          <div v-show="datos.nuevaArea"> 
   
                    <v-form>
                        <v-container>
                              <v-row>
                        
                                <v-col
                                      cols="12"
                                      sm="5"
                                  >
                                    
                                      <v-select
                                    
                                        :items="areas"
                                        item-text="desc"
                                        item-value="id"
                                        v-model="datos.area"
                                        label="Área"
                                        prepend-icon="mdi-map"
                                        required
                                        outlined
                                
                                      ></v-select> 

                                </v-col>

                                 <v-col
                                      cols="12"
                                      sm="10"
                                  >
                                    
                             
                                  <v-file-input
                                    v-model="files"
                                    placeholder="Ingresar coordenadas a travéz de documento HTML"
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

                                </v-col>
                 

                                <v-col
                                      cols="12"
                                      sm="5"
                                  >

                                      <v-text-field
                                        v-model="datos.latitud1"
                                        filled
                                        label="Latitud"
                                        prepend-icon="mdi-map-marker-radius"
                                        clearable
                                        type="number" 
                                        outlined
                                      ></v-text-field>
                                </v-col>

                                <v-col
                                      cols="12"
                                      sm="5"
                                    >
                                        <v-text-field
                                        v-model="datos.longitud1"
                                        filled
                                        label="Longitud"
                                        prepend-icon="mdi-map-marker-radius"
                                        clearable
                                        type="number"
                                        outlined 
                                      ></v-text-field>
                                </v-col>


                                <v-col
                                      cols="12"
                                      sm="5"
                                    >
                                      <v-text-field
                                        v-model="datos.latitud2"
                                        filled
                                        label="Latitud"
                                        prepend-icon="mdi-map-marker-radius"
                                        clearable
                                        type="number"
                                        outlined 
                                      ></v-text-field>
                                </v-col>

                                <v-col
                                      cols="12"
                                      sm="5"
                                    >
                                      <v-text-field
                                        v-model="datos.longitud2"
                                        filled
                                        label="Longitud"
                                        prepend-icon="mdi-map-marker-radius"
                                        clearable
                                        type="number"
                                        outlined 
                                      ></v-text-field>
                                </v-col>

                                              
                                <v-col
                                      cols="12"
                                      sm="5"
                                    >
                                      <v-select
                                        v-model="datos.tipo"
                                        :items="tipos"
                                        item-text="desc"
                                        item-value="id"
                                        label="Tipo"
                                        prepend-icon="mdi-calendar"       
                                        filled
                                        outlined>
                                      </v-select> 


                                </v-col>
                                    
                           
                                <v-col
                                      cols="12"
                                      sm="6"
                                      style="display: flex; "
                                    >
                                        <v-select
                                      v-model="datos.fecha"
                                      :items="fechas"
                                      item-text="desc"
                                      item-value="id"
                                      label="Fecha"
                                      prepend-icon="mdi-calendar"     
                                      menu-props="auto"
                                      required
                                      filled
                                      outlined>
                                  </v-select> 
                             <ModalFecha :proyecto="datos" @escuchar="variableHijo" />
           



                            
                              </v-col>
                                  

                              </v-row>
  
                            <div v-show="datos.longitud1"> 
                            <div v-show="datos.longitud2"> 
                            <div v-show="datos.latitud1"> 
                            <div v-show="datos.latitud2"> 
                                    <v-btn
                                      block
                                      outlined
                                      color="indigo"
                                      @click=" cargarMapa()"
                                    >
                                      Previsualizar Mapa
                                    </v-btn>
                            </div> 
                            </div> 
                            </div> 
                            </div> 

                                  <div v-show="datos.mapa"> 
                                  <div v-show="datos.fecha"> 
                                  <div v-show="datos.tipo"> 
                                            <v-dialog v-model="dialog" persistent max-width="290">
                                              <template v-slot:activator="{ on }">
                                                <v-btn
                                                    style="margin-top: 10px;"
                                                    block
                                                    color="success"  
                                                    dark v-on="on">Guardar Datos</v-btn>
                                              </template>
                                              <v-card>
                                                <v-card-title class="headline" style="    padding-left: 75px;
                                             padding-right: 75px;">{{estado}} Capa</v-card-title>
                                                <v-card-text>¿Desea guardar esta  capa? </v-card-text>
                                                <v-card-actions>
                                                  <v-spacer></v-spacer>
                                                  <v-btn color="green darken-1" style="color:white;" flat @click="guardarNuevaCapa()">Guardar</v-btn>
                                                  <v-btn color="red darken-1"  style="color:white;" flat @click="dialog = false">Cancelar</v-btn>
                                                </v-card-actions>
                                              </v-card>
                                          </v-dialog>
                                  
                              </div>
                              </div>
                              </div>

                      </v-container>
          <div v-show="datos.mapa" >    
                <div id="map" style="height: 400px;  
                                      margin: 0;
                                      padding: 0;">
                            </div>
                             </div>
                        

                  </v-form>
          </div > 
      </form  >

    </v-flex>
  </v-layout>  
 </div> 
</template>

<script>

import Left from '../Left.vue'
import axios from "axios";
import ModalFecha from '../Capa/ModalFecha'
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let pr_id = urlParams.get('pr_id')
import store from '../../store/index'
export default {
  components: {Left,ModalFecha}
   ,

  name:'Inicio',

 data(){
    return{
      datos:{
         nuevaArea:false,
         latitud1:"",
         longitud1:"",
         latitud2:"",
         longitud2:"",
         fecha:"",
         tipo:"",
         area:[],
         seleccion_id:store.state.eleccionProyecto,
         editarCapas:[],
         capaId:null,
         mapa:false
      },

        items: [{icon:'mdi-inbox', } ],
        fechas:[],
        tipos:[],
        areas:[],
        capas_tarjetas:[],
        dialog: false,
        estado:"ña",
         files: null,
    }
 },
   methods:{   
       previewFiles(files) {
 var file = event.target.files[0];
  var reader = new FileReader();


  let self_test = this
  reader.onload = function(event) {


    const data = this.result
    const pos_1 = data.search("mapBounds")
    const pos_2 = data.search("mapMinZoom")
    
    var data_sub = data.substring(pos_1, pos_2)
    var data_split = data_sub.split(/[\s,()]+/);


    var pos =0;
    
    data_split.forEach(function(element){
        
        element = parseFloat(element)
        if(!isNaN(element)){

            switch(pos){
              case 0:
                  self_test.datos.latitud1 = element
                break;
                case 1:
                  self_test.datos.longitud1 = element
                break;
                case 2:
                  self_test.datos.latitud2 = element
                break;
                case 3:
                  self_test.datos.longitud2 = element
                break;
            }

            pos++
         
         
         
         
         console.log(element)
        }
    })


    
    




  };

  reader.readAsText(file);

    },
      variableHijo(value){
        this.datos.fecha=[]    
       console.log("regresi  fecha",value)
         this.fechas.push({"id" :value.data.fc_id, "desc":value.data.fc_desc })
          this.datos.fecha=(value.data.fc_id)
          },

      click_capa(item){
       
        let self_test = this
        this.datos.nuevaArea=true
        //console.log(item)
        self_test.datos.mapa=false
        self_test.datos.latitud1=""
        self_test.datos.latitud2=""
        self_test.datos.longitud1=""
        self_test.datos.longitud2=""
        self_test.datos.fecha=""
        self_test.datos.tipo=""
        self_test.estado="Editar"
     
    
        axios.get(store.state.url_api+'Mantenedores/getCapaDetail/'+item.id,{

          headers: {
            Authorization:store.state.token
          }
          })

        .then(response => {
              console.log("info capa",response.data.capa[0])
          
          self_test.datos.capaId=response.data.capa[0].cp_id

            //dato de area
          //  self_test.areas=response.data.capa[0].ar_desc 
           self_test.datos.area=response.data.capa[0].cp_desc

            //dato de latitud 1
            self_test.datos.latitud1=response.data.capa[0].lm_lat1

            //dato de latitud 2
              self_test.datos.latitud2=response.data.capa[0].lm_lat2

            //dato longitud 1
            self_test.datos.longitud1=response.data.capa[0].lm_lon1
      
            //dato longitud 2
            self_test.datos.longitud2=response.data.capa[0].lm_lon2

            console.log("item busqeuda id fecha",response.data.capa[0])

            self_test.datos.fecha=response.data.capa[0].fc_id
          
            self_test.datos.tipo=response.data.capa[0].cp_tcp_id

       })

                      
        //    self_test.datos.fecha=item.fecha
          console.log("fecha id",item.fc_id)
         console.log("fecha nombre",item.fecha)
          

    },



    guardarNuevaCapa(datos){
      let self_test = this
      self_test.dialog=false
      var capas={
          capa:{cp_id:this.datos.capaId,cp_desc:this.datos.area,cp_tcp_id:this.datos.tipo,cp_fc_id:this.datos.fecha },
          //limite : {lm_lat2:this.datos.latitud2,lm_lon1:this.datos.longitud1}
          limite : {lm_lat1:this.datos.latitud1,lm_lat2:this.datos.latitud2,lm_lon1:this.datos.longitud1,lm_lon2:this.datos.longitud2}
        }

      var params = new URLSearchParams();
        params.append("capa",JSON.stringify(capas));
              
        //Post de nueva capa
          axios.post(store.state.url_api+'Mantenedores/setCapa', params,{

            headers: {
              Authorization:store.state.token
            }

            })
            .then((params) =>{
          console.log("nueva capa",params.data)
                                  //get capas , actualizacion del listado de capas 
                              axios.get(store.state.url_api+'Mantenedores/getCapas/'+this.datos.seleccion_id)
                              
                              .then((response) => 
                            {
                              console.log("inicio capas",self_test)
                                console.log("capaslkñ{}",response.data)
                      self_test.capas_tarjetas=[]
                      const almacenarCapas=response.data.capas

                      almacenarCapas.forEach(element => self_test.capas_tarjetas.push({"id" : element.cp_id, "text":element.cp_desc ,"fecha":element.fc_desc ,"tipo":element.tcp_desc },    
                                  
                                  ),
                      console.log("almacenado",self_test.capas_tarjetas)
                          );
          
            })

               
                  swal({
                          position:'top-end',
                          icon: 'success',
                          title: 'Datos guardados',
                          timer: 3000
                        })                            
                    }) 
                      this.datos.seleccion_id
                      console.log("seleccion id",this.datos.seleccion_id)
                            
                                
         console.log("areas listadasd",this.areas)
         
            
    },


    seleccion_pr_id(event){
       let self_test = this
         const seleccionProyecto=event
         store.commit('eleccionProyecto',seleccionProyecto) 
         this.datos.nuevaArea=false

          self_test.seleccion_id=event
         
          self_test.datos.mapa=false  
          self_test.datos.latitud1=""
          self_test.datos.latitud2=""
          self_test.datos.longitud1=""
          self_test.datos.longitud2="" 
          self_test.datos.capaId=0 
           self_test.datos.tipo=""

          axios.get(store.state.url_api+'Mantenedores/getAreas/'+event,{

          headers: {
            Authorization:store.state.token
          }
          })

                .then(response => {
               
                  this.areas = []
                  const areaAlmacenada =response.data.areas
                  console.log("areaaaaa", this.areas)
                    areaAlmacenada.forEach(element =>  self_test.areas.push({"id" : element.ar_desc_id, "desc":element.ar_desc}))
              })

                        axios.get(store.state.url_api+'Mantenedores/getFechas/'+event,{

                    headers: {
                      Authorization:store.state.token
                    }
                    })

                            .then(response => {
                          
                                console.log("fechaaaa",response)
                                console.log("this.fechas", self_test.fechas)
                                self_test.fechas=[]
                            const prueba2 =response.data.fechas
                              prueba2.forEach(element => self_test.fechas.push({"id" : element.fc_id, "desc":element.fc_desc},  
                              ))
                          })

                //get tipo capas 
                axios.get(store.state.url_api+'Mantenedores/getTipoCapas/'+event)
                .then((response) => 
              {
                  this.tipos=[]
                  console.log("capas",response.data.tipo_capas)
                    const prueba2 =response.data.tipo_capas
                      prueba2.forEach(element => this.tipos.push({"id" : element.tcp_id, "desc":element.tcp_desc},          
                    ),
                
            );
          
            })

              //get capas
                axios.get(store.state.url_api+'Mantenedores/getCapas/'+event)
                .then((response) => 
              {
                console.log("inicio capas",self_test)
                  console.log("capaslkñ{}",response.data)
        self_test.capas_tarjetas=[]
        const almacenarCapas=response.data.capas

        almacenarCapas.forEach(element => self_test.capas_tarjetas.push({"id" : element.cp_id, "text":element.cp_desc ,"fecha":element.fc_desc ,"tipo":element.tcp_desc },    
                    
                    ),
        console.log("almacenado",self_test.capas_tarjetas)
            );
          
            })
              

    },

    crearNuevaCapa(datos){
          let self_test = this
         this.datos.nuevaArea=true
         self_test.datos.capaId=0   
        self_test.datos.latitud1=""
        self_test.datos.latitud2=""
        self_test.datos.longitud1=""
        self_test.datos.longitud2=""
        self_test.datos.fecha=""
        self_test.datos.tipo=""
         self_test.estado="Nueva"
        self_test.datos.area=[]
          self_test.datos.mapa=false
       },

    cargarMapa(datos){

             let self_test = this
            self_test.datos.mapa=true
             console.log("latituuuu",this.datos.latitud1)
              console.log("latituuuu2",this.datos.latitud2)
               console.log("laongi1",this.datos.longitud1)
                 console.log("longiii2",this.datos.longitud2)
         // This example creates a simple polygon representing the Bermuda Triangle.

        const map = new google.maps.Map(document.getElementById("map"), {
          zoom: 5,
          center: { lat: parseFloat(this.datos.latitud1), lng: parseFloat(this.datos.longitud2)}, 
          mapTypeId: "satellite",
           streetViewControl: false,
    mapTypeControl: false,
      zoomControl:false,
       panControl:false,
       
        });
        // Define the LatLng coordinates for the polygon's path.
        const triangleCoords = [
          { lat: parseFloat(this.datos.latitud1), lng: parseFloat(this.datos.longitud1)},
          { lat: parseFloat(this.datos.latitud1), lng: parseFloat(this.datos.longitud2) },
          { lat: parseFloat(this.datos.latitud2), lng: parseFloat( this.datos.longitud2)},
          { lat: parseFloat(this.datos.latitud2), lng: parseFloat( this.datos.longitud1)},
          { lat: parseFloat(this.datos.latitud1), lng: parseFloat(this.datos.longitud1)},


        ]; 
        
        

          let bounds = new google.maps.LatLngBounds()
    
      bounds.extend(new google.maps.LatLng(this.datos.latitud1, this.datos.longitud1))
      bounds.extend(new google.maps.LatLng(this.datos.latitud2, this.datos.longitud2))
              map.fitBounds(bounds)

        // Construct the polygon.
        const bermudaTriangle = new google.maps.Polygon({
          paths: triangleCoords,
          strokeColor: "#FF0000",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "#FF0000",
          fillOpacity: 0.35,
        });
        bermudaTriangle.setMap(map);
       console.log("cooordenadassss", triangleCoords)

            },

   guardarNuevaArea(){
       console.log("*******datos enviados*****")
       console.log(this.datos.nombreArea)
       console.log(this.datos.latitud1)
       console.log(this.datos.latitud2)
       console.log(this.datos.longitud1)
       console.log(this.datos.longitud2)
     }

     },
      
     mounted() {
    
    let self_test = this
      
self_test.datos.seleccion_id
      
          self_test.datos.mapa=false  
          self_test.datos.latitud1=""
          self_test.datos.latitud1=""
          self_test.datos.longitud1=""
          self_test.datos.longitud2="" 
          self_test.datos.capaId=0 
           self_test.datos.tipo=""

          axios.get(store.state.url_api+'Mantenedores/getAreas/'+self_test.datos.seleccion_id,{

          headers: {
            Authorization:store.state.token
          }
          })

                .then(response => {
               
                  this.areas = []
                  const areaAlmacenada =response.data.areas
                  console.log("areaaaaa", this.areas)
                    areaAlmacenada.forEach(element =>  self_test.areas.push({"id" : element.ar_desc_id, "desc":element.ar_desc}))
              })

                        axios.get(store.state.url_api+'Mantenedores/getFechas/'+self_test.datos.seleccion_id,{

                    headers: {
                      Authorization:store.state.token
                    }
                    })

                            .then(response => {
                          
                                console.log("fechaaaa",response)
                                console.log("this.fechas", self_test.fechas)
                                self_test.fechas=[]
                            const prueba2 =response.data.fechas
                              prueba2.forEach(element => self_test.fechas.push({"id" : element.fc_id, "desc":element.fc_desc},  
                              ))
                          })

                //get tipo capas 
                axios.get(store.state.url_api+'Mantenedores/getTipoCapas/'+self_test.datos.seleccion_id)
                .then((response) => 
              {
                  this.tipos=[]
                  console.log("capas",response.data.tipo_capas)
                    const prueba2 =response.data.tipo_capas
                      prueba2.forEach(element => this.tipos.push({"id" : element.tcp_id, "desc":element.tcp_desc},          
                    ),
                
            );
          
            })

              //get capas
                axios.get(store.state.url_api+'Mantenedores/getCapas/'+self_test.datos.seleccion_id)
                .then((response) => 
              {
                console.log("inicio capas",self_test)
                  console.log("capaslkñ{}",response.data)
        self_test.capas_tarjetas=[]
        const almacenarCapas=response.data.capas

        almacenarCapas.forEach(element => self_test.capas_tarjetas.push({"id" : element.cp_id, "text":element.cp_desc ,"fecha":element.fc_desc ,"tipo":element.tcp_desc },    
                    
                    ),
        console.log("almacenado",self_test.capas_tarjetas)
            );
          
            })
              

    

     }
  
  
     
  

} 


</script>
