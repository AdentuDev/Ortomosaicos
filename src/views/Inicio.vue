<template>

 <v-container class=" lighten-5" >
    <v-row no-gutters class="d-flex justify-center">
     
      <Formulario/>

     </v-row >

 </v-container>
  
</template>

<script>
import Formulario from '../components/Formulario.vue'

export default {
  components: {Formulario},
    name:'Inicio',

} 
</script>
