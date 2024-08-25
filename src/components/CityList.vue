<!-- 檢視所有本地儲存的城市  -->
<template>
  <div v-for="city in savedCities" :key="city.id">
    <CityCard @click="goToCityView(city)" :city="city" />
  </div>

  <p v-if="savedCities.length === 0">
    目前沒有加入追蹤任何城市，請點擊右上角的按鈕加入追蹤
  </p>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import CityCard from "./CityCard.vue";

const savedCities = ref([]);

// *取得本地儲存的所有城市
const getCities = async () => {
  if (localStorage.getItem("savedCities")) {
    savedCities.value = JSON.parse(localStorage.getItem("savedCities"));
  }

  const requests = [];

  // *取得所有該城市的目前天氣資訊
  savedCities.value.forEach((city) => {
    requests.push(
      axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${
          city.coords.lat
        }&lon=${city.coords.lon}&appid=${
          import.meta.env.VITE_WEATHER_API_KEY
        }&units=metric`
      )
    );
  });

  // *等待所有城市的天氣資訊都取得後，再一次性顯示
  const weatherData = await Promise.all(requests);

  //  *Flicker Delay(閃爍延遲)
  await new Promise((res) => setTimeout(res, 1000));

  weatherData.forEach((value, index) => {
    savedCities.value[index].weather = value.data;
  });
};

await getCities();

// *前往城市天氣頁面
const router = useRouter();
const goToCityView = (city) => {
  router.push({
    name: "cityView",
    params: {
      state: city.state,
      city: city.city,
    },
    query: {
      id: city.id,
      lat: city.coords.lat,
      lon: city.coords.lon,
    },
  });
};
</script>
