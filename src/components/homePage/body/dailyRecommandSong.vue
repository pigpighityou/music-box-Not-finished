<script setup>
import { getDailyRecommandSong } from '../../../axios/routes/dailyRecommand';
import { ref, reactive } from 'vue';


let dailyRecommandSongAPI
let dailyRecommandSongList=reactive({
    data:[
       
    ],
    failImages:[
        'https://redchairrecruitment.ie/wp-content/uploads/2019/05/No-Data.png'
    ]
    

});

(async ()=>{
    try{
  
            dailyRecommandSongAPI=await getDailyRecommandSong()
        dailyRecommandSongList.data=dailyRecommandSongAPI.data
        /* console.log('ok',dailyRecommandSongList.data.data) */
        

        
       
    }
    catch(err){
        console.log(err)
    }
})()



</script>

<template >

    <router-link to="/dailyRec">
        <div class="dailyRecommandSongWrapper">

        <div class="dailyRecommandSongTitle">
            <span><strong>&nbsp;&nbsp;每日推荐歌曲</strong>
            <i class="iconfont icon-jiantouyou"></i>
            </span>
        </div>

        <div class="dailyRecommandSongList">

            <div class="dailyRecommandSongItem" v-for="(item,index) in dailyRecommandSongList.data.data?.dailySongs||null">

                <div class="dailyRecommandSongItemImg">
                    <img :src="item.al.picUrl" alt="pic" >
                </div>
                
                <div class="dailyRecommandSongItemName">
                    <span>{{item.name}}</span>
                </div>

                <div class="dailyRecommandSongItemArtist" v-for="(item1, index1) in item.ar" :key="index">
                    <span>{{item1.name}}</span>
                </div>
            </div>

        </div>

        </div>

    </router-link>

  





    
</template>


<style scoped>
    
.dailyRecommandSongWrapper{
    width: 100vw;
    height: 50vw;
    margin-bottom: 8vw;
    margin-top: 3vw;
    
   
   
}

.iconfont{
    font-size: 3vw;
    color: #000000;
    margin-left: 2vw;
    margin-right: 2vw;
}

.dailyRecommandSongList{
    width: 100vw;
    height: 50vw;
    display: flex;
    overflow: auto;
    
    font-size: 4vw;
    font-weight: bold;
    color: #000000;
    margin-top: 2vw;
}


.dailyRecommandSongItem{
  
    display: flex;
    flex-direction: column;
    align-items: center;
   
    text-overflow: ellipsis;
    margin-left: 2vw;
    margin-right: 2vw;
    font-size: 4vw;
    font-weight: bold;
    color: #000000;
  
    max-width: 34vw;
    min-height: 55vw;
    max-height: 90vw;
    
    
   
}


.dailyRecommandSongItemImg{
    width: 34vw;
    height: 34vw;
    
    border-radius: 30%;
    border: 0.2vw solid #645151;
}

.dailyRecommandSongItemName{
    
    margin-top: 1vw;
    margin-bottom: 1vw;
    overflow: auto;
     text-overflow:ellipsis;
     text-align: center;
    flex-wrap: wrap;
    max-width: 40vw;
    min-height: 4vw;
}

.dailyRecommandSongItemArtist{
   
    margin-bottom: 0.5vw;
    font-weight: 300;
    overflow: auto;
    text-overflow:ellipsis;
    flex-wrap: wrap;
    max-width: 34vw;
    min-height: 4vw;
    max-height: 12vw;
}

/* .dailyRecommandSongItemArtist span{
    width: 30vw;
    height: 6vw;
   text-align: center;
} */

img{
    width: 100%;
    height: 100%;
    border-radius: 30%;
}


.dailyRecommandSongTitle{
    color:black;
}





</style>