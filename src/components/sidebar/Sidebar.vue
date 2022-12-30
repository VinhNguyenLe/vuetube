<template>
  <el-affix
    class="sidebar"
    :offset="56"
    position="top"
    v-show="windowWidth > 500"
  >
    <el-menu
      default-active="1"
      class="el-menu-vertical"
      :collapse="store.state.isCollapse"
      active-text-color="#42d392"
    >
      <el-menu-item
        v-for="item in store.state.sidebarMenu"
        :key="item.id"
        :index="`${item.id}`"
        @click="changeFeedVideos(item.query)"
      >
        <el-icon>
          <font-awesome-icon :icon="item.icon" />
        </el-icon>
        <template #title>
          <span class="sidebar-menu-item-text">{{ item.title }}</span>
        </template>
      </el-menu-item>
    </el-menu>
  </el-affix>
</template>

<script lang="ts" setup>
import { ref, watch, onUnmounted, onBeforeMount } from "vue";
import { useStore } from "vuex";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { ElMenu, ElMenuItem, ElIcon } from "element-plus";
import router from "@/router";
import { useRoute } from "vue-router";

const store = useStore();
const windowWidth = ref(window.innerWidth);
const isShowSidebar = ref(true);
const route = useRoute();

const changeFeedVideos = (query: string) => {
  router.push({ path: `/feed/${query}` });
};

const handleWindowWidth = () => (windowWidth.value = window.innerWidth);

onBeforeMount(() => {
  return window.addEventListener("resize", handleWindowWidth);
});

onUnmounted(() => {
  return window.removeEventListener("resize", handleWindowWidth);
});

watch(windowWidth, () => {
  if (windowWidth.value <= 1312) {
    store.commit("changeSidebar", true);
  } else {
    store.commit("changeSidebar", false);
  }
  if (windowWidth.value <= 500) {
    isShowSidebar.value = false;
  } else {
    isShowSidebar.value = true;
  }
});
</script>

<style lang="scss" scoped>
@import "./Sidebar.scss";
</style>
