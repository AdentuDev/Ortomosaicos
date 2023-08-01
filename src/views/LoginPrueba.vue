<template>
<div>
<h1> hello</h1>
    <v-text-field  
   v-model="nombre"
          label="Username"
          prepend-icon="mdi-account"
          required
          outlined
      
        >
        </v-text-field> 
        <v-btn @click="ingresar()"> ingresar </v-btn>
        </div>
</template>

<script>
import axios from "axios";

export default {

  data () {
            return {
              nombre:[],
            }
  },

methods:{
            ingresar(){
                console.log("ingresooo¡")
                console.log(this.nombre)

     
          var params = new URLSearchParams();
          
            params.append("username",(this.nombre));
        
           axios.post('http://api-plataforma.adentu.cl/api_ortomosaicos/index.php/registro/create',  params)
              .then((params) =>{
                    console.log("dentro de AXIOSSS ")
                console.log("tokenRegreso00000", params.data) 

                      }) 
            }
     /*    axios.post('http://192.168.100.168/api_api_ortomosaicos/index.php/registro/prueba/', this.nombre)
                 .then((res) => {
                     console.log(res)
                 })
                 .catch((error) => {
                     // error.response.status Check status code
                 }).finally(() => {
                     //Perform action in always
                 });
            } */
},
  mounted () {
    axios.get('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then(response => console.log("mounted", response))
  },
created() {
    axios.get("https://jsonplaceholder.typicode.com/todos/1").then((result) => {
      console.log("created",result.data);
    })
  }
}
</script>

<style>

</style>