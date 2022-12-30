<template>
  <div class="video-comment-wrap">
    <div class="video-comment-count">
      {{ store.state.videoDetail.commentCount }} bình luận
    </div>
    <div class="video-personal-comment">
      <div class="video-personal-left">
        <div class="video-personal-img">
          <img :src="corgiImg" alt="y3" />
        </div>
      </div>
      <div class="video-personal-right">
        <div class="video-personal-input">
          <input
            placeholder="Viết bình luận"
            @focus="isCommentFocus = true"
            @blur="isCommentFocus = false"
            type="seach"
          />
        </div>
        <transition name="icon-input">
          <div class="video-input-isFocus" v-if="isCommentFocus">
            <font-awesome-icon
              icon="fa-regular fa-face-laugh-beam"
              class="video-input-icon"
            />
          </div>
        </transition>
      </div>
    </div>
    <div class="video-comments">
      <div
        class="video-comment"
        v-for="comment in store.state.videoComment"
        :key="comment.authorChannelId"
      >
        <div class="video-comment-left">
          <div class="video-comment-img">
            <img
              :src="comment.authorProfileImageUrl"
              :alt="comment.authorDisplayName"
            />
          </div>
        </div>
        <div class="video-comment-right">
          <div class="video-comment-title">
            <h4 v-if="comment.authorDisplayName">
              {{ comment.authorDisplayName }}
            </h4>
            <h4 v-else>User has been deleted!</h4>
            <p>{{ moment(comment.publishedAt).fromNow() }}</p>
          </div>
          <div class="video-comment-text" style="white-space: pre-wrap">
            {{ comment.textOriginal }}
          </div>
          <div class="video-emotion">
            <div class="video-like">
              <font-awesome-icon
                icon="fa-regular fa-thumbs-up"
                class="like-icon"
              />
              <p>{{ serviceHelp.formatNumber(comment.likeCount, "short") }}</p>
            </div>
            <div class="video-unlike">
              <font-awesome-icon
                icon="fa-regular fa-thumbs-up"
                class="like-icon"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from "vuex";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { ref } from "vue";
import corgiImg from "@/assets/images/corgi.jpg";
import serviceHelp from "@/utils/service";

moment.locale("vi");

const isCommentFocus = ref(false);

const store = useStore();
</script>

<style lang="scss" scoped>
@import "./scss/VideoComments.scss";
</style>
