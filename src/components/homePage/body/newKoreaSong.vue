<template>
  <!--    {{ newKoreaSong.lists.data[0].artists[0].name }} 
       
       <br>
       <br>
       {{ newKoreaSong.lists.data[0] }}  -->

  <div class="header">新歌速递</div>
  <div class="newKoreaSongListWrapper">
    <div
      class="newKoreaSongList"
      v-for="(item, index) in newKoreaSong.lists.data"
      :key="index"
    >
      <div class="newKoreaSong" v-if="index < 10">
        <div class="imgWrapper" @click="clickHandler(index)">
          <img :src="item.album.blurPicUrl" alt="newKoreaSongPic" class="img" />
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
import { getNewKoreaSong } from "../../../axios/routes/newKoreaSong";
import { ref, reactive, onMounted, computed } from "vue";
import store from "../../../store/store";
let newKoreaSongAPI;
let newKoreaSong = reactive({
  lists: [],
  failImages: [
    "https://redchairrecruitment.ie/wp-content/uploads/2019/05/No-Data.png",
  ],
});

(async () => {
  try {
    newKoreaSongAPI = await getNewKoreaSong();
    store.state.playList = newKoreaSongAPI.data.data;
    newKoreaSong.lists = newKoreaSongAPI.data;
    console.log("ok", newKoreaSong.lists);
  } catch (err) {
    console.log(err);
  }
})();

const clickHandler = (index) => {
  store.commit("getIndexPlay", index);
};
</script>

<style scoped>
.header {
  background-color: #f5f5f5;
  font-size: large;
  font-family: serif;
}

.newKoreaSongListWrapper {
  height: 40vw;
  display: flex;
  overflow: auto;
  padding: 2% 1%;
  background-color: #f5f5f5;
}
.newKoreaSong {
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
