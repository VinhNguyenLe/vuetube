<template>
  <el-affix :offset="0" position="top" style="width: 100%">
    <el-row justify="space-between" class="navbar">
      <el-row justify="space-between" class="navbar-col navbar-col-left">
        <el-row
          class="navbar-guide-btn"
          justify="center"
          align="middle"
          @click="toggleSideBar"
        >
          <font-awesome-icon icon="fa-solid fa-bars" />
        </el-row>
        <router-link
          to="/"
          style="display: flex; align-items: center"
          @click="backToHome"
        >
          <el-row class="navbar-logo-wrap" align="middle">
            <font-awesome-icon
              icon="fa-brands fa-youtube"
              class="navbar-logo"
            />
            <p class="youtube-title">VueTube</p>
          </el-row>
        </router-link>
      </el-row>
      <el-row class="navbar-col navbar-col-center">
        <div class="navbar-search-input-wrap">
          <font-awesome-icon
            icon="fa-solid fa-magnifying-glass"
            class="navbar-search-icon"
          />
          <input
            ref="searchInputRef"
            placeholder="Tìm kiếm"
            class="navbar-search-input"
            v-model="store.state.searchInput"
            @keydown.enter="handleSearch(store.state.searchInput)"
          />
        </div>
        <el-row class="navbar-search-btn-wrap" align="middle" justify="center">
          <div @click="handleSearch(store.state.searchInput)">
            <font-awesome-icon
              icon="fa-solid fa-magnifying-glass"
              class="navbar-search-btn"
            />
          </div>
        </el-row>
      </el-row>

      <el-row
        justify="center"
        align="middle"
        class="navbar-col navbar-col-right"
      >
        <el-icon class="navbar-settings-btn">
          <setting />
        </el-icon>
      </el-row>
    </el-row>
  </el-affix>
</template>

<script lang="ts" setup>
import router from "@/router";
import { Setting } from "@element-plus/icons-vue";
import { useStore } from "vuex";
import { ref, watch } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { ElAffix, ElRow, ElIcon } from "element-plus";
import { RouterLink } from "vue-router";

const searchInputRef = ref(null);
const isFocus = ref(false);

const store = useStore();

const handleSearch = (searchInput: string) => {
  router.push({ path: `/search/${searchInput}` });
  isFocus.value = false;
};

const toggleSideBar = () => {
  store.dispatch("toggleSideBar");
};

const backToHome = () => {
  router.push({ path: "/" });
  document.title = "VueTube";
  store.dispatch("setLoading", true);
  store.dispatch("handleSeach", "new");
};
</script>

<style lang="scss" scoped>
@import "./Navbar.scss";
</style>
