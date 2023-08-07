<template>

 <v-container class=" lighten-5"  >

      <v-row style="justify-content: space-around;">
 
     <v-col
          cols="12"
          sm="5"
        >
  
    </v-col>
          </v-row>

    <v-row no-gutters class="d-flex justify-center" >
       
        <v-col
        cols="24"
        sm="6"
        md="8"
        >
   
       <form  >
    <v-row> 
                                  <v-col
                                      cols="12"
                                      sm="10"
                                    >
                                    
                                         <v-text-field
                                         prepend-icon="mdi-account"
                                            v-model="datos.nombre"
                                            
                                            label="Nombre"
                                            required
                                            outlined
                                        ></v-text-field>

                                    </v-col>

                                  <v-col
                                      cols="12"
                                      sm="10"
                                    >
                                    
                                              <v-text-field  
                                                label="Contraseña"
                                                prepend-icon="mdi-lock"
                                                required
                                                outlined
                                                v-model="datos.contraseña"
                                                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                                
                                                :type="show1 ? 'text' : 'password'"
                                                
                                                @click:append="show1 = !show1"
                                                >
                                                </v-text-field > 

                                    </v-col>

                    <v-col
                      cols="12"
                      sm="10"
                    >
                                    
                    <v-text-field  
                      label="Ingrese nuevamente su contraseña"
                      prepend-icon="mdi-lock"
                      required
                      outlined
                      v-model="datos.contraseña2"
                      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"                          
                      :type="show1 ? 'text' : 'password'"                          
                      @click:append="show1 = !show1"
                    >
                  </v-text-field > 
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                >
                <v-select
                  prepend-icon="mdi-checkbox-multiple-marked-outline"
                  v-model="datos.permiso"
                  :items="permisos"
                  item-text="desc"
                  item-value="id"
                  attach
                  chips
                  label="Permisos"
                  multiple
                  outlined
                ></v-select>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                >
                <v-select
                  prepend-icon="mdi-folder-multiple-outline"
                  v-model="datos.proyecto"
                  :items="$store.state.proyectos"
                  item-text="pr_desc"
                  item-value="id"
                  attach
                  chips
                  label="Proyectos"
                  multiple
                  outlined
                ></v-select>
              </v-col>
            </v-row>                    
          </form>
          <v-col
            cols="12"
            sm="12"
          >
          <v-alert
            v-show="alerta"
            dense
            outlined
            type="error"
          >
            Contraseñas  <strong>no</strong> coinciden ,ingrese nuevamente
          </v-alert> 
 
          <v-alert
            v-show="alerta"
            text
            prominent
            type="error"
            icon="mdi-comment-remove-outline"
          >
            Contraseñas  <strong>no</strong> coinciden ,ingrese nuevamente
          </v-alert>

        </v-col>
        <div>
          <v-dialog
            v-model="dialog"
            persistent max-width="290"
            style="background-color:#111226;">
            <template v-slot:activator="{ on }"  style="background-color:#111226;">
              <v-btn
                style="margin-top: 10px;"
                block
                color="success" 
                :disabled="!datos.permiso" 
                dark v-on="on">Guardar usuario
              </v-btn>
            </template>
            <v-card>
              <v-card-title class="headline">Nuevo Usuario</v-card-title>
              <v-card-text>¿Desea guardar este nuevo Usuario? </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" style="color:white;" flat @click="guardarUsuario()">Guardar</v-btn>
                <v-btn color="red darken-1"  style="color:white;" flat @click="dialog = false">Cancelar</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>         
        </div>
      </v-col>
    </v-row >
  </v-container>
</template>




<script>
import Left from '../Left.vue'
import store from '@/store';
import axios from "axios";
import Usuario from '../../views/Usuario.vue'

export default {
  components: {Left},
  components: { Usuario },

data(){
    return{
datos:{
    nombre:[],
    proyecto:[],
    permiso:false,
    contraseña:null,
    contraseña2:null,
},
alerta:false,
dialog: false,
proyectos:[2,4],
permisos:[],
show1: false,       
rules: {
    required: value => !!value || 'Required.',
    min: v => v.length >= 4 || 'Min 8 characters',
              
    },

    }
},
methods:{
    guardarUsuario(){
          let self_test = this
        console.log(this.datos)
self_test.dialog=false

if(this.datos.contraseña2 === this.datos.contraseña ){
    console.log("yea")
    var usuario={
    usuario: {
        usr_name: this.datos.nombre,
        usr_pass: this.datos.contraseña,
    },
    permisos: this.datos.permiso,
    proyectos:this.datos.proyecto
}


 var params = new URLSearchParams();
      params.append("usuario",JSON.stringify(usuario));
              
      axios.post(store.state.url_api+'Mantenedores/setUsuario', params).then((params) =>{
              console.log("nuevo usuario",params)
  swal({
                  position:'top-end',
                  icon: 'success',
                  title: 'Nuevo usuario guardado',
                  timer: 3000
                })
            
        }) 
        this.alerta=false,
            this.datos.nombre=""
    this.datos.proyecto=""
    this.datos.permiso=""
    this.datos.contraseña=""
    this.datos.contraseña2=""

}else{
    let self_test = this
    this.alerta=true,
    this.datos.contraseña="",
    this.datos.contraseña2=null,
    console.log("nope")
}



    }
},
 mounted() {
   let self_test = this
if(this.datos.contraseña2==123){
    console.log(yea)

}

axios.get(store.state.url_api+'Mantenedores/getPermisos')
.then((response) =>{
  this.permisos=[]
  const listaPermisos=response.data
console.log("permisos",listaPermisos)
 listaPermisos.forEach(element => this.permisos.push({"desc":element.prm_desc, "id":element.prm_id}) );

}
)

 }

}
</script>

<style>

</style>