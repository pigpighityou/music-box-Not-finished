<template>
  <van-nav-bar
    title="精品歌单"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
  />

  <div class="goodSongsWrapper">
    <div class="img"></div>
  </div>
</template>

<script setup>
import { getGoodSongList } from "../../../axios/routes/goodSongAPI";
import { ref, reactive, onMounted, computed } from "vue";

let goodSongsAPI;
let goodSongsList = reactive({
  songs: [],
  failImages: [
    "https://redchairrecruitment.ie/wp-content/uploads/2019/05/No-Data.png",
  ],
});

(async () => {
  try {
    goodSongsAPI = await getGoodSongList();
    goodSongsList.songs = goodSongsAPI.data;
    console.log("ok", goodSongsList.songs);
  } catch (err) {
    console.log(err);
  }
})();

const onClickLeft = () => history.back();
</script>
