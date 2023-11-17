<template>
  <van-nav-bar
    title="搜索结果"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
  />

  <div class="resultWrapper">
    <div class="incorrect">
      <div class="incorrectText">
        搜索“{{ route.params.id }}”找到{{ cloudSearchData.data.songCount }}
        首歌曲
      </div>
      <div class="incorrectSuggest">
        已展示最有可能的结果:{{
          cloudSearchData.data.queryRewriteInfo?.rewriteQuery
        }}
      </div>
    </div>
    <div class="artistWrapper" v-if="multiSearchData.data.artist">
      <div class="artistIntro">
        相关歌手
        <i class="iconfont icon-xiajiantou1"></i>
      </div>
      <div
        class="artist"
        v-for="(item, index) in multiSearchData.data.artist"
        :key="index"
      >
        <router-link :to="{ name: 'listSinger', params: { id: item.id } }">
          <div class="artistPicture">
            <img :src="item.picUrl" class="artistPic" alt="pic" />
          </div>
        </router-link>
        <div class="artistDesc">
          <div class="artistName">
            {{ item.name }}
          </div>
          <div class="artistTrans">
            {{ item.trans }}
          </div>
        </div>
      </div>
    </div>
    <div class="songlistWrapper" v-if="multiSearchData.data.playlist">
      <div class="listIntro">
        相关歌单
        <i class="iconfont icon-xiajiantou1"></i>
      </div>
      <div
        class="songList"
        v-for="(item2, index2) in multiSearchData.data.playlist"
        :key="index2"
      >
        <div class="listPicture">
          <router-link :to="{ name: 'listSong', params: { id: item2.id } }">
            <img :src="item2.coverImgUrl" class="listPic" alt="pic" />
          </router-link>
        </div>
        <div class="listDesc">
          <div class="listName">
            {{ item2.name }}
          </div>

          <div class="playCount">
            {{
              item2.playCount < 10000
                ? item2.playCount
                : (item2.playCount / 10000).toFixed(1) + "万"
            }}
          </div>
        </div>

        <div class="tags" v-for="(item3, index3) in item2.tags" :key="index">
          {{ item3 }}
        </div>
      </div>
    </div>

    <div class="songWrapper">
      <div class="listSongsWrapper">
        <div class="title">
          歌曲列表
          <i class="iconfont icon-xiajiantou1"></i>
        </div>

        <div class="listSongs">
          <div
            class="listSong"
            v-for="(item, index) in cloudSearchData.data.songs"
            :key="index"
          >
            <div class="rankWrapper">
              {{ index + 1 }}
            </div>
            <div class="songWrapper" @click="toStore(index)">
              <div class="songName">
                {{ item.name }}
              </div>
              <div class="twoItems">
                <div class="authors">
                  <div
                    class="songAuthor"
                    v-for="(item1, index1) in item.ar"
                    :key="index1"
                  >
                    {{ item1.name }}
                  </div>
                </div>

                <div class="album">
                  {{ item.al.name }}
                </div>
              </div>
            </div>

            <div class="mv" v-if="item.mv != 0">
              <router-link :to="{ name: 'mvPlayer', params: { id: item.mv } }">
                <svg
                  class="videoIcon"
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
      </div>
    </div>
  </div>
  <div class="blank"></div>
</template>

<script setup>
import { ref, reactive, watchEffect } from "vue";
import { useRouter, useRoute } from "vue-router";
import { getSearch } from "@/axios/routes/search.js";
import { getCloudSearch } from "@/axios/routes/search";
import { multiSearch } from "@/axios/routes/search";
import search from "@/components/search/search.vue";
import store from "@/store/store.js";
const router = useRouter();
const route = useRoute();

const id = ref(route.params.id);
const onClickLeft = () => history.back();

let cloudSearchData = reactive({
  data: [],
});

let multiSearchData = reactive({
  data: [],
});

// 获取歌曲至播放器
const toStore = (index) => {
  store.state.playList = cloudSearchData.data.songs;
  store.commit("getIndexPlay", index);
};

