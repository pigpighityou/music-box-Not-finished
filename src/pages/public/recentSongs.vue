<template>
  <van-nav-bar
    title="最近播放"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
  />

  <div class="recentSongsWrapper">
    <div
      class="recentSongs"
      v-for="(item, index) in recentSongs.songs"
      :key="index"
    >
      <div class="desc" @click="clickHandler(index)">
        <div class="songName">
          {{ item.data.name }}
        </div>

        <div class="singerNameWrapper">
          <div
            class="singerName"
            v-for="(item1, index1) in item.data.ar"
            :key="index1"
          >
            {{ item1.name }}
          </div>

          <div class="albumName">-{{ item.data.al.name }}</div>
        </div>
      </div>

      <div class="mv" v-if="item.data.mv != 0">
        <router-link :to="{ name: 'mvPlayer', params: { id: item.data.mv } }">
          <svg
            class="mvIcon"
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
            data-v-ea893728=""
          >
            <path
              fill="currentColor"
              d="M704 768V256H128v512h576zm64-416 192-96v512l-192-96v128a32 32 0 0 1-32 32H96a32 32 0 0 1-32-32V224a32 32 0 0 1 32-32h640a32 32 0 0 1 32 32v128zm0 71.552v176.896l128 64V359.552l-128 64zM192 320h192v64H192v-64z"
            ></path>
          </svg>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, reactive } from "vue";
import store from "@/store/store";

import { getRecentSongs } from "@/axios/routes/userList.js";

let recentSongsAPI;

let recentSongs = reactive({
  songs: [],
});

(async () => {
  recentSongsAPI = await getRecentSongs();
  store.state.playList = recentSongsAPI.data.data.list;
  recentSongs.songs = recentSongsAPI.data.data.list;
  /*  console.log(recentSongs.songs)    */
})();

const onClickLeft = () => history.back();

const clickHandler = (index) => {
  store.commit("getIndexPlay", index);
};
</script>

<style scoped>
.recentSongs {
  display: flex;
  flex-direction: row;
  /*    flex-wrap: wrap; */
  overflow: hidden;
  width: 100vw;
  max-height: 15vw;
  margin-bottom: 3vw;
}

.recentSongsWrapper {
  margin-bottom: 20vw;
}

.singerNameWrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  overflow: hidden;
  max-width: 80vw;
  max-height: 5vw;
  margin-bottom: 3vw;
}

.desc {
  display: flex;
  min-width: 90vw;

  flex-direction: column;
}

.songName {
  margin-left: 2vw;
  margin-top: 1vw;
  font-size: 4vw;
  color: black;
  max-width: 75vw;
  min-width: 60vw;
  max-height: 5vw;
  overflow: hidden;
}

.singerName {
  margin-left: 2vw;
  margin-top: 1vw;
  font-size: 3vw;
  color: rgb(142, 138, 138);
  text-overflow: ellipsis;
}

.albumName {
  margin-left: 2vw;
  margin-top: 1vw;
  font-size: 3vw;
  color: rgb(142, 138, 138);
  text-overflow: ellipsis;
}

.mv {
  margin-left: 2vw;
  margin-top: 1vw;
  font-size: 3vw;
}

.mvIcon {
  width: 5vw;
  height: 5vw;
  margin-top: 1vw;
  margin-left: 1vw;
  color: black;
}
</style>
