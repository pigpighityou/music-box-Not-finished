

<template>
  <!-- 公共组件 -->

  <router-view></router-view>

  <router-view name="world"></router-view>
  <router-view name="Chinese"></router-view>
  <router-view name="English"></router-view>
  <router-view name="Korea"></router-view>
  <router-view name="Japan"></router-view>

  <router-view name="musicPlayer"></router-view>

  <router-view name="footBar"></router-view>

  <!-- <footBar></footBar> -->
</template>

<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import musicPlayer from "../musicPlayer/musicPlayer.vue";
</script>

<style scoped></style>
