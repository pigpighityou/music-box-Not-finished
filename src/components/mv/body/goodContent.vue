

<template>
  <van-nav-bar
    title="精品视频"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
    fixed="true"
    placeholder="true"
    class="navbar"
  />

  <div class="goodWrapper">
    <div class="content">
      <div class="goodMv">
        <div
          class="goodMvPic"
          v-for="(item, index) in goodMvList.mv"
          :key="index"
        >
          <div
            class="inner"
            @click="num = index"
            v-loading.fullscreen.lock="fullscreenLoading"
            element-loading-text="拼命加载中..."
          >
            <img :src="item.cover" alt="" class="img-good" />
            <div class="goodWord">
              <div class="name">
                {{ item.name }}
              </div>
              <div class="artist">
                {{ item.artistName }}
              </div>

              <div class="overlay" v-if="index != num"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getGoodMv } from "../../../axios/routes/goodMv";
let goodMvAPI;
let goodMvList = reactive({
  mv: [],
  failImages: [
    "https://redchairgoodruitment.ie/wp-content/uploads/2019/05/No-Data.png",
  ],
});

const onClickLeft = () => history.back();

(async () => {
  try {
    goodMvAPI = await getGoodMv();
    goodMvList.mv = goodMvAPI.data.data;
    /*    console.log('ok',goodMvList.mv)  */
  } catch (err) {
    console.log(err);
  }
})();

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
        params: { id: goodMvList.mv[num.value].id },
      });
    }, 800);
  }
});
</script>

<style scoped>
.navbar {
  position: relative;
  z-index: 9999999;
}

.overlay {
  width: 100vw;
  height: 59.5vw;
  border-radius: 2vw;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 1vw;
  position: absolute;
  top: -60vw;
  left: 0;
  z-index: 9;
  pointer-events: none;
}

.img-good {
  width: 100vw;
  height: 60vw;
  border-radius: 1vw;
}

.goodWord {
  position: relative;
}

.name {
  width: 90vw;
  height: 5vw;
  position: absolute;
  top: -56vw;
  left: 5vw;
  font-size: 4.3vw;
  font-weight: 800;
  color: white;
  margin: 1vw;
  z-index: 999;
}

.artist {
  position: absolute;
  top: -60vw;
  left: 0;
  font-size: 2.5vw;
  font-weight: 500;
  color: white;
  margin: 1vw;
  z-index: 999;
}
</style>
