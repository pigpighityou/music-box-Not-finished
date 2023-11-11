<script setup>
import { ref, reactive, onMounted, computed } from "vue";

import search from "@/components/search/search.vue";
import picBanner from "../../homePage/body/picBanner.vue";
import moreIcon from "../../mypage/header/moreIcon.vue";
</script>

<template>
  <!-- 公共组件 -->

  <div class="headerWrapper">
    <div class="start">
      <router-link to="/more">
        <moreIcon></moreIcon>
      </router-link>
    </div>
    <div class="wordBanner">
      <router-link to="/world">
        <div class="word">世界</div>
      </router-link>
      <router-link to="/Chinese">
        <div class="word">华语</div>
      </router-link>
      <router-link to="/English">
        <div class="word">欧美</div>
      </router-link>
      <router-link to="/Korea">
        <div class="word">韩国</div>
      </router-link>
      <router-link to="/Japan">
        <div class="word">日本</div>
      </router-link>
    </div>

    <div class="icon">
      <i class="iconfont icon-yewu_biaozhunguanli"></i>
    </div>
  </div>

  <div class="search">
    <search></search>
  </div>
  <div class="picBanner">
    <picBanner></picBanner>
  </div>
</template>

<style scoped>
.start {
  width: 14%;
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 0 2%;
}

.wordBanner {
  width: 75%;
  background-color: white;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  font-size: large;
  overflow: auto;
  margin: 0 -1.3%;
}

.headerWrapper {
  /* border: 0.5vw solid black; */
  height: 10vw;
  display: flex;
  flex-direction: row;
}

.icon {
  width: 4.7%;
  display: flex;
  align-items: center;
  justify-content: end;
  margin: 0 auto;
  transform: scale(1.3);
}

.blank {
  height: 15vw;
}
</style>
