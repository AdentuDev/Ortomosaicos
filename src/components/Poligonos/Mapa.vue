<template>
  <div>
   
     <div id="map" style="height: 400px;  
        margin: 0;
        padding: 0;
"></div>
  </div>
</template>

<script>
  export default {
    //   props:{data2:String,},
    data () {
      return {
      color:""
      }
    },
     methods:{
    
initMap(data){
  
  let data_mapa = JSON.parse(JSON.stringify(data))

  var bounds = new google.maps.LatLngBounds();

  const map_obj = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    mapTypeId: "satellite",
    streetViewControl: false,
    mapTypeControl: false,
   scaleControl:false,
    zoomControl:false,
       panControl:false,
      overviewMapControl:true,
  });
  
const poligonos = data_mapa.poligonos
console.log("dataa",data)
this.color=data.color
console.log("cooloorrttt",this.color)

poligonos.forEach(polygon => {
 let self_test = this

//console.log("selfff",self_test.color)

    const polygono = new google.maps.Polygon({
    paths: polygon,
    strokeColor:self_test.color,
    strokeOpacity: 1,
    strokeWeight: 2,
    fillColor:"#FFFFFF",
    fillOpacity: 0.35,
    map: map_obj
  });



    polygon.forEach(point => {
        bounds.extend(new google.maps.LatLng(point))
    });
});   


map_obj.fitBounds(bounds)
console.log("mapp",map_obj)

}}
     }
 

</script>

<style>

</style>