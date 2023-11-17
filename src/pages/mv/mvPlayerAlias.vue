<template>
  <van-nav-bar
    title="mv"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
    class="navbar"
  />

  <div class="playerWrapper">
    <video
      :src="mvUrlData.data.url"
      ref="video"
      controls
      class="player"
      autoplay
      loop
      muted
      @play="isPlaying = true"
      @pause="isPlaying = false"
    ></video>

    <div class="overlay" v-if="isPlaying === false">
      <div class="layerWrapper">
        <div class="current">正在播放的是</div>
        <div class="layerName">
          {{ mvDetailData.data.name }}
        </div>

        <div class="layerSingerWrapper">
          <div
            class="layerSinger"
            v-for="(item2, index2) in mvDetailData.data.artists"
            :key="index2"
          >
            {{ item2.name }}
          </div>
        </div>

        <span class="judge2" v-if="mvDetailData.data.artists.length > 2">
          ...
        </span>

        <div class="briefDesc">
          {{ mvDetailData.data.briefDesc }}
        </div>

        <div class="pause">已暂停</div>
      </div>
    </div>

    <div class="descWrapper">
      <div class="desc">
        <div class="img">
          <img
            :src="
              tester === false
                ? mvDetailData.data.cover
                : mvDetailData.data.coverUrl
            "
            alt="pic"
            class="descImg"
          />
        </div>

        <div class="desc1">
          <div class="mvName" v-if="tester === false">
            {{ mvDetailData.data.name }}
          </div>
          <div class="mvName" v-if="tester === true">
            {{ mvDetailData.data.title }}
          </div>

          <div
            class="author"
            v-if="tester === false"
            v-for="(item1, index1) in mvDetailData.data.artists"
            :key="index1"
          >
            {{ item1.name }}
          </div>
          <div class="author" v-if="tester === true">
            上传者：{{ mvDetailData.data.creator.nickname }}
          </div>
        </div>

        <div class="desc2">
          <div class="playCount" v-if="tester === false">
            播放量：{{
              mvDetailData.data.playCount < 100000
                ? mvDetailData.data.playCount
                : (mvDetailData.data.playCount / 100000).toFixed(1) + "万"
            }}
          </div>
          <div class="playCount" v-if="tester === true">
            播放量：{{
              mvDetailData.data.playTime < 100000
                ? mvDetailData.data.playTime
                : (mvDetailData.data.playTime / 100000).toFixed(1) + "万"
            }}
          </div>

          <div class="publishTime" v-if="tester === false">
            发布时间：{{ mvDetailData.data.publishTime }}
          </div>

          <div
            v-else="tester === true && mvDetailData.data.publishTime != null"
            class="publishTime"
          >
            发布时间：{{ year + "-" + month + "-" + day }}
          </div>
        </div>
      </div>
    </div>
  </div>

  <van-floating-panel
    v-model:height="height"
    :anchors="anchors"
    class="panel"
    :class="{ pausePanel: !isPlaying }"
  >
    <div style="text-align: center; padding: 15px" class="panelWrapper">
      <div class="header" v-if="tester === false">该视频的创作者</div>
      <div class="header specialHeader" v-if="tester === true">
        该视频不是原创，暂不提供视频创作者信息；<br />
        如果确实是原创，因为接口问题，也暂不提供视频创作者信息
      </div>

      <div
        class="relatedSinger"
        v-for="(item4, index4) in mvDetailData.data.artists"
        :key="index4"
      >
        <div class="reImg">
          <router-link :to="{ name: 'listSinger', params: { id: item4.id } }">
            <img :src="item4.img1v1Url" alt="pic" class="reImg" />
          </router-link>
        </div>

        <div class="reSingerName">
          {{ item4.name }}
          <hr />
        </div>
      </div>

      <div class="tag">
        <div class="tagHead" v-if="mvDetailData.data.videoGroup?.length === 0">
          标签暂无
        </div>
        <div class="tagHead" v-else>标签</div>

        <div
          class="tagContent"
          v-for="(item5, index5) in mvDetailData.data.videoGroup"
          :key="index5"
        >
          {{ item5.name }}
        </div>
      </div>

      <hr />
    </div>
  </van-floating-panel>
