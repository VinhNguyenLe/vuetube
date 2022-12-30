<template>
  <div v-if="store.getters.getAllChannels.length > 0" class="channels-if">
    <div class="channels">
      <el-row style="flex: 1">
        <el-col
          :span="24"
          :xs="24"
          :sm="12"
          :md="8"
          :xl="6"
          v-for="item in store.getters.getAllChannels"
          :key="item.id"
          class="channel-wrap"
        >
          <div class="channel">
            <div class="channel-img">
              <el-avatar :src="item.snippet.thumbnails.high.url" :size="130" />
            </div>
            <div class="channel-text">
              <h3>
                {{ item.snippet.title }}
                <font-awesome-icon
                  icon="fa-solid fa-circle-check"
                  class="channel-check-icon"
                />
              </h3>
              <p>{{ item.snippet.description }}</p>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "vuex";

const store = useStore();
</script>

<style lang="scss" scoped>
@import "./Channels.scss";
</style>
