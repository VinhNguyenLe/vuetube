<template>
  <div class="homeview">
    <el-row>
      <sidebar-vue />
      <div class="main">
        <p class="search-title">
          Hiển thị kết quả tìm kiếm cho:
          <span>{{ store.state.searchInput }}</span>
        </p>
        <channels-vue />
        <videos-wrap-vue />
      </div>
    </el-row>
  </div>
</template>
<script lang="ts" setup>
import VideosWrapVue from "@/components/videos/VideosWrap.vue";
import SidebarVue from "@/components/sidebar/Sidebar.vue";
import ChannelsVue from "@/components/channels/Channels.vue";
import { useStore } from "vuex";
import { ElRow } from "element-plus";

const store = useStore();
</script>
<style lang="scss" scoped>
.homeview {
  flex: 1;
}

.main {
  flex: 1;
  min-height: 200vh;
  margin-top: 12px;
}

.search-title {
  padding: 0 16px;
  font-style: italic;
  font-size: 14px;

  & span {
    font-weight: 600;
  }
}
</style>
