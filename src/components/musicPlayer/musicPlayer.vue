<template>
  <div class="musicPlayerWrapper" ref="musicPlayer">
    <audio ref="audio" :src="store.state.url" @ended="nextSong"></audio>

    <div class="album">
      <img
        :src="
          store.state.playSong?.al?.picUrl ||
          store.state.playSong?.album?.picUrl ||
          store.state.playSong?.data?.al.picUrl ||
          store.state.playSong?.mainSong?.album?.blurPicUrl ||
          'https://redchairrecruitment.ie/wp-content/uploads/2019/05/No-Data.png'
        "
        alt="pic"
        class="albumPic"
      />
    </div>

    <div class="name">
      <div>
        {{ store.state.playSong?.name || store.state.playSong?.data?.name }}
      </div>
    </div>

    <div class="author">
      <div
        v-for="(item, index) in store.state.playSong?.ar ||
        store.state.playSong?.artists ||
        store.state.playSong?.data?.ar ||
        store.state.playSong?.mainSong?.artists ||
        store.state.playSong?.dj?.nickname"
        :key="index"
      >
        {{ item.name }}
      </div>
    </div>

    <div class="icon">
      <svg
        class="playIcon"
        v-if="store.state.isPlayingSong === false"
        @click="play"
        viewBox="0 0 1024 1024"
        xmlns="http://www.w3.org/2000/svg"
        data-v-ea893728=""
      >
        <path
          fill="currentColor"
          d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 832a384 384 0 0 0 0-768 384 384 0 0 0 0 768zm-48-247.616L668.608 512 464 375.616v272.768zm10.624-342.656 249.472 166.336a48 48 0 0 1 0 79.872L474.624 718.272A48 48 0 0 1 400 678.336V345.6a48 48 0 0 1 74.624-39.936z"
        ></path>
      </svg>
      <svg
        class="playIcon"
        v-if="store.state.isPlayingSong === true"
        @click="pause"
        viewBox="0 0 1024 1024"
        xmlns="http://www.w3.org/2000/svg"
        data-v-ea893728=""
      >
        <path
          fill="currentColor"
          d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 832a384 384 0 0 0 0-768 384 384 0 0 0 0 768zm-96-544q32 0 32 32v256q0 32-32 32t-32-32V384q0-32 32-32zm192 0q32 0 32 32v256q0 32-32 32t-32-32V384q0-32 32-32z"
        ></path>
      </svg>
    </div>

    <div class="listSongs">
      <svg
        @click="drawer = true"
        class="moreIcon"
        viewBox="0 0 1024 1024"
        xmlns="http://www.w3.org/2000/svg"
        data-v-ea893728=""
      >
        <path
          fill="currentColor"
          d="M896 192H128v128h768V192zm0 256H384v128h512V448zm0 256H128v128h768V704zM320 384 128 512l192 128V384z"
        ></path>
      </svg>
    </div>

    <el-drawer
      class="drawerWrapper"
      v-model="drawer"
      title="歌曲详情"
      :direction="direction"
      size="100%"
      append-to-body="true"
      z-index="999999"
    >
      <div class="songDetailWrapper">
        <div class="picDetail">
          <img
            :src="
              store.state.playSong?.al?.picUrl ||
              store.state.playSong?.album?.picUrl ||
              store.state.playSong?.data?.al.picUrl ||
              store.state.playSong?.mainSong?.album?.blurPicUrl ||
              store.state.playSong?.blurCoverUrl
            "
            alt="pic"
            class="pic picSpin"
            :class="{
              picSpin_active: store.state?.isPlayingSong === true,
              picSpin_pause: store.state?.isPlayingSong === false,
            }"
          />
        </div>

        <div class="descHeader">
          <div class="nameDetail">
            <div class="nameContent">
              {{
                store.state.playSong?.name || store.state.playSong?.data?.name
              }}
            </div>
          </div>
          <div class="mark">
            <svg
              class="markIcon"
              @click="marked"
              :class="{ clickMark: markIconColor === true }"
              viewBox="0 0 1024 1024"
              xmlns="http://www.w3.org/2000/svg"
              data-v-ea893728=""
            >
              <path
                fill="currentColor"
                d="M384 960v-64h192.064v64H384zm448-544a350.656 350.656 0 0 1-128.32 271.424C665.344 719.04 640 763.776 640 813.504V832H320v-14.336c0-48-19.392-95.36-57.216-124.992a351.552 351.552 0 0 1-128.448-344.256c25.344-136.448 133.888-248.128 269.76-276.48A352.384 352.384 0 0 1 832 416zm-544 32c0-132.288 75.904-224 192-224v-64c-154.432 0-256 122.752-256 288h64z"
              ></path>
            </svg>
            <!--  <div class="markWord">
                    {{ store.state.playSong.data.mark<10000?store.state.playSong.data.mark:((store.state.playSong.data.mark)/10000).toFixed(1)+'w' }}
                </div> -->
          </div>

          <div class="publishTime">
            发布时间：<br />
            {{ publish }}
          </div>
        </div>

        <div class="desc">
          <div class="singerDetail">
            <div class="singerIcon">
              <i class="iconfont icon-jiantouyou"></i>
            </div>
            <div
              @click="drawer2 = true"
              class="singerContent"
              v-for="(item, index) in store.state.playSong?.ar ||
              store.state.playSong?.artists ||
              store.state.playSong?.data?.ar ||
              store.state.playSong?.mainSong?.artists"
              v-if="store.state?.playSong?.hasOwnProperty('radio') === false"
              :key="index"
            >
              {{ item.name }}
            </div>

            <el-drawer
              v-model="drawer2"
              title="歌手"
              :direction="direction"
              :before-close="handleClose"
              size="40%"
            >
              <div
                class="singerContent singerContent2"
                v-for="(item, index) in store.state.playSong?.ar ||
                store.state.playSong?.artists ||
                store.state.playSong?.data?.ar ||
                store.state.playSong?.mainSong?.artists"
                :key="index"
              >
                <router-link
                  :to="{ name: 'listSinger', params: { id: item.id } }"
                  style="color: black"
                  @click="drawer = false"
                >
                  <div><i class="iconfont icon-xiajiantou1"></i></div>
                  {{ item.name }}
                </router-link>
              </div>
            </el-drawer>
          </div>

          <div class="mvDetail">
            <div
              class="mvContent"
              v-if="store.state.playSong.data?.mv || store.state.playSong?.mv"
            >
              <!--  {{ store.state.playSong.data.mv||store.state.playSong.mv }} -->
              <!-- {{ store.state.playSong.mv||store.state.playSong.data.mv }} -->
              <router-link
                :to="{
                  name: 'mvPlayer',
                  params: {
                    id:
                      store.state.playSong.data?.mv || store.state.playSong?.mv,
                  },
                }"
                style="color: black"
              >
                <svg
                  class="mvIcon"
                  viewBox="0 0 1024 1024"
                  xmlns="http://www.w3.org/2000/svg"
                  data-v-ea893728=""
                >
                  <path
                    fill="currentColor"
                    d="m768 576 192-64v320l-192-64v96a32 32 0 0 1-32 32H96a32 32 0 0 1-32-32V480a32 32 0 0 1 32-32h640a32 32 0 0 1 32 32v96zM192 768v64h384v-64H192zm192-480a160 160 0 0 1 320 0 160 160 0 0 1-320 0zm64 0a96 96 0 1 0 192.064-.064A96 96 0 0 0 448 288zm-320 32a128 128 0 1 1 256.064.064A128 128 0 0 1 128 320zm64 0a64 64 0 1 0 128 0 64 64 0 0 0-128 0z"
                  ></path>
                </svg>
              </router-link>
            </div>
          </div>
        </div>

        <div class="bottom">
          <div class="playTimeWrapper">
            <div class="currentTimer">{{ minute }}:{{ second }}&nbsp;/</div>
            <div class="totalTimer">
              {{ (audio?.duration / 60).toFixed(0) }}:{{
                (audio?.duration % 60).toFixed(0)
              }}
            </div>
          </div>

          <div class="iconSet">
            <div class="last" @click="lastSong">
              <svg
                class="playIcon"
                viewBox="0 0 1024 1024"
                xmlns="http://www.w3.org/2000/svg"
                data-v-ea893728=""
              >
                <path
                  fill="currentColor"
                  d="M529.408 149.376a29.12 29.12 0 0 1 41.728 0 30.592 30.592 0 0 1 0 42.688L259.264 511.936l311.872 319.936a30.592 30.592 0 0 1-.512 43.264 29.12 29.12 0 0 1-41.216-.512L197.76 534.272a32 32 0 0 1 0-44.672l331.648-340.224zm256 0a29.12 29.12 0 0 1 41.728 0 30.592 30.592 0 0 1 0 42.688L515.264 511.936l311.872 319.936a30.592 30.592 0 0 1-.512 43.264 29.12 29.12 0 0 1-41.216-.512L453.76 534.272a32 32 0 0 1 0-44.672l331.648-340.224z"
                ></path>
              </svg>
            </div>

            <div class="icon">
              <svg
                class="playIcon"
                v-if="store.state.isPlayingSong === false"
                @click="play"
                viewBox="0 0 1024 1024"
                xmlns="http://www.w3.org/2000/svg"
                data-v-ea893728=""
              >
                <path
                  fill="currentColor"
                  d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 832a384 384 0 0 0 0-768 384 384 0 0 0 0 768zm-48-247.616L668.608 512 464 375.616v272.768zm10.624-342.656 249.472 166.336a48 48 0 0 1 0 79.872L474.624 718.272A48 48 0 0 1 400 678.336V345.6a48 48 0 0 1 74.624-39.936z"
                ></path>
              </svg>
              <svg
                class="playIcon"
                v-if="store.state.isPlayingSong === true"
                @click="pause"
                viewBox="0 0 1024 1024"
                xmlns="http://www.w3.org/2000/svg"
                data-v-ea893728=""
              >
                <path
                  fill="currentColor"
                  d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 832a384 384 0 0 0 0-768 384 384 0 0 0 0 768zm-96-544q32 0 32 32v256q0 32-32 32t-32-32V384q0-32 32-32zm192 0q32 0 32 32v256q0 32-32 32t-32-32V384q0-32 32-32z"
                ></path>
              </svg>
            </div>

            <div class="next" @click="next_Song">
              <svg
                class="playIcon"
                viewBox="0 0 1024 1024"
                xmlns="http://www.w3.org/2000/svg"
                data-v-ea893728=""
              >
                <path
                  fill="currentColor"
                  d="M452.864 149.312a29.12 29.12 0 0 1 41.728.064L826.24 489.664a32 32 0 0 1 0 44.672L494.592 874.624a29.12 29.12 0 0 1-41.728 0 30.592 30.592 0 0 1 0-42.752L764.736 512 452.864 192a30.592 30.592 0 0 1 0-42.688zm-256 0a29.12 29.12 0 0 1 41.728.064L570.24 489.664a32 32 0 0 1 0 44.672L238.592 874.624a29.12 29.12 0 0 1-41.728 0 30.592 30.592 0 0 1 0-42.752L508.736 512 196.864 192a30.592 30.592 0 0 1 0-42.688z"
                ></path>
              </svg>
            </div>
          </div>
        </div>

        <van-progress
          stroke-width="2vw"
          pivot-text=""
          :percentage="percentage"
          class="progress"
        />

        <!--  {{ store.state.playIndex }}

        {{ store.state.isPlayingSong }} -->
       

        <div class="lyricWrapper" ref="lyricElement">
          <div
            class="lyric"
            v-for="(lyricItem, lyricIndex) in store.getters?.lyrics"
            :key="lyricIndex"
            :class="{
              active:
                audio.currentTime >= lyricItem.time &&
                audio.currentTime < lyricItem.nextTime,
            }"
          >
            <!-- <div class="lyric"> -->

            <div class="lyricCSS">
              {{ lyricItem.lyric }}
            </div>
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script setup>
import {
  ref,
  reactive,
  onMounted,
  computed,
  provide,
  watchEffect,
  KeepAlive,
  watch,
} from "vue";
import { useRouter, useRoute } from "vue-router";
import { getSongs } from "@/axios/routes/getSongs.js";
import store from "@/store/store";
import { toLocalStorage } from "@/lib/toLocalStorage";
import { fromLocalStorage } from "@/lib/toLocalStorage";

