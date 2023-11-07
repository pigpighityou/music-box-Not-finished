


<template>

    <van-nav-bar
  title="歌手介绍"
  left-text="返回"
  left-arrow
  @click-left="onClickLeft"
/>


<div  class="singerWrapper">

      <div class="singerPictureWrapper">
          <img :src="singerDetail.data.artist?.cover" alt="pic" class="singerPic"> 
      </div>

      <div class="singerInfo">
            {{ singerDetail.data.artist?.name }}
      </div>
      <div class="alias" v-for="(item1, index1) in singerDetail.data.artist?.alias" :key="index">
        <div class="aliasName">
          {{ item1 }}
        </div>
          
      </div>
      <div class="fans">
        {{singerFans.data.fansCnt<10000?singerFans.data.fansCnt:(singerFans.data.fansCnt/10000).toFixed(1)+'万'}} 粉丝
      </div>
      <div class="identity">
        {{ singerDetail.data.identify?.imageDesc }}
      </div>
      <div class="subscribeWrapper">
        <div class="subscribe">
          关注<svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ea893728=""><path fill="currentColor" d="M640 832a128 128 0 0 1-256 0h256zm192-64H134.4a38.4 38.4 0 0 1 0-76.8H192V448c0-154.88 110.08-284.16 256.32-313.6a64 64 0 1 1 127.36 0A320.128 320.128 0 0 1 832 448v243.2h57.6a38.4 38.4 0 0 1 0 76.8H832z"></path></svg>
        </div>
       
          <div class="simi" @click="simiHandler">
            <svg  class="simiIcon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ea893728=""><path fill="currentColor" d="M628.736 528.896A416 416 0 0 1 928 928H96a415.872 415.872 0 0 1 299.264-399.104L512 704l116.736-175.104zM720 304a208 208 0 1 1-416 0 208 208 0 0 1 416 0z"></path></svg>
          </div>
            
      </div>

</div>

<div class="simiSinger" v-if="isSimi===true">
    <div class="list" v-for="(item, index) in singerSimi.data" :key="index">

      <div class="simiWrapper">

       
          <div class="simiPicture" >
            <router-link :to="{name:'listSinger',params:{id:item.id}}" v-loading.fullscreen.lock="fullscreenLoading" @click="clickHandler()">
              <img :src= "item.picUrl" alt="simipic" class="simiPic">
            </router-link>
          </div>
       

        <div class="simiName">
          {{ item.name }}
        </div>
      </div>
        
    </div>



</div>



<van-tabs v-model:active="active">
        <van-tab title="主页">

        <div class="wikiWrapper">

          <div class="wiki">

            <div class="artistName">
              {{ singerWiki.data.artistName }}

              <div class="picWrapper">
                <img :src="singerWiki.data.avatarPicUrl" alt="pic3" class="pic4">
              </div>
            </div>

            <div class="artTitle">
              艺人简介  <i class="iconfont icon-xiajiantou1"></i>
            </div>

            <div class="brief1">
              &nbsp;&nbsp;{{ singerWiki.data?.desc }}
            </div>

            <div class="productionLink" @click="drawer=true">
              <div class="proTitle">
                艺人经历
              </div>
              <div class="proIcon">
                <i class="iconfont icon-shouqijiantouxiao"></i>
              </div>
          
            </div>

            <el-drawer
            v-model="drawer"
            title="经历以及作品"
            :direction="direction"
            :before-close="handleClose"
            size="90%"
            >

              <div class="production"  v-html="singerWiki.data.production">
              </div> 


          </el-drawer>
            
            
          </div>

         




    </div>


      </van-tab>
          <van-tab title="歌曲">
            
            <div class="listSongsWrapper">



