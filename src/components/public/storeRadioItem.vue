<script setup>
import {ref,reactive,watchEffect} from 'vue'
import { getDjDetail } from '@/axios/routes/djHot.js';
import { getSongs } from '@/axios/routes/getSongs.js';
import { useRoute,useRouter } from 'vue-router';
import { showFailToast } from 'vant';

const route = useRoute();
const router = useRouter();
const id=ref(route.params.id)
console.log(id.value);

let djDetailAPI
let songsAPI
let djDetailList=reactive({
    data:[],
    
});

let songsList=reactive({
    data:[],
    
});

(async ()=>{
    try{
        djDetailAPI = await getDjDetail(id.value)
        
        djDetailList.data = djDetailAPI.data.programs
          console.log('okprogramdetail',djDetailList.data);  
      
    }
    catch(err){
        console.log(err)
    }
} )();

/* const getSongsAPI = async (id) => {
    try{
        songsAPI = await getSongs(id)
        console.log('ok',songsAPI);
        songsList.data = songsAPI.data.songs
          console.log('ok',songsList.data);  
      
    }
    catch(err){
        console.log(err)
    }
} */


const onClickLeft = () => history.back();

const drawer = ref(false)
const direction = ref('btt')
const anchors=[
      100,
      Math.round(0.4 * window.innerHeight),
      Math.round(0.7 * window.innerHeight),
]

const height = ref(anchors[1]);



</script>



<template>

    <van-nav-bar
  title="电台详情"
  left-text="返回"
  left-arrow
  @click-left="onClickLeft"
/>




<div class="radioWrapper">

    <div class="radioHeadWrapper">

        <div class="radioHead">

           <div class="headImg">

            <img :src="djDetailList.data[0]?.coverUrl" alt="headpic" class="headPic">

           </div> 

           <div class="headDesc">

            <div class="channel">
                {{djDetailList.data[0]?.channels[0]}}
            </div>

            <div class="authorName">
                {{djDetailList.data[0]?.dj.brand}}
            </div>

            <div class="descriptionWrapper">

        
                <div class="description">
                    {{djDetailList.data[0]?.description}}
                </div>
                <div class="descIcon">
                    <van-icon name="info-o" size="20" @click="drawer=true" />
                </div>

                <el-drawer
                    v-model="drawer"
                    title="介绍"
                    :direction="direction"
                    :before-close="handleClose"
                >

                <span> &nbsp;&nbsp;{{djDetailList.data[0]?.description}}</span>
                </el-drawer>


            </div>

           </div>


            
        </div>




    </div>


<div class="none" v-if="djDetailList.data.length===0">
     暂无数据

</div>

<van-floating-panel v-model:height="height" :anchors="anchors">
    <van-cell-group>
        <div class="contentWrapper">

            <div class="content" v-for="(item, index) in djDetailList?.data" :key="index">

                <div class="contentImg" @click="getSongsAPI(item.id)">
                    <img :src="item.coverUrl" alt="pic1" class="contentPic">
                </div>

                <div class="contentDesc">

                    <div class="contentName">
                        {{ item.mainSong.name }}

                    </div>

                    <div class="contentAuthor" v-for="(item1, index1) in item.mainSong.artists" :key="index1">
                            {{ item1.name }}

                    </div>

                    

                </div>

                <div class="playCount">
                        {{ item.listenerCount?(item.listenerCount/10000).toFixed(1)+'w':item.listenerCount }}


                </div>
                <div class="hot">

                </div>











            </div>





        </div> 
    </van-cell-group>
</van-floating-panel>












</div>



</template>



<style scoped>
.content{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    height: 20vw;
    padding: 5px;
    margin-top: 1vw;
    margin-bottom: 1vw;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px #ccc;
}

.contentPic{
    width: 20vw;
    height: 20vw;
    border-radius: 10px;
    box-shadow: 0 0 10px #ccc;
}

.contentName{
    font-size: 4vw;
    font-weight: bold;
    color: #000;
    margin-bottom: 10px;
    width: 50vw;
    max-height: 5vw;
    flex-wrap: wrap;
    overflow: hidden;
    text-overflow: ellipsis;
 
    margin-left: 2vw;
}

.contentAuthor{
    font-size: 3vw;
    color: #000;
    margin-bottom: 10px;
    margin-left: 3vw;
    width: 50vw;
    max-height: 4vw;
    overflow: hidden;
}
.playCount{
    font-size: 3vw;
    color: #000;
    width: 13vw;
    max-height: 4vw;
    overflow: hidden;
}




.radioHead{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 10px;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px #ccc;
}

.headPic{
    width: 40vw;
    height: 40vw;
    border-radius: 10px;
    box-shadow: 0 0 10px #ccc;
}

.headDesc{
   margin-left: 4vw;
    width: 50vw;
    
   
}

.channel{
    font-size: 4vw;
    color: #000;
    margin-bottom: 10px;
    text-align: center;
}


.authorName{
    font-size: 6vw;
    font-weight: bold;
    color: #000;
    text-align: center;
    margin-bottom: 10px;
    max-height: 10vw;
    overflow: auto;
    
}

.descriptionWrapper{
    display: flex;
    flex-direction: row;
   
    justify-content: center;
    align-items: center;
    text-overflow: ellipsis;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px #ccc;
}

.description{
    font-size: 3vw;
    max-width: 35vw;
    max-height: 4vw;

    color: #000;
   
    text-overflow: ellipsis;
    
    overflow: hidden;
}

.descIcon{
   
    font-size: 4vw;
    color: #000;
    margin-left: 2vw;
    text-align: center;
}



</style>