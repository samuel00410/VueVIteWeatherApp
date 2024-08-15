<template>
  <main class="container mx-auto text-white">
    <div class="pt-4 mb-8 relative">
      <input v-model="searchQuery" @input="getSearchResults" class="px-1 py-2 w-full bg-transparent border-b focus:outline-none focus:bg-weather-secondary focus:shadow-[0px_1px_0_0_#004E71]" type="text">
        <ul v-if="mapboxSearchResults" class="absolute w-full bg-weather-secondary text-white shadow-md py-2 px-1 top-[66px]"> 
          <p v-if="searchError">
            搜尋出現問題，請稍後再試
          </p>
          <p v-if="!searchError && mapboxSearchResults.length === 0">
            找不到相關地點，請重新輸入
          </p>
          <template v-else>
            <li @click="previewCity(searchResult)" v-for="searchResult in mapboxSearchResults" :key="searchResult.id" class="py-2 cursor-pointer">
              {{ searchResult.place_name }}
            </li>
          </template>
        </ul> 
    </div>
  </main>
</template>
  

<script setup>
import {ref} from "vue";
import axios from "axios";
import {useRouter} from "vue-router";

const router = useRouter();
const searchQuery = ref("");
const queryTimeout = ref(null);
const mapboxSearchResults = ref(null);
const searchError = ref(null);

const mapboxAPIKey = import.meta.env.VITE_API_KEY

const previewCity = (result)=>{
  console.log(result);
  const city = result.place_name.split(",")[1];
  const state = result.place_name.split(",")[0];
  console.log("縣市:",city);
  console.log("地區:",state);
  router.push({
    name:"cityView",
    params:{ state:state.replaceAll(" ",""), city:city.replaceAll(" ","")},
    query:{
      lat:result.geometry.coordinates[0],
      lng:result.geometry.coordinates[1],
      preview: true
    }
  });
}

const getSearchResults = ()=>{
  clearTimeout(queryTimeout);
  queryTimeout.value = setTimeout(async()=>{
    if(searchQuery.value !== ""){
      try{
        const result = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}.json?access_token=${mapboxAPIKey}&types=place`)
        mapboxSearchResults.value = result.data.features;
      }catch(e){
        searchError.value = true;
      }

        return;
    }
    
    mapboxSearchResults.value = null;
  },300) 
}

</script>