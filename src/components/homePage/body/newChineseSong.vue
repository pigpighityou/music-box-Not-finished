

<template>
  <!--    {{ newChineseSong.lists.data[0].artists[0].name }} 
   
   <br>
   <br>
   {{ newChineseSong.lists.data[0] }}  -->

  <div class="header">新歌速递</div>
  <div class="newChineseSongListWrapper">
    <div
      class="newChineseSongList"
      v-for="(item, index) in newChineseSong.lists.data"
      :key="index"
    >
      <div class="newChineseSong" v-if="index < 5">
        <div class="imgWrapper">
          <img
            :src="item.album.blurPicUrl"
            alt="newChineseSongPic"
            class="img"
          />
        </div>
        <div class="song">
          {{ item.name }}
        </div>

        <div class="artist">
          {{ item.artists[0].name }}
        </div>

        <div class="pic">
          <!--  <img :src="" alt="pic"> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getNewChineseSong } from "../../../axios/routes/newChineseSong";
import { ref, reactive, onMounted, computed } from "vue";
let newChineseSongAPI;
let newChineseSong = reactive({
  lists: [],
  failImages: [
    "https://redchairrecruitment.ie/wp-content/uploads/2019/05/No-Data.png",
  ],
});

(async () => {
  try {
    newChineseSongAPI = await getNewChineseSong();
    newChineseSong.lists = newChineseSongAPI.data;
    /* console.log('ok',newChineseSong.lists)   */
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

.newChineseSongListWrapper {
  height: 40vw;
  display: flex;
  overflow: auto;
  padding: 2% 1%;
  background-color: #f5f5f5;
}
.newChineseSong {
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
