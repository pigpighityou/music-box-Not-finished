<script setup>
import { ref, reactive } from "vue";
import { getRecMv } from "../../../axios/routes/recMv";
let recMvAPI;
let recMvList = reactive({
  mv: [],
  failImages: [
    "https://redchairrecruitment.ie/wp-content/uploads/2019/05/No-Data.png",
  ],
});

const onClickLeft = () => history.back();

(async () => {
  try {
    recMvAPI = await getRecMv();
    recMvList.mv = recMvAPI.data.result;
    /* console.log('ok',recMvList.mv)   */
  } catch (err) {
    console.log(err);
  }
})();
</script>

<template>
  <van-nav-bar
    title="推荐mv"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
    fixed="true"
    placeholder="true"
    class="navbar"
  />

  <div class="recWrapper">
    <div class="content">
      <div class="recMv">
        <div
          class="recMvPic"
          v-for="(item, index) in recMvList.mv"
          :key="index"
        >
          <router-link :to="{ name: 'mvPlayer', params: { id: item.id } }">
            <img :src="item.picUrl" alt="" class="img-rec" />
          </router-link>
          <div class="recWord">
            <div class="name">
              {{ item.name }}
            </div>
            <div class="artist">
              {{ item.artistName }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.navbar {
  position: relative;
  z-index: 9999999;
}

.img-rec {
  width: 100vw;
  height: 60vw;
  border-radius: 1vw;
}

.recWord {
  position: relative;
}

.name {
  position: absolute;
  top: -56vw;
  left: 5vw;
  font-size: 5vw;
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