<div class="listSongs" >


    <div class="listSong" v-for="(item, index) in singerHotSongAPI?.data.songs" :key="index">
      <div class="rankWrapper">

            {{ index+1 }}
      </div>
        <div class="songWrapper" @click='clickHandlerSong(index)'>
            <div class="songName">
              {{ item.name }}
          </div>
          <div class="twoItems">
              <div class="authors">

              
                    <div class="songAuthor" v-for="(item1, index1) in item.ar" :key="index1">
                      <div class="judge" >
                        {{ item1.name  }}
                      </div>
            

            
                      </div>
              </div>

            <div class="album">
              {{ item.al.name }}
            </div>

          </div>
          
         
        </div>

        <div class="mv" v-if="item.mv!=0">
          <router-link :to="{name:'mvPlayer',params:{id:item.mv}}">
          <svg class="videoIcon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ea893728=""><path fill="currentColor" d="M704 768V256H128v512h576zm64-416 192-96v512l-192-96v128a32 32 0 0 1-32 32H96a32 32 0 0 1-32-32V224a32 32 0 0 1 32-32h640a32 32 0 0 1 32 32v128zm0 71.552v176.896l128 64V359.552l-128 64zM192 320h192v64H192v-64z"></path></svg>
       
        </router-link>
       </div>
       
        
    </div>

</div>






</div>




 </van-tab>

 
         

  <van-tab title="专辑">
            
            
            
            
          <listAlbum></listAlbum>
          
          
          
          
  </van-tab>



          <van-tab title="视频">

            <listMv></listMv>



          </van-tab>



 
          </van-tabs>












</template>

<script setup>
import {ref ,reactive,watchEffect} from 'vue'
import store from '../../store/store'

import {getSingerWiki} from '../../axios/routes/singerInfo'
import { getSingerDetail } from '../../axios/routes/singerInfo';
import { getSingerHotSong } from '../../axios/routes/singerInfo';


import { getSingerFans } from '../../axios/routes/singerInfo';
import {getSingerSimi} from '../../axios/routes/singerInfo'



import listAlbum from '../public/listAlbum.vue'
import listMv from './listMv.vue';



import { useRoute,useRouter } from 'vue-router';
import router from '../../router';





const route=useRoute()



const id=ref(route.params.id)


console.log(id.value);

let singerWikiAPI
let singerDetailAPI
let singerHotSongAPI


let singerFansAPI
let singerSimiAPI

const singerDetail=reactive({
  data:[],
});

const singerWiki=reactive({
  data:[],
});

const singerHotSong=reactive({
  data:[],
});





const singerFans=reactive({
  data:[],
});

const singerSimi=reactive({
  data:[],
});

(async()=>{
  singerWikiAPI=await getSingerWiki(id.value)
  singerWiki.data=singerWikiAPI.data.data
   /* console.log('okWIKI',singerWiki.data); */ 
})();


(async()=>{
  singerDetailAPI=await getSingerDetail(id.value)
  singerDetail.data=singerDetailAPI.data.data
   /* console.log('okDETAIL',singerDetail.data);  */
})();

(async()=>{
  singerHotSongAPI=await getSingerHotSong(id.value)
  store.state.playList=singerHotSongAPI.data.songs
  singerHotSong.data=singerHotSongAPI.data.songs
    /*  console.log('okHOTSONG',singerHotSong.data);    */
})();




(async()=>{
  singerFansAPI=await getSingerFans(id.value)
  singerFans.data=singerFansAPI.data.data
 /*   console.log('okFANS',singerFans.data);  */
})();

(async()=>{
  singerSimiAPI=await getSingerSimi(id.value)
  singerSimi.data=singerSimiAPI.data.artists
/*   console.log('okSIMI',singerSimi.data); */
})();

/* console.log(history.state.back); */

const onClickLeft = () => {
  const reg=/^\/listSinger\/\d+$/
  //  当上一个路由是/listsinger/：num ，
      // 换言之是通过查找相似歌手页面跳转的，返回大世界
  if(reg.test(history.state.back)){
    router.push('/world')



}else{
  router.go(-1)
}
}


const isSimi=ref(false)

const simiHandler=()=>{
  isSimi.value=!isSimi.value;
/*   console.log(isSimi.value); */
}

const isClick=ref(false)

const clickHandler=()=>{
  isClick.value=!isClick.value
  console.log(isClick.value);
};


const fullscreenLoading = ref(false)

