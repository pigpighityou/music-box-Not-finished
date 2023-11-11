<script setup>
import homepage from "./components/homePage/homepage.vue";
import { useRouter } from "vue-router";
import store from "./store/store";

const router = useRouter();

// 每次页面刷新，vuex里那些上次被更改过的数据就会恢复原貌
// 所以只能把他放入本地存储里了
/* window.addEventListener('beforeunload',()=>{
    localStorage.setItem('isPlayingSong',JSON.stringify(store.state.isPlayingSong)) 
    localStorage.setItem('playSong',JSON.stringify(store.state.playSong));
   

     
})

const cachedPlaySong = localStorage.getItem('playSong');
 const cachedIsPlayingSong = localStorage.getItem('isPlayingSong'); 
 

if(cachedPlaySong&&cachedIsPlayingSong){
    store.state.isPlaying=JSON.parse(cachedIsPlayingSong) 
    store.state.playSong=JSON.parse(cachedPlaySong)
     
       
} */
</script>

<template>
  <homepage></homepage>
</template>

<style scoped></style>
