<template>
  <publicComponent></publicComponent>
  
  <div class="component">
    <div class="button">
      <router-link to="/singer">
        <singerButton></singerButton>
      </router-link>

      <router-link to="/dailyRec">
        <dailyRecButton></dailyRecButton>
      </router-link>

      <adButton></adButton>
    </div>

    <!-- 分路由组件 -->
    <dailyRecommandSong></dailyRecommandSong>
    <hotSinger></hotSinger>
    <hotSongList></hotSongList>
    <goodSong></goodSong>

    <div class="recommend">
      <recSongList class="rec"></recSongList>

    
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed, watchEffect, nextTick } from "vue";

import hotSinger from "./body/hotSinger.vue";
import hotSongList from "./body/hotSongList.vue";
import recSongList from "./body/recSongList.vue";

import goodSong from "./body/goodSong.vue";
import singer from "../public/singer.vue";
import singerButton from "../public/singerButton.vue";
import dailyRecButton from "../public/dailyRecButton.vue";
import adButton from "../public/adButton.vue";
import dailyRecommandSong from "./body/dailyRecommandSong.vue";
import publicComponent from "./public/publicComponent.vue";
</script>

<style scoped>
.recommend {
  overflow: auto;
  display: flex;
  flex-direction: row;
  margin-left: 1.5vw;
  margin-bottom: 20vw;
}

.rec {
  margin: 0 0.5%;
}

.blank {
  height: 2vw;
}

.button {
  display: flex;
  flex-wrap: nowrap;
}
</style>


