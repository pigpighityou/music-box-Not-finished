<template>
  <div class="switchBannerWrapper">
    <img
      :src="banners.images[picKey]?.pic || banners.failImages[0]"
      alt="pic"
    />

    <div class="iconWrapper">
      <div
        class="icon"
        v-for="(item, index) in banners.images"
        :key="index"
        :class="{ active: index === picKey }"
        @click="
          picKey = index;
          isClick = true;
        "
      ></div>
    </div>
  </div>
</template>

<script setup>
import { getBannerAPI } from "@/axios/routes/bannerAPI.js";
import {
  ref,
  reactive,
  computed,
  onMounted,
  onUnmounted,
  watchEffect,
} from "vue";
let banners = reactive({
  images: [],
  failImages: [
    "https://redchairrecruitment.ie/wp-content/uploads/2019/05/No-Data.png",
  ],
});
let bannerAPI;

let isClick = ref(false);

/* watchEffect(()=>{
  console.log(isClick.value);
}) */
let picKey = ref(0);

let timer = setTimeout(function interval() {
  // 当用户手动点击时，必须取消计时器，防止定时器继续执行
  // 造成页面更新间隔出现过快现象
  if (isClick.value) {
    clearTimeout(timer);
    isClick.value = false;
    setTimeout(interval, 2500);
    return;
  }

  // 照片滚动
  if (picKey.value < banners.images.length - 1 && picKey.value >= 0) {
    picKey.value += 1;
  } else {
    picKey.value = 0;
  }

  setTimeout(interval, 2500);
}, 2500);

onMounted(async () => {
  try {
    bannerAPI = await getBannerAPI();
    /*  console.log("ok", bannerAPI); */
    banners.images = bannerAPI.data.banners; //一个数组
  } catch (e) {
    console.log("error", error);
  }
});

onUnmounted(() => {
  clearTimeout(timer);
});
</script>

<style scoped>
img {
  width: 100vw;
  height: 40vw;
}

.switchBannerWrapper {
  margin: 1% auto;
  position: relative;
}
.iconWrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  position: absolute;
  bottom: 3vw;
  left: 0;
  right: 0;
}
.icon {
  width: 2vw;
  height: 2vw;
  background-color: black;
  border-radius: 50%;
  margin: 0 1vw;
}

.active {
  background-color: rgb(172, 165, 165);
}
</style>
