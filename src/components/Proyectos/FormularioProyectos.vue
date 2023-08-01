<template>
       <div style="height:100%" >
     
        <v-layout style="height:100%"> 

            <v-flex  xs2 style="background-color : #111226">
                  <Left />
            </v-flex>


            <v-flex  xs2 
              style=" margin-left: 20px;
                margin-right: 20px;
                margin-top: 20px;
               "
                
              >
                    
                  <div style="margin-left: 40px;">   

                  
                    <h1>Proyecto</h1>

                  </div>


                   <div v-show="datos.seleccion_id" >  
                      <v-col> 
                      
                          <v-btn 
                           rounded
                               color="  primary"      
                              block
                              @click="crearNuevoProyecto(datos)"
                            >
                              Nuevo Proyecto
                            <v-icon dark>
                                  mdi-plus
                            </v-icon>
                          </v-btn>
                      
                      </v-col>
                   </div>
                   
                  <v-list>
                          <v-list-item-group 
                            v-model="datos.editarCapas"
                            item-text="text"
                            item-value="id"

                            >
                              <v-list-item
                              style="    border: 2px solid #d1e7ea;"
                                v-for="(item, i) in $store.state.proyectos"
                                :key="i"
                                item-text="text"
                                :item-value=item.id
                              >
                        
                                  <v-list-item-content   @click="click_capa(item)">
                                      <v-list-item-title v-text="item.pr_desc"></v-list-item-title>
                                   <!--    <v-list-item-title >{{item.fecha}} - {{item.tipo}}</v-list-item-title> -->
                                  
                                  </v-list-item-content>

                                  <v-list-item-icon>
                                    <v-icon >mdi-wrench</v-icon>
                                  </v-list-item-icon>
                                    
                              </v-list-item>
                          </v-list-item-group>
                   </v-list>

            </v-flex>

    <v-flex xs7 style="margin-left: 20px;">
 <div v-show="mostrar">
      <form  >
           <v-row> 
                                 <v-col
                                      cols="12"
                                      sm="12"
                                    >
                                  
                                    </v-col>

                                     <v-col
                                      cols="12"
                                      sm="10"
                                    >
                                     
                                         <v-text-field
                                         prepend-icon="mdi-file-outline"
                                            v-model="datos.descripcionProyecto"
                                             box  
                                            label="Descripción"
                                            required
                                            outlined
                                        ></v-text-field>

                                    </v-col>


                                       <v-col
                                      cols="12"
                                      sm="5"
                                    >
                                    
                                         <v-text-field
                                            prepend-icon="mdi-tooltip-text"
                                            v-model="datos.titulo1"
                                             
                                            label="Titulo 1"
                                            required
                                            outlined
                                        ></v-text-field>

                                    </v-col>

                                    <v-col
                                      cols="12"
                                      sm="5"
                                    >
                                    
                                         <v-text-field
                                            prepend-icon="mdi-tooltip-text"
                                            v-model="datos.titulo2"
                                           
                                            label="Titulo 2"
                                            required
                                            outlined
                                        ></v-text-field>

                                    </v-col>

                               

                                       <v-col
                                      cols="12"
                                      sm="5"
                                    >
                                    
                                         <v-text-field
                                          prepend-icon="mdi-magnify-minus"
                                            v-model="datos.zoomMin"
                                           
                                            label="Zoom min"
                                            required
                                            outlined
                                        ></v-text-field>

                                    </v-col>

                                    <v-col
                                      cols="12"
                                      sm="5"
                                    >
                                    
                                         <v-text-field
                                              prepend-icon="mdi-magnify-plus"
                                            v-model="datos.zoomMax"
                                            
                                            label="Zoom max"
                                            required
                                              outlined
                                        ></v-text-field>

                                    </v-col>






                                    <v-col
                                      cols="12"
                                      sm="5"
                                    >
                                     <v-select
                                      prepend-icon="mdi-map"
                                        v-model="datos.indexSeleccionado"
                                        :items="index"
                                       
                                        label="Index"
                                        data-vv-name="select"
                                        required
                                          outlined
                                        ></v-select>

                                    </v-col>
                                          <v-col
                                      cols="12"
                                      sm="5"
                                    >
                                     <v-select
                                      prepend-icon="mdi-map"
                                        v-model="datos.sidebarSeleccionado"
                                        :items="sidebar"
                                        
                                        label="Sidebar"
                                        data-vv-name="select"
                                        required
                                          outlined
                                        ></v-select>

                                    </v-col>


     <v-col
                                      cols="12"
                                      sm="10"
                                    >
                                     <v-select
                                      prepend-icon="mdi-vector-line"
                                        v-model="datos.herramienta"
                                        :items="herramientas"
                                        item-text="desc"
                                        item-value="id"
                                        attach
                                        chips
                                        label="herramientas"
                                        multiple
                                        outlined
                                    ></v-select>

                                    </v-col>

     <v-col
                                      cols="12"
                                      sm="10"
                                    >
                                     <v-select
                                      prepend-icon="mdi-account"
                                        v-model="datos.usuariosSeleccionados"
                                        :items="usuarios"
                                        item-text="desc"
                                        item-value="id"
                                        attach
                                        chips
                                        label="Usuarios"
                                        multiple
                                        outlined
                                    ></v-select>

                                    </v-col>

                                    <v-btn
                                      
                                      style="margin-top: 10px;"
                                      block
                                      color="success" 
                                      @click=" guardarProyecto()"
                                    >
                                     Guardar Proyecto
                                    </v-btn>
                     
             </v-row>  

      </form  >
 </div>
    </v-flex>
  </v-layout>  
 </div> 
