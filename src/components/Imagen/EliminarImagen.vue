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
                <v-snackbar
      :timeout="-1"
      :value="true"
      absolute
      right
      shaped
      top
       color="success"
       v-show=alerta
    >
      Imagenes eliminada
      <v-icon
    
          dark
          right
        >
          mdi-delete
        </v-icon>
    </v-snackbar>




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

    
                   <v-btn
                   v-show="informacion.fecha"
                    style="margin-top: 10px;"
                    block
                    color="success" 
                    @click="mostrarImagenes()"
                    >
                        Mostrar imagenes
                    </v-btn>



            <!-- boton eliminar -->
                  <v-dialog
                    v-model="dialog"
                    scrollable
                    max-width="300px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        color="error"
                        dark
                        v-bind="attrs"
                        v-on="on"
                        @click= eliminar
                        v-show="selected"
                        block
                        style="    margin-top: 10px;
                  margin-bottom: 5px;"
                      >
                      Eliminar Imagenes
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title>Imagenes seleccionadas</v-card-title>
                      <v-divider></v-divider>
                      <v-card-text style="height: 300px;">
                      <v-list-item
                        v-for="(item, i) in   ids_selected"
                        :key="i"
                      >
                    
                        <v-list-item-content>
                          <v-list-item-title > {{item.id}}- {{item.path}}</v-list-item-title>
                            
                        </v-list-item-content>
                      </v-list-item>
                      </v-card-text>
                      <v-divider></v-divider>
                      <v-card-actions>
                        <v-btn
                          color="error"
                          
                          @click="dialog = false"
                        >
                          Cancelar
                        </v-btn>
                        <v-btn
                          color="success"
                        
                        @click=confirmarEliminacion
                        >
                          Eliminar
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>

        </form>
      </v-col>



        <!--  carta de imagenes -->
          <v-card
              max-width="700"
              class="mx-auto"
              v-show="imagenes"
              v-model="selected"
             
            >


              <v-container class="pa-1">
                <v-item-group
                  v-model="selected"
                  item-value="id"
                  multiple
                >
                  
                  <v-row >
                
                    <v-col
                      v-for="(item, i) in items"
                    :key="i"
                      cols="12"
                      md="6"
                    >
                      <v-item v-slot="{ active, toggle }">
                        <v-img
                          :src="`https://cdn.vuetifyjs.com/images/${item.src}`"
                          height="150"
                          class="text-right pa-2"
                          @click="toggle"
                        >
                          <v-btn
                            icon
                            dark
                          >
                            <v-icon>
                              {{ active ? 'mdi-check-circle' : 'mdi-check-circle-outline' }}
                            </v-icon>
                          </v-btn>
                        </v-img>
                      </v-item>
                    </v-col>
              
                  </v-row>
                    
                </v-item-group>
              </v-container>
            
            </v-card>


    </v-row >

 </v-container>

  
</template>

<script>
import {mapActions, mapMutations} from 'vuex'
import {mapState} from 'vuex'
import axios from "axios";
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let pr_id = urlParams.get('pr_id')
import store from '../../store/index'

export default {
  props:['select'],
  components: {},
    name:'Inicio',
 
    data(){
        return{
        items: [
          {
          src: 'backgrounds/bg.jpg',
          id:1
        },
        {
          src: 'backgrounds/md.jpg',
          id:4
        },
        {
          src: 'backgrounds/bg-2.jpg',
           id:8
        },
        {
          src: 'backgrounds/md2.jpg',
           id:5
        },
           {
          src: 'backgrounds/bg-2.jpg',
           id:8
        },
   
        ],
       ids_selected:[],
        selected: null,
        informacion :{        
                    icono:"",
                    opcion:null,
                    fecha:"" ,
                    area:"",
                    selected:"",
                    id:pr_id,
                    opcionDos:"",
                    idProyecto:null,
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
            dialog:false,
            imagenes:false,
            alerta:false
           
              
        } 

    },
       
    methods:{
  
      mostrarImagenes(){
  /*     this.items=[] */
  
        this.imagenes=true


        const informacion={
          proyecto:this.informacion.idProyecto,
          area:this.informacion.area,
          opcion:this.informacion.opcion,
          fecha:this.informacion.fecha
        }
  console.log(informacion)
      var params = new URLSearchParams();
      params.append("informacion",JSON.stringify(informacion));
              
      axios.post(store.state.url_api+'Mantenedores/ELIMINARNRN', params).then((params) =>{
           console.log(params)

        //devuelve las urls
        /*  this.items.push({"path":params.src , "id":params.id}) */
           
      
           
        })  



      },

      eliminar(){
        this.dialog=false
        console.log(this.selected)
        this.ids_selected=[]
        this.selected.forEach(indice=>this.ids_selected.push({"path":this.items[indice].src ,"id":this.items[indice].id } ) )
        
      },

      confirmarEliminacion(){
        
        this.dialog=false

        const imagenesEliminadas=this.ids_selected  
        console.log(imagenesEliminadas)
        var params = new URLSearchParams();
        params.append("informacion",JSON.stringify(imagenesEliminadas));
              
        axios.post(store.state.url_api+'Mantenedores/ELIMINARNRN', params).then((params) =>{
              console.log(params)

           
        })  
        let self_test = this
        this.imagenes=true
        this.alerta=true

        setTimeout(function(){
        self_test.alerta=false
     }, 3000);

        this.informacion.area=null
        this.informacion.opcion=null
        this.informacion.fecha=null
        this.imagenes=false
        this.selected=false
         
},
    
     seleccion(event){
            this.informacion.idProyecto= event
console.log(event)
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