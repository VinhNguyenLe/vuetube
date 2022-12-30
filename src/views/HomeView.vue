<template>
  <div class="homeview">
    <el-row>
      <sidebar-vue />
      <div class="main">
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
import { fetchAPI } from "@/utils/fetchApi";
import { ElRow } from "element-plus";
import { computed, onBeforeMount, ref, watch } from "vue";
import { useRoute } from "vue-router";

const store = useStore();
const route = useRoute();
const query = computed(() => {
  if (route.path === "/") {
    return "new";
  } else if (route.name === "feed" || route.name === "search") {
    return route.params.searchTerm.toString();
  }
});

onBeforeMount(async () => {
  store.commit("setLoading", true);
  await fetchAPI(`search?part=snippet&q=${query.value}`).then((res) => {
    store.commit("setLoading", false);
    store.commit("setFeedData", res.data.items);
  });
});
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
</style>
