<template >
<div id="login">
 <v-container class=" lighten-5"   >
 <!--  <h1> {{$store.state.token}} </h1> -->
    <v-row no-gutters class="d-flex justify-center"  >
      
        <v-col
        cols="24"
        sm="6"
        md="8"
        style=" margin-top: 0px;   display: flex;
    flex-direction: column;
        align-items: center;
        " 
      > 
   <img src="https://i.ibb.co/8g00rsr/logo-xs-nb.png" style=" width: 70%; margin-bottom: 70px;"> 
       <form style=" 
          margin-top: 2px;
          width: 402px;
          background-color: white;
          border-top-width: 10px;
          padding-top: 20px;
          padding-bottom: 20px;
          padding-right: 10px;
          padding-left: 10px;
          border-radius: 4%;"
     >

   <v-text-field  
   v-model="datos.username"
          label="Username"
          prepend-icon="mdi-account"
          required
          outlined
      
        >
        </v-text-field> 

        <v-text-field  
          label="Password"
          prepend-icon="mdi-lock"
          required
          outlined
       v-model="datos.password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show1 ? 'text' : 'password'"
           
            @click:append="show1 = !show1"
        >
        </v-text-field > 
    <div v-show="datos.usuario" > 

        <v-alert
      outlined
      type="warning"
      prominent
      border="left"
    >
      Usuario o contraseña <strong>no</strong> valida, vuelva a intentar.
    </v-alert>
      </div>

    <v-btn block 
    color=#45b9d5
   @click="click()" >
  Login
  </v-btn>
    
 
        </form>
    
      </v-col>

   </v-row >

 </v-container>
</div>
</template>


<script>
import axios from "axios";
import store from '../store/index'

  export default {
          data () {
            return {
              
            datos:{
                password: '',
                username:'',
                token:["hollaaaaa"],
                usuario:false,
        
              },
              show1: false,       
              rules: {
                required: value => !!value || 'Required.',
                min: v => v.length >= 4 || 'Min 8 characters',
              
              },
            }
          },

          methods: {
            click() {
              // Original axios code (API call) - Comment out the entire block
              
              var params = new URLSearchParams();
              params.append("user", this.datos.username);
              params.append("password", this.datos.password);
              axios.post(store.state.url_api + 'login/login', params)
                .then((params) => {
                  console.log("paramsss", params);
                  this.datos.token = params.data;

                  if (params.data.token !== "") {
                    store.commit('cambioToken', params.data.token);
                    store.commit('ingresoProyectos', params.data.proyectos);
                    store.commit('usuario', params.data.user_name);
                    this.$router.push('/poligono');
                    enviar();
                  } else {
                    console.log("usuario no registrado");
                    this.datos.usuario = true;
                  }
                })
                .catch((error) => {
                  console.error("API error:", error);
                });
              

              // Mock response for testing purposes
              const mockResponse = {
                data: {
                  token: 'mocked_token',
                  proyectos: [/* Mocked projects array */],
                  user_name: 'mocked_username',
                },
              };

              // Simulate the response as if it came from the API
              this.datos.token = mockResponse.data.token;
              store.commit('cambioToken', mockResponse.data.token);
              store.commit('ingresoProyectos', mockResponse.data.proyectos);
              store.commit('usuario', mockResponse.data.user_name);
              this.$router.push('/poligono');
              enviar();

              function enviar() {
                var tokenRegreso = new URLSearchParams();
                tokenRegreso.append("token", JSON.stringify(self_test.datos.token));
                axios.post('http://127.0.0.1/api_api_ortomosaicos/index.php/registro/getToken/', tokenRegreso)
                  .then((tokenRegreso) => {
                    console.log("regresooooo", tokenRegreso.data);
                  })
                  .catch((error) => {
                    console.error("API error:", error);
                  });
              }
            },
          },
   
    }
      


</script>

<style>

#login{
background-image: url("https://i.ibb.co/CvrNtMP/122086872-hora-azul-cerdena-cielo-expresivo-vista-al-mar.png")  ;
background-position: center center;
background-repeat: no-repeat;
background-attachment: fixed;
background-size: cover;
height: 100%;
}
</style>