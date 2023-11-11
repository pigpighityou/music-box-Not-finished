<script setup>
import { ref, reactive, watchEffect } from "vue";

import { storeRadio } from "@/axios/routes/store.js";
import { recentRadio } from "@/axios/routes/store.js";

import { showFailToast } from "vant";

let storeRadioAPI;
let recentRadioAPI;

let storeRadioData = reactive({
  data: [],
});

let recentRadioData = reactive({
  data: [],
});

const userId = ref(JSON.parse(localStorage.getItem("userData")));
/* console.log('userId',userId.value.userId); */

(async () => {
  storeRadioAPI = await storeRadio(userId.value.userId);
  storeRadioData.data = storeRadioAPI.data.programs;
  console.log("okstore", storeRadioData.data);
})();

(async () => {
  recentRadioAPI = await recentRadio();

  recentRadioData.data = recentRadioAPI.data.data;
  /*  console.log('okrecent',recentRadioData.data);  */
})();

const active = ref(0);
const onClickLeft = () => history.back();
</script>

<template>
  <van-nav-bar
    title="收藏"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
  />

  <van-tabs v-model:active="active">
    <van-tab title="订阅的播客">
      <div class="storeRadioWrapper">
        <div
          class="storeRadio"
          v-for="(item, index) in storeRadioData.data"
          :key="index"
        >
          <div class="Radio">
            <router-link
              :to="{ name: 'storeRadioItem', params: { id: item.id } }"
            >
              <img :src="item.coverUrl" alt="pic" class="radioPic" />
            </router-link>
          </div>

          <div class="desc">
            <div
              class="channel"
              v-for="(item1, index1) in item.channels"
              :key="index1"
            >
              {{ item1 }}
            </div>
            <div class="description">
              {{ item.description }}
            </div>
          </div>
        </div>
      </div>
    </van-tab>
    <van-tab title="最近播放"> 该功能暂不可用 </van-tab>
  </van-tabs>
</template>

<style scoped>
.storeRadioWrapper {
  margin-bottom: 20vw;
}

.storeRadio {
  display: flex;
  flex-direction: row;
  margin-top: 2vw;
  margin-left: 1vw;
  margin-right: 1vw;
  border-radius: 2vw;
  background-color: whitesmoke;
}

.radioPic {
  width: 45vw;
  height: 43vw;
  border-radius: 2vw;
}

.alName {
  margin-top: 1vw;
  margin-left: 1vw;
  font-size: 4vw;
  color: black;
}

.singer {
  margin-top: 1vw;
  margin-left: 1vw;
  font-size: 3vw;
  color: rgb(92, 87, 87);
}
</style>