const router = useRouter();
const route = useRoute();

const drawer = ref(false);
const drawer2 = ref(false);
const direction = ref("btt");

const musicPlayer = ref(null);

// 日常打卡歌单小按钮
const markIconColor = ref(false);
const marked = () => {
  if (markIconColor.value === true) {
    store.state.playSong.data.mark === store.state.playSong.data.mark;
  } else if (markIconColor.value === false) {
    markIconColor.value = true;
    store.state.playSong.data.mark += 1;
  }
};

// 歌曲发布时间 (因为歌单数据有不同版本，所以只能用暴力方法判断)
const publish = computed(() => {
  const date = new Date(
    store.state.playSong.data?.publishTime ||
      store.state.playSong?.publishTime ||
      store.state.playSong?.album?.publishTime ||
      store.state.playSong?.scheduledPublishTime
  );
  if (
    store.state.playSong.data?.publishTime ||
    store.state.playSong?.publishTime === 0
  ) {
    return "未提供";
  } else {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return year + "-" + month + "-" + day;
  }
});

// 上一首歌
const lastSong = () => {
  if (store.state.playIndex > 0) {
    store.state.playIndex -= 1;
  } else {
    store.state.playIndex = store.state.playList.length - 1;
  }
  store.commit("getIndexPlay", store.state.playIndex);
};

