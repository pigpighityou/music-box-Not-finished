<template>
  <div class="headerWrapper">
    <div class="start">
      <router-link to="/more">
        <moreIcon></moreIcon>
      </router-link>
    </div>

    <div class="end">
      <toggleNightMode></toggleNightMode>

      <router-link to="/msg">
        <div class="more" style="color: black">
          <van-icon name="chat-o" :badge="store.state.msgCount" size="6vw" />
        </div>
      </router-link>
    </div>
  </div>

  <div class="searchWrapper">
    <search></search>
  </div>

  <userBrief></userBrief>

  <userList></userList>

  <userLikeList></userLikeList>

  <dailyRecommandSong></dailyRecommandSong>

  <goodSong></goodSong>

  <div class="songListRandom">
    <div class="China" v-if="randomNum === 1">
      <hotChineseSongList></hotChineseSongList>
    </div>

    <div class="English" v-else="randomNum === 0">
      <hotEnglishSongList></hotEnglishSongList>
    </div>
  </div>

  <div class="blank"></div>
</template>

<script setup>
import { ref, reactive, watchEffect } from "vue";

import search from "@/components/search/search.vue";
import toggleNightMode from "@/components/mypage/header/toggleNightMode.vue";
import moreIcon from "@/components/mypage/header/moreIcon.vue";
import userBrief from "@/components/mypage/user/userBrief.vue";
import userList from "@/components/mypage/user/userList.vue";
import userLikeList from "@/components/mypage/user/userLikeList.vue";
import goodSong from "@/components/homePage/body/goodsong.vue";
import { getMsg } from "@/axios/routes/message.js";
import hotChineseSongList from "@/components/homePage/body/hotChineseSongList.vue";
import hotEnglishSongList from "@/components/homePage/body/hotEnglishSongList.vue";
import dailyRecommandSong from "@/components/homePage/body/dailyRecommandSong.vue";

import { useStore } from "vuex";

const randomNum = ref(Math.floor(Math.random() * 2));

const userData = ref(JSON.parse(localStorage.getItem("userData")));
const token = ref(localStorage.getItem("token"));

const store = useStore();

watchEffect(async () => {
  await getMsg().then((r) => {
    store.state.msgCount = r.data.newMsgCount;
  });
});
</script>

<style scoped>
.blank {
  width: 100vw;
  height: 20vw;
}

.headerWrapper {
  height: 10vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.searchWrapper {
  margin-left: 0.3vw;
  margin-right: 0.3vw;
}

.start {
  width: 10vw;
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 0 2%;
}

.end {
  width: 13vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 2%;
}
</style>
