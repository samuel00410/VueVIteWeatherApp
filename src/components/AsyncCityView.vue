<template>
  <div class="flex flex-col flex-1 items-center">
    <!-- Banner -->
    <div v-if="route.query.preview" class="w-full p-4 bg-weather-secondary text-white text-center">
      <p>您正在預覽城市資訊，可以按 +號 將城市加入追蹤</p>
    </div>
    <!-- Weather OverView -->

  </div>
</template>

<script setup>
import axios from "axios";
import { useRoute } from "vue-router";

const route = useRoute();

const getWeatherData = async () => {
  try {
    const weatherData = await axios.get(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${
        route.query.lat
      }&lon=${route.query.lng}&exclude={part}&appid=${
        import.meta.env.VITE_WEATHER_API_KEY
      }&units=metric`
    );

    // 計算目前 日期 & 時間
    const localOffset = new Date().getTimezoneOffset() * 60000;
    const utc = weatherData.data.current.dt * 1000 + localOffset;
    weatherData.data.currentTime = utc + 1000 * weatherData.data.timezone_offset;
    
    // 計算天氣小時預報
    weatherData.data.hourly.forEach((hour)=>{
      const utc = hour.dt * 1000 +localOffset;
      hour.currentTime = utc + 1000 * weatherData.data.timezone_offset;
    })

    return weatherData;
  } catch (err) {
    console.log(err);
  }
};

const weatherData = await getWeatherData();
console.log("該地區的天氣資料:",weatherData);

</script>
