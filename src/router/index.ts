import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SearchView from "../views/SearchView.vue";
import VideoView from "../views/VideoView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/video/:id",
    name: "video",
    component: VideoView,
  },

  {
    path: "/channel/:id",
    name: "channel",
    component: HomeView,
  },
  {
    path: "/feed/:searchTerm",
    name: "feed",
    component: HomeView,
  },
  {
    path: "/search/:searchTerm",
    name: "search",
    component: SearchView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
