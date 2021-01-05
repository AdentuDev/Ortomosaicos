<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
       
    >
      <template v-slot:activator="{ on, attrs }">
        
        <v-btn
      class="mx-2"
      fab
      dark
      color="indigo"
         v-bind="attrs"
          v-on="on"
    >
      <v-icon dark>
        mdi-plus
      </v-icon>
    </v-btn>

      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Nueva opción</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>

              <v-col
                cols="12"
                sm="6"
              >
                <v-select
                  :items="relacion"
                  v-model="informacion.relacion"
                  label="Relación"
                  required
                ></v-select>
              </v-col>
                 <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                v-model="informacion.descripcion"
                  label="Descripción"
                  persistent-hint
                  required
                ></v-text-field>
              </v-col>
  

            <!--   select con iconos -->
             <v-col
              cols="12"
              class="py-2"
            >
                  <p>Selecione un Icono</p>

                  <v-btn-toggle
                    v-model="informacion.icono"
                    tile
                    color="#45b9d5"
                    group
                  >
                    <v-btn value="fa fa-camera">
                      Camera
                    <v-icon>mdi-camera</v-icon>
                    </v-btn>

                    <v-btn value="fa fa-vector-square">
                      Vector-square
                    <v-icon>mdi-vector-square</v-icon>
                    </v-btn>
                    

                  </v-btn-toggle>
            </v-col>
      <!-- color     -->
      <v-col
        class="d-flex justify-center"
      >
        <v-color-picker v-model="color"></v-color-picker>
      </v-col>
    
            </v-row>
          </v-container>
          <small>Guardar nuevos datos, antes de salir</small>

        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
        
          <v-btn
          
            text
            v-on:click="dialog = false"
            depressed
      color="error"
          >
            Salir
          </v-btn>
             <div v-show="informacion.icono" > 
               <div v-show="informacion.descripcion" > 
                 <div v-show="informacion.relacion" > 
                   <v-btn @click="click"  color="success" > Guardar datos</v-btn>
                 </div>
                </div>
              </div>

        </v-card-actions>
          <p>
  
  </p>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
//const axios = require('axios');
const axios = require('axios').default;
import Swal from 'sweetalert2'

export default {
   props:{texto:String,
 
 },
  data(){
    return{
   
      informacion:{
      relacion:"",
      descripcion:"",
      icono:"",
      area:"",
     
      
      },
        relacion:["Poligono","Marcador"],
       dialog: false,
         types: ['hex', 'hexa', 'rgba', 'hsla', 'hsva'],
      type: 'hex',
      hex: '#3CA244',
      hexa: '#FF00FFFF',
      rgba: { r: 255, g: 0, b: 255, a: 1 },
      hsla: { h: 300, s: 1, l: 0.5, a: 1 },
      hsva: { h: 300, s: 1, v: 1, a: 1 },
      toggle_exclusive: undefined,
      icono:""
     
    }
   
    
  },created() {
 
},
    methods:{
   
  
      salir:function(){
        console.log("asd")
           axios.get('http://adentu.cl/Ortomosaicos/index.php/Front/getOptions/')
       .then(response => {
        const opciones =response.data
console.log(opciones)

       

      }) 

 
 
      },
        click(texto){
     this.informacion.area=this.texto["area"]
       console.log("this.texto",this.informacion.area)
      // console.log("id", this.informacion.area)
          console.log("relación",this.informacion.relacion)
          console.log("descripcion",this.informacion.descripcion)
          console.log("color",this.color)
          console.log("icono", this.informacion.icono)


 swal({
              position:'top-end',
              icon: 'success',
              title: 'Datos guardados',
              timer: 3000
            })

var params = new URLSearchParams();
params.append( "op_ar_id", this.informacion.area);
params.append('op_relacion',this.informacion.relacion);
params.append('op_descripcion',this.informacion.descripcion);
params.append('op_color',this.color);
params.append('icono', this.informacion.icono);


axios.post('http://adentu.cl/Ortomosaicos/index.php/Front/appedOpcion', params).then((params) =>{
  console.log("params",params)
  
this.$emit('escuchar', params)
})
 
        }
           
    },
     computed: {
      color: {
        get () {
          return this[this.type]
        },
        set (v) {
          this[this.type] = v
        },
      },
      
      showColor () {
        if (typeof this.color === 'string') return this.color

        return JSON.stringify(Object.keys(this.color).reduce((color, key) => {
          color[key] = Number(this.color[key].toFixed(2))
          return color
        }, {}), null, 2)
      },
     }
}

</script>
