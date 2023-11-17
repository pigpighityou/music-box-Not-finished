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

import hotSinger from "@/components/homePage/body/hotSinger.vue";
import hotSongList from "@/components/homePage/body/hotSongList.vue";
import recSongList from "@/components/homePage/body/recSongList.vue";

import goodSong from "@/components/homePage/body/goodSong.vue";

import singerButton from "@/components/public/singerButton.vue";
import dailyRecButton from "@/components/public/dailyRecButton.vue";
import adButton from "@/components/public/adButton.vue";
import dailyRecommandSong from "@/components/homePage/body/dailyRecommandSong.vue";
import publicComponent from "@/components/homePage/public/publicComponent.vue";
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
