<template>
  <div class="mvWrapper">
    <div class="mv" v-for="(item, index) in singerMV.data" :key="index">
      <div class="imgWrapper">
        <router-link :to="{ name: 'mvPlayer', params: { id: item.id } }">
          <img :src="item.imgurl" alt="pic" class="img" />
        </router-link>
      </div>

      <div class="desc">
        <div class="name">
          {{ item.name }}
        </div>

        <div class="publishime">
          {{ item.publishTime }}
        </div>

        <div class="playCount">
          {{ item.playCount + "次播放" }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watchEffect } from "vue";
import { useRouter, useRoute } from "vue-router";

import { getSingerMV } from "../../axios/routes/singerInfo";

const route = useRoute();

const id = ref(route.params.id);
console.log("mvSinger", id.value);

let singerMVAPI;

const singerMV = reactive({
  data: [],
});

(async () => {
  singerMVAPI = await getSingerMV(id.value);
  singerMV.data = singerMVAPI.data.mvs;
  /*   console.log('okMV',singerMV.data);   */
})();
</script>

<style scoped>
.mv {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 2vw;
  margin-top: 2vw;
}

.desc {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 10px;
  width: 50vw;
  height: 30vw;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.publishime {
  font-size: 12px;
  color: #999;
  margin-top: 5px;
}

.playCount {
  font-size: 12px;
  color: #999;
  margin-top: 5px;
}

.img {
  width: 40vw;
  height: 30vw;
  border-radius: 5px;
  box-shadow: 0 0 10px #ccc;
  transition: all 0.3s;
}
</style>
