<template>
   <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="320"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
         class="mx-2"
      fab
      dark
      color="primary"  
      v-bind="attrs"
      v-on="on"
      style="    left: 12px;"
        >
        <v-icon dark>
        mdi-plus
      </v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Ingresar nueva Fecha</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="7"
              >
                <v-text-field
                  label="Fecha"
                  required
                 v-model="datos.nuevaFecha"
                ></v-text-field>
              </v-col>
             
           
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
           color="red darken-1" 
            style="color:white;"
             flat
            @click="dialog = false"
          >
            Salir
          </v-btn>
          <v-btn
            flat
            @click="guardarFecha()"
            color="green darken-1" 
            style="color:white;" 
          >
            Guardar fecha
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import axios from "axios";
import store from '../../store/index'


export default {
     props:{proyecto :String,},

    data(){
        return{
            dialog:false,
         
            datos:{
                dialog: false,
                nuevaFecha:"",
                idProyecto:false
            }
        }
    },

    methods:{

    guardarFecha(proyecto){
  
    let self_test = this
    self_test.dialog = false
    self_test.datos.idProyecto=this.proyecto.seleccion_id


var fecha={fc_desc:self_test.datos.nuevaFecha ,fc_pr_id:self_test.datos.idProyecto}

    var params = new URLSearchParams();
      params.append("fecha",JSON.stringify(fecha));

             axios.post(store.state.url_api+'Mantenedores/setFecha', params,{

            headers: {
              Authorization:store.state.token,
            }

            })
            .then((fecha_result) =>{
              
                console.log(fecha_result)
                  this.$emit('escuchar', fecha_result)
            })






            self_test.datos.nuevaFecha=""
},
    }
}
</script>

<style>

</style>