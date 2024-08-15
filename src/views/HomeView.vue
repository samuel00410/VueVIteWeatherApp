<template>
  <main class="container mx-auto text-white">
    <div class="pt-4 mb-8 relative">
      <input v-model="searchQuery" @input="getSearchResults" class="px-1 py-2 w-full bg-transparent border-b focus:outline-none focus:bg-weather-secondary focus:shadow-[0px_1px_0_0_#004E71]" type="text">
      <ul v-if="mapboxSearchResults" class="absolute w-full bg-weather-secondary text-white shadow-md py-2 px-1 top-[66px]"> 
        <li v-for="searchResult in mapboxSearchResults" :key="searchResult.id" class="py-2 cursor-pointer">
          {{ searchResult.place_name }}
        </li>
      </ul> 
    </div>
  </main>
</template>
 

<script setup>
import {ref} from "vue";
import axios from "axios";

const searchQuery = ref("");
const queryTimeout = ref(null);
const mapboxSearchResults = ref(null);

const mapboxAPIKey = import.meta.env.VITE_API_KEY

const getSearchResults = ()=>{
  clearTimeout(queryTimeout);
  queryTimeout.value = setTimeout(async()=>{
    if(searchQuery.value !== ""){
        const result = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}.json?access_token=${mapboxAPIKey}`)
        mapboxSearchResults.value = result.data.features;
        console.log(mapboxSearchResults.value)
        return;
    }
    
    mapboxSearchResults.value = null;
  },300) 
}

</script>