<script setup>
import { ref, reactive, onMounted, computed, watch } from "vue";
import { getNewAlbum5 } from "../../../axios/routes/newAlbumAPI";
let newAlbum5API;
let newAlbum5List = reactive({
  albums: [],
  failImages: [
    "https://redchairrecruitment.ie/wp-content/uploads/2019/05/No-Data.png",
  ],
});

(async () => {
  try {
    newAlbum5API = await getNewAlbum5();
    newAlbum5List.albums = newAlbum5API.data;
    /* console.log('ok',newAlbum5List.albums)   */
  } catch (err) {
    console.log(err);
  }
})();

//  获取newAlbum5List异步函数后于template执行，导致newAlbum5List.albums.monthData[0].blurPicUrl报错
</script>

<template>
  <!-- {{newAlbum5List.albums.monthData[0].blurPicUrl}} -->
  <div class="header">新专辑</div>
  <div class="albumListWrapper">
    <div
      class="albumList"
      v-for="(item, index) in newAlbum5List.albums.monthData"
      :key="index"
    >
      <div class="album" v-if="index < 5">
        <div class="imgWrapper">
          <router-link :to="{ name: 'album', params: { id: item.id } }">
            <img :src="item.blurPicUrl" alt="albumPic" class="img" />
          </router-link>
        </div>

        <div class="name">
          {{ item.name }}
        </div>

        <div class="artist">
          {{ item.artist.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.header {
  background-color: #f5f5f5;
  font-size: large;
  font-family: serif;
}

.albumListWrapper {
  height: 44vw;
  display: flex;
  overflow: auto;
  padding: 2% 1%;
  background-color: #f5f5f5;
}
.album {
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
