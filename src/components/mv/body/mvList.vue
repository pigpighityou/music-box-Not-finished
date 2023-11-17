

<template>
  <div class="mvWrapper" v-for="(item, index) in mvRankList.mv" :key="index">
    <div class="firstWrapper" v-if="index == 0">
      <div class="mvInner">
        <div
          class="firstMvPic"
          v-loading.fullscreen.lock="fullscreenLoading"
          element-loading-text="拼命加载中..."
          @click="num = index"
        >
          <img :src="item.cover" alt="" class="img-first" />

          <div class="firstWord">
            <div class="name">
              {{ item.name }}
            </div>
            <div class="singer">
              {{ item.artistName }}
            </div>
          </div>

          <div class="topRank">
            <div class="num">
              {{ index + 1 }}
            </div>

            <div class="firstLastRank">
              <div class="down" v-if="item.lastRank - index - 1 < 0">
                <svg
                  class="downIcon"
                  v-if="item.lastRank != -1"
                  viewBox="0 0 1024 1024"
                  xmlns="http://www.w3.org/2000/svg"
                  data-v-ea893728=""
                >
                  <path
                    fill="currentColor"
                    d="m192 384 320 384 320-384z"
                  ></path>
                </svg>
                <div class="new" v-if="item.lastRank === -1">--</div>
                <div class="compareNum">
                  {{
                    item.lastRank == -1 ? "新上榜" : index + 1 - item.lastRank
                  }}
                </div>
              </div>
              <div class="up" v-else-if="item.lastRank - index - 1 > 0">
                <svg
                  class="upIcon"
                  v-if="item.lastRank != -1"
                  viewBox="0 0 1024 1024"
                  xmlns="http://www.w3.org/2000/svg"
                  data-v-ea893728=""
                >
                  <path
                    fill="currentColor"
                    d="M512 320 192 704h639.936z"
                  ></path>
                </svg>
                <div class="new" v-if="item.lastRank === -1">--</div>
                <div class="compareNum">
                  {{
                    item.lastRank == -1 ? "新上榜" : item.lastRank - index - 1
                  }}
                </div>
              </div>
              <div class="none" v-else-if="item.lastRank - index - 1 === 0">
                ---
              </div>
            </div>

            <div class="firstHot">{{ item.score }}分</div>
          </div>

          <div class="overlay" v-if="index != num"></div>
        </div>
      </div>

      <van-grid
        :column-num="3"
        :gutter="25"
        square="true"
        clickable="true"
        border="true"
        icon-size="8vw"
        class="grid"
      >
        <van-grid-item
          class="item"
          icon="apps-o"
          text="分类视频"
          to="/mv/category"
        />
        <van-grid-item icon="star-o" text="推荐视频" to="/mv/rec" />
        <van-grid-item icon="gift-o" text="精品视频" to="/mv/good" />
      </van-grid>
    </div>

    <div class="mv" v-else="index != 0">
      <div class="mvInner">
        <div
          class="mvPic"
          v-loading.fullscreen.lock="fullscreenLoading"
          element-loading-text="拼命加载中..."
          @click="num = index"
        >
          <!-- <router-link :to="{name:'mvPlayer',params:{id:item.id}}"> -->
          <img :src="item.cover" alt="mv" class="img" />
          <!--                 </router-link> -->

          <div class="words">
            <div class="name">
              {{ item.name }}
              {{ item.alias ? item.alias[0] : null }}
            </div>
            <div class="singer">
              {{ item.artistName }}
            </div>
          </div>

          <div class="rank">
            <div class="num">
              {{ index + 1 }}
            </div>

            <div class="lastRank">
              <div class="down" v-if="item.lastRank - index - 1 < 0">
                <svg
                  class="downIcon"
                  v-if="item.lastRank != -1"
                  viewBox="0 0 1024 1024"
                  xmlns="http://www.w3.org/2000/svg"
                  data-v-ea893728=""
                >
                  <path
                    fill="currentColor"
                    d="m192 384 320 384 320-384z"
                  ></path>
                </svg>
                <div class="new" v-if="item.lastRank === -1">--</div>
                <div class="compareNum">
                  {{
                    item.lastRank == -1 ? "新上榜" : index + 1 - item.lastRank
                  }}
                </div>
              </div>
              <div class="up" v-else-if="item.lastRank - index - 1 > 0">
                <svg
                  class="upIcon"
                  v-if="item.lastRank != -1"
                  viewBox="0 0 1024 1024"
                  xmlns="http://www.w3.org/2000/svg"
                  data-v-ea893728=""
                >
                  <path
                    fill="currentColor"
                    d="M512 320 192 704h639.936z"
                  ></path>
                </svg>
                <div class="new" v-if="item.lastRank === -1">--</div>
                <div class="compareNum">
                  {{
                    item.lastRank == -1 ? "新上榜" : item.lastRank - index - 1
                  }}
                </div>
              </div>
              <div class="none" v-else-if="item.lastRank - index - 1 === 0">
                ---
              </div>
            </div>

            <div class="hot">{{ item.score }}分</div>
          </div>

          <div class="overlay" v-if="index != num"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getMvRank } from "../../../axios/routes/mvRank";
