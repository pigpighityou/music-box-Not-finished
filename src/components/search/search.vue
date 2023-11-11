<template>
  <div class="searchWrapper">
    <div class="searchBox">
      <div class="search">
        <div class="selectIcon" @click="search">
          <i class="iconfont icon-jichu_sousuo1"></i>
        </div>

        <van-field
          v-model="username"
          name="search"
          label=""
          placeholder="搜索歌曲、歌手、专辑"
          class="select"
        />
      </div>

      <div class="listenRead">
        <i class="iconfont icon-yinle"></i>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watchEffect } from "vue";
import { useRouter, useRoute } from "vue-router";
import {getSearch} from "@/axios/routes/search.js";
import store from "@/store/store.js";
const router = useRouter();
const route = useRoute();

const username = ref("");

watchEffect(() => {
  console.log(username.value);
});

const search = async () => {
    router.push({ name: "search", params: { id: username.value } });
 /*  const res = await getSearch(username.value);
  
  console.log(res.data); */
};
</script>

<style scoped>
.selectIcon {
  display: flex;
  justify-content: center;
  align-items: center;
  transform: scale(1.2);
  margin: 0 3%;
}

.select {
  width: 70vw;
  height: 100%;
  display: flex;
  margin-bottom: 1.5vw;
}

.searchWrapper {
  border: 0.5vw solid black;
  height: 10vw;
  display: flex;
  flex-direction: row;
  border-radius: 9vw;
  margin: 1% auto;
}
.searchBox {
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.search {
  width: 90vw;
  height: auto;
  margin: 0 1%;
  display: flex;
  align-items: center;
  justify-content: start;
  margin: 0% auto;
  overflow: hidden;
}

.listenRead {
  height: 100%;
  width: 10vw;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: scale(1.2);
}
</style>