// 下一首歌
const next_Song = () => {
  if (store.state.playIndex < store.state.playList.length - 1) {
    store.state.playIndex += 1;
  } else {
    store.state.playIndex = 0;
  }
  store.commit("getIndexPlay", store.state.playIndex);
};

// 实现歌词滚动
const lyricElement = ref(null);

watchEffect(() => {
  if (lyricElement.value) {
    setTimeout(function time() {
      const el = document.querySelector(".active");
      // 查看元素对象里的方法，必须加[]
      // 引用时，不要加
      /* console.log([el]) 
                        console.log(el.offsetTop)  */
      if (el?.offsetTop > 616) {
        // 如果超过距离顶部的某个临界值，超过多少，就让他滚动多少
        //以确保歌词一直在同一个地方

        lyricElement.value.scrollTop = el.offsetTop - 616;
        /*  console.log(lyricElement.value.scrollTop) */
      }

      setTimeout(time, 1000);
    }, 1000);
  }
});

const hasFootBar = ref(store.state.hasFootBar);

const audio = ref(null);



let audioState = reactive({});

const percentage = ref(0);

// 进度条
watchEffect(() => {
  if (audio.value) {
    setTimeout(function setPer() {
      percentage.value = (
        (audio.value?.currentTime / audio.value?.duration) *
        100
      ).toFixed(1);
      /*  console.log(percentage.value)  */
      /*   console.log('currentTime',audio.value.currentTime) */
      setTimeout(setPer, 1000);
    }, 1000);
  }
});

