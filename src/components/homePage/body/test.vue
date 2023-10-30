<script setup>
import { getMusicStyleList } from '../../../axios/routes/musicStyleAPI';
import {ref,reactive,onMounted,computed} from 'vue'

let musicStyleAPI
let musicStyleList=reactive({
    songs:[
        
    ],
    failImages:[
        'https://redchairrecruitment.ie/wp-content/uploads/2019/05/No-Data.png'
    ]
})

onMounted(
    async ()=>{
        try{
            musicStyleAPI=await getMusicStyleList()
            musicStyleList.songs=musicStyleAPI.data
             console.log('ok',musicStyleList.songs) 
        }
        catch(err){
            console.log(err)
        }
    }
)

 const imgList = computed(
     ()=>{
        if(musicStyleList.songs.playlists){
            return musicStyleList.songs.playlists
        }
        else{
            return 'https://redchairrecruitment.ie/wp-content/uploads/2019/05/No-Data.png'
        }
     }
) 

// 和上面一个函数类似，但是只有检测到歌手为英文名的时候才可以使用
     //playlists数组里的每一个歌手对象，对应一个属性，其中有一个属性是name，是歌手名字
        //用正则表达式检测是否为英文名字，然后返回该歌手对象的图片
 const foreignImgList = computed(()=>{
        if(musicStyleList.songs.playlists){
            return musicStyleList.songs.playlists.filter(
                (item)=>{
                    return /[a-zA-Z]/.test(item.name)
                }
            )

            
            /* return musicStyleList.songs.playlists */
        }
        else{
            return 'https://redchairrecruitment.ie/wp-content/uploads/2019/05/No-Data.png'
        }
    })






</script>


<template>
   <div class="musicStyleWrapper">
            <div class="title">
                热门歌单
                <i class="iconfont icon-jiantouyou"></i>
            </div>
            <div class="list">
                <div class="head">
                    <div class="word">
                    排名
                    <i class="iconfont icon-jiantouyou small" ></i>  
                    </div>
                    <div class="end">精选宝藏歌单</div>
                </div>
                
                <div class="rankWrapper">
                  
                    <div class="rank">
                        
                        <img :src="imgList[0].coverImgUrl" alt="rank1">
                        <div class="rankNum">1</div>
                        <div class="song">{{ imgList[0].name }}</div>
                    </div>
                    
                    <div class="rank">
                        
                        <img :src="imgList[1].coverImgUrl" alt="rank2">
                        <div class="rankNum">2</div>
                        <div class="song">{{ imgList[1].name }}</div>
                    </div>

                    <div class="rank">
                        
                        <img :src="imgList[2].coverImgUrl" alt="rank3">
                        <div class="rankNum">3</div>
                        <div class="song">{{ imgList[2].name}}</div>
                    </div>
                 
                    
                    
                </div>
                

                
                
            </div>
            
           


   </div>

<!--    {{ musicStyleList.songs?.playlists }} -->

   <!-- {{ imgList }} -->







</template>



<style scoped>
.musicStyleWrapper{
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