watchEffect(()=>{
  if(isClick.value===true){
    fullscreenLoading.value = true
   setTimeout(()=>{
    fullscreenLoading.value = false
    router.go(0)
   },500)
  }


})

const drawer = ref(false)
const direction = ref('btt')

const clickHandlerSong=(index)=>{
    store.commit('getIndexPlay',index)
}



</script>



<style scoped>
.iconfont{
  font-size: 5vw;

  color: hsl(0, 3%, 29%);
}

.production{
  overflow: auto;
}

.productionLink{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 2vw;
  margin-left: 3vw;
  margin-bottom: 8vw;
  width: 90vw;
  height: 10vw;
 
  background-color: #fff;
  overflow: hidden;

}

.proTitle{
  font-size: 4vw;
  color: hsl(0, 3%, 29%);
  margin-left: 3vw;
  margin-top: 2vw;
}

.proIcon{
  margin-right: 3vw;
  margin-top: 2vw;
}


.artTitle{
  font-size: 4vw;
  color: hsl(0, 3%, 29%);
  margin-left: 7vw;
  margin-top: 2vw;
}

.artTitle iconfont{
  font-size: 4vw;
  color: hsl(0, 3%, 29%);
  margin-left: 3vw;
  margin-top: 2vw;
}

.artistName{
  font-size: 5vw;
  color: hsl(0, 3%, 8%);
  margin-top: 2vw;
  margin-left: 3vw;
  text-align: center;
  font-weight: bold;
}

.brief1{
  margin-top: 2vw;
  margin-left: 7vw;
  line-height: 1.9;
  min-width: 90vw;
  height: 70vw;
  overflow: auto;
}


.pic4{
  width: 8vw;
  height: 8vw;
  border-radius: 4vw;
  margin: 0 auto;
  margin-top: 2vw;
}


.simiSinger{
  width: 80vw;
  max-height: 30vw;
  overflow: auto;
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  margin-top: 3vw;
  

 



}

.simiWrapper{
  width: 20vw;
  height: 30vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: 2vw;



}

.simiPic{
  width: 20vw;
  height: 20vw;
  border-radius: 50%;
  border: 0.1vw solid grey;

  
  
}

.simiName{
  font-size: 3vw;
  color: hsl(0, 4%, 40%);
  margin-top: 1vw;
  margin-left: 1vw;
  overflow: auto;
}



.singerWrapper{
  width: 90vw;
  height: 57vw;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 2vw;
  justify-content: center;
  margin-top: 25vw;
  background-color: red;
  position: relative;
}


.singerPic{
  width: 20vw;
  height: 20vw;
  border-radius: 50%;
  position: absolute;
  top: -10vw;
  left: 35vw;
  border: 0.5vw solid white;
}

.singerInfo{
  font-size: 5vw;
  color: hsl(0, 3%, 8%);
  margin-top: 2vw;
}

.aliasName{
  font-size: 3vw;
  color: hsl(0, 4%, 40%);
  overflow: auto;
  margin-bottom: 0.5vw;

}

.fans{
  color: hsl(0, 4%, 40%);
}

.identity{
  font-size: 3vw;
  color: hsl(0, 4%, 40%);
  margin-top: 1vw;
}
.subscribe{

  width: 17vw;
  border-radius: 2vw;
  border: 0.2vw solid black;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4vw;
  color: hsl(0, 3%, 29%);
  margin-top: 5vw;
}

.subscribeWrapper{
  display: flex;
  align-items: center;
  justify-content: center;


}
.simi{
  margin-left: 5vw;
  border: 0.2vw solid black;
  margin-top: 5vw;
  border-radius: 4vw;

}

.simiIcon{
  width:6vw;
  height: 5vw;
  color: hsl(0, 3%, 29%);

}


.icon{
  width: 5vw;
  height: 5vw;
  color: #ffcd32;


}


.desc{
  display: flex;
  flex-direction: row;
 margin-left: 3vw;
 
  width: 90vw;
  height: 40vw;
  margin-top: 5vw;
  border-radius: 4vw;
  background-color: #fff;
}

.total{
  display: flex;
  flex-direction: column;
  margin-left: 3vw;
  width: 60vw;
  height: 35vw;
  overflow: auto;
  margin-top: 1vw;
 
  background-color: #fff;


}


