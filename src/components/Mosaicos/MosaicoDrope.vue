<template>
  <div id="app">

     <v-alert
      icon="mdi-cloud-check"
      dense
      text
      type="success"
      v-show="contador"
      prominent
    >
     <h2> {{this.final + "/" +this.inicial }}<h5 v-show="mensaje"> Carga completa! </h5>    <v-progress-linear
      v-show="progreso"
      indeterminate
      color="green"
    ></v-progress-linear>  </h2> 
  
 
    
    </v-alert>
      <vue-dropzone id="imgDropzone" ref="imgDropzone" :options="dropzoneOptions" @vdropzone-sending="sendingAdd" @vdropzone-success="completeResponse"  data-dz-uploadprogress ></vue-dropzone> 

    <div v-if="images.length >0" style="border=1px solid red">
      <div v-for="image in images" :key="image.src" >
        <img :src="image.src">
 
      </div>

    </div>
  </div>
</template>



<script>

import {mapMutations,mapActions} from 'vuex'
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import Vue from 'vue';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
Vue.use(VueSweetalert2);
let uuid = require("uuid");


export default {
  name: "DropeZone",
  props:{texto:String,},
  components: {
    vueDropzone: vue2Dropzone
  },

  data() {
    return {
      progreso:true,
      mensaje:false,
      contador:false,
      inicial:0,
      final:0,
     palabra:"",
      images: [],
      fullPath:[],
      dropzoneOptions: {
        url: "http://api-plataforma.adentu.cl/index.php/Mantenedores/uploadMosaico",
        thumbnailWidth: 150,
        thumbnailHeight: 150,
        addRemoveLinks: false,
        acceptedFiles: ".jpg, .jpeg, .png",
        desactivar:false
       
      }
    }
  },
  actions:{  
      
      },
  methods: {
  
    async sendingAdd(file, xhr, formDat,texto) {
      this.contador=true
       console.log(" file prueba",file)
      console.log("fileee",file.fullPath)
    

       formDat.append('fullpath',file.fullPath)
      formDat.append('cp_id', this.texto.capa) 
   /*    console.log("inicial",this.inicial) */
   
      this.inicial++
    },

    async completeResponse(file, response) {
  /*         console.log("response",response)
           console.log("file",file)
          console.log("file succ",file.status)
  console.log("fianl",this.final) */
  if(file.status == "success"){
    this.final++
    if(this.final == this.inicial){
      this.mensaje=true
      this.progreso=false
    }else{
      this.mensaje=false
      this.progreso=true
    }
  }

    },
    
    
  },

};

</script>

<style>
  .img-div {
    display: flex;
    margin: 25px;
  }

  img {
    max-width: 250px;
    margin: 15px;
  }
  .dropzone.dz-clickable {
    cursor: pointer;
        border: 2px solid #111226;
}

</style>
