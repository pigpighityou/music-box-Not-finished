<template>
  <div class="toggleWrapper">
    <i class="iconfont icon-ai250" v-if="!isDark" @click="switchNightMode"></i>
    <i
      class="iconfont icon-yueliang"
      v-else="isDark"
      @click="switchNightMode"
    ></i>
  </div>
</template>

<script setup>
// 运用vueuse：（一款基于Vue组合式API的函数工具集）里的函数实现简单的夜间模式切换
import { useDark, useToggle } from "@vueuse/core";
const isDark = useDark(); //true or false
const toggleDark = useToggle(isDark);
const switchNightMode = () => {
  toggleDark();
};
</script>

<style scoped>
.toggleWrapper {
  transform: scale(1.5);
  margin: 0 3%;
}
</style>

<style>
/* 夜间模式下的样式规则 */
/* 
  请注意，为了将该样式应用到dark类名里所有的元素里，请加上*，
  为了让样式优先级最高，需要在样式里加上important
 */

/* 需要对某些很特殊的元素进行夜间模式样式的排除 */

.dark *:not(.mv *):not(.mvInner *) {
  background-color: black !important;
  color: white !important;
}
</style>
