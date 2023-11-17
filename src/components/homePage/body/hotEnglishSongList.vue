<template>
  <!--   {{ hotEnglishSongList.artists  }} -->

  <div class="header">热门歌单</div>
  <div class="hotEnglishSongListListWrapper">
    <div
      class="hotEnglishSongListList"
      v-for="(item, index) in hotEnglishSongList.playlists"
      :key="index"
    >
      <div class="hotEnglishSongList" v-if="index < 5">
        <router-link :to="{ name: 'listSong', params: { id: item.id } }">
          <div class="imgWrapper">
            <img
              :src="item.coverImgUrl"
              alt="hotEnglishSongListPic"
              class="img"
            />
          </div>
        </router-link>

        <div class="artist">
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getHotEnglishSongList } from "../../../axios/routes/hotEnglishSongList";
import { ref, reactive, onMounted, computed } from "vue";
let hotEnglishSongListAPI;
let hotEnglishSongList = reactive({
  playlists: [],
  failImages: [
    "https://redchairrecruitment.ie/wp-content/uploads/2019/05/No-Data.png",
  ],
});

(async () => {
  try {
    hotEnglishSongListAPI = await getHotEnglishSongList();
    hotEnglishSongList.playlists = hotEnglishSongListAPI.data.playlists;
    /*   console.log('ok',hotEnglishSongList.playlists)   */
  } catch (err) {
    console.log(err);
  }
})();
</script>

<style scoped>
.header {
  background-color: #f5f5f5;
  font-size: large;
  font-family: serif;
}

.hotEnglishSongListListWrapper {
  height: 40vw;
  display: flex;
  overflow: auto;
  padding: 2% 1%;
  background-color: #f5f5f5;
}
.hotEnglishSongList {
  height: 40vw;
  margin: 0 2vw;
}

.imgWrapper {
  margin: 0 auto;
}

.name {
  margin: 0 auto;
  width: 30vw;
  height: 5vw;
  font-size: 1.5vw;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: center;
  color: #333333;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.artist {
  margin: 0 auto;
  width: 30vw;
  height: 5vw;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: center;
  color: #999999;
  font-family: serif;
}
.img {
  width: 30vw;
  height: auto;
  border-radius: 2vw;
}
</style>
