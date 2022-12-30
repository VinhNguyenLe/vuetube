<template>
  <main class="app">
    <navbar-vue />
    <el-row>
      <router-view></router-view>
    </el-row>
  </main>
  <loading-vue v-if="store.state.isLoading" />
</template>

<script lang="ts" setup>
import NavbarVue from "./components/navbar/Navbar.vue";
import LoadingVue from "./components/loading/Loading.vue";
import { watch, onBeforeMount } from "vue";
import { useStore } from "vuex";
import { RouterView } from "vue-router";
import { fetchAPI } from "./utils/fetchApi";
import router from "./router";
import { useRoute } from "vue-router";

const store = useStore();
const route = useRoute();

watch(
  () => route.path,
  () => {
    if (route.name === "search" && route.params) {
      document.title = `Tìm kiếm: ${route.params.searchTerm}`;
      store.commit("setLoading", true);
      store.dispatch("handleSeach", route.params.searchTerm);
    } else if (route.name === "feed" && route.params) {
      store.commit("setLoading", true);
      store.dispatch("handleSeach", route.params.searchTerm);
    }
    // if (route.path === "/") {
    //   document.title = "VueTube";
    // }
    // if (route.name === "video") {
    //   document.title = store.state.videoName;
    // }
  }
);
</script>

<style lang="scss" scoped>
.app {
  overflow-x: hidden;
}
</style>
