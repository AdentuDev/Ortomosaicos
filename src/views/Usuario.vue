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
        <h1>Usuarios</h1>                    
      </v-col>
      <br>
      <FormularioUsuarios/>
      </v-flex>
    </v-layout>  
  </div> 
</template>

<script>
import FormularioUsuarios from '../components/Usuario/FormularioUsuarios.vue'
import Left from '../components/Left.vue'

export default {
  components: {
    Left,
    FormularioUsuarios
  }
};
</script>

<style>

</style>