// 当前歌曲时间，转换为分秒

const minute = ref();
const second = ref();

watchEffect(() => {
  if (audio.value) {
    setTimeout(function time() {
      minute.value = ref(Math.floor(audio.value?.currentTime / 60));
      second.value = ref(Math.floor(audio.value?.currentTime % 60));
      setTimeout(time, 1000);
    }, 1000);
  }
});

// 保存歌词当前状态，防止重载歌曲有些实时数据也重载
watchEffect(() => {
  if (audio.value) {
    audioState = reactive({
      currentTime: audio.value.currentTime,
      paused: audio.value.paused,
    });
  }
});

// 离开的时候也要记录状态,否则一刷新，就重制了
window.addEventListener("beforeunload", () => {
  
  store.state.isPlayingSong = false;
  if (store.state.playSong) {

    localStorage.setItem("currentTime", audio.value?.currentTime);
      toLocalStorage("currentTime", audio.value?.currentTime), 
      toLocalStorage("paused", audio.value?.paused),
      toLocalStorage("isPlayingSong", store.state?.isPlayingSong),
      toLocalStorage("playSong", store.state?.playSong),
      toLocalStorage("playIndex", store.state?.playIndex);
  }
});

const cachedCurrentTime = fromLocalStorage("currentTime?");
const cachedPlaySong = fromLocalStorage("playSong");
const cachedIsPlayingSong = fromLocalStorage("isPlayingSong");
const cachedPlayIndex = fromLocalStorage("playIndex");

