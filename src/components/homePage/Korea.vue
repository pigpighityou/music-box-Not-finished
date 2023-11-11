<template>
  <newKoreaSong></newKoreaSong>

  <hotKoreaSinger></hotKoreaSinger>
  <newKoreaAlbum></newKoreaAlbum>
  <div class="blank"></div>
</template>

<script setup>
import hotKoreaSinger from "./body/hotKoreaSinger.vue";

import newKoreaSong from "./body/newKoreaSong.vue";
import newKoreaAlbum from "./body/newKoreaAlbum.vue";
</script>

<style scoped>
.blank {
  width: 100vw;
  height: 20vw;
  background-color: rgb(240, 240, 240);
}
</style>
