<template>
  <publicComponent></publicComponent>
  <newJapanSong></newJapanSong>
  <newJapanAlbum></newJapanAlbum>
  <hotJapanSinger></hotJapanSinger>
  <div class="blank"></div>
</template>
<script setup>
import newJapanSong from "./body/newJapanSong.vue";
import newJapanAlbum from "./body/newJapanAlbum.vue";
import hotJapanSinger from "./body/hotJapanSinger.vue";
import publicComponent from "./public/publicComponent.vue";
</script>

<style scoped>
.blank {
  width: 100vw;
  height: 20vw;
  background-color: rgb(240, 240, 240);
}
</style>
