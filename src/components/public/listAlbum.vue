<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref, reactive, computed, watchEffect } from "vue";

import { getSingerAlbum } from "../../axios/routes/singerInfo";

const route = useRoute();
const id = ref(route.params.id);
/* console.log('albumSinger',id.value); */

let singerAlbumAPI;

const singerAlbum = reactive({
  data: [],
});

const publishTime = ref({
  date: [],
});

(async () => {
  singerAlbumAPI = await getSingerAlbum(id.value);
  singerAlbum.data = singerAlbumAPI.data;

  //
  const timestamp = ref(
    singerAlbum.data.hotAlbums.map((item) => item.publishTime),
  );

  /* console.log('timestamp',timestamp.value); */

  timestamp.value.forEach((item) => {
    const date = new Date(item);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    publishTime.value.date.push(year + "-" + month + "-" + day);
  });

  // 将publishTime整体加到singerAlbum的data中
  singerAlbum.data["realTime"] = publishTime.value;
  /*  console.log('singerAlbum',singerAlbum.data); */
})();
</script>

<template>
  <div class="listAlbumWrapper">
    <div
      class="listAlbum"
      v-for="(item, index) in singerAlbum.data.hotAlbums"
      :key="index"
    >
      <div class="pic">
        <router-link :to="{ name: 'album', params: { id: item.id } }">
          <img :src="item.picUrl" alt="picAlbum" class="picAlbums" />
        </router-link>
      </div>

      <div class="desc">
        <!--  <div class="artistName" >

                        {{ item.artist.name }}

                </div> -->

        <div class="albumName">
          {{ item.name }}
        </div>

        <div class="date">
          <div class="publishTime">
            {{
              item.publishTime ? singerAlbum.data.realTime.date[index] : "暂无"
            }}
          </div>

          <div class="songNum">{{ item.size }}首</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.listAlbum {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #fff;
  padding: 10px;
}

.desc {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-left: 10px;
  width: 60%;
  height: 100%;
  font-size: 14px;
  color: #000;
}

.picAlbums {
  width: 30vw;
  height: 30vw;
  border-radius: 10px;
}

.date {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
}

.albumName {
  font-size: 16px;
  color: #000;
}

.publishTime {
  width: 45%;
  height: 100%;
  color: #999;
}
</style>
