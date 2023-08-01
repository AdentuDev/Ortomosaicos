import Vue from 'vue'
import Vuex from 'vuex'
import swal from 'sweetalert';

Vue.use(Vuex)

export default new Vuex.Store({
  data :{
    token:["holaaaa"],
  },
  state: {
    token:false,
    proyectos:null,
    usuario:null,
    eleccionProyecto:"null",
    url_api:"http://api_plataforma.adentu.tech/index.php/"
  },

  mutations: {
  cambioToken(state,payload){
    state.token=payload
   // state.token=payload.proyectos
  },
  ingresoProyectos(state,payload){
    state.proyectos=payload
   // state.token=payload.proyectos
  },
  eleccionProyecto(state,payload){
    state.eleccionProyecto=payload
   // state.token=payload.proyectos
  },

  }
})
