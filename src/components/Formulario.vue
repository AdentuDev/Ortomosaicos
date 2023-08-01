<template>

 <v-container class=" lighten-5" >
    <v-row style="justify-content: space-around;">
        <v-col
              cols="12"
              sm="5"
            >
        </v-col>
    </v-row>
          
    <v-row no-gutters class="d-flex justify-center">
       
        <v-col
        cols="24"
        sm="6"
        md="8"
      >
   
          <form >
             

              <v-select
            
                :items="area"
                item-text="desc"
                item-value="id"
                v-model="informacion.area"
                label="Área"
                prepend-icon="mdi-map"
                required
                outlined
                 style=" z-index: 30;"
                @change="onChange($event)"
              ></v-select> 

                <div v-show="informacion.area" style="display: flex; ">
                      <v-select
                            :items="opcion"
                            item-text="desc"
                            item-value="id"
                            v-model="informacion.opcion"
                            label="Opción"
                            prepend-icon="mdi-library-books"       
                            required
                            outlined
                            style=" z-index: 30;"
                        ></v-select> 
                        <Modal :texto="informacion" @escuchar="variableHijo" />
                </div>

                <v-select
                    :items="fecha"
                    item-text="desc"
                    item-value="id"
                    v-model="informacion.fecha"
                    label="Fecha"
                    prepend-icon="mdi-calendar"       
                    required
                    outlined
                     style=" z-index: 30;"
                    >
                </v-select> 

            
                <v-select 
                  :items="iconos"
                  label="Icono"
                  item-text="text"
                  item-value="text"
                  v-model="informacion.icono"
                  prepend-icon="mdi-map-marker" 
                  outlined
                  style=" z-index: 30;"
                  > 
                  
                  <template v-slot:item="{ item }">
                      <img :src="item.imagen"> {{ item.text}}
                  </template>

                </v-select>


              <div v-show="informacion.fecha" >  
            <!--   <div v-show="informacion.icono" >  -->
              <div v-show="informacion.opcion" > 
                  <DropeZone :texto="informacion" />
              </div> 
              </div> 
          <!--     </div>  -->
    
        </form>
      </v-col>

    </v-row >

 </v-container>

  
</template>

<script>
import {mapActions, mapMutations} from 'vuex'
import {mapState} from 'vuex'
import DropeZone from './DropeZone.vue'
import axios from "axios";
import Modal from './ModalMarcador.vue';
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let pr_id = urlParams.get('pr_id')
import store from '../store/index'

export default {
  props:['select'],
  components: {DropeZone, Modal},
    name:'Inicio',
 

 
    data(){
        return{
      
           informacion :{        
                    icono:"",
                    opcion:null,
                    fecha:"" ,
                    area:"",
                    selected:"",
                    id:pr_id,
                    opcionDos:""

            },
            model:1,
            iconos:[],
            fecha:[],
            area:[],
            id:[],
            opcion:[],
            filtrado:[],
            almacenamiento:[],
            tipo:["Vuelo","Anotacion","Panoramica"],
            selectedItem: 1,
     
              
        } 

    },
    methods:{
      mostrar(){
        
        console.log("click",this.informacion)
      },
   
     seleccion(event){
            this.informacion.idProyecto= event

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


              //get iconos
            axios.get(store.state.url_api+'Mantenedores/getIcons/')
              .then((response)=>
                {
                  const datosIconos =response.data
                  this.iconos = []
                  datosIconos.forEach(element => this.iconos.push({"text" : element.name, "imagen":element.ruta}))
                   
                })

        },

      onChange(event_pr_id){
            this.informacion.opcion = null

            //get opciones 
            axios.get(store.state.url_api+'Mantenedores/getOptions/'+event_pr_id)
                  
            .then(response => {
              const opciones =response.data.opciones
              const filtro = opciones.filter(word => word.op_rel == "marcador" );        
              this.opcion = []
              filtro.forEach(element => this.opcion.push({"id" : element.op_id, "desc":element.op_rel+" / "+element.op_desc}))
                
          }) 
     
        },

        variableHijo(value){
            
          this.opcion.push({"id" :value.data.op_id, "desc":value.data.op_rel+" / "+value.data.op_desc})
          this.informacion.opcion=(value.data.op_id)

          },
   
    },
   
    
    mounted() {
      //envio de token automatico

       /*     var tokenRegreso= new URLSearchParams();    
                    tokenRegreso.append("token",JSON.stringify(store.state.token));                 
                    axios.post('http://plataforma_api.adentu.tech/api_api_ortomosaicos/index.php/registro/getToken/', tokenRegreso).then((tokenRegreso) =>{
                    console.log("enviado desde marcador",tokenRegreso.data)
                  
                    } ) */

      //get Fechas 
        axios.get(store.state.url_api+'Mantenedores/getFechas/'+pr_id)
        .then((response) => {
             const prueba2 =response.data
              prueba2.forEach(element => this.fecha.push({"id" : element.fc_id, "desc":element.fc_desc}),              
                );    
        })

      // get área
        axios.get('http://plataforma_api.adentu.techapi_ortomosaicos/index.php/Mantenedores/getAreas/'+pr_id)
        .then(response => {
          const prueba =response.data
            prueba.forEach(element => this.area.push({"id" : element.ar_id, "desc":element.ar_desc}))
        })

     } 

    
    }

</script>

<style>

</style>