<template>
   
<div class="musicPlayerWrapper" ref="musicPlayer" >

    <audio ref="audio"  :src="store.state.url" @ended="nextSong"></audio>


    <div class="album" >
   
            <img :src="store.state.playSong?.al?.picUrl||store.state.playSong?.album?.picUrl||store.state.playSong?.data?.al.picUrl" alt="pic" class="albumPic">
     
               
    </div>

    <div class="name">
     
        <div>{{store.state.playSong?.name||store.state.playSong?.data?.name}}</div>
     
    </div>

    <div class="author" >
       
        <div v-for="(item, index) in store.state.playSong?.ar||store.state.playSong?.artists||store.state.playSong?.data?.ar" :key="index">
            {{item.name}}
        </div>
   
        
    </div>

    <div class="icon">
        <svg class="playIcon" v-if="store.state.isPlayingSong===false" @click="play" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ea893728=""><path fill="currentColor" d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 832a384 384 0 0 0 0-768 384 384 0 0 0 0 768zm-48-247.616L668.608 512 464 375.616v272.768zm10.624-342.656 249.472 166.336a48 48 0 0 1 0 79.872L474.624 718.272A48 48 0 0 1 400 678.336V345.6a48 48 0 0 1 74.624-39.936z"></path></svg>
        <svg class="playIcon" v-if="store.state.isPlayingSong===true"  @click="pause" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ea893728=""><path fill="currentColor" d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 832a384 384 0 0 0 0-768 384 384 0 0 0 0 768zm-96-544q32 0 32 32v256q0 32-32 32t-32-32V384q0-32 32-32zm192 0q32 0 32 32v256q0 32-32 32t-32-32V384q0-32 32-32z"></path></svg> 
    </div>

    <div class="listSongs">
   
        <svg  @click="drawer=true" class='moreIcon'  viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ea893728=""><path fill="currentColor" d="M896 192H128v128h768V192zm0 256H384v128h512V448zm0 256H128v128h768V704zM320 384 128 512l192 128V384z"></path></svg>


    </div>

    <el-drawer
    class="drawer"
    v-model="drawer"
    title="歌曲详情"
    :direction="direction"
    size="100%"
    append-to-body="true"
    z-index="999999999"
  
    
  >

    <div class="songDetailWrapper">
        
        <span>Hi, there!
    
        
    {{ store.state.playIndex }}
  
   {{ store.state.isPlayingSong }}

  

   
            </span>

    </div>
   
  </el-drawer>


 

</div>

</template>

<script setup>
import {ref,reactive,onMounted,computed,provide,watchEffect} from 'vue'
import {useRouter,useRoute} from 'vue-router'
import {getSongs} from '@/axios/routes/getSongs.js'
import store from '../../store/store';
import { ElLoading } from 'element-plus'



const router=useRouter()
const route=useRoute()



const drawer = ref(false)
const direction = ref('btt')

const musicPlayer=ref(null)


const handleClick=()=>{
   
        console.log(musicPlayer.value);
    
}

const openFullScreen2 = () => {
  const loading = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.9)',
  })
  setTimeout(() => {
    loading.close()
  }, 500)
}

const hasFootBar=ref(store.state.hasFootBar)

/*  watchEffect(()=>{
    if(hasFootBar.value&&musicPlayer.value){
           musicPlayer.value.style.marginBottom='12vw'
   }
 }) 

 router.beforeEach((to, from, next) => {
    if(to.path==='/world'||to.path==='/Chinese'
    ||to.path==='/English'||to.path==='/Japan'||to.path==='/Korea'
    ||from.path==='/world'||from.path==='/Chinese'||from.path==='/English'
    ||from.path==='/Japan'||from.path==='/Korea'||to.path==='/user'||from.path==='/user'
    ||to.path==='radio'||from.path==='radio'){
        // 刷新页面
        openFullScreen2()
        setTimeout(()=>{
           
            router.go(0)
        },500)
   
      
    }
   next()
 }) */

 const audio=ref(null)



let audioState=reactive({ })



// 保存状态
watchEffect(()=>{
    if(audio.value){

         audioState=reactive({
    currentTime: audio.value.currentTime,
    paused: audio.value.paused,
                                        })

    }
    
})



