<script setup>
import { getHotSinger } from '../../../axios/routes/hotSingerAPI';
import {ref,reactive,onMounted,computed} from 'vue'

let hotSingerAPI
let hotSingerList=reactive({
    artists:[
        
    ],
    failImages:[
        'https://redchairrecruitment.ie/wp-content/uploads/2019/05/No-Data.png'
    ]
});


   ( async ()=>{
        try{
            hotSingerAPI=await getHotSinger()
            hotSingerList.artists=hotSingerAPI.data.artists
            /*  console.log('ok',hotSingerList.artists)  */
        }
        catch(err){
            console.log(err)
        }
    })();


const singerList = computed(
     ()=>{
        if(hotSingerList.artists){
            return hotSingerList.artists
        }
        else{
            return 'https://redchairrecruitment.ie/wp-content/uploads/2019/05/No-Data.png'
        }
     }
)


        



</script>


<template>

    <router-link to="/hotListSinger" >
        <div class="hotSingerWrapper">
    
    <div class="title">
        热门歌手
        <i class="iconfont icon-jiantouyou"></i>
    </div>
    <div class="list">
        <div class="head">
            <div class="word">
            排名
            <i class="iconfont icon-jiantouyou small" ></i>  
            </div>
            <div class="end">精选宝藏歌手</div>
        </div>
        
        <div class="rankWrapper">
          
            <div class="rank">
                
                <img :src="singerList[0]?.picUrl" alt="rank1">
                <div class="rankNum">1</div>
                <div class="song">{{ singerList[0]?.name }}</div>
            </div>
            
            <div class="rank">
                
                <img :src="singerList[1]?.picUrl" alt="rank2">
                <div class="rankNum">2</div>
                <div class="song">{{ singerList[1]?.name }}</div>
            </div>

            <div class="rank">
                
                <img :src="singerList[2]?.picUrl" alt="rank3">
                <div class="rankNum">3</div>
                <div class="song">{{ singerList[2]?.name}}</div>
            </div>
         
            
            
        </div>
        

        
        
    </div>
    
   


</div>
    </router-link>
  

  






</template>



<style scoped>
.hotSingerWrapper{
    width: 100vw;
    height: 60vw;
    
    display: flex;
    flex-direction: column;
    margin: 1.5vw 0;
    color: black;
    
    
    
    
   
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
    padding-right: 30%;
    padding-top: 2%;
    font-family:monospace;
    width:10vw;
    height: 100%;
}

.song{
    padding-right: 0%;
    padding-top: 2%;
    font-family:'Times New Roman', Times, serif;
    width: 40vw;
    height: 100%;
}
</style>