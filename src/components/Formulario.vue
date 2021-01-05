<template>

 <v-container class=" lighten-5" >
    <v-row no-gutters class="d-flex justify-center">
       
        <v-col
        cols="24"
        sm="6"
        md="8"
      >
   
       <form  >
  <div > 

</div>

        <v-select
       
          :items="area"
          item-text="desc"
          item-value="id"
          v-model="informacion.area"
          label="Área"
          prepend-icon="mdi-map"
          required
          outlined
         @change="onChange($event)"
        ></v-select> 

       <div v-show="informacion.area" style="display: flex; ">
             <v-select
                  :items="opcion"
                  item-text="desc"
                  item-value="id"
                  v-model="informacion.opcion"
                  label="Opcion"
                  prepend-icon="mdi-library-books"       
                  required
                  outlined
       >
       
      </v-select> 
  <Modal :texto="informacion" @escuchar="variableHijo" />

     
</div>

       <v-select
          :items="fecha"
          item-text="desc"
          item-value="id"
          v-model="informacion.fecha"
          label="Fecha"
          prepend-icon="mdi-calendar"       
          required
          outlined>
      </v-select> 
  
      <v-select
          :items="tipo"
          v-model="informacion.tipo"
          label="Icono"
          prepend-icon="mdi-map-marker"       
          required
          outlined>
      
      </v-select>
 <div v-show="informacion.fecha" >  
    <div v-show="informacion.tipo" > 
        <div v-show="informacion.opcion" > 
          <DropeZone :texto="informacion" />
   </div> 
    </div> 
     </div> 
 
        </form>
      </v-col>

   </v-row >

 </v-container>

  
</template>

<script>
import {mapActions, mapMutations} from 'vuex'
import {mapState} from 'vuex'
import DropeZone from './DropeZone.vue'
import axios from "axios";
import Modal from './Modal.vue';
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let pr_id = urlParams.get('pr_id')

export default {
  
  components: {DropeZone, Modal},
    name:'Inicio',
 
    data(){
        return{
            informacion:{        
                    tipo:"",
                    opcion:null,
                    fecha:"" ,
                    area:"",
                    selected:"",
                    id:pr_id,
                    opcionDos:""
            },
            fecha:[],
            area:[],
            id:[],
            opcion:[],
            filtrado:[],
            almacenamiento:[],
            tipo:["Vuelo","Anotacion","Panoramica"]
              
        } 

    },
    methods:{

        onChange(event){
            this.informacion.opcion = null
            //get opciones 
            axios.get('http://adentu.cl/Ortomosaicos/index.php/Front/getOptions/'+event)
                  
            .then(response => {
                    
            const opciones =response.data
            console.log(opciones)
            this.opcion = []
            opciones.forEach(element => this.opcion.push({"id" : element.op_id, "desc":element.op_rel+" / "+element.op_desc}))
                
          }) 
     
        },

        variableHijo(value){
            console.log("dataaa",value.data)
            this.opcion.push({"id" :value.data.op_id, "desc":value.data.op_rel+" / "+value.data.op_desc})
            this.informacion.opcion={"id":value.data.op_id, "desc":value.data.op_rel+" / "+value.data.op_desc}

          },
   
    },
   
    
    mounted() {
   
      //get Fechas 
        axios.get('http://adentu.cl/Ortomosaicos/index.php/Front/getFechas/'+pr_id)
        .then((response) => {
             const prueba2 =response.data
              prueba2.forEach(element => this.fecha.push({"id" : element.fc_id, "desc":element.fc_desc}),
                
     );
       
    })

      // get área
        axios.get('http://adentu.cl/Ortomosaicos/index.php/Front/getAreas/'+pr_id)
        .then(response => {
          const prueba =response.data
            prueba.forEach(element => this.area.push({"id" : element.ar_id, "desc":element.ar_desc}))
      })

     }

    
    }

</script>

<style>

</style>