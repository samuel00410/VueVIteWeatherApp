import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CityView from "../views/CityView.vue";

export const createMyRouter = () => {
  const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      {
        path: "/",
        name: "home",
        component: HomeView,
        meta: {
          title: "首頁",
        },
      },
      {
        path: "/weather/:state/:city",
        name: "cityView",
        component: CityView,
        meta: {
          title: "天氣資訊",
        },
      },
    ],
  });

  router.beforeEach((to, from, next) => {
    document.title = `${
      to.params.state ? `${to.params.city}, ${to.params.state}` : to.meta.title
    } | 當地天氣`;

    next();
  });

  return router;
};

// export default router;
