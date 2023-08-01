<template>
       <div style="height:100%">
      
       <v-layout style="height:100%">  
              <v-flex  xs2 style="background-color : #111226">
                   <Left />
            
              </v-flex>
              <v-flex xs9>

                 <v-col
                cols="12"
                sm="5"
                style="margin-left: 40px;"
              >
                      
                    <h1>Anotación </h1>  
                   
               </v-col>
     
              <FormularioAnotaciones v-bind:select="select" ref="FormularioAnotaciones_"/>
      </v-flex>
       </v-layout>  
       </div> 
</template>

<script>
import FormularioAnotaciones from '../components/Anotaciones/FormularioAnotaciones'
import Left from '../components/Left.vue'
import Toolbar from '../components/Toolbar.vue'
import FormularioPoligono from '../components/FormularioPoligono.vue'
import SelectProyecto from '../components/SelectProyecto.vue'
import AppVue from '../App.vue'
import axios from "axios";
import store from '../store/index'
import LeftPrueba from '../components/LeftPrueba.vue'


export default {
  components: {FormularioAnotaciones,FormularioPoligono,Left,Toolbar,SelectProyecto, LeftPrueba},
   
  name:'Inicio',
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
            console.log(self_test.select)
        self_test.$refs.FormularioAnotaciones_.seleccion(self_test.select)
    }

},
mounted(){
 let self_test = this
     
     self_test.$refs.FormularioAnotaciones_.seleccion(self_test.select)
}

} 


</script>
