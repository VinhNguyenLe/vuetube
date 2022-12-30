<template>
  <el-row class="videos-if" v-if="store.getters.getAllVideos.length > 0">
    <div class="videos">
      <el-row style="flex: 1">
        <el-col
          :xs="12"
          :sm="8"
          :md="6"
          :xl="4"
          :span="24"
          v-for="item in store.getters.getAllVideos"
          :key="item.id"
          class="video-wrap"
        >
          <router-link
            :to="{ path: `/video/${item.id.videoId}` }"
            class="video-link"
            @click.native="scrollToTop"
          >
            <div class="video">
              <div class="video-img">
                <img :src="item.snippet.thumbnails.medium.url" />
              </div>
              <div class="video-text">
                <div class="video-channel-img">
                  <font-awesome-icon
                    icon="fa-brands fa-youtube"
                    class="channel-logo"
                    :style="{ color: randomColor() }"
                  />
                </div>
                <div class="video-description">
                  <h3>
                    {{ item.snippet.title.toString() }}
                  </h3>
                  <div class="video-description-para">
                    <p>
                      {{ item.snippet.channelTitle }}
                      <font-awesome-icon
                        icon="fa-solid fa-circle-check"
                        class="video-check-icon"
                      />
                    </p>
                    <p>
                      {{ moment(item.snippet.publishTime).fromNow() }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </router-link>
        </el-col>
      </el-row>
    </div>
  </el-row>
</template>

<script setup lang="ts">
import { useStore } from "vuex";
import moment from "moment";
import randomColor from "randomcolor";

moment.locale("vi");

const store = useStore();

const scrollToTop = () => window.scrollTo(0, 0);
</script>

<style lang="scss" scoped>
@import "./scss/VideosWrap.scss";
</style>
