<template>
  <div
    class="flex flex-col min-h-screen bg-weather-primary font-TraditionalChinese"
  >
    <SiteNavigation />
    <RouterView />
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
import SiteNavigation from "./components/SiteNavigation.vue";
</script>

<style scoped></style>
