<template>
  <header class="sticky top-0 bg-weather-primary shadow-lg">
    <nav
      class="container mx-auto flex flex-col sm:flex-row items-center gap-4 p-6 text-white"
    >
      <RouterLink :to="{ name: 'home' }">
        <div class="flex items-center gap-3">
          <i class="fa-solid fa-sun text-2xl"></i>
          <p class="text-2xl">當地天氣</p>
        </div>
      </RouterLink>
      <div class="flex gap-3 flex-1 justify-end">
        <i
          @click="toggleModal"
          class="fa-solid fa-circle-info text-xl hover:text-weather-secondary duration-150 cursor-pointer"
        ></i>

        <i
          class="fa-solid fa-plus text-xl hover:text-weather-secondary duration-150 cursor-pointer"
          @click="addCity"
          v-if="route.query.preview"
        ></i>
      </div>

      <!-- 提示框 -->
      <BaseModal :showModal="showModal" @close-modal="toggleModal">
        <div class="text-black">
          <h1 class="text-2xl mb-1">關於這個網站:</h1>
          <p class="mb-4">搜尋你想選擇的城市的天氣</p>
          <h2 class="text-2xl">它如何運作的:</h2>
          <ol class="list-decimal list-inside mb-4">
            <li>在搜尋引擎輸入你想要查詢的城市名稱</li>
            <li>選擇你輸入的搜尋結果(城市名稱)</li>
          </ol>
        </div>
      </BaseModal>
    </nav>
  </header>
</template>

<script setup>
import { ref } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";
import BaseModal from "./BaseModal.vue";
import { v4 as uuidv4 } from "uuid";

const showModal = ref(false);
const savedCities = ref([]);
const route = useRoute();
const router = useRouter();

const toggleModal = () => {
  showModal.value = !showModal.value;
};

// *加入追蹤(城市)
const addCity = () => {
  // 先查看本地存儲是否有城市
  if (localStorage.getItem("savedCities")) {
    savedCities.value = JSON.parse(localStorage.getItem("savedCities"));
  }

  // 找不到本地儲存裡的城市的話，就新增一個物件去儲存
  const locationObj = {
    id: uuidv4(),
    state: route.params.state,
    city: route.params.city,
    coords: {
      lat: route.query.lat,
      lng: route.query.lng,
    },
  };

  savedCities.value.push(locationObj);
  localStorage.setItem("savedCities", JSON.stringify(savedCities.value));

  // 儲存完後，刪除url上的preview參數
  let query = Object.assign({}, route.query);
  delete query.preview;
  router.replace({ query });
};
</script>
