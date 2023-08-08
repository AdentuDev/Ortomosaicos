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

                 
                    <h1> Áreas</h1>

                  </div>


                   <div v-show="datos.seleccion_id" >  
                      <v-col style=""> 
                      
                          <v-btn 
                            rounded
                              color="  primary"      
                              block
                              @click="crearNuevaArea(datos)"
                            >
                              Nueva Área
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
                                v-for="(item, i) in areas"
                                :key="i"
                                item-text="text"
                                :item-value="item.id"
                              >
                            
                                  <v-list-item-content   @click="click_area(item)">
                                      <v-list-item-title v-text="item.desc"></v-list-item-title>
                                      <v-list-item-title >{{item.id_area}} </v-list-item-title>
                                  
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
          <!--   seleccion del proyecto -->
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
                                      sm="6"
                                      
                                  >
                                    
                                      <v-select
                                    
                                        :items="areas2"
                                        item-text="desc"
                                        item-value="id"
                                        v-model="datos.area2"
                                        label="Área"
                                        prepend-icon="mdi-map"
                                        required
                                        outlined
                                         filled
                                
                                      ></v-select> 

                                </v-col>

                                <v-col
                                      cols="12"
                                      sm="6"
                                  >

                                   <v-text-field
                                        v-model="datos.descripcion"
                                        filled
                                        label="Descripcion"
                                        prepend-icon="mdi-clipboard-text"
                                        clearable
                                        required
                                        outlined
                                    ></v-text-field>
                                </v-col>

                        

                                <v-col
                                      cols="12"
                                      sm="6"
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
                                      sm="6"
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

                                
                              </v-row>

                                  
                                          
                                          <div v-show="datos.latitud1">
                                             <div v-show="datos.longitud1">
                                                <v-btn
                                                  block
                                                  
                                                  outlined
                                                  color="indigo"
                                                  @click=" cargarMapa()"
                                                >
                                                  Previsualizar Coordenadas
                                                </v-btn>
                                         </div>
                                         </div>
                                          <v-dialog v-model="dialog" persistent max-width="290">
                                              <template v-slot:activator="{ on }">
                                                <v-btn
                                                    style="margin-top: 10px;"
                                                    block
                                                    color="success"  
                                                    dark v-on="on">Guardar Área</v-btn>
                                              </template>
                                              <v-card>
                                                <v-card-title class="headline">{{estado}} Área</v-card-title>
                                                <v-card-text>¿Desea guardar esta área? </v-card-text>
                                                <v-card-actions>
                                                  <v-spacer></v-spacer>
                                                  <v-btn color="green darken-1" style="color:white;" flat @click="guardarNuevaArea()">Guardar</v-btn>
                                                  <v-btn color="red darken-1"  style="color:white;" flat @click="dialog = false">Cancelar</v-btn>
                                                </v-card-actions>
                                              </v-card>
                                          </v-dialog>
                                 
                          
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
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let pr_id = urlParams.get('pr_id')
import store from '../../store/index'
export default {
  components: {Left,}
   ,

  name:'Inicio',

 data(){
    return{
      datos:{
        prueba:false,
         nuevaArea:false,
         latitud1:false,
         longitud1:false,
         area:[],
         seleccion_id:store.state.eleccionProyecto,
         editarCapas:[],
         area_id:null,
         mapa:false,
         descripcion:"",
        areaId:0,
        proyecto_id:0,
        area2:[{"id" : 0, "desc":"sin area" ,"id_area" : 0,"ar_lat":0, "ar_lon":0}]
      },

        items: [{icon:'mdi-inbox', } ],
        fechas:[],
        tipos:[],
        areas:[],
        capas_tarjetas:[],
        areas2:[],
        boton:false,
        dialog: false,
        estado:"",
    }
 },
   methods:{ 
    click_area(item){
       
        let self_test = this
        this.datos.nuevaArea=true
        console.log("item",item)   
        self_test.datos.latitud1=""
        self_test.datos.longitud1=""
        self_test.datos.descripcion=""
        self_test.estado="Editar"
        this.datos.mapa=false
  self_test.datos.areaId=item.id
        //dato de latitud 1
            self_test.datos.latitud1=parseFloat(item.ar_lat) 
    
        //dato longitud 1
            self_test.datos.longitud1=parseFloat(item.ar_lon)

        //dato area
            self_test.datos.area2=item.ar_ar_id
 
        //datos descripcion
            self_test.datos.descripcion=item.desc


            console.log("item",item)
 
         
    },


    guardarNuevaArea(datos){
      console.log("ingreso a guardar")
        let self_test = this
        self_test.dialog=false
        var area={
          area:{ar_desc:this.datos.descripcion,ar_lat:this.datos.latitud1,ar_lon:this.datos.longitud1, ar_id:this.datos.areaId,ar_pr_id:this.datos.seleccion_id, ar_ar_id:this.datos.area2 }
        
        }
console.log("area a back",area)
        var params = new URLSearchParams();
          params.append("area",JSON.stringify(area));
              
        //Post de nueva capa
          axios.post(store.state.url_api+'Mantenedores/setArea', params,{
            headers: {
              Authorization:store.state.token
            }
            })
            .then((params) =>{
                 console.log(params)
                 //actualizacion de lista de areas
                       axios.get(store.state.url_api+'Mantenedores/getAreas/'+ this.datos.seleccion_id,{

                          headers: {
                            Authorization:store.state.token
                          }
                          })
                              .then(response => {
                              
                                this.areas = []
                                this.areas2 = []
                                const areaAlmacenada =response.data.areas
                                console.log("areaaaaasssssss",response.data.areas)
                                  areaAlmacenada.forEach(element =>  self_test.areas.push({"id" : element.ar_id, "desc":element.ar_desc ,"id_area" : element.ar_id,"ar_lat":element.ar_lat, "ar_lon":element.ar_lon ,"ar_ar_id":element.ar_ar_id}))

                                  self_test.areas2.push({"id" : "0", "desc":"Sin área madre" ,"id_area" : 0,"ar_lat":0, "ar_lon":0})
                                self_test.areas.forEach(element =>  self_test.areas2.push({"id" : element.id, "desc":element.desc ,"id_area" : element.id_area,"ar_lat":element.ar_lat, "ar_lon":element.ar_lon,"ar_ar_id":element.ar_ar_id }))
                                  
                            })

                  swal({
                          position:'top-end',
                          icon: 'success',
                          title: 'Datos guardados',
                          timer: 3000
                        })                            
                    })                        
    },


    seleccion_pr_id(event){
      let self_test = this
      this.datos.nuevaArea=false
      const seleccionProyecto=event
      store.commit('eleccionProyecto',seleccionProyecto) 

      /*self_test.datos.mapa=false  
      self_test.datos.latitud1=""
      self_test.datos.longitud1=""
      self_test.datos.descripcion=""*/
      self_test.datos.areaId=0
      axios.get(store.state.url_api+'Mantenedores/getAreas/'+event, {
        headers: {
          Authorization:store.state.token
        }
      })
      .then(response => {
        this.areas = []
        this.areas2 = []
        const areaAlmacenada =response.data.areas
        console.log("areaaaaasssssss",response.data.areas)
        areaAlmacenada.forEach(element =>  self_test.areas.push({"id" : element.ar_id, "desc":element.ar_desc ,"id_area" : element.ar_id,"ar_lat":element.ar_lat, "ar_lon":element.ar_lon , "ar_ar_id":element.ar_ar_id}))
        self_test.areas2.push({"id" : "0", "desc":"Sin área madre" ,"id_area" : 0,"ar_lat":0, "ar_lon":0})
        self_test.areas.forEach(element =>  self_test.areas2.push({"id" : element.id, "desc":element.desc ,"id_area" : element.id_area,"ar_lat":element.ar_lat, "ar_lon":element.ar_lon , "ar_ar_id":element.ar_ar_id})) 
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
      .then((response) => {
        this.tipos=[]
        console.log("capas",response.data.tipo_capas)
        const prueba2 =response.data.tipo_capas
        prueba2.forEach(element => this.tipos.push({"id" : element.tcp_id, "desc":element.tcp_desc},
        ));
      })
      
      //get capas
      axios.get('http://plataforma_api.adentu.techapi_ortomosaicos/index.php/Mantenedores/getAreas/'+event)
      .then((response) => {
        self_test.capas_tarjetas=[]
        const almacenarCapas=response.data.capas
        almacenarCapas.forEach(element => self_test.capas_tarjetas.push({"id" : element.cp_id, "text":element.cp_desc ,"fecha":element.fc_desc ,"tipo":element.tcp_desc},
        ));    
      })
    },

    crearNuevaArea(datos){
      console.log("datos",datos.area2[0].id)
      datos.area2=[{"id" : 0, "desc":"sin area" ,"id_area" : 0,"ar_lat":0, "ar_lon":0}]
      let self_test = this
      this.datos.nuevaArea=true
      self_test.datos.areaId=0   
      self_test.datos.latitud1=""
      self_test.datos.longitud1=""
      self_test.datos.area2=datos.area2[0].id
      self_test.datos.descripcion=""
      self_test.estado="Nueva"
      self_test.datos.mapa=false
    },

    cargarMapa(datos){
      let self_test = this
      self_test.datos.mapa = true
      console.log("latituuuu",this.datos.latitud1)
      console.log("laongi1",this.datos.longitud1)
   
      // This example creates a simple polygon representing the Bermuda Triangle.
      const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 14,
        center: { lat: parseFloat(this.datos.latitud1), lng: parseFloat(this.datos.longitud1)}, 
        mapTypeId: "satellite",
        streetViewControl: false,
        mapTypeControl: false,
        zoomControl:false,
        panControl:false,       
      });
 
      // Construct 
      const centroArea = new google.maps.Marker({
        position: { lat: parseFloat(this.datos.latitud1), lng: parseFloat(this.datos.longitud1)},           
      });
      centroArea.setMap(map);       
    },
  },
  mounted(){
    
          let self_test = this
          self_test.datos.seleccion_id
           self_test.datos.mapa=false  
          self_test.datos.latitud1=false
          self_test.datos.longitud1=false
          self_test.datos.areaId=0 
            
          axios.get(store.state.url_api+'Mantenedores/getAreas/'+self_test.datos.seleccion_id,{

          headers: {
            Authorization:store.state.token
          }
          })
                .then(response => {
                
                  this.areas = []
                  this.areas2 = []
                  const areaAlmacenada =response.data.areas
                  console.log("areaaaaasssssss",response.data.areas)
                    areaAlmacenada.forEach(element =>  self_test.areas.push({"id" : element.ar_id, "desc":element.ar_desc ,"id_area" : element.ar_id,"ar_lat":element.ar_lat, "ar_lon":element.ar_lon, "ar_ar_id": element.ar_ar_id}))

                    self_test.areas2.push({"id" : "0", "desc":"Sin área madre" ,"id_area" : 0,"ar_lat":0, "ar_lon":0})
                   self_test.areas.forEach(element =>  self_test.areas2.push({"id" : element.id, "desc":element.desc ,"id_area" : element.id_area,"ar_lat":element.ar_lat, "ar_lon":element.ar_lon, "ar_ar_id": element.ar_ar_id}))
                     
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
                axios.get('http://plataforma_api.adentu.techapi_ortomosaicos/index.php/Mantenedores/getAreas/'+self_test.datos.seleccion_id)
                .then((response) => 
              {
         
                self_test.capas_tarjetas=[]
                const almacenarCapas=response.data.capas

                almacenarCapas.forEach(element => self_test.capas_tarjetas.push({"id" : element.cp_id, "text":element.cp_desc ,"fecha":element.fc_desc ,"tipo":element.tcp_desc },    
                    
                    ),

            );
          
            })
              
  }
} 


</script>
