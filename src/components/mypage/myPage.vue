

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
        <div class="more" style="color: black;">
          <van-icon name="chat-o" :badge=store.state.msgCount size="6vw" />
        </div>
      </router-link>
    </div>
  </div>

  <div class="searchWrapper">
    <search></search>
    <!-- 
    {{ store.state.isLogin  }}
    {{ store.state.userData   }}
    {{ store.state.token    }}

    {{  userData.userId }}
    {{ userData }}
    {{ token  }} -->
  </div>

  <userBrief></userBrief>

  <userList></userList>

  <userLikeList></userLikeList>

  <!-- <userListen></userListen> -->

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
import { ref, reactive } from "vue";

import { getLoginUser } from "@/axios/routes/loginAPI.js";

import msg from "./header/msg.vue";
import search from "@/components/search/search.vue";
import toggleNightMode from "./header/toggleNightMode.vue";
import moreIcon from "../mypage/header/moreIcon.vue";
import userBrief from "../mypage/user/userBrief.vue";
import userList from "./user/userList.vue";
import userLikeList from "./user/userLikeList.vue";
/* import userListen from './user/userListen.vue' */
import goodSong from "../../components/homePage/body/goodsong.vue";

import hotChineseSongList from "../homePage/body/hotChineseSongList.vue";
import hotEnglishSongList from "../homePage/body/hotEnglishSongList.vue";
import dailyRecommandSong from "../homePage/body/dailyRecommandSong.vue";

import { useStore } from "vuex";

const randomNum = ref(Math.floor(Math.random() * 2));
/* console.log(randomNum.value); */

const userData = ref(JSON.parse(localStorage.getItem("userData")));
const token = ref(localStorage.getItem("token"));
/* console.log(userData.value); */
const store=useStore()


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
