<script setup>
import { getRecSongList } from "../../../axios/routes/recSongAPI";
import { ref, reactive, onMounted, computed } from "vue";

let recSongsAPI;

let recSongsList = reactive({
  songs: [],
  failImages: [
    "https://redchairrecruitment.ie/wp-content/uploads/2019/05/No-Data.png",
  ],
});

(async () => {
  try {
    recSongsAPI = await getRecSongList();
    recSongsList.songs = recSongsAPI.data.result;

    /* console.log('okrec',recSongsList.songs)
     */
  } catch (err) {
    console.log(err);
  }
})();
</script>

<template>
  <div class="recSongsWrapper">
    <div class="title">
      推荐歌单
      <i class="iconfont icon-xiajiantou"></i>
    </div>

    <router-link to="/recSongList">
      <div class="list">
        <div class="head">
          <div class="word">
            排名
            <i class="iconfont icon-jiantouyou small"></i>
          </div>
          <div class="end">精选宝藏歌单</div>
        </div>

        <div class="rankWrapper">
          <div
            class="rank"
            v-for="(item, index) in recSongsList.songs"
            :key="index"
          >
            <div class="judge">
              <img :src="item.picUrl" alt="rank1" />
              <div class="rankNum">{{ index + 1 }}</div>
              <div class="song">{{ item.name }}</div>
            </div>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<style scoped>
.recSongsWrapper {
  width: 100vw;
  height: 60vw;

  display: flex;
  flex-direction: column;
  margin: 1.5vw 0;
}

.title {
  background-color: white;
  width: 95vw;
  height: 8vw;
  font-size: 4vw;
  padding: 0 auto;
  margin: 0 auto 1vw;
}
.list {
  background-color: rgb(252, 247, 247);
  width: 95vw;
  height: 52vw;
  border-radius: 2vw;
  margin-top: 1vw;
  padding: 0 auto;
  padding-top: 1vw;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  color: black;
}
.head {
  height: 15%;
  display: flex;
  flex-direction: row;
}

.word {
  padding-left: 2vw;
  width: 100%;
  height: 100%;
}
.end {
  height: 4.5vw;
  width: 24vw;
  transform: scale(0.8);
  padding-top: 0.3vw;
}
.rankWrapper {
  padding-left: 1%;
  height: 50vw;
  overflow: auto;
}

.rankWrapper div {
  background-color: rgb(252, 247, 247);
  margin: 1% auto;
  height: 13vw;
}

.rank img {
  width: 14%;
  height: 100%;
  padding-left: 1%;
  padding-bottom: 1%;
}

.rank {
  display: flex;
  height: 50vw;
}

.judge {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  padding-left: 1%;
  padding-top: 1%;
  padding-bottom: 1%;
  padding-right: 1%;
  border-radius: 1vw;
  background-color: white;
  align-items: center;
  /*  justify-content: space-between;
    overflow: hidden; */
}
.rankNum {
  padding-right: 10%;
  padding-top: 2%;
  font-family: monospace;
  width: 10vw;
  height: 100%;
}

.song {
  padding-right: 0%;
  padding-top: 2%;
  font-family: "Microsoft YaHei";

  width: 40vw;
  height: 100%;
  overflow: auto;
}
</style>
