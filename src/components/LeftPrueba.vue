<template>
    <v-card
      class="mx-auto"
      width="300"
    >
      <v-list>
        <v-list-item
         @click="ingresar('/poligono/')"   
    
        >
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
  
          <v-list-item-title>Poligono</v-list-item-title>
        </v-list-item>
      
            <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
  
          <v-list-item-title>Proyecto</v-list-item-title>
        </v-list-item>
        
        <v-list-group
          :value="false"
          prepend-icon="mdi-account-circle"
        >
          <template v-slot:activator>
            <v-list-item-title>Imagenes</v-list-item-title>
          </template>
  
 
            <v-list-item
              v-for="(item, i) in imagenes"
              :key="i"
              link
               @click="ingresar(item)"   
              :class="item.link === $route.path ? 'v-list-item--active' : ''"
             
            >
              <v-list-item-title v-text="item.title"></v-list-item-title>
  
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>
            </v-list-item>
        
  
        </v-list-group>
        
        
          <v-list-group
          :value="false"
          prepend-icon="mdi-account-circle"
        >
          <template v-slot:activator>
            <v-list-item-title>Anotaciones</v-list-item-title>
          </template>
  
 
            <v-list-item
               v-for="(item, i) in imagenes"
              :key="i"
              link
               @click="ingresar(item)"   
              :class="item.link === $route.path ? 'v-list-item--active' : ''"
             
            >
              <v-list-item-title v-text="item.title"></v-list-item-title>
  
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>
            </v-list-item>
        
  
        </v-list-group>
        
        
         <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
  
          <v-list-item-title>Poligono</v-list-item-title>
        </v-list-item>
        
        
      </v-list>
    </v-card>
</template>

<script>
export default {
  data: () => ({
imagenes: [
    
        {title:'Crearrr', icon:'mdi-account-multiple-outline',link:'/eliminarimagen/' },
        {title:'Eliminar',icon:'mdi-delete'}
   
   
    ],
  anotaciones: [
        {title:'Crear', icon:'mdi-account-multiple-outline'},
        {title:'Eliminar',icon:'mdi-delete'}
    ],
    cruds: [
      ['Create', 'mdi-plus-outline'],
      ['Read', 'mdi-file-outline'],
      ['Update', 'mdi-update'],
      ['Delete', 'mdi-delete'],
    ],
  }),

      methods:{
      ingresar(item){  
        console.log("itemm",item)
       const self = this;
       // ()=>$router.push(item.link)
       self.$router.path = item.link 
        self.$router.push(item.link)
        console.log("clickeoo",item.link) 

        console.log(self.$route.path )
      }
     
    }
}
</script>

<style>

</style>