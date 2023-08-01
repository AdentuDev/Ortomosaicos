<template>
<v-app>
  <div id="app" style="height:100%"  > 
 
       <div v-show="$store.state.token">
         <!--  <v-flex  xs2 style="background-color : green">
                <left/>
              <h3 style="color:white">hola ?{{$store.state.token}}</h3> 
            </v-flex> -->
      </div> 

        <router-link to="/">
          </router-link >
           
        <router-view />
        

  </div>
</v-app>
</template>

<script>

import Left from './components/Left.vue'
import store from '../src/store/index'


export default {
  components:{ Left},
   data () {
      return {
        
        data:{
 token:[],

        }
      }
   }


}
</script>
   
<style>
#id{
     height:100%;
}
</style>