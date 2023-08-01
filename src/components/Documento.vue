<template>
  <div> wola carga
      
 <!--       <v-file-input
    type="file"
    label="File input"
    v-model="datos.documento"
     @change="onFileChange"
  ></v-file-input>  -->
 <form enctype="multipart/form-data">
        <input type="file" @change="onFileChange"  >
    </form>


      <button @click="click()">clickk </button>
       </div>
</template>

<script>
export default {
 data(){
        return{
            datos:{
                documento:[],
                informacion:[],
                info1:[]
            }       
        }
    },
    methods:{
        click(){
          let self_test = this
            console.log("aksjdnaskj")
            console.log(this.datos.documento)
        },
          onFileChange(e) {
                  console.log("e",e)
                  const info=this.datos.documento
                var files = e.target.files || e.dataTransfer.files;
                if (!files.length)
                    return;
                this.createInput(files[0]);
            },
            createInput(file) {
                      let self_test = this
                var reader = new FileReader();
                var vm = this;
                reader.onload = (e) => {

                vm.fileinput = reader.result;
                }
                reader.readAsText(file);
         
         const archivo =this.fileinput
                console.log("el archivo",archivo);

                const pos_1 = archivo.search("Latitude")

                console.log(pos_1)

              var data_split = archivo.split(/[\s,;]+/);

             
              this.datos.info1=data_split
 
    
         console.log( "nuevo split",  this.datos.info1)
    var pos =0;
    
  data_split.forEach(function(element){
   if((element)){

            switch(pos){
              case 0:
               console.log("1",element)
                self_test.datos.info1.push(element)
                break;
                case 1:
              console.log("2",element)
                break;
                case 2:
                console.log("3",element)
                break;
            
            }

            

        
        }
     
  })
 console.log( self_test.datos.info1)

    /* 
            data_split.forEach(function(element){
                    console.log("0",element)
               self_test.datos.informacion=[]
               self_test.datos.informacion.push(element)
 '
       
            
              }) */
            
   

        /*    this.datos.info1.forEach(function(element){
               
         const nuevaInfo=  self_test.datos.informacion.unshift(element)
          
        console.log(self_test.datos.informacion)
        
            
              })


   
 
            console.log("info final ?",self_test.datos.informacion)

            console.log("recorre fuera",element[0]) */
            }
           
    }
}
</script>

<style>

</style>