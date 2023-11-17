

<template>
  <publicComponent></publicComponent>
  <newChineseAlbums></newChineseAlbums>
  <hotChineseSinger></hotChineseSinger>
  <hotChineseSongList></hotChineseSongList>
  <newChineseSong></newChineseSong>
  <div class="blank"></div>
</template>

<script setup>
import newChineseAlbums from "./body/newChineseAlbums.vue";
import hotChineseSinger from "./body/hotChineseSinger.vue";
import hotChineseSongList from "./body/hotChineseSongList.vue";
import newChineseSong from "./body/newChineseSong.vue";
import publicComponent from "./public/publicComponent.vue";
</script>

<style scoped>
.blank {
  width: 100vw;
  height: 20vw;
  background-color: rgb(240, 240, 240);
}
</style>
