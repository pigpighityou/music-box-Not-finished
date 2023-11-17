

<template>
  <router-link :to="{ name: 'adContent', params: { id: index } }">
    <img :src="adBanner.ad[index]" alt="ad" class="ad" v-if="adBanner.ad" />
    <img
      :src="adBanner.ad[index]"
      alt="ad"
      class="ad"
      v-else="adBanner.failImages"
    />
  </router-link>

  <!--  {{index}} -->
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from "vue";
const adBanner = reactive({
  ad: [
    "https://pic.ntimg.cn/file/20200831/2708320_113851911086_2.jpg",
    "https://pic.616pic.com/ys_bnew_img/00/30/66/olpSEZKhFL.jpg",
  ],
  failImages: [
    "https://redchairrecruitment.ie/wp-content/uploads/2019/05/No-Data.png",
  ],
});

const index = ref(0);

let timer = setTimeout(function switcher() {
  if (index.value >= adBanner.ad.length - 1) {
    index.value = 0;
  } else {
    index.value++;
  }

  setTimeout(switcher, 2000);
}, 2000);

onUnmounted(() => {
  clearTimeout(timer);
});
</script>

<style scoped>
.ad {
  width: 100%;
  height: 100%;
  border-radius: 1vw;
}
</style>
