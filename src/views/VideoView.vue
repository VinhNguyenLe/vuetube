<template>
  <div class="video-view">
    <div class="video-container">
      <div class="handle-ytb-video">
        <YoutubeVue3
          ref="youtubeRef"
          :autoplay="0"
          :videoid="route.params.id.toString()"
          :width="videoWidth"
          :height="videoHeight"
          :modestbranding="1"
          :controls="1"
        />
      </div>
      <div class="video-context">
        <div class="video-context-left">
          <div class="video-tags">
            <span v-for="tag in store.state.videoDetail.tags" :key="tag">
              <a
                :href="`https://www.youtube.com/results?search_query=${serviceHelp.removeSpace(
                  tag
                )}`"
                target="_blank"
              >
                #{{ serviceHelp.removeSpace(tag) }}
              </a>
            </span>
          </div>
          <h2 class="video-title">
            {{ store.state.videoDetail.title }}
          </h2>
          <div class="video-channel-context">
            <div class="video-channel-context-img">
              <!-- <font-awesome-icon
                icon="fa-brands fa-youtube"
                class="channel-logo"
                :style="{ color: randomColor() }"
              /> -->
              <img :src="corgiImg" alt="" class="video-channel-img" />
            </div>
            <div class="handle-title-channel-of-video">
              <h3 class="video-channel-context-title">
                {{ store.state.videoDetail.channelTitle }}
                <font-awesome-icon
                  icon="fa-solid fa-circle-check"
                  class="video-check-icon"
                />
              </h3>
              <p style="font-size: 12px; color: #606060">
                Khum biết bao nhiêu người đăng ký
              </p>
            </div>
          </div>
        </div>
        <div class="video-context-right">
          <div class="video-context-like">
            <font-awesome-icon icon="fa-regular fa-thumbs-up" />
            <p>
              {{
                serviceHelp.formatNumber(
                  store.state.videoDetail.likeCount,
                  "short"
                )
              }}
            </p>
          </div>
          <div class="video-context-unlike">
            <font-awesome-icon icon="fa-regular fa-thumbs-up" class="unlike" />
          </div>
        </div>
      </div>
      <div class="video-description">
        <div class="video-description-view-date">
          <div class="video-description-view-count">
            {{
              serviceHelp.formatNumber(
                store.state.videoDetail.viewCount,
                "decimal"
              )
            }}
            lượt xem
          </div>
          <div class="video-description-publish-at">
            {{ moment(store.state.videoDetail.publishedAt).fromNow() }}
          </div>
        </div>
        <div
          class="video-description-text"
          style="white-space: pre-wrap"
          v-if="store.state.videoDetail.description"
        >
          {{ store.state.videoDetail.description }}
        </div>
      </div>
      <related-video-vue v-if="isMobile" class="isMobile" :haveImg="true" />

      <video-comments-vue />
    </div>
    <related-video-vue v-if="!isMobile" />
  </div>
</template>

<script lang="ts" setup>
import {
  computed,
  onBeforeMount,
  onMounted,
  onUnmounted,
  ref,
  watch,
} from "vue";
import { YoutubeVue3 } from "youtube-vue3";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import type { IYoutube } from "@/utils/model";
import moment from "moment";
import randomColor from "randomcolor";
import serviceHelp from "@/utils/service";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import RelatedVideoVue from "@/components/videos/RelatedVideo.vue";
import VideoCommentsVue from "@/components/videos/VideoComments.vue";
import corgiImg from "@/assets/images/corgi.jpg";

moment.locale("vi");

const youtubeRef = ref<any>(null);
const route = useRoute();
const store = useStore();
const videoId = computed(() => route.params.id);
// const videoWidth = ref(1280);
const videoWidth = computed({
  get() {
    if (window.innerWidth < 1754 && window.innerWidth > 986) {
      return (window.innerWidth * 73) / 100;
    }
    if (window.innerWidth <= 986 && window.innerWidth > 500) {
      return window.innerWidth - 24;
    }
    if (window.innerWidth <= 500) {
      return window.innerWidth;
    }
    if (window.innerWidth >= 1754) {
      return 1280;
    }
  },
  set(newValue: any) {},
});

const videoHeight = computed(() => (videoWidth.value * 9) / 16);

if (videoId.value) {
  store.commit("setLoading", true);
  store.dispatch("handleRelatedVideo", videoId.value.toString());
  store.dispatch("handleVideoDetail", videoId.value.toString());
  store.dispatch("handleVideoComment", videoId.value.toString());
}

const scrollToTop = () => window.scrollTo(0, 0);

onMounted(() => {
  scrollToTop();
});

const windowWidth = ref(window.innerWidth);
const isMobile = ref(false);

const handleWindowWidth = () => (windowWidth.value = window.innerWidth);

onBeforeMount(() => {
  return window.addEventListener("resize", handleWindowWidth);
});

onUnmounted(() => {
  return window.removeEventListener("resize", handleWindowWidth);
});

if (windowWidth.value <= 986) {
  isMobile.value = true;
} else {
  isMobile.value = false;
}

watch(windowWidth, () => {
  videoWidth.value = windowWidth.value;
  if (window.innerWidth < 1754 && window.innerWidth > 986) {
    youtubeRef.value.player.setSize(
      (window.innerWidth * 73) / 100,
      (window.innerWidth * 9 * 73) / 1600
    );
  }
  if (window.innerWidth <= 986 && window.innerWidth > 500) {
    youtubeRef.value.player.setSize(
      window.innerWidth - 24,
      ((window.innerWidth - 24) * 9) / 16
    );
  }
  if (window.innerWidth <= 500) {
    youtubeRef.value.player.setSize(
      window.innerWidth,
      (window.innerWidth * 9) / 16
    );
  }
  if (windowWidth.value >= 1754) {
    youtubeRef.value.player.setSize(1280, 720);
  }
  if (windowWidth.value <= 986) {
    isMobile.value = true;
  } else {
    isMobile.value = false;
  }
});
</script>

<style lang="scss" scoped>
@import "./scss/VideoView.scss";
</style>