//  重载后发生的事情
// 网页重载后的值放进去了，有，则进行下面的内容
watchEffect(() => {
  if (audio.value) {
  
    if (cachedPlaySong) {
    
      audio.value.currentTime = cachedCurrentTime;
    
      store.state.isPlayingSong = cachedIsPlayingSong;
      store.state.playSong = cachedPlaySong;
      store.state.playIndex = cachedPlayIndex;
    }
  }
});

router.beforeEach((to, from, next) => {
  /*  console.log('路由即将跳转');   */
  if (store.state.isPlayingSong === true) {
    store.state.isPlayingSong === true;
  } else if (store.state.isPlayingSong === false) {
    store.state.isPlayingSong === false;
  }
  if (audio.value) {
    toLocalStorage("pausedAlias", audio.value.paused);
    toLocalStorage("isPlayingSongAlias", store.state?.isPlayingSong);
    toLocalStorage("playSongAlias", store.state?.playSong);
    toLocalStorage("playIndexAlias", store.state?.playIndex);
   

    /*  } */
  }

  next();
});

// 进入页面，加载，找到状态，恢复
// isPlayingSong的作用就是每次不小心刷新或者路由跳转引起的故障导致的歌曲暂停，
// 可以把按钮的状态也变成暂停

const cachedPlaySongAlias = fromLocalStorage("playSongAlias?");
const cachedIsPlayingSongAlias = fromLocalStorage("isPlayingSongAlias?");
const cachedPlayIndexAlias = fromLocalStorage("playIndexAlias?");

router.afterEach((to, from) => {
  if (audio.value) {
    if (cachedPlaySong && audio.value) {
      console.log("跳转后");
      store.state.isPlayingSong = cachedIsPlayingSongAlias;
      store.state.playSong = cachedPlaySongAlias;
      store.state.playIndex = cachedPlayIndexAlias;
      // 下面绝对不能加，加了进度条就变成上次的进度条了
      /*   audio.value.currentTime=JSON.parse(cachedCurrentTimeAlias) */
    }
  }
});

// 防止资源加载不出来，点按钮可实现再次获取资源
const backUpGetUrl = async () => {
  try {
    // 电台id应为maintrackid，但是其也有id，所以
    // 应该先判断maintrackid是否存在（是否是电台），不存在再判断id是否存在
    if (
      store.state.playSong.mainTrackId ||
      store.state.playSong.id ||
      store.state.playSong.resourceId
    ) {
      const res = await getSongs(
        store.state.playSong.mainTrackId ||
          store.state.playSong.id ||
          store.state.playSong.resourceId
      );

      store.state.url = res.data.data[0]?.url;
    }
  } catch (err) {
    console.log(err);
  }
};

// 播放功能
const play = () => {
  audio.value.play();
  store.state.audioState = audioState;

  store.state.isPlayingSong = true;

  backUpGetUrl();
};

//  暂停功能
const pause = () => {
  audio.value.pause();
  store.state.audioState = audioState;

  store.state.isPlayingSong = false;

  backUpGetUrl();
};

//  切换歌，按钮应该变为暂停键
watchEffect(() => {
  if (store.state.playSong) {
    if (audio.value) {
      backUpGetUrl();
    }
  }
});

//  下一首歌
const nextSong = () => {
  store.state.playIndex++;
  store.commit("getIndexPlay", store.state.playIndex);
};
</script>

<style scoped>
.lyricWrapper {
  width: 100vw;
  height: 60vw;
  overflow: scroll;
  margin-left: -2vw;
}

.lyric {
}
.lyricCSS {
  font-size: 3.3vw;
  text-align: center;
  margin-top: 4vw;
  margin-bottom: 2vw;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100vw;
  height: 4.3vw;
  line-height: 4.3vw;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: -2vw;
  font-family: cursive;
  font-weight: 700;
}

.active {
  color: rgb(138, 147, 19);

  transform: scale(1.2);
}

.songDetailWrapper {
}

.pic {
  border-radius: 50%;
  border: 0.3vw grey solid;
  width: 75vw;
  height: 75vw;
  display: flex;
  margin: 0 auto;
}