import mvCategory from "../body/mvCategory.vue";
import goodMv from "../body/goodMv.vue";
import recMv from "../body/recMv.vue";

let mvRankListAPI;
let mvRankList = reactive({
  mv: [],
  failImages: [
    "https://redchairrecruitment.ie/wp-content/uploads/2019/05/No-Data.png",
  ],
});

(async () => {
  try {
    mvRankListAPI = await getMvRank();
    mvRankList.mv = mvRankListAPI.data.data;
    /*   console.log('ok',mvRankList.mv)  */
  } catch (err) {
    console.log(err);
  }
})();

const overlay = ref(true);
const num = ref(null);

const route = useRoute();
const router = useRouter();

const fullscreenLoading = ref(false);

const openFullScreen1 = () => {
  fullscreenLoading.value = true;
  setTimeout(() => {
    fullscreenLoading.value = false;
  }, 500);
};

// 当弃掉了遮罩层，加载，路由到新的视频播放界面
watchEffect(() => {
  if (num.value || num.value === 0) {
    setTimeout(() => {
      openFullScreen1();
    }, 300);

    setTimeout(() => {
      router.push({
        name: "mvPlayer",
        params: { id: mvRankList.mv[num.value].id },
      });
    }, 800);
  }
});
</script>

<style scoped>
.overlay {
  width: 100%;
  height: 99%;
  border-radius: 2vw;
  background-color: rgba(0, 0, 0, 0.45);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
  pointer-events: none;
}

.img-first {
  width: 100vw;
  height: 70vw;
  border-radius: 2vw;
}
.firstMvPic {
  position: relative;
}
.firstLastRank {
  margin-left: 3.5vw;
  position: absolute;
  top: 1vw;
  left: 7vw;
  color: white;
  font-size: 3vw;
  width: 30vw;
  font-weight: bolder;
}

.compareNum {
  font-size: 3vw;
  margin-left: 4vw;
  margin-top: -4.5vw;
  color: white;
  font-weight: bolder;
}

.downIcon {
  width: 4vw;
  height: 4vw;
  margin-top: -0.5vw;
}

.upIcon {
  width: 4vw;
  height: 4vw;
  margin-top: -0.5vw;
}

.new {
  width: 4vw;
  height: 4vw;
  margin-top: -0.5vw;
}

.firstWord {
  width: 100vw;
  height: 15vw;
  border-radius: 2vw;
  color: white;
  background-color: none;

  top: 3vw;
  left: 3vw;
  position: absolute;
  z-index: 9999;
}
.topRank {
  z-index: 9999;
  position: absolute;
  top: 58vw;
  left: 4vw;
  color: white;
  font-size: 8vw;
}

.firstHot {
  margin-left: 3.5vw;
  position: absolute;
  top: 4.2vw;
  left: 6vw;
  color: white;
  font-size: 3vw;
  width: 30vw;
}

.grid {
  width: 100vw;
  height: 25.3vw;
  margin-bottom: 1vw;
  margin-top: 1vw;
}

.lastRank {
  margin-left: 3.5vw;
  position: absolute;
  top: 1vw;
  left: 8vw;
  color: white;
  font-size: 3vw;
  width: 30vw;
  font-weight: bolder;
}

.name {
  margin-bottom: 0.5vw;
  font-size: 4.5vw;
  overflow: auto;
}

.singer {
  font-size: xx-small;
  overflow: auto;
}

.img {
  width: 100vw;
  height: 50vw;
  border-radius: 2vw;
  background-color: rgba(0, 0, 0, 0.5);
}

.mvPic {
  position: relative;
}

.rank {
  position: absolute;
  top: 39vw;
  left: 4vw;
  color: white;
  font-size: 8vw;
  z-index: 9999;
}

.hot {
  margin-left: 3vw;
  position: absolute;
  top: 4.3vw;
  left: 8vw;
  color: white;
  font-size: 3vw;
  width: 30vw;
}

.words {
  width: 100vw;
  height: 15vw;
  border-radius: 2vw;
  color: white;
  background-color: none;
  top: 4vw;
  left: 4vw;
  position: absolute;
  z-index: 9999;
}

.components {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-left: 1vw;
  margin-right: 1vw;
  margin-top: 0.5vw;
  margin-bottom: 0.7vw;
}
</style>
