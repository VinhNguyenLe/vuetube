import { fetchAPI } from "./../utils/fetchApi";
import { createStore, Store } from "vuex";
import { InjectionKey } from "vue";

import { ISidebarMenu, IStore } from "@/utils/model";
import router from "@/router";

export const key: InjectionKey<Store<IStore>> = Symbol();

export default createStore<IStore>({
  state: {
    isCollapse: false,
    query: "New",
    searchInput: "",
    feedData: [],
    sidebarMenu: [
      {
        id: 1,
        title: "Trang chủ",
        icon: "fa-solid fa-house",
        query: "new",
      },
      {
        id: 2,
        title: "Thịnh hành",
        icon: "fa-solid fa-fire-flame-curved",
        query: "trending",
      },
      {
        id: 3,
        title: "Âm nhạc",
        icon: "fa-solid fa-music",
        query: "music",
      },
      {
        id: 4,
        title: "Trò chơi",
        icon: "fa-solid fa-gamepad",
        query: "game",
      },
      {
        id: 5,
        title: "Tin tức",
        icon: "fa-solid fa-newspaper",
        query: "news",
      },
      {
        id: 6,
        title: "Thể thao",
        icon: "fa-solid fa-trophy",
        query: "sport",
      },
    ],
    tabsMenu: [
      {
        id: 1,
        title: "Tất cả",
        icon: "fa-solid fa-house",
        query: "New",
      },
      {
        id: 2,
        title: "Thịnh hành",
        icon: "fa-solid fa-fire-flame-curved",
        query: "Trending",
      },
      {
        id: 3,
        title: "Âm nhạc",
        icon: "fa-solid fa-music",
        query: "Music",
      },
      {
        id: 4,
        title: "Trò chơi",
        icon: "fa-solid fa-gamepad",
        query: "Game",
      },
      {
        id: 5,
        title: "Tin tức",
        icon: "fa-solid fa-newspaper",
        query: "News",
      },
      {
        id: 6,
        title: "Thể thao",
        icon: "fa-solid fa-trophy",
        query: "Sport",
      },
    ],
    isLoading: false,
    relatedVideos: [],
    videoDetail: {},
    videoComment: [],
    videoName: "",
  },
  getters: {
    getAllVideos(state) {
      return state.feedData?.filter((item) => item.id.videoId);
    },
    getAllChannels(state) {
      return state.feedData?.filter((item) => item.id.channelId);
    },
    getAllPlaylists(state) {
      return state.feedData?.filter((item) => item.id.playlistId);
    },
    getSidebarNameWithQuery(state) {
      return state.sidebarMenu?.filter((item) => {
        if (item.query === state.query) {
          return item.title;
        }
      });
    },
    getVideoName(state) {
      return state.videoDetail?.title;
    },
  },
  mutations: {
    setFeedData(state, payload) {
      state.feedData = payload;
    },
    toggleSideBar(state) {
      state.isCollapse = !state.isCollapse;
    },
    changeSidebar(state, payload) {
      state.isCollapse = payload;
    },
    setQuery(state, payload) {
      state.query = payload;
    },
    setLoading(state, payload) {
      state.isLoading = payload;
    },
    setRelatedVideos(state, payload) {
      state.relatedVideos = payload;
    },
    setVideoDetail(state, payload) {
      state.videoDetail = {
        channelId: payload.snippet.channelId,
        channelTitle: payload.snippet.channelTitle,
        description: payload.snippet.description,
        title: payload.snippet.title,
        tags: payload.snippet.tags,
        commentCount: payload.statistics.commentCount,
        likeCount: payload.statistics.likeCount,
        viewCount: payload.statistics.viewCount,
        publishedAt: payload.snippet.publishedAt,
      };
    },
    setVideoName(state, payload) {
      state.videoName = payload;
      document.title = payload;
    },
    setVideoComment(state, payload) {
      if (!payload) return;
      state.videoComment = payload.map((item: any) => {
        return {
          authorChannelId: item.snippet.topLevelComment.snippet.authorChannelId,
          authorDisplayName:
            item.snippet.topLevelComment.snippet.authorDisplayName,
          authorProfileImageUrl:
            item.snippet.topLevelComment.snippet.authorProfileImageUrl,
          likeCount: item.snippet.topLevelComment.snippet.likeCount,
          publishedAt: item.snippet.topLevelComment.snippet.publishedAt,
          textDisplay: item.snippet.topLevelComment.snippet.textDisplay,
          textOriginal: item.snippet.topLevelComment.snippet.textOriginal,
        };
      });
    },
  },
  actions: {
    handleSeach({ commit }, data) {
      fetchAPI(`search?part=snippet&q=${data}`).then((res) => {
        commit("setLoading", false);
        commit("setFeedData", res.data.items);
      });
    },
    handleRelatedVideo({ commit }, videoId) {
      fetchAPI(
        `search?part=snippet&relatedToVideoId=${videoId}&type=video`
      ).then((res) => {
        commit("setLoading", false);
        commit("setRelatedVideos", res.data.items);
      });
    },
    handleVideoDetail({ commit }, videoId) {
      fetchAPI(`videos?part=snippet,statistics&id=${videoId}`).then((res) => {
        commit("setVideoDetail", res.data.items[0]);
        commit("setVideoName", res.data.items[0].snippet.title);
      });
    },
    handleVideoComment({ commit }, videoId) {
      fetchAPI(`commentThreads?part=snippet&videoId=${videoId}`).then((res) => {
        commit("setVideoComment", res.data.items);
      });
    },
    fromSearchToFeedQuery({ commit }, query) {
      commit("setQuery", query);
    },

    toggleSideBar({ commit }) {
      commit("toggleSideBar");
    },
    changeQuery({ commit }, data) {
      commit("setQuery", data);
    },
  },
  modules: {},
});
