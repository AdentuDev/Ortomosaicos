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
   
       <form  >
      <div > 

      </div>
      <br>
 <!--  <h1> priyecto{{$store.state.eleccionProyecto}} </h1>  -->
 <div style="display: flex;">
        <v-select
          no-data-text="No hay datos disponibles"
          :items="capas"
          item-text="desc"
          item-value="id"
          v-model="informacion.capa"
          label="Capa"
          prepend-icon="mdi-map"
          required
          outlined
        
        ></v-select> 

 </div>
  <div v-show="informacion.capa"> 
   
      <div style="display: flex;">
          <v-alert
          text
          prominent
          type="warning"
          icon="mdi-folder-multiple-outline"
          >
            Arrastrar <strong>carpeta</strong>,para crear el nuevo mosaico
          </v-alert>
       
      </div>
            <MosaicoDrope  :texto="informacion"/>
  </div>

 

       </form>


      </v-col>

   </v-row >
 


  <!--v-card
    max-width="400"
    class="mx-auto"
  >
    <v-container class="pa-1">
      <v-item-group
        v-model="selected"
        item-value="id"
        multiple
      >
        <v-row>
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
                    {{ active ? 'mdi-heart' : 'mdi-heart-outline' }}
                  </v-icon>
                </v-btn>
              </v-img>
            </v-item>
          </v-col>
        </v-row>
      </v-item-group>
    </v-container>
  </v-card>

<button @click=guardar()> guardar</button-->
 </v-container>

  
</template>

<script>

import axios from "axios";
import MosaicoDrope from "./MosaicoDrope"
import EliminarMosaico from '../Mosaicos/EliminarMosaico.vue'
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let pr_id = urlParams.get('pr_id')
import store from '../../store/index'


export default {
 
   name:'Inicio',
  components: {MosaicoDrope,EliminarMosaico
  },
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
      ],
      selected: [],
            informacion:{        
                    capa:"",
                    id:pr_id, 
                          
            },
            capas:[],
            id:[],    
            token:["pruebaa"],     
            showInfo: true,
            alerta:"",
            dialog:false
    
        } 
        

    },
     
    methods:{
guardar(){
  console.log("guardado")
  console.log(this.selected)
 let ids_selected=[]
this.selected.forEach(
                          indice=>ids_selected.push(this.items[indice].id)
                    ) 
console.log(ids_selected)
},
      cambio() {
          let self_test = this
          self_test.$refs.mapa_.initMap(self_test.informacion)
              
              
      },


    seleccion(event){
          let self_test = this
          this.informacion.idProyecto= event

            //get capas
                axios.get(store.state.url_api+'Mantenedores/getCapas/'+event)
                .then((response) => 
              {
                console.log("ingresa?",response)
                  self_test.capas=[]
                  const almacenarCapas=response.data.capas

                  almacenarCapas.forEach(element => self_test.capas.push({"id" : element.cp_id, "desc":element.cp_desc+"_"+element.tcp_desc+"_"+element.fc_desc  },    
                              
                              ),
                      );
          
            })

        },


    }
      
    
    
}

</script>

<style>

</style>