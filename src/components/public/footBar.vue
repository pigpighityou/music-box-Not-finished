<script setup>
import {ref} from 'vue'
const active=ref(0)

</script>


<template>


<div class="footWrapper" >
    <div class="foot">
        
  <van-tabbar v-model="active" fixed="true" placeholder="true" route="true">
  <van-tabbar-item icon="home-o" replace to="/world">首页</van-tabbar-item>
  <van-tabbar-item icon="audio" replace to="/radio">电台</van-tabbar-item>
  <van-tabbar-item icon="tv-o" replace to="/mv">视频</van-tabbar-item>
  <van-tabbar-item icon="user" replace to="/user">我的</van-tabbar-item>
  </van-tabbar>
        

    </div>
  
</div>


 




</template>

<style scoped>
  
  .footWrapper{
    position:relative;
    z-index:9999999;
  }


</style>