</template>

<script>

import Left from '../Left.vue'
import axios from "axios";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let pr_id = urlParams.get('pr_id')
import store from '../../store/index'
export default {
  components: {Left}
   ,

  name:'Inicio',

 data(){
    return{
      datos:{
          
       
         seleccion_id:store.state.eleccionProyecto, 
         usuariosSeleccionados:[],
         diseñoSeleccionado:[],
         titulo1:[],
        titulo2:[],
        descripcion:[],
        zoomMin:[],
        zoomMax:[],
        sidebarSeleccionado:[],
        indexSeleccionado:[],
        descripcionProyecto:null,
         seleccion_id:store.state.eleccionProyecto,
         herramienta:[],
         
      },

      
        capas_proyectos:[{text:"proyecto 1"}, {text:"proyecto2"}],
        usuarios:[],
        index:[],
        sidebar:[],
        dialog: false,
        mostrar:false,
        herramientas:[]
    }
 },
   methods:{ 
     guardarProyecto(){
 console.log("guardar")
      let self_test = this
 console.log("datos guardas",this.datos)

      var proyecto={
                  proyecto:{
                        desc: this.datos.descripcionProyecto,
                        titulo_1:this.datos.titulo1 ,
                        titulo_2:this.datos.titulo2 ,
                        min_zoom:this.datos.zoomMin ,
                        max_zoom:this.datos.zoomMax,

                  },
         
                  diseno: {
                        ds_sidebar_r: this.datos.sidebarSeleccionado,
                        ds_index: this.datos.indexSeleccionado
                  },
                  usuarios: this.datos.usuariosSeleccionados,
                  herramientas:this.datos.herramienta
                  
        }
console.log("proyecto enviado ",proyecto)
      var params = new URLSearchParams();
      params.append("proyecto",JSON.stringify(proyecto));
              
      axios.post(store.state.url_api+'Mantenedores/setProyecto', params).then((params) =>{
              console.log("nuevo proyecto",params)
     swal({
                  position:'top-end',
                  icon: 'success',
                  title: 'Proyecto Guardado',
                  timer: 3000
                })
           
        })  
/* 
      this.datos.descripcionProyecto="",
         this.datos.titulo1="",
       this.datos.titulo2="",
         this.datos.usuariosSeleccionados="",
         this.datos.zoomMin="",
        this.datos.zoomMax="",
        this.datos.sidebarSeleccionado="",
        this.datos.indexSeleccionado="" */
     },
crearNuevoProyecto(){
  let self_test = this
  this.mostrar=true
  console.log("id",this.datos.seleccion_id)
  //get diseño
            axios.get(store.state.url_api+'Mantenedores/getDisenos')
            .then((response) => 
          {
              this.diseño=[]
                const listaIndex =response.data.index
                  const listaSidebar =response.data.sidebar
                console.log("diseños",listaIndex)
                 listaIndex.forEach(element => this.index.push(element) );
      listaSidebar.forEach(element=>this.sidebar.push(element) )
        }),

axios.get(' http://api-plataforma.adentu.cl/index.php/Mantenedores/getUsuarios')
.then((response) =>{
  this.usuarios=[]
  const listaUsuarios=response.data
console.log("usuarios",listaUsuarios)
 listaUsuarios.forEach(element => this.usuarios.push({"desc":element.usr_name, "id":element.usr_id}) );

}
)

axios.get(store.state.url_api+'mantenedores/getHerramientas')
.then((response) =>{
  this.herramientas=[]
  const listaHerramientas=response.data
console.log("herramientas",listaHerramientas)
 listaHerramientas.forEach(element => this.herramientas.push({"desc":element.her_desc, "id":element.her_id}) );

}
)


       

},





      variableHijo(value){
        this.datos.fecha=[]    
       console.log("regresi  fecha",value)
         this.fechas.push({"id" :value.data.fc_id, "desc":value.data.fc_desc })
          this.datos.fecha=(value.data.fc_id)
          },


    



     },

} 


</script>
