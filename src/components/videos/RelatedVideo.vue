<template>
  <div class="related-videos">
    <router-link
      :to="{ path: `/video/${item.id.videoId}` }"
      v-for="item in store.state.relatedVideos"
      :key="item.id.videoId"
      @click.native="scrollToTop"
      class="related-video-link"
    >
      <div class="related-video">
        <div class="related-video-thumbnail">
          <img
            :src="item.snippet.thumbnails.medium.url"
            :alt="item.snippet.title"
          />
        </div>
        <div class="related-video-content-wrap">
          <div class="related-video-content-thumbnail" v-if="haveImg">
            <img :src="corgiImg" alt="" />
          </div>
          <div class="related-video-content">
            <h3 class="related-video-title" :title="item.snippet.title">
              {{ item.snippet.title }}
            </h3>
            <div
              class="related-video-channel"
              :title="item.snippet.channelTitle"
            >
              {{ item.snippet.channelTitle }}

              <font-awesome-icon
                icon="fa-solid fa-circle-check"
                class="video-check-icon"
              />
            </div>
            <div class="related-video-publish">
              {{ moment(item.snippet.publishedAt).fromNow() }}
            </div>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script lang="ts" setup>
import { RouterLink } from "vue-router";
import { useStore } from "vuex";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { computed, watch, defineProps, ref } from "vue";
import { useRoute } from "vue-router";
import corgiImg from "@/assets/images/corgi.jpg";

interface IProps {
  isImg?: boolean;
}

const { haveImg } = defineProps({
  haveImg: Boolean,
});

console.log(haveImg);

moment.locale("vi");

const route = useRoute();
const store = useStore();

const videoId = computed(() => route.params.id);

watch(
  () => route.params.id,
  () => {
    if (route.name === "video") {
      store.commit("setLoading", true);
      store.dispatch("handleRelatedVideo", videoId.value.toString());
      store.dispatch("handleVideoDetail", videoId.value.toString());
      store.dispatch("handleVideoComment", videoId.value.toString());
    }
  }
);

const scrollToTop = () => window.scrollTo(0, 0);
</script>

<style lang="scss" scoped>
@import "./scss/RelatedVideo.scss";
</style>
