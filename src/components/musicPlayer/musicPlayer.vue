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
    z-index="9999999" 
  >

    <div class="songDetailWrapper">


        <div class="picDetail">
            <img :src="store.state.playSong?.al?.picUrl||store.state.playSong?.album?.picUrl||store.state.playSong?.data?.al.picUrl" alt="pic" class="pic">
        </div>

        <div class="descHeader">
            <div class="nameDetail">
                    <div class="nameContent">
                        {{store.state.playSong?.name||store.state.playSong?.data?.name}}
                    </div>
            </div>
            <div class="mark" >
                <svg class="markIcon" @click="marked" :class="{clickMark:markIconColor===true}" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ea893728=""><path fill="currentColor" d="M384 960v-64h192.064v64H384zm448-544a350.656 350.656 0 0 1-128.32 271.424C665.344 719.04 640 763.776 640 813.504V832H320v-14.336c0-48-19.392-95.36-57.216-124.992a351.552 351.552 0 0 1-128.448-344.256c25.344-136.448 133.888-248.128 269.76-276.48A352.384 352.384 0 0 1 832 416zm-544 32c0-132.288 75.904-224 192-224v-64c-154.432 0-256 122.752-256 288h64z"></path></svg>
                <div class="markWord">
                    {{ store.state.playSong.data.mark<10000?store.state.playSong.data.mark:((store.state.playSong.data.mark)/10000).toFixed(1)+'w' }}
                </div>
                
            </div>

            <div class="publishTime">
            发布时间：{{ store.state.playSong.data.publishTime}}
        </div>
        </div>

        

        <div class="desc">

            <div class="singerDetail">
                <div class="singerIcon">
                    <i class="iconfont icon-jiantouyou"></i>
                </div>
                <div class="singerContent"  v-for="(item, index) in store.state.playSong?.ar||store.state.playSong?.artists||store.state.playSong?.data?.ar" :key="index">
                    {{item.name}}
                </div>
                
            </div>

            <div class="mvDetail">
                <div class="mvContent">
                   <!--  {{ store.state.playSong.data.mv||store.state.playSong.mv }} -->
                    <svg class="mvIcon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ea893728=""><path fill="currentColor" d="m768 576 192-64v320l-192-64v96a32 32 0 0 1-32 32H96a32 32 0 0 1-32-32V480a32 32 0 0 1 32-32h640a32 32 0 0 1 32 32v96zM192 768v64h384v-64H192zm192-480a160 160 0 0 1 320 0 160 160 0 0 1-320 0zm64 0a96 96 0 1 0 192.064-.064A96 96 0 0 0 448 288zm-320 32a128 128 0 1 1 256.064.064A128 128 0 0 1 128 320zm64 0a64 64 0 1 0 128 0 64 64 0 0 0-128 0z"></path></svg>
                </div>
            </div>

        </div>

        


       

        


        
    {{ store.state.playIndex }}
  
   {{ store.state.isPlayingSong }}

  

  

   
         

    </div>
   
  </el-drawer>


 

</div>

</template>

<script setup>
import {ref,reactive,onMounted,computed,provide,watchEffect,KeepAlive} from 'vue'
import {useRouter,useRoute} from 'vue-router'
import {getSongs} from '@/axios/routes/getSongs.js'
import store from '../../store/store';
import { ElLoading } from 'element-plus'



const router=useRouter()
const route=useRoute()



const drawer = ref(false)
const direction = ref('btt')

const musicPlayer=ref(null)

const markIconColor=ref(false)
const marked=()=>{
 
   
   if(markIconColor.value===true){
    store.state.playSong.data.mark===store.state.playSong.data.mark
   }else if(markIconColor.value===false){
    markIconColor.value= true
    store.state.playSong.data.mark+=1
   }

}



const hasFootBar=ref(store.state.hasFootBar)



 const audio=ref(null);


 watchEffect(()=>{
    if(store.state.playSong){
        console.log(store.state.playSong);
    }
 })



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
.songDetailWrapper{
    
}

.pic{
    border-radius: 50%;
    border: 0.3vw grey solid;
    width: 75vw;
    height: 75vw;
    display: flex;
    margin: 0 auto;
}


.descHeader{
    display: flex;
    flex-direction: row;
    margin-top: 5vw;
    width: 100vw;
    margin-bottom: 5vw;
    justify-content: space-around;
   

}

.nameDetail{
    display: block;
    width: 60vw;
    height: 8vw;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 6vw;
   
}

.mark{
    font-size: 3vw;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;


}
.markWord{
    
}

.markIcon{
    width: 4.5vw;
    height: 4.5vw;
}

.clickMark{
    color: rgb(181, 193, 57);
}

.publishTime{
    font-size: 2.5vw;
    width: 23vw;
    height: 8vw;
    display: flex;
    align-items: center;
    justify-content: center;


}



.desc{
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 9vw;
}


.singerDetail{
    display: flex;
    flex-direction: row;

}

.singerIcon{
    margin-left: -1vw;
    margin-right: 0.8vw;
    margin-top: -0.25vw;
    transform: scale(0.8);
}

.singerContent{
   font-size: 3.5vw;
}


.mvContent{
        margin-left: 2vw;
}

.mvIcon{
    margin-left: 3vw;
        width: 7vw;
        height: 7vw;
}







.musicPlayerWrapper{
    width: 100vw;
    height: 18vw;
    background-color: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 999999;
   
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