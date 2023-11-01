<script setup>
import {ref,reactive,inject} from 'vue'
import {getSingerRandom} from '../../axios/routes/singer.js';


const result=inject('button')
// console.log(result,result.button1Num.value,result.button2Num.value);


let singerRandomAPI
let singerRandomList=reactive({
    singerRandom:[

    ],
    failImages:[
        'https://redchairrecruitment.ie/wp-content/uploads/2019/05/No-Data.png'
    ]
    

});


// 初始歌手页面
(async ()=>{
    try{
        singerRandomAPI=await getSingerRandom(-1,-1)
        singerRandomList.singerRandom=singerRandomAPI.data
        /* console.log(singerList.singer); */
        //  console.log('ok',singerRandomList.singerRandom) 
      /*  console.log(singerAPI); */
    }
    catch(err){
        console.log(err)
    }
})();


// 点击按钮改变url里的查询参数，渲染不同歌手页面

const singerRandom=async ()=>{
    try{
        singerRandomAPI=await getSingerRandom(result.button1Num.value,result.button2Num.value)
        singerRandomList.singerRandom=singerRandomAPI.data
        /*  console.log(singerRandomAPI);  */
       
    }catch(err){
        console.log(err)}
}










const changeColor1=(i)=>{

   const button1s= document.getElementsByClassName('button1')

    for(let j=0;j<button1s.length;j++){
        if(j!=i){
            button1s[j].style.backgroundColor='rgb(244, 231, 231)'
        }
       
    }
   button1s[i].style.backgroundColor='green'
   
}

const changeColor2=(i)=>{
   const button2s= document.getElementsByClassName('button2')

    for(let j=0;j<button2s.length;j++){
        if(j!=i){
            button2s[j].style.backgroundColor='rgb(244, 231, 231)'
        }
    }
   button2s[i].style.backgroundColor='green'
   
}


const button1Context=reactive([
    {
        category:'全部',
        value1:-1

                    },
    {
        category:'男歌手',
        value1:1
    },
    {
        category:'女歌手',
        value1:2
    },
    {
        category:'乐队',
        value1:3
    }
])

const button2Context=reactive([
    {
        category:'全部',
        value2:-1

                    },
    {
        category:'华语',
        value2:7
    },
    {
        category:'欧美',
        value2:96
    },
    {
        category:'日本',
        value2:8
    },
    {
        category:'韩国',
        value2:16
    },
    {
        category:'其他',
        value2:0
    }
])











</script>    



<template>

<!-- <button @click="()=>{ result.button1Num.value+=1/* ;console.log(result.button1Num.value); */

    }">test1</button>

<button @click="()=>{ result.button2Num.value+=1/* ;console.log(result.button2Num.value); */

    }">test2</button>
 -->


<!-- {{result.button1Num}}
{{ result.button2Num }} -->




   
    <div class="word">
        查找歌手
        <i class="iconfont icon-xiajiantou1"></i>
    </div>
    <div class="buttonWrapper">

        <div class="first-line" >

           
                <button class="button1" 
                v-for="(item, index) in button1Context" 
                @click="changeColor1(index);
                result.button1Num.value=item.value1;
                singerRandom();

                " 
                :class="{default:index==0}"
                >
                                {{ item.category }}

                </button>


          

                 
        </div>



        
        <div class="second-line">








            <button class="button2" 
            v-for="(item, index) in button2Context"
                @click="changeColor2(index);
                result.button2Num.value=item.value2;
                singerRandom();

                
                " 
                :class="{default:index==0}"
                >
                                {{ item.category }}

                </button>



            
               

        </div>
        



    </div>






    <div class="singerWrapper" v-for="(item, index) in singerRandomList.singerRandom.artists" :key="index" >

        <router-link :to="{name:'listSinger',params:{id:item.id}}">
                 

                <img :src="item.picUrl" alt="singer" class="singerImg" v-if="index<15">

                </router-link>

<div class="singerName" v-if="index<15">

    <div class="name">
        {{item.name}}
        
    </div>

 





</div>

<div v-if="index<15">
    <button class="button">
        关注
    </button>
        
</div> 







</div> 





    
</template>


<style scoped>

.button{
    width: 10vw;
    background-color: rgb(251, 253, 251);
    border-radius: 4vw;
    border-color: rgb(17, 17, 17);
    border-width: 0.1vw;
}



.singerWrapper{
    width: 100vw;
   
    display: flex;
    align-items: center;
    background-color:rgb(252, 249, 249);
    
    
   
    


}

.singerImg{
    width: 16vw;
    height: 16vw;
    border-radius: 50%;
    border: 0.1vw solid #dbd4d4;
    margin-left: 1vw;
    margin-bottom: 1vw;
}
.name{
    margin: 0 4vw;
    display: flex;
    width: 58vw;
   

}






.iconfont{
    font-size: 2vw;
    color: rgb(113, 100, 100);
    margin-top: 1vw;
}
.word{
    color: rgb(113, 100, 100);
    margin-bottom: 1vw;
    margin-left: 3vw;
    margin-top: 2vw;
    
}
.button1{
    width: 16vw;
    height: 6.5vw;
    border-radius: 6vw;
    background-color: rgb(244, 231, 231);
    border: none;
    margin-left: 2vw;
    margin-top: 1vw;
    color: black;
    
    
    

}

/*  .button1:first-child{
    background-color: green;
  
}  */


.second-line{
    margin-top: 2vw;
    display: flex;
    flex-direction: row;
   width: 100vw;
   height: 12vw;
    overflow: auto;
    margin-bottom: 2vw;
   
    
}

.button2{
    /* 每次设置宽高失效，就用最小宽高 */
    min-width: 16vw;
    height: 6.5vw;
    border-radius: 6vw;
    background-color: rgb(243, 227, 227);
    border: none;
    margin-left: 2vw;
    margin-top: 1vw;
    color: black;
}

.button2:first-child{
    background-color: green;
  
}



/* 一定要将优先采用的类名的样式放到下面，否则将会失效，
 */

.default{
    background-color: green;
}




</style>