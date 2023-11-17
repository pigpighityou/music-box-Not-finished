<template>
  <van-nav-bar
    title="热门歌手列表"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
    class="navBar"
  />

  <div class="songListWrapper">
    <div
      class="list"
      v-for="(item, index) in hotSingerList.artists"
      :key="index"
    >
      <div class="rank">
        {{ index + 1 }}
      </div>

      <router-link :to="{ name: 'listSinger', params: { id: item.id } }">
        <div class="img">
          <img :src="item.picUrl" alt="pic" class="pic" />
        </div>
      </router-link>

      <div class="desc">
        {{ item.name }}
        <!-- {{ item.id }} -->
        <div class="alias" v-for="(item1, index1) in item.alias" :key="index">
          {{ item1 }}
        </div>
      </div>
    </div>
  </div>
  <div class="blank"></div>
</template>

<script setup>
import { getHotSinger } from "@/axios/routes/hotSingerAPI.js";
import { ref, reactive, onMounted, computed } from "vue";

import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

let hotSingerAPI;
let hotSingerList = reactive({
  artists: [],
  failImages: [
    "https://redchairrecruitment.ie/wp-content/uploads/2019/05/No-Data.png",
  ],
});

(async () => {
  try {
    hotSingerAPI = await getHotSinger();
    hotSingerList.artists = hotSingerAPI.data.artists;
    /*   console.log('ok',hotSingerList.artists)   */
  } catch (err) {
    console.log(err);
  }
})();

const singerList = computed(() => {
  if (hotSingerList.artists) {
    return hotSingerList.artists;
  } else {
    return "https://redchairrecruitment.ie/wp-content/uploads/2019/05/No-Data.png";
  }
});

const onClickLeft = () => {
  router.push("/world");
};
</script>

<style scoped>
.navBar {
  position: sticky;
  top: 0;
}

.list {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 1vw 0;
  padding: 0 1vw;
  border-bottom: 1px solid #ccc;
}

.rank {
  min-width: 10vw;
  height: 100%;
  text-align: center;

  color: #ccc;
}

.desc {
  width: 40vw;
  height: 100%;

  margin-left: 1vw;
}

.count {
  width: 30vw;
  height: 100%;

  text-align: center;

  margin-left: 1vw;
}

.alias {
  color: #988f8f;
  margin-top: 0.5vw;
}

.pic {
  width: 30vw;
  height: 30vw;
  border-radius: 5px;
  box-shadow: 0 0 10px #ccc;
}

.blank {
  height: 20vw;
}
</style>
