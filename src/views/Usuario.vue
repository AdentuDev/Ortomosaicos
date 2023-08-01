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
        
                    <FormularioUsuarios/>
                    <UsuariosTable :usuarios="usuarios" />
            </v-flex>
     </v-layout>  
</div> 


 
</template>

<script>
import FormularioUsuarios from '../components/Usuario/FormularioUsuarios.vue'
import Left from '../components/Left.vue'
import UsuariosTable from '../components/Usuario/UsuariosTable.vue';

export default {
  components: {
    FormularioUsuarios,
    UsuariosTable,
  },
  data() {
    return {
      usuarios: [
        {id: '17.996.564-k', name: 'Martin Fica', email: 'mfica@adentu.cl'}
      ],
    };
  },
};
</script>

<style>

</style>