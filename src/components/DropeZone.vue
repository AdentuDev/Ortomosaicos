<template>
  <div id="app">
  
   
      <vue-dropzone id="imgDropzone" ref="imgDropzone" :options="dropzoneOptions" @vdropzone-sending="sendingAdd" @vdropzone-success="completeResponse"   ></vue-dropzone> 

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
 
 props:{texto:String,
 
 },
  components: {
    vueDropzone: vue2Dropzone
  },

  data() {
    return {
     palabra:"",
      images: [],
      dropzoneOptions: {
        url: "http://adentu.cl/Ortomosaicos/index.php/login/test_img",
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
       
    formDat.append('area',this.texto.area)
    formDat.append('fecha',this.texto.fecha)
    formDat.append('opcion',this.texto.opcion)
    formDat.append('tipo',this.texto.tipo)
         

      console.log("tipooooo",this.texto.tipo)
      console.log("opcion",this.texto.opcion)
      console.log("fecha",this.texto.fecha)
      console.log("area",this.texto.area)


    },

    async completeResponse(file, response) {
          console.log("response",response)


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
