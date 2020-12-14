<template>
  <div id="app">
    <vue-dropzone id="imgDropzone" ref="imgDropzone" :options="dropzoneOptions" @vdropzone-sending="sendingAdd" @vdropzone-success="completeResponse"   ></vue-dropzone>

    <div v-if="images.length >0">
      <div v-for="image in images" :key="image.src">
        <img :src="image.src">
  
      </div>
    </div>
  </div>
</template>

<script>

import {mapMutations,mapActions} from 'vuex'
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
let uuid = require("uuid");


export default {
  name: "DropeZone",
  components: {
    vueDropzone: vue2Dropzone
  },
  data() {
    return {
      link:"",
      images: [],
      dropzoneOptions: {
        url: "https://adentu.cl",
        thumbnailWidth: 150,
        thumbnailHeight: 150,
        addRemoveLinks: false,
        acceptedFiles: ".jpg, .jpeg, .png"
      }
    }
  },
  methods: {
   
 ...mapActions(['traerLink']),
      ...mapMutations(['cambiarRuta']),
   
 
    async sendingAdd(file, xhr, formDat) {
      
formDat.append('{name : area, value : datatdat }')

    },

    async completeResponse(file, response) {
          console.log(response)


    }
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
</style>
