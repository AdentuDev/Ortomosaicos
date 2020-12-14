import Vue from 'vue'
import Vuex from 'vuex'
import {db} from '../firebase'
import swal from 'sweetalert';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    items:['Area1', 'Area25', 'Area78', 'Area53'],
    opcion:['op1', 'op2', 'op3', 'op3'],
    icono:['activo', 'inactivo'],
    listaInformacion:[],
    
     
      url:"???",
    
    
  },

  mutations: {
    set(state,payload){
      state.listaInformacion.push(payload)
    },
    cambiarRuta(state){
      state.informacion.ruta="esta es  la nueva "
      console.log("ingresoooooooooooooooo" ,state.informacion.ruta)
     
  }
  
  },
  actions: {
    traerLink({commit},data){
console.log("llego aquiajdsaiuj")
    },
  agregarTarea({commit}, data ){
        console.log("ingeresoou")
        console.log("//area:",data.nombre , "//fecha:",data.fecha , "//opcion:",data.opcion)
      db.collection('tareas').add({
          Area: data.nombre,
          Fecha:data.fecha,
          Opcion:data.opcion,
          
      })
      swal({
        title: "Datos cargados!",
        text: "Exitosamente",
        icon: "success",
       
      })
      

      .then(doc => {
      
          console.log("limpiar")
          data.nombre=""
          data.fecha=""
          data.opcion=""
         // router.push({name: 'Inicio'})
      })
     
   
  }, 
  //lee proyectos en consola
      getTareas({commit}){
      db.collection('tareas').get()
  .then(res=>{
    res.forEach(doc=>{
      console.log(doc.id)
      console.log(doc.data())
             })
          })
      }
  },
 

modules:{},
 

})
