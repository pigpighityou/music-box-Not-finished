<script setup>
import { getRecSongList3 } from '../../../axios/routes/recSongAPI';
import {ref,reactive,onMounted,computed} from 'vue'

let recSongsAPI

let recSongsList=reactive({
    songs:[ 
    ],
    failImages:[
        'https://redchairrecruitment.ie/wp-content/uploads/2019/05/No-Data.png'
    ]
});



    (async ()=>{
        try{
            recSongsAPI=await getRecSongList3()
            recSongsList.songs=recSongsAPI.data
            
           
            
             /* console.log('ok',recSongsList.songs)  */
        }
        catch(err){
            console.log(err)
        }
    })();


 const recList = computed(
     ()=>{
        
            if(recSongsList.songs.playlists){
                return recSongsList.songs.playlists
            }
            else{
                return 'https://redchairrecruitment.ie/wp-content/uploads/2019/05/No-Data.png'
            }
       
        
     }
) 




</script>


<template>
   <div class="recSongsWrapper">
            <div class="title">
                <!-- 推荐歌单
                <i class="iconfont icon-jiantouyou"></i> -->
            </div>

            <div class="list" >
                <div class="head">
                    <div class="word">
                    排名
                    <i class="iconfont icon-jiantouyou small" ></i>  
                    </div>
                    <div class="end">精选宝藏歌单</div>
                </div>
                
                <div class="rankWrapper">
                  
                    <div class="rank">
                        
                        <img :src="recList[0].coverImgUrl" alt="rank1">
                        <div class="rankNum">1</div>
                        <div class="song">{{ recList[0].name }}</div>
                    </div>
                    
                    <div class="rank">
                        
                        <img :src="recList[1].coverImgUrl" alt="rank2">
                        <div class="rankNum">2</div>
                        <div class="song">{{ recList[1].name }}</div>
                    </div>

                    <div class="rank">
                        
                        <img :src="recList[2].coverImgUrl" alt="rank3">
                        <div class="rankNum">3</div>
                        <div class="song">{{ recList[2].name}}</div>
                    </div>
                 
                    
                    
                </div> 
                

                
                
            </div>
            
           


   </div>

<!--    {{ recSongsList.songs?.playlists }} -->

    <!--  {{ recSongsList.songs }}   -->
  
   <!--  <div v-for='(item,index) in recSongsList.songs'>
        hello {{ item?.playlists[0]?.name||'no data' }}--{{ index }}
    </div> -->

   






</template>



<style scoped>
.recSongsWrapper{
    width: 100vw;
    height: 60vw;
    
    display: flex;
    flex-direction: column;
    margin: 1.5vw 0;
    
    
    
    
   
}

.title{
    background-color: white;
    width: 95vw;
    height: 8vw;
    font-size: 4vw;
    padding: 0 auto;
    margin: 0 auto 1vw;
   
}
.list{
    background-color: rgb(252, 247, 247);
    width: 95vw;
    height: 52vw;
    border-radius: 2vw;
    margin-top: 1vw;
    padding: 0 auto;
    padding-top: 1vw;
    margin: 0 auto;
    display: flex;
    flex-direction:column;
    
    
    
    
}
.head{
    height: 15%;
    display: flex;
    flex-direction: row;
}

.word{
    padding-left: 2vw;
    width: 100%;
    height: 100%;
    
}
.end{
    height: 4.5vw;
    width: 24vw;
    transform: scale(0.8);
    padding-top: 0.3vw;
   
}
.rankWrapper{
    padding-left: 1%;

}

.rankWrapper div{
     background-color:rgb(252, 247, 247);
     margin: 1% auto;
     height: 13vw
}

.rank img{
    width: 15.5%;
    height: 100%;
    padding-left: 1%;
    padding-bottom: 1%;
}

.rank{
    display: flex;
    
   
}
.rankNum{
    padding-right: 10%;
    padding-top: 2%;
    font-family:monospace;
    width:10vw;
    height: 100%;
}

.song{
    padding-right: 0%;
    padding-top: 2%;
    font-family:"Microsoft YaHei";
    font-size: 1vw;
    width: 40vw;
    height: 100%;
    overflow: auto;
}
</style>