// 离开的时候也要记录状态,否则一刷新，就重制了
window.addEventListener('beforeunload',()=>{
  /*   console.log('重载了')  */
   store.state.isPlayingSong=false
   if(store.state.playIndex&&store.state.playSong){
    localStorage.setItem('currentTime',JSON.stringify(audio.value?.currentTime)) 
        localStorage.setItem('paused',JSON.stringify(audio.value?.paused));
        localStorage.setItem('isPlayingSong',JSON.stringify(store.state?.isPlayingSong)) 
    localStorage.setItem('playSong',JSON.stringify(store.state?.playSong));
    localStorage.setItem('playIndex',JSON.stringify(store.state?.playIndex));
   }
       
    });

    const cachedCurrentTime = localStorage.getItem('currentTime');
 const cachedPaused = localStorage.getItem('paused'); 
 const cachedPlaySong = localStorage.getItem('playSong');
 const cachedIsPlayingSong = localStorage.getItem('isPlayingSong'); 
    const cachedPlayIndex = localStorage.getItem('playIndex');


//  重载后发生的事情 
    // 网页重载后的值放进去了，有，则进行下面的内容
    watchEffect(()=>{

           /*  store.state.isPlayingSong=false */
            if(audio.value){
                if(cachedCurrentTime&&cachedPlaySong){
                   /*  if(audio.value.currentTime!==NaN){ */
                         /* console.log('重载成功')  */
                       
                        audio.value.currentTime=JSON.parse(cachedCurrentTime) 
                        store.state.isPlayingSong=JSON.parse(cachedIsPlayingSong) 
                        store.state.playSong=JSON.parse(cachedPlaySong)
                        store.state.playIndex=JSON.parse(cachedPlayIndex)
                       
                    }  
            /*     } */
            }
        })


/*      if(audio.value){
           
            if(cachedCurrentTime&&cachedPlaySong){
                if(audio.value.currentTime!==undefined){
                      console.log('重载成功')  
                    store.state.isPlayingSong=false
                    audio.value.currentTime=JSON.parse(cachedCurrentTime) 
                    store.state.isPlayingSong=JSON.parse(cachedIsPlayingSong) 
                    store.state.playSong=JSON.parse(cachedPlaySong)
                    store.state.playIndex=JSON.parse(cachedPlayIndex)
                   
                }  
            }
        }  */
    
       
 


router.beforeEach((to, from, next) => {
     /*  console.log('路由即将跳转');   */
     if( store.state.isPlayingSong===true){
                    store.state.isPlayingSong===true
                }else if(store.state.isPlayingSong===false){
                    store.state.isPlayingSong===false
                }
    if(audio.value){
              /*   if(audio.value.paused!=null){ */
                                             
                   
/*             localStorage.setItem('currentTimeAlias',JSON.stringify(audio.value.currentTime)) */
            localStorage.setItem('pausedAlias',JSON.stringify(audio.value.paused));
            localStorage.setItem('isPlayingSongAlias',JSON.stringify(store.state?.isPlayingSong)) 
        localStorage.setItem('playSongAlias',JSON.stringify(store.state?.playSong));
        localStorage.setItem('playIndexAlias',JSON.stringify(store.state?.playIndex));

       /*  } */
    }
  
   
   next()
 })


 // 进入页面，加载，找到状态，恢复
// isPlayingSong的作用就是每次不小心刷新或者路由跳转引起的故障导致的歌曲暂停，
    // 可以把按钮的状态也变成暂停


