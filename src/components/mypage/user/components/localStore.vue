<script setup>
import {ref,reactive,watchEffect} from 'vue'
import { showSuccessToast, showFailToast } from 'vant';
import {purchasedAlbum} from '@/axios/routes/store.js'

const onClickLeft = () => history.back();
const active = ref(0);



watchEffect(()=>{
    if(active.value==1||active.value==2){
        showFailToast('该功能暂无')
       
    } else{
            showSuccessToast('仅支持该功能')
        }
        
})

let purchasedAlbumAPI

let purchasedAlbumData = reactive({
    data:[]
});

(async ()=>{
    purchasedAlbumAPI = await purchasedAlbum()
    purchasedAlbumData.data = purchasedAlbumAPI.data.paidAlbums
    console.log('ok',purchasedAlbumData.data);
})();





</script>




<template>

<van-nav-bar
  title="本地存储"
  left-text="返回"
  left-arrow
  @click-left="onClickLeft"
/>

<van-tabs v-model:active="active">
  <van-tab title="购买专辑">
    
    
    <div class="purchasedAlbumWrapper">

        <div class="purchasedAlbum" v-for="(item, index) in purchasedAlbumData.data" :key="index">
                <div class="img">

                    <router-link :to="{name:'album',params:{id:item.albumId}}">
                        <img :src="item.cover" alt="pic" class="pic">
                    </router-link>

                </div>

            <div class="desc">

               
                <div class="name">
                    {{item.albumName}}
                </div>
                <div class="singer" v-for="(item1, index1) in item.artists" :key="index1">
                    {{item1.name}}
                </div>

            </div>
        </div>

    </div>






</van-tab>
  <van-tab title="本地下载歌曲" >该功能暂无</van-tab>
  <van-tab title="本地下载视频" >该功能暂无</van-tab>
</van-tabs>




</template>



<style scoped>
.purchasedAlbum{
    display: flex;
    flex-direction: row;
    margin-top: 2vw;
    margin-left: 1vw;
    margin-right: 1vw;
    margin-bottom: 2vw;
    border-radius: 2vw;
    background-color: white;
    height: 12vw;
    width: 98vw;
}

.desc{
    display: flex;
    flex-direction: column;
    width: 50vw;
    height: 40vw;
    margin-top: 1vw;
    margin-bottom: 1vw;
    align-items: center;
   
}




.pic{
    width: 40vw;
    height: 40vw;
    margin-left: 1vw;
    margin-top: 1vw;
    margin-bottom: 1vw;
    border: 0.5vw solid whitesmoke;
}

.name{
    width: 50vw;
    height: 6vw;
    margin-top: 3vw;
    margin-left: 2vw;
    font-size: 4.5vw;
    color: black;
}

.singer{
    width: 50vw;
    height: 3vw;
    margin-top: 1vw;
    margin-left: 2vw;
    font-size: 3vw;
    color: gray;
}




</style>