<script setup>
import ad from "./ad.vue";
</script>

<template>
  <button class="adWrapper">
    <ad></ad>
  </button>
</template>

<style scoped>
.adWrapper {
  width: 55vw;
  height: 18vw;
  background-color: rgb(242, 242, 242);
  border-radius: 2vw;
  border: 1vw dot rgb(1, 1, 1);
  margin-left: 1vw;
  margin-top: 1vw;
}
</style>
