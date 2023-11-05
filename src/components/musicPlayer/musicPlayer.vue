<template>
   
<div class="musicPlayerWrapper" ref="musicPlayer" @click="handleClick">


    <div class="album">
                <img src="" alt="pic">
    </div>

    <div class="name">
        <span>歌曲名</span>
    </div>

    <div class="author">
        <span>歌手名</span>
        
    </div>

    <div class="icon">
        <svg class="playIcon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ea893728=""><path fill="currentColor" d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 832a384 384 0 0 0 0-768 384 384 0 0 0 0 768zm-48-247.616L668.608 512 464 375.616v272.768zm10.624-342.656 249.472 166.336a48 48 0 0 1 0 79.872L474.624 718.272A48 48 0 0 1 400 678.336V345.6a48 48 0 0 1 74.624-39.936z"></path></svg>
        <!-- <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ea893728=""><path fill="currentColor" d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 832a384 384 0 0 0 0-768 384 384 0 0 0 0 768zm-96-544q32 0 32 32v256q0 32-32 32t-32-32V384q0-32 32-32zm192 0q32 0 32 32v256q0 32-32 32t-32-32V384q0-32 32-32z"></path></svg> -->
    </div>

    <div class="listSongs">
   
        <svg  @click="drawer=true" class='moreIcon'  viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ea893728=""><path fill="currentColor" d="M896 192H128v128h768V192zm0 256H384v128h512V448zm0 256H128v128h768V704zM320 384 128 512l192 128V384z"></path></svg>


    </div>

    <el-drawer
    class="drawer"
    v-model="drawer"
    title="I am the title"
    :direction="direction"
    :before-close="handleClose"
  >
    <span>Hi, there!</span>
  </el-drawer>

</div>

</template>

<script setup>
import {ref,reactive,onMounted,computed,provide,watchEffect} from 'vue'
import store from '../../store/store';


const drawer = ref(false)
const direction = ref('btt')

const musicPlayer=ref(null)

const handleClick=()=>{
   
        console.log(musicPlayer.value);
    
}

watchEffect(()=>{
    // ref绑定dom，加载出来ref的值以后
    if(musicPlayer.value){
        console.log('watch',musicPlayer.value);
    }
})




</script>

<style scoped>
.musicPlayerWrapper{
    width: 100vw;
    height: 18vw;
    background-color: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
   
     display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center; 
    box-sizing: border-box;
    border-top: 1px solid #ccc;
    box-shadow: 0 0 10px #ccc;
}

.album{
    width: 15vw;
    height: 15vw;
    margin: 0 2vw;
    border-radius: 50%;
    background-color: #ccc;
    overflow: hidden;
}

.name{
    font-size: 4vw;
    color: #333;
    margin: 0 2vw;
}

.author{
    font-size: 3vw;
    color: #333;
    margin: 0 2vw;
}

.playIcon{
    width: 10vw;
    height: 10vw;
    fill: #ccc;
    margin: 0 5vw;
}

.moreIcon{
    width: 10vw;
    height: 10vw;
    fill: #ccc;
    margin: 0 5vw;
}




</style>