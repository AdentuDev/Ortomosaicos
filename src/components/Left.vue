/* <template>
  
    <v-list shaped  style="background-color: #111226">
      
     
    
<img src="https://i.ibb.co/dpwqdwP/logo-Adentu-02.png" to="/"  style="   
    width: 50%;
    margin-top: 30px;
    margin-right: 40px;
    margin-left: 40px;">



      <v-list-item-group
       active-class="border"
        color="white"

      >
  
        <v-list-item
          v-for="(item, i) in items"
          :key="i" 
          @click="ingresar(item)"   
          :class="item.link === $route.path ? 'v-list-item--active' : ''"

       
        >
  
            <v-list-item >
        
              <v-list-item-icon>
                <v-icon v-text="item.icon" style="color: white;"  ></v-icon>
              </v-list-item-icon>
              <v-list-item-content >
                <v-list-item-title v-text="item.text"  style="color: white;"></v-list-item-title>
              </v-list-item-content> 
            </v-list-item>



     
        </v-list-item>

 

      </v-list-item-group>
  

         <v-list-group
          :value=false
          style="color: white"
               no-action
        >
          <template v-slot:activator>
              <v-list-item >
        
              <v-list-item-icon>
                <v-icon  style="color: white;"  >mdi-camera</v-icon>
              </v-list-item-icon>
              <v-list-item-content >
                <v-list-item-title style="color: white;">Imagenes</v-list-item-title>
              </v-list-item-content> 
            </v-list-item>
          </template>
  
 
            <v-list-item
              v-for="(item, i) in imagenes"
              :key="i"
              link
               @click="ingresar(item)"   
              :class="item.link === $route.path ? 'v-list-item--active'  : ''"
       
            >
              <v-list-item-title v-text="item.text" style="color: white !important;"></v-list-item-title>
  
              <v-list-item-icon>
                <v-icon v-text="item.icon"  style="color: white !important;" ></v-icon>
              </v-list-item-icon>
            </v-list-item>
        
  
        </v-list-group>

  
        <v-list-group
            :value=false
            no-action
      
          >
            <template v-slot:activator>
            
        <v-list-item >
        
              <v-list-item-icon>
                <v-icon  style="color: white;"  >mdi-map-marker-radius</v-icon>
              </v-list-item-icon>
              <v-list-item-content >
                <v-list-item-title style="color: white;">Anotaciones</v-list-item-title>
              </v-list-item-content> 
            </v-list-item>


            </template>
  
            <v-list-item
              v-for="(item, i) in anotaciones"
              :key="i"
              link
              @click="ingresar(item)"   
              :class="item.link === $route.path ? 'v-list-item--active' : ''"
              
            >
               <v-list-item-icon>
            <v-icon v-text="item.icon" style="color: white;"  ></v-icon>
            </v-list-item-icon>
  
            <v-list-item-title v-text="item.text"  style="color: white;"></v-list-item-title>

            </v-list-item>
        </v-list-group> 
    </v-list>

      
</template>

<script>
export default {

    data: () => ({
      estado:false,
      
      items: [

        { text: 'Usuarios', icon: 'mdi-account-card-details',link:'/usuario/'  },
        { text: 'Proyectos', icon: 'mdi-folder-multiple',link:'/proyecto/'  },
        { text: 'Áreas', icon: 'mdi-camera',link:'/area/'  },
        { text: 'Capas', icon: 'mdi-account-multiple',link:'/capa/'   }, 
        { text: 'Polígonos', icon: 'mdi-flag',link:'/poligono/'  },
 
      ],

      imagenes: [
            { text: 'Crear', icon: 'mdi-camera',link:'/marcador/'  },
            { text: 'Eliminar', icon: 'mdi-camera-off',link:'/eliminarimagen/'  },
      ],
      anotaciones: [
            { text: 'Crear', icon:'mdi-map-marker-radius',link:'/anotaciones/'   },
            { text: 'Eliminar', icon: 'mdi-map-marker-off',link:'/eliminaranotacion/'  },
      ],
    }),

    methods:{
      ingresar(item){ 
  
        const self = this;
    
       self.$router.path = item.link 
        self.$router.push(item.link)

 
         console.log('this.estado: ', this.estado)
         this.estado=false 

         if (link == "/eliminarimagen/" ){
            this.estado=true
            console.log("adentro",this.estado)
             // ()=>$router.push(item.link)
            self.$router.path = link 
            self.$router.push(link)

          }else{
            this.estado=false
          } 

      
      },

           ingresarDos(item){ 
          console.log("doooos",this.estado)
          const link= item.link
          const self = this;
          this.estado=false

          if (link == "/eliminarimagen/" ){
    
            this.estado=true
            console.log("adentro",this.estado)
             // ()=>$router.push(item.link)
          self.$router.path = link 
            self.$router.push(link)
          }else{
            this.estado=false
          }
         
        

      //  console.log(self.$route.path )
      }
     
    }
  }
</script>

<style>

</style> 