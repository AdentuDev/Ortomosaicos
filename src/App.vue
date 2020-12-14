<template>
<v-app>
<div id="app"> 
  <toolbar/>
 
  <formulario/>
  <router-link to="/">

    </router-link >


  <router-view/>

 </div>
</v-app>
</template>

<script>
import Footer from './components/Footer.vue'

import Toolbar from './components/Toolbar.vue'

export default {
  components:{Toolbar, Footer}
}
</script>
   
,
    Formulario