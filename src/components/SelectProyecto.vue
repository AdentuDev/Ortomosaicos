 <template>
  <div>laksdmklsadmlksada 
      
       <v-col cols="6">
        <v-select
          item-text="pr_desc"
          item-value="pr_id"
          v-model="select"
          :items="$store.state.proyectos"
          menu-props="auto"
          label="Select"
          hide-details
          prepend-icon="mdi-map"
          single-line
          @change="id_seleccion($event) "
        ></v-select>
      </v-col>
      <formulario v-bind:select="select" ref="formulario_"/>
      </div>
</template>

<script>
import store from '../store/index'
import Formulario from './Formulario.vue'

export default {
  components: { Formulario },
    data(){
        return{
             select:null
         
          
        }
    },
methods:{
    id_seleccion(event){

         let self_test = this
     
        self_test.select=event
         console.log("yeayeyea")
            console.log(self_test.select)
        self_test.$refs.formulario_.seleccion(self_test.select)
    }

}
}
</script>

<style>

</style> 