const cachedCurrentTimeAlias = localStorage.getItem('currentTimeAlias');
 const cachedPausedAlias = localStorage.getItem('pausedAlias'); 
 const cachedPlaySongAlias = localStorage.getItem('playSongAlias');
 const cachedIsPlayingSongAlias = localStorage.getItem('isPlayingSongAlias'); 
    const cachedPlayIndexAlias = localStorage.getItem('playIndexAlias');

 router.afterEach((to, from) => {
     if(audio.value){ 
        if(cachedPlaySong&&audio.value/* .currentTime */){
              console.log('跳转后')   
            store.state.isPlayingSong=JSON.parse(cachedIsPlayingSongAlias) 
            store.state.playSong=JSON.parse(cachedPlaySongAlias)
            store.state.playIndex=JSON.parse(cachedPlayIndexAlias)
            // 下面绝对不能加，加了进度条就变成上次的进度条了
          /*   audio.value.currentTime=JSON.parse(cachedCurrentTimeAlias) */
            
           
        }
     }; 

  
 

});


 

   /*      if(audio.value&&store.state){
        if(audio.value.currentTime!==undefined){
              if(cachedCurrentTime&&cachedPlaySong){  
            store.state.isPlayingSong=false
            audio.value.currentTime=JSON.parse(cachedCurrentTime) 
            store.state.isPlayingSong=JSON.parse(cachedIsPlayingSong) 
            store.state.playSong=JSON.parse(cachedPlaySong)
            store.state.playIndex=JSON.parse(cachedPlayIndex)
           
          }  
        }
      
            }  */
    
    


// 防止资源加载不出来，点按钮可实现再次获取资源
 const backUpGetUrl=async()=>{
    try{
        if(store.state.playSong.id||store.state.playSong.resourceId){
        const res=await getSongs(store.state.playSong.id||store.state.playSong.resourceId)
        /*  console.log(store.state.playSong.id||store.state.playSong.resourceId)    */
           /*  console.log(res) */
        store.state.url=res.data.data[0]?.url
        }
       
    }
    catch(err){
        console.log(err)
    }
}

// 播放功能
 const play= ()=>{
    
   
     audio.value.play()
    store.state.audioState=audioState
    /* store.state.played=audio.value.play */
    store.state.isPlayingSong=true
   /* isPlaying.value=true */
   backUpGetUrl()
 
 }


//  暂停功能
 const pause= ()=>{
   
    
     audio.value.pause()
    store.state.audioState=audioState
   /*  store.state.paused=audio.value.paused */
   store.state.isPlayingSong=false
   /*  isPlaying.value=false */
    backUpGetUrl()
  
 
 }


//  切换歌，按钮应该变为暂停键
 watchEffect(()=>{
    if(store.state.playSong){
        if(audio.value){
            backUpGetUrl()
           /*  isPlaying.value=false */
           

        }
       
       


    }
 })


//  下一首歌
 const nextSong=()=>{
    store.state.playIndex++
    store.commit('getIndexPlay',store.state.playIndex)
 }



  











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
   overflow: hidden;
    align-items: center; 
    box-sizing: border-box;
    border-top: 1px solid #ccc;
    box-shadow: 0 0 10px #ccc;
}

.album{
    width: 18vw;
    height: 15vw;
    margin: 0 2vw;
    border-radius: 50%;
    background-color: #ccc;
    overflow: hidden;
}

.albumPic{
    width: 100%;
    height: 100%;

}


.name{
    font-size: 4vw;
    color: #333;
    margin: 0 2vw;
    overflow: hidden;
    width: 25vw;
 

}



.name div{
    white-space: nowrap;
    animation: myMove 8s linear infinite;
 


}

 


.author{
    font-size: 3.5vw;
    color: #333;
    margin: 0 2vw;
    overflow: hidden;
    width: 25vw;
    display: flex;
    flex-direction: row;
    max-height: 4vw;
    margin-top:-0.6vw;

}


.author div{
    white-space: nowrap;
   
    margin-right: 4vw;
      animation: myMove 8s linear infinite;  
}

 /*文字无缝滚动*/
 @keyframes myMove {
  0% {
    transform: translateX(40vw);
  }
  100% {
    transform: translateX(-50vw);
  }
}



.icon{
    width: 10vw;
    height: 10vw;
    fill: #ccc;

}

.playIcon{
    width: 10vw;
    height: 10vw;
    fill: #ccc;
    margin: 0 5vw;
    transform: scale(0.95);
}

.moreIcon{
    width: 10vw;
    height: 10vw;
    fill: #ccc;
    margin: 0 5vw;
}

.listSongs{
    width: 10vw;
    height: 10vw;
    fill: #ccc;
    margin: 0 3vw;
    margin-right: 5vw;
    transform: scale(0.95);
   
}




</style>