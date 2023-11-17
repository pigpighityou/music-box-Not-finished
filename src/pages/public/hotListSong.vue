<template>
  <van-nav-bar
    title="热门歌单列表"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
  />

  <div class="songListWrapper">
    <div class="list" v-for="(item, index) in HotSongsList.songs" :key="index">
      <div class="rank">
        {{ index + 1 }}
      </div>

      <div class="img">
        <router-link :to="{ name: 'listSong', params: { id: item.id } }">
          <img :src="item.coverImgUrl" alt="pic" class="pic" />
        </router-link>
      </div>

      <div class="desc">
        {{ item.name }}
        <!-- {{ item.id }} -->
      </div>
      <div class="count">
        播放{{
          item.playCount > 1000000
            ? (item.playCount / 10000).toFixed(1) + "万"
            : item.playCount
        }}次
      </div>
    </div>
  </div>
  <div class="blank"></div>
</template>

<script setup>
import { getHotSongList } from "@/axios/routes/hotSongAPI";

import { ref, reactive, onMounted, computed } from "vue";

let HotSongsAPI;
let HotSongsList = reactive({
  songs: [],
  failImages: [
    "https://redchairHotruitment.ie/wp-content/uploads/2019/05/No-Data.png",
  ],
});

(async () => {
  try {
    HotSongsAPI = await getHotSongList();
    HotSongsList.songs = HotSongsAPI.data.playlists;
    /*      console.log('ok',HotSongsList.songs)  */
  } catch (err) {
    console.log(err);
  }
})();

const onClickLeft = () => history.back();
</script>

<style scoped>
.list {
  display: flex;
  flex-dihottion: row;
  align-items: center;
  margin: 1vw 0;
  padding: 0 1vw;
  border-bottom: 1px solid #ccc;
}

.rank {
  min-width: 10vw;
  height: 100%;
  text-align: center;

  color: #ccc;
}

.desc {
  width: 40vw;
  height: 100%;

  margin-left: 1vw;
}

.count {
  width: 30vw;
  height: 100%;

  text-align: center;

  margin-left: 1vw;
}

.pic {
  width: 30vw;
  height: 30vw;
  border-radius: 5px;
  box-shadow: 0 0 10px #ccc;
}
.blank {
  height: 20vw;
}
</style>
