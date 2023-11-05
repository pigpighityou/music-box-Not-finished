<template>

        <div class="recWrapper">
                <van-nav-bar
                title="每日推荐"
                left-text="返回"
                left-arrow
                @click-left="onClickLeft"
                />
                        

             <div class="recSong">

                <div class="head"></div>
         

                <div class="list" v-for="(item, index) in dailyRecommandSong.data.dailySongs" :key="index">

                    <div class="picture">
                         
                        <img :src="item.al.picUrl" alt="pic" class="pic" @click="console.log(item)">

                    </div>

                    <div class="songIntro">

                          <div class="SongName">
                                {{ item.name }}
                          </div>  

                          <div class="otherIntro">

                                <div class="reason" v-for="(item2, index2) in dailyRecommandSong.data.recommendReasons" :key="index" >
                                        <div class="judge" v-if="item2.songId===item.id">
                                                
                                        {{ item2.reason }}
                                        </div>
                 
                                </div>

                                <div class="singer" v-for="(item1, index1) in item.ar" :key="index1">
                                    <div class="singerName">
                                        {{ item1.name }}
                                    </div>
                                  
                                </div>

                                <div class="album" >
                                    -{{ item.al.name }}
                                </div>

                          </div>

                    </div>


                    <div class="mv" v-if="item.mv!=0">
                        <router-link :to="{name:'mvPlayer',params:{id:item.mv}}">
                            <svg class="mvIcon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ea893728=""><path fill="currentColor" d="M704 768V256H128v512h576zm64-416 192-96v512l-192-96v128a32 32 0 0 1-32 32H96a32 32 0 0 1-32-32V224a32 32 0 0 1 32-32h640a32 32 0 0 1 32 32v128zm0 71.552v176.896l128 64V359.552l-128 64zM192 320h192v64H192v-64z"></path></svg>
                        </router-link>
                    </div>


                </div>
                
                






            </div>


            <div class="header">
                        <div class="words">
                            每日推荐歌单<i class="iconfont icon-xiajiantou"></i>
                        </div>    
                     
            </div>
            <div class="recSongList">

                    

                    <div class="list2" v-for="(item, index) in dailyRecommandSongList.data" :key="index">
                        
                        <div class="imgWrapper" >
                            <router-link :to="{name:'listSong',params:{id:item.id}}">
                                <img :src="item.picUrl" alt="pic2" class="pic2">
                            </router-link>   
                               

                        </div>
                        <div class="describe" >
                              {{ item.name }}
                        </div>




                     </div>
              





            </div>






        </div>


    
</template>

<script setup>
import {reactive,ref} from 'vue'
import {getDailyRecommandSongList} from '@/axios/routes/dailyRecommand'
import { getDailyRecommandSong } from '../../axios/routes/dailyRecommand';



let dailyRecommandSongListAPI
let dailyRecommandSongAPI

let dailyRecommandSongList=reactive({
    data:[
        
    ],
    failImages:[
        'https://redchairrecruitment.ie/wp-content/uploads/2019/05/No-Data.png'
    ]
    

});

let dailyRecommandSong=reactive({
    data:[

    ],
    failImages:[
        'https://redchairrecruitment.ie/wp-content/uploads/2019/05/No-Data.png'
    ]
});

(async ()=>{
    try{
        dailyRecommandSongListAPI=await getDailyRecommandSongList()
        dailyRecommandSongList.data=dailyRecommandSongListAPI.data.recommend
         /*  console.log('oksonglist',dailyRecommandSongList.data)   */
    }
    catch(err){
        console.log(err)
    }
})();

(async ()=>{
    try{
        dailyRecommandSongAPI=await getDailyRecommandSong()
        dailyRecommandSong.data=dailyRecommandSongAPI.data.data
            console.log('oksong',dailyRecommandSong.data)    
    }
    catch(err){
        console.log(err)
    }
})();

const onClickLeft = () => history.back();

</script>



<style scoped>

.recSong{
  

}

.songIntro{
    width: 90vw;
}

.list{
    display: flex;
    flex-direction: row;
    
    align-items: center;
  
    padding: 10px;
   
    border-radius: 10px;
}








.pic{
    width: 20vw;
    height: 20vw;
    border: 0.1vw rgb(218, 214, 214) solid;
}




.SongName{
    margin-left: 1vw;
    width: 53vw;
    height: 15vw;
    overflow: auto;
    font-size: 4.3vw;

}

.otherIntro{
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    max-height: 3vw;
    overflow: hidden;
    margin-left: 1vw;
    
   
  
   
}

.judge{
    border: 1px solid rgb(252, 249, 249);
    
    
    margin-right: 0.5vw;
    border-radius: 1.5px;
    background-color: rgb(243, 169, 169);
    max-width: 30vw;
   
    max-height: 4vw;
    font-size: 2vw;
    color: rgb(133, 4, 4);
   
  
}

.singerName{
 
  
    max-height: 3vw;
    overflow: hidden;
    font-size: 2.4vw;
    margin-right: 1vw;
    color: grey;
    flex-wrap: wrap;
    text-overflow: ellipsis;
   
}

.album{
    max-height: 3vw;
    margin-right: 1vw;
    overflow: hidden;
    font-size: 2.4vw;
    color: grey;
   
    text-align: center;
    margin-left: -1.5vw;

}

.mv{
   margin-bottom: 7vw;
    height: 10vw;
}

.mvIcon{
    width: 4vw;
    height: 4vw;
    margin-left: 1vw;
    margin-top: 0vw;
    color: black;

}

.recSongList{
    display: flex;
    flex-direction: row;
    overflow: auto;
 
}

.iconfont{
    font-size: 4vw;
    color: rgb(133, 4, 4);
    margin-left: 1vw;
    margin-top: 0.5vw;
}
.header{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 2vw;
    margin-bottom: 2vw;
    margin-left: 2vw;
    margin-right: 2vw;
    font-size: 4vw;
    color: rgb(133, 4, 4);
}

.imgWrapper{
    margin-left: 2vw;
    margin-right: 2vw;
    max-height: 25vw;
}

.pic2{
    width: 25vw;
    height: 25vw;
    border: 0.1vw rgb(218, 214, 214) solid;
    border-radius: 1vw;
}

.list2{
    display: flex;
    flex-direction: column;
  
}
.describe{
    margin-top: 1vw;
    margin-bottom: 5vw;
    font-size: 3vw;
    color: rgb(133, 4, 4);
    text-align: center;
    overflow: auto;
    width: 25vw;
    height: 10vw;
    transform: scale(0.8);
    height: 15vw;
}



</style>