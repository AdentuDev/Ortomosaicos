<template>

 <v-container class=" lighten-5" >
    <v-row no-gutters class="d-flex justify-center">
       
        <v-col
        cols="24"
        sm="6"
        md="8"
      >
        <form @submit.prevent="agregarTarea(datos)"  method="post">
          
    <v-text-field
      v-model="datos.nombre"
      :counter="10"
      type="text" 
      label="Area"
      required
    ></v-text-field>
    <v-text-field
      v-model="datos.opcion"
      :counter="10"
      type="text" 
      label="Opcion"
      required
    ></v-text-field>
     <v-text-field
      v-model="datos.fecha"
      :counter="10"
      type="text" 
      label="dd-mm-aa"
      required
    ></v-text-field>

        <v-btn block
               type="submit"
               depressed
               color= "success"
         >
             Agregar
         </v-btn>

    <DropeZone/>
        </form>
      </v-col>
<footer/>
   </v-row >
  
 </v-container>
  
</template>

<script>
import {mapActions, mapMutations} from 'vuex'
import Toolbar from '../components/Toolbar.vue'
import {mapState} from 'vuex'

import {storage} from '../firebase'
import About from './About.vue'
import DropeZone from '../components/DropeZone'
import Footer from '../components/Footer.vue'

const ref=storage.ref()

export default {
  components: {Toolbar, About,DropeZone, Footer},
    name:'Inicio',
    data(){
        return{
            datos:{
                nombre:"",
                opcion:"",
                fecha:"",
                ruta:"el link ??"
            },
         
            imagen:null,
        }

    },
    created(){
    this.getTareas()
    },
    computed:{
    ...mapState(['informacion','items','opcion','icono'])
    },
    methods:{
        ...mapActions(['getTareas']),
         ...mapActions(['agregarTarea']),
        ...mapMutations(['cambiarRuta']),

       /*  clickImagen(e){
             this.imagen=e.target.files[0]
             console.log(this.imagen)
         },

         subirImagen(){
            const refImg=ref.child('imagenes/'+this.imagen.name) 
            const metadata={contentType:'img/jpeg'}
            refImg.put(this.imagen, metadata)
            console.log("la imgeeenenenene" ,this.imagen.name)
                       refImg.getDownloadURL()
                        .then(downloadURL => {
                         downloadURL
         
                        });


         },*/
         
                    
         
      

         },


    
}
    
</script>

<style>

</style>