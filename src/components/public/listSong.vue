<script setup>
import { useRoute,useRouter } from 'vue-router';
import {ref,reactive,onMounted,computed,watchEffect} from 'vue'
import {getListSong} from '@/axios/routes/getListSong.js'
import {getListSongDetail} from '@/axios/routes/getListSong.js'

const route=useRoute()
const id=ref(route.params.id)

const drawer=ref(false)
const direction=ref('btt')



let songs=reactive({
    data:[],
    failImages:[
        'https://redchairrecruitment.ie/wp-content/uploads/2019/05/No-Data.png'
    ]
});

let songDetail=reactive({
    data:[],
    failImages:[
        'https://redchairrecruitment.ie/wp-content/uploads/2019/05/No-Data.png'
    ]
});

(async ()=>{
    try{
        const res=await getListSong(id.value)
        songs.data=res.data
       /*  console.log('ok',songs.data) */
    }
    catch(err){
        console.log(err)
    }
})();


(async ()=>{
    try{
        const res=await getListSongDetail(id.value)
         songDetail.data=res.data 
       /*  console.log('okdetail',songDetail.data) */
    }
    catch(err){
        console.log(err)
    }
})();













const onClickLeft = () => history.back();


</script>



<template>


    <van-nav-bar
  title="歌曲列表"
  left-text="返回"
  left-arrow
  @click-left="onClickLeft"
/>




<div class="desc">

  <div class="bgPic">
    <img :src="songDetail.data.playlist?.coverImgUrl" alt="pic" class="pic">
  </div>

  <div class="total">
    <div class="name">
        {{  songDetail.data.playlist?.name }}
    </div>

    <div class="author">
          作者：{{  songDetail.data.playlist?.creator.nickname }}
    </div>

    <div class="tags" v-for="(item, index) in songDetail.data.playlist?.tags" :key="index">
           {{ item}}
          
    </div>
  </div>
 
  

</div>

<div class="describe" @click="drawer=true"> 

  <div class="brief">
    {{  songDetail.data.playlist?.description }}
  
    
  </div>
  <div class="icon">
      <i class="iconfont icon-jiantouyou"></i>
  </div>
  

</div>

<el-drawer
    v-model="drawer"
    title="详细介绍"
    :direction="direction"
    :before-close="handleClose"
    size="100%"
  >

  <div class="wrapper" >

    <img :src="songDetail.data.playlist?.coverImgUrl" alt="pic3" class="pic3">

      <div class="bgPic1">
        <img :src="songDetail.data.playlist.coverImgUrl" alt="pic" class="pic1">
      </div>
      <div class="name1">
        {{  songDetail.data.playlist.name }}
      </div>
      <div class="tags1" v-for="(item, index) in songDetail.data.playlist.tags" :key="index">
              {{ item}}
              
      </div>

        <div class="brief1">
        {{  songDetail.data.playlist.description }}
      
        
      </div>

  </div>





</el-drawer>

<div class="listSongsWrapper">
  <div class="title">
      歌曲列表
      <i class="iconfont icon-xiajiantou1"></i>
  </div>

  <div class="listSongs" >


      <div class="listSong" v-for="(item, index) in songs.data.songs" :key="index">
        <div class="rankWrapper">

              {{ index+1 }}
        </div>
          <div class="songWrapper">
              <div class="songName">
                {{ item.name }}
            </div>
            <div class="twoItems">
                <div class="authors">

                
                      <div class="songAuthor" v-for="(item1, index1) in item.ar" :key="index1">
                        
                      
                        {{ item1.name  }}
                      
              
  
              
                        </div>
                </div>

              <div class="album">
                {{ item.al.name }}
              </div>
            </div>
            
           
          </div>

          <div class="mv" v-if="item.mv!=0">
            
            <svg class="videoIcon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ea893728=""><path fill="currentColor" d="M704 768V256H128v512h576zm64-416 192-96v512l-192-96v128a32 32 0 0 1-32 32H96a32 32 0 0 1-32-32V224a32 32 0 0 1 32-32h640a32 32 0 0 1 32 32v128zm0 71.552v176.896l128 64V359.552l-128 64zM192 320h192v64H192v-64z"></path></svg>
          </div>
         
          
      </div>

  </div>






</div>





</template>





<style scoped>
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

.authors{
  display: flex;
  flex-direction: row;
  
  font-size: 3vw;

  text-overflow: ellipsis;
  overflow: hidden;
 
 

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
  justify-content: space-between;
  align-items: center;

}

.videoIcon{
  width: 5vw;
  height: 5vw;
  margin-top: 1vw;
  margin-left: 1vw;

  
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
    padding-right: 2vw;
    margin-right: 2vw;
    max-height: 4vw;
     max-width: 30vw; 
    text-overflow: ellipsis;
    overflow: hidden;
    text-align: center;
}

.album{
  display: inline-block;
    text-overflow: ellipsis;
    padding-right: 1vw;
    margin-left: 4vw;
    width: 40vw;
    height: 4vw;
    
    overflow: hidden;
    color: grey;
    

}

.twoItems{
  display: flex;
  flex-direction: row;
  align-items: center;
  
  margin-top: 1.4vw;
  font-size: 3vw;
  /* max-width: 70vw; */
  overflow: hidden;
  text-align: center;
 

}









</style>