</template>

<script setup>
import { ref, reactive, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getMvDetailAlias } from "@/axios/routes/mv";
import { getMvUrlAlias } from "@/axios/routes/mv";
import { getMvDetail } from "@/axios/routes/mv";
import { getMvUrl } from "@/axios/routes/mv";

const route = useRoute();
const router = useRouter();
const id = ref(route.params.id);

const reg = /[a-zA-Z]/;
const tester = reg.test(id.value);
console.log("test", tester);
console.log(id.value);

let mvDetailAPI;
let mvUrlAPI;

let mvDetailData = reactive({
  data: {},
});

let mvUrlData = reactive({
  data: {},
});

watchEffect(() => {
  if (tester === false) {
    (async () => {
      mvDetailAPI = await getMvDetail(id.value);
      mvDetailData.data = mvDetailAPI.data.data;
      /*  console.log('okDetail',mvDetailData.data);  */
    })();

    (async () => {
      mvUrlAPI = await getMvUrl(id.value);
      mvUrlData.data = mvUrlAPI.data.data;
      /*  console.log('okUrl',mvUrlData.data);  */
    })();
  } else {
    (async () => {
      mvDetailAPI = await getMvDetailAlias(id.value);
      mvDetailData.data = mvDetailAPI.data.data;
      /*  console.log('okDetailAlias',mvDetailData.data);  */
    })();

    (async () => {
      mvUrlAPI = await getMvUrlAlias(id.value);

      mvUrlData.data = mvUrlAPI.data.urls[0];
      /*  console.log('okUrlAlias',mvUrlData.data);  */
    })();
  }
});

const timestamp = ref(0);
const year = ref(null);
const month = ref(null);
const day = ref(null);
watchEffect(() => {
  if (mvDetailData.data.publishTime != undefined) {
    timestamp.value = mvDetailData.data.publishTime;
    console.log(timestamp.value);
    const date = new Date(timestamp.value);
    year.value = date.getFullYear();
    month.value = date.getMonth() + 1;
    day.value = date.getDate();
  }
});

const isPlaying = ref(true);
console.log(isPlaying.value);

const anchors = [
  100,
  Math.round(0.45 * window.innerHeight),
  Math.round(0.8 * window.innerHeight),
];
const height = ref(anchors[1]);

const onClickLeft = () => history.back();
</script>

<style scoped>
.header {
  width: 100vw;
  height: 5vw;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4vw;
  font-weight: bold;
  margin-top: 2vw;
  margin-bottom: 2vw;
  margin-left: -3vw;
}

.specialHeader {
  width: 90vw;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4vw;
  font-weight: bold;
  margin-top: 2vw;
  margin-bottom: 2vw;
  margin-left: 0vw;
  color: rgb(175, 172, 168);
}

.relatedSinger {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-left: 1vw;
  margin-right: 2vw;
  margin-top: 2vw;
  margin-bottom: 2vw;
}

.reImg {
  width: 30vw;
  height: 30vw;
  border-radius: 2vw;
}

.reSingerName {
  width: 30vw;
  height: 5vw;
  margin-right: 5vw;
  font-size: 3vw;
  margin-top: 1vw;
}

.tag {
  width: 90vw;
  height: 20vw;
  margin-left: 1vw;
  margin-right: 2vw;
  margin-top: 2vw;
  margin-bottom: 2vw;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.tagHead {
  width: 90vw;
  height: 5vw;
  font-size: 4vw;
  font-weight: bold;
  margin-bottom: 2vw;
  color: rgb(91, 89, 89);
}

.tagContent {
  width: 90vw;
  height: 5vw;
  font-size: 3vw;
  margin-bottom: 1vw;
  color: rgb(155, 152, 147);
  display: flex;
  align-items: center;
  justify-content: center;
}

.panel {
  border: 0.1vw rgb(241, 234, 234) solid;
  background-color: rgb(221, 225, 236);
  position: absolute;
  z-index: 999999;
  max-height: 150vw;
  overflow: hidden;
}

.pausePanel {
  position: absolute;
  z-index: 999999;
}

.navbar {
  z-index: 99999;
}

.player {
  width: 100vw;
  height: 80vw;
  background-color: rgb(12, 12, 12);
  position: relative;
}

.overlay {
  width: 100vw;
  height: 90vw;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 99;
}

.layerWrapper {
  width: 90vw;
  height: 50vw;
  position: absolute;
  top: 27vw;
  left: 2.3vw;
  color: white;
  z-index: 999;
}
.layerSingerWrapper {
  max-height: 13vw;

  overflow: hidden;
  white-space: nowraprap;
  text-overflow: ellipsis;
}

.layerSinger {
  width: 90vw;
  height: 6.5vw;
  display: flex;
  margin-left: 4vw;
  align-items: center;
  font-size: 5.6vw;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  flex-wrap: wrap;
}

.judge2 {
  width: 90vw;
  height: 6.5vw;
  display: flex;
  margin-left: 4vw;
  align-items: center;
  font-size: 5.6vw;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: rgb(175, 172, 168);
}
.current {
  width: 90vw;
  height: 5vw;
  display: flex;
  margin-left: 2vw;
  align-items: center;
  font-size: 3.5vw;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.pause {
  width: 90vw;
  height: 5vw;
  display: flex;
  margin-left: 90%;
  align-items: center;
  font-size: 3.4vw;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-top: 2vw;
  margin-bottom: 2vw;
  color: rgb(175, 172, 168);
}

.layerName {
  width: 90vw;
  height: 10vw;
  /*  display: flex;
    align-items: center; */
  margin-left: 4vw;

  font-size: 7.5vw;
  font-weight: bold;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.special {
  width: 90vw;
  height: 20vw;
  margin-left: 4vw;

  font-size: 7.5vw;
  font-weight: bold;
  overflow: hidden;
  white-space: wrap;
  text-overflow: ellipsis;
}

.layerSinger {
  width: 90vw;
  height: 6w;
  display: flex;
  margin-left: 4vw;
  align-items: center;
  font-size: 5.6vw;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.briefDesc {
  width: 90vw;
  height: 20vw;

  margin-left: 5vw;

  font-size: 4vw;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-top: 3vw;
  margin-bottom: 2vw;
}

.descWrapper {
  width: 100vw;
  height: 20vw;
  background-color: rgb(236, 229, 229);
  display: flex;
  justify-content: center;

  flex-direction: column;
}

.desc {
  width: 90vw;
  height: 18vw;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
}
.img {
  width: 15vw;
  height: 15vw;
  border-radius: 2vw;
  margin-left: 2vw;
}

.descImg {
  width: 15vw;
  height: 15vw;
  border-radius: 2vw;
}

.desc1 {
  width: 40vw;
  height: 18vw;

  display: flex;
  justify-content: center;

  flex-direction: column;
  margin-left: 5vw;
}

.desc2 {
  width: 30vw;
  height: 18vw;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
}

.mvName {
  /* display: flex;
    align-items: center; */
  /*  flex-wrap: wrap; */
  font-size: 4vw;

  max-height: 5vw;
  width: 38lvw;
  overflow: hidden;

  white-space: nowrap;
  text-overflow: ellipsis;

  font-weight: bold;
}

.author {
  height: 4vw;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: flex;
  margin-top: 0.5vw;
  align-items: center;
  font-size: 2.5vw;
}

.playCount {
  width: 30vw;

  display: flex;
  justify-content: center;
  margin-bottom: 2vw;
  font-size: 3vw;
  font-weight: bold;
}

.publishTime {
  width: 30vw;
  height: 5vw;

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.5vw;
}
</style>