.picSpin {
  animation: spinAround 12s linear infinite;
}

.picSpin_active {
  animation-play-state: running;
}

.picSpin_pause {
  animation-play-state: paused;
}

@keyframes spinAround {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.descHeader {
  display: flex;
  flex-direction: row;
  margin-top: 5vw;
  width: 100vw;
  margin-bottom: 5vw;
  justify-content: space-between;
}

.nameDetail {
  width: 60vw;
  height: 8vw;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 6vw;
}

.mark {
  font-size: 3vw;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 10vw;
}
.markWord {
}

.markIcon {
  width: 4.5vw;
  height: 4.5vw;
}

.clickMark {
  color: rgb(181, 193, 57);
}

.publishTime {
  font-size: 2.5vw;
  width: 33vw;
  height: 8vw;
  display: flex;
  align-items: center;
  justify-content: center;
}

.desc {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 9vw;
}

.singerDetail {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  overflow: hidden;
  max-height: 4vw;
  white-space: ellipsis;
  width: 80vw;
}

.singerIcon {
  margin-left: -1vw;
  margin-right: 0.8vw;
  margin-top: -0.25vw;
  transform: scale(0.8);
}

.singerContent {
  margin-left: 0.5vw;
  margin-right: 2vw;
  font-size: 3.5vw;
}
.singerContent2 {
  margin-bottom: 25vw;
}

.mvContent {
  margin-left: 2vw;
}

.mvIcon {
  margin-left: 3vw;
  width: 7vw;
  height: 7vw;
}

.playTimeWrapper {
  display: flex;
  flex-direction: row;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  color: dimgray;
  margin-top: 1vw;
  position: fixed;
  bottom: 16.5vw;
  left: 44.5vw;
}

.iconSet {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-left: -5vw;
  margin-top: 5vw;
  margin-bottom: 5vw;
  width: 100vw;
  position: fixed;
  bottom: 0;
  transform: scale(1);
}

.iconSet .icon {
  width: 10vw;
  height: 10vw;
  fill: #ccc;
  margin-left: -12vw;
  margin-top: -1vw;
  transform: scale(1.3);
}

.progress {
  width: 100vw;
  height: 1vw;
  margin-top: 5vw;
  margin-bottom: 5vw;
  margin-left: -5vw;
  position: fixed;
  bottom: 16vw;

  background-color: #ccc;
}

.musicPlayerWrapper {
  width: 100vw;
  height: 18vw;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 999999;

  display: flex;
  flex-direction: row;
  overflow: hidden;
  align-items: center;
  box-sizing: border-box;
  border-top: 1px solid #ccc;
  box-shadow: 0 0 10px #ccc;
}

.album {
  width: 18vw;
  height: 15vw;
  margin: 0 2vw;
  border-radius: 50%;
  background-color: #ccc;
  overflow: hidden;
}

.albumPic {
  width: 100%;
  height: 100%;
}

.name {
  font-size: 4vw;
  color: #333;
  margin: 0 2vw;
  overflow: hidden;
  width: 25vw;
}

.nameContent {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.name div {
  white-space: nowrap;
  animation: myMove 8s linear infinite;
}

.author {
  font-size: 3.5vw;
  color: #333;
  margin: 0 2vw;
  overflow: hidden;
  width: 25vw;
  display: flex;
  flex-direction: row;
  max-height: 4vw;
  margin-top: -0.6vw;
}

.author div {
  white-space: nowrap;

  margin-right: 4vw;
  animation: myMove 8s linear infinite;
}

/*文字无缝滚动*/
@keyframes myMove {
  0% {
    transform: translateX(40vw);
  }
  100% {
    transform: translateX(-50vw);
  }
}

.icon {
  width: 10vw;
  height: 10vw;
  fill: #ccc;
}

.playIcon {
  width: 10vw;
  height: 10vw;
  fill: #ccc;
  margin: 0 5vw;
  transform: scale(0.95);
}

.moreIcon {
  width: 10vw;
  height: 10vw;
  fill: #ccc;
  margin: 0 5vw;
}

.listSongs {
  width: 10vw;
  height: 10vw;
  fill: #ccc;
  margin: 0 3vw;
  margin-right: 5vw;
  transform: scale(0.95);
}
</style>
