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
   
        <h1>Imágenes</h1>  
  
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
          style=" z-index: 30;"
          @change="id_seleccion($event) "
        ></v-select>
      </v-col>
       </v-row >
      <formulario v-bind:select="select" ref="formulario_"/>
    
   </v-flex> 
  </v-layout>  
</div> 
</template>

<script>
import Formulario from '../components/Formulario.vue'
import Left from '../components/Left.vue'
import Toolbar from '../components/Toolbar.vue'

import store from '../store/index'

export default {
  components: {Formulario, Toolbar, Left },
   
  name:'Inicio',
 data(){
        return{
             select:store.state.eleccionProyecto
         
          
        }
    },
methods:{
    id_seleccion(event){

         let self_test = this

         //id de proyecto enviado a store
        const seleccionProyecto=event
        store.commit('eleccionProyecto',seleccionProyecto) 


        self_test.select=event
        self_test.$refs.formulario_.seleccion(self_test.select)
    }

},
mounted(){
 let self_test = this
     
        self_test.select
        self_test.$refs.formulario_.seleccion(self_test.select)
}
} 
</script>