.name{
  width: 40vw;
  height: 11vw;
  font-size: 4vw;
  margin-bottom: 1vw;
  
}

.name1{
 margin-top: 3.5vw;
 text-align: center;
 font-weight: bold;
  
}

.tags{
 display: flex;

 width: 15vw;
 border: 0.2vw black solid;
  border-radius: 1vw;


 

 
}
.tags1{
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  width: 15vw;
    margin-top: 1vw;
  
  
  
  
}

.author{
  font-size: 3vw;
  margin-bottom: 1vw;
  
}



.pic{
  width: 35vw;
  height: 35vw;
  border-radius: 4vw;
  margin: 0 auto;
}

.pic1{
  width: 40vw;
  height: 40vw;
  border-radius: 4vw;
  margin: 0 27%;
  



}

.describe{
  display: flex;
  flex-direction: row;
  margin-left: 3vw;
  width: 90vw;
  height: 10vw;
  
  border-radius: 4vw;
  background-color: #fff;
}

.icon{

  margin-left: 1vw;
  margin-top: -0.9vw;
  transform: scale(0.8);
  


  
}



.brief{
    width: 93vw;
    height: 5vw;
    overflow: hidden;
}

.brief1{
  margin-top: 2vw;
  margin-left: 7vw;
  line-height: 1.9;
  width: 80vw;
  height: 70vw;
  overflow: auto;
}

.wrapper{

  width: 100;
  height: 300px;
  backdrop-filter: blur(10px); /* 设置背景虚化的模糊程度 */
}

.pic3{
  margin-left: -10vw;
  width: 180vw;
  height: 180vw;
  position: absolute;
  z-index: -1;
  filter: blur(10px);
  opacity: 0.5;

}


.listSongs{
  display: flex;
  flex-direction: column;
  padding-left: 3vw;
  width: 100vw;

  margin-top: 1vw;
  border-radius: 4vw;
  background-color: #fff;
  overflow: hidden;
  border: 0.3vw black solid;
}

.listSong{
  display: flex;
  flex-direction: row;
  width: 100vw;
  height: 10vw;
  margin-top: 1vw;
  margin-bottom: 2vw;

  
}

.rankWrapper{
  width: 5vw;
  margin-left: -2vw;

  height: 10vw;
  font-size: 4vw;
  margin-top: 1vw;
  margin-right: 3vw;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #c62f2f;
}

.title{
  width: 100vw;
  height: 6vw;
  font-size: 4vw;
  padding-left: 3vw;
  padding-right: 2vw;
  color: black;
  display: flex;
  flex-direction: row;

  align-items: center;

}

.videoIcon{
  width: 5vw;
  height: 5vw;
  margin-top: 1vw;
  margin-left: 1vw;
  color: black;

  
}

.songName{
  width: 80vw;
  overflow: hidden;
  height: 5vw;
  font-size: 4vw;
  margin-top: 1vw;
  
}

.songWrapper{
  width: 83vw;
}

.songAuthor{
    display: inline-block;
    
    margin-right: 2vw;
    max-height: 4vw;
    max-width: 40vw;
  flex-wrap: wrap;
    overflow: hidden;
}

.album{
  display: inline-block;
  
    padding-right: 1vw;
    margin-left: 2vw;
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 40vw;
    height: 4vw;
    flex-wrap: wrap;
    overflow: hidden;
    color: grey;
    margin-top: 0.4vw;
    

}

.judge{
  
  max-width: 25vw;
  max-height: 3.5vw;
  flex-wrap: wrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 2.9vw;
  color: black;
  white-space:nowrap;
  
}


.authors{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  font-size: 3vw;
  max-height: 3.5vw;
  overflow: hidden;
 

}

.twoItems{
  display: flex;
  flex-direction: row;
  align-items: center;
  
  margin-top: 1.4vw;
  font-size: 3vw;
  max-width: 75vw;
  overflow: hidden;
  text-align: center;
  flex-wrap: wrap;
  max-height: 4vw;
 

}












</style>