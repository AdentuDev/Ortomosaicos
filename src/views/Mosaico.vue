<template>
       <div style="height:100%">
      
       <v-layout style="height:100%">  
              <v-flex  xs2 style="background-color : #111226">
                   <Left/>
            
              </v-flex>
              <v-flex xs9>

                 <v-col
                cols="12"
                sm="5"
                style="margin-left: 40px;"
              >
                     
                    <h1>Mosaico </h1>  
                   
               </v-col>
       <v-row no-gutters class="d-flex justify-center" >
        <v-col
        cols="24"
        sm="6"
        md="8"
        >
        <v-select
          item-text="pr_desc"
          item-value="pr_id"
          v-model="select"
          :items="$store.state.proyectos"
          menu-props="auto"
          label="Proyecto"
          hide-details
          prepend-icon="mdi-book-open"
          single-line
          @change="id_seleccion($event) "
        ></v-select>
      </v-col> 
      </v-row  >
             <formularioMosaicos  v-bind:select="select" ref="FormularioMosaico_"/>
            
      </v-flex>
       </v-layout>  
       </div> 
</template>

<script>
import Formulario from '../components/Formulario.vue'
import Left from '../components/Left.vue'
import Toolbar from '../components/Toolbar.vue'

import SelectProyecto from '../components/SelectProyecto.vue'
import AppVue from '../App.vue'
import axios from "axios";
import store from '../store/index'
//import LeftPrueba from '../components/LeftPrueba.vue'
import FormularioMosaicos from '../components/Mosaicos/FormularioMosaicos.vue'
import Documento from '../components/Documento.vue'


export default {
  components: {Formulario,FormularioMosaicos,Left,Toolbar,SelectProyecto, FormularioMosaicos,Documento},
   
  name:'Mosaico',
 data(){
        return{
             select:store.state.eleccionProyecto,         
        }
    },
methods:{
    id_seleccion(event){

         let self_test = this
         const seleccionProyecto=event
         store.commit('eleccionProyecto',seleccionProyecto) 


        self_test.select=event
         console.log("yeayeyea")
            console.log( self_test.$refs)
        self_test.$refs.FormularioMosaico_.seleccion(self_test.select)
    }

},
mounted(){
 let self_test = this
     
     self_test.$refs.FormularioMosaico_.seleccion(self_test.select)
}

} 


</script>