

<template>
  <div class="bannerWrapper">
    <img v-for="item in banners.images" :src="item.pic" alt="pic" />
  </div>
  <div>
    {{ banners.images[0]?.pic || "No data " }}
  </div>
</template>

<script setup>
import { getBannerAPI } from "../axios/routes/bannerAPI.js";
import { ref, reactive, computed, onMounted } from "vue";
let banners = reactive({
  images: [],
  failImages: [
    "https://redchairrecruitment.ie/wp-content/uploads/2019/05/No-Data.png",
  ],
});
let bannerAPI;

let src = ref();
onMounted(
  // 需要修改，封装打包
  async () => {
    try {
      bannerAPI = await getBannerAPI();
      console.log("ok", bannerAPI);
      banners.images = bannerAPI.data.banners;
    } catch (e) {
      console.log("error", error);
    }
  },
);
</script>

<style scoped>
.bannerWrapper {
  display: flex;
  position: relative;
  overflow: auto;
}
img {
  width: 100vw;
  height: 40vw;
}
</style>
