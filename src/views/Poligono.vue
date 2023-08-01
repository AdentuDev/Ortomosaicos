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
                      
                    <h1>Polígonos </h1>  
                   
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
          :items="proyectos" 
          menu-props="auto"
          label="Proyecto"
          hide-details
          prepend-icon="mdi-book-open"
          single-line
          @change="id_seleccion($event) "
        ></v-select>
      </v-col> 
      </v-row  >
              <FormularioPoligono  v-bind:select="select" ref="FormularioPoligono_"/>
      </v-flex>
       </v-layout>  
       </div> 
</template>

<script>
import Formulario from '../components/Formulario.vue'
import Left from '../components/Left.vue'
import Toolbar from '../components/Toolbar.vue'
import FormularioPoligono from '../components/FormularioPoligono.vue'
import SelectProyecto from '../components/SelectProyecto.vue'
import store from '../store/index'
import LeftPrueba from '../components/LeftPrueba.vue'


export default {
  components: {Formulario,FormularioPoligono,Left,Toolbar,SelectProyecto, LeftPrueba},
   
  name:'Inicio',
 data(){
        return{
             select:store.state.eleccionProyecto,  
             proyectos:store.state.proyectos      
        }
    },
methods:{
    id_seleccion(event){

        let self_test = this
        const seleccionProyecto=event
        store.commit('eleccionProyecto',seleccionProyecto) 


        self_test.select=event
        self_test.$refs.FormularioPoligono_.seleccion(self_test.select)
        /* console.log("yeayeyea")
        console.log(self_test.select) */
       
    }

},
mounted(){
 let self_test = this
     
     self_test.$refs.FormularioPoligono_.seleccion(self_test.select)
}

} 


</script>