// 获取数据
watchEffect(() => {
  if (route.params.id) {
    console.log(route.params.id);
    // 获取歌曲
    getCloudSearch(route.params.id)
      .then((res) => {
        cloudSearchData.data = res.data.result;
        /*  console.log("cloudSearch", cloudSearchData.data); */
      })
      .catch((err) => {
        console.log(err);
      });
    // 获取歌手，如果输入的是歌曲，可能会有歌单
    multiSearch(route.params.id)
      .then((res) => {
        multiSearchData.data = res.data.result;
        /*  console.log("multiSearch", multiSearchData.data);  */
      })
      .catch((err) => {
        console.log(err);
      });
  }
});
</script>

<style scoped>
.incorrect {
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.incorrectSuggest {
  font-size: 3.5vw;
  margin-top: 1vw;
}

.incorrectText {
  font-size: 4vw;
  font-weight: bold;
  margin-top: 3vw;
}

.artistWrapper {
  width: 100vw;
  margin-top: 3vw;
}

.artistIntro {
  text-align: center;
  font-size: 5vw;
  font-weight: bold;
  margin-bottom: 3vw;
}

.artist {
  border: 0.2vw solid rgb(15, 1, 1);
  border-radius: 2vw;
  padding: 2vw 2vw 2vw 2vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.artistName {
  font-size: 4vw;
  font-weight: bold;
}
.artistDesc {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 3vw;
}

.artistPic {
  width: 30vw;
  height: 30vw;
  border-radius: 50%;
}

.songList {
  border: 0.2vw solid rgb(15, 1, 1);
  border-radius: 2vw;
  padding: 2vw 2vw 2vw 2vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3vw;
}

.listDesc {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin-left: 2vw;
}

.listName {
  font-size: 4vw;
  font-weight: bold;
  max-width: 30vw;
}

.playCount {
  font-size: 3vw;
  color: rgb(153, 153, 153);
}

.tags {
  background-color: yellow;
  font-size: 3vw;
  color: rgb(142, 121, 121);
  margin-right: 2vw;
  max-width: 6vw;
  overflow: hidden;
}

.listPic {
  width: 30vw;
  height: 30vw;
  border-radius: 2vw;
}

/*  歌单css */
.listSongs {
  display: flex;
  flex-direction: column;
  padding-left: 3vw;
  width: 100vw;

  margin-top: 1vw;
  border-radius: 4vw;
  background-color: #fff;
  overflow: hidden;
  border: 0.3vw black solid;
}

.listSong {
  display: flex;
  flex-direction: row;
  width: 100vw;
  height: 10vw;
  margin-top: 1vw;
  margin-bottom: 2vw;
}

.rankWrapper {
  width: 5vw;
  margin-left: -2vw;

  height: 10vw;
  font-size: 4vw;
  margin-top: 1vw;
  margin-right: 3vw;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #c62f2f;
}

.title {
  width: 100vw;
  height: 6vw;
  font-size: 4vw;
  padding-left: 3vw;
  padding-right: 2vw;
  color: black;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.videoIcon {
  width: 5vw;
  height: 5vw;
  margin-top: 1vw;
  margin-left: 1vw;
  color: black;
}

.songName {
  width: 80vw;
  overflow: hidden;
  height: 5vw;
  font-size: 4vw;
  margin-top: 1vw;
}

.songWrapper {
  width: 83vw;
}

.songAuthor {
  display: inline-block;
  padding-right: 1vw;
  margin-right: 2vw;
  max-height: 4vw;
  max-width: 30vw;
  text-overflow: ellipsis;
  overflow: hidden;
  text-align: center;
}

.album {
  display: inline-block;

  padding-right: 1vw;
  margin-top: 0.4vw;
  max-width: 40vw;
  height: 4vw;

  overflow: hidden;
  text-overflow: ellipsis;
  color: grey;
}

.twoItems {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;

  margin-top: 1.4vw;
  font-size: 3vw;
  /*  max-width: 70vw;  */
  max-height: 4vw;
  overflow: hidden;
  text-align: center;
  text-overflow: ellipsis;
}

.blank {
  width: 100vw;
  height: 20vw;
}
</style>
