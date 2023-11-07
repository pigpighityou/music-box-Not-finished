import { createStore } from 'vuex'


const store=createStore({

    state(){
        return{

            // 登录状态
            isLogin:false,
            token:'',
            userData:{
                
            },

            // 是否有footbar

            hasFootBar:false,
            

            // 播放状态
            isPlayingSong:false,

            playSong:
                {
                

                },

                url:'',

            playList:[],
            playIndex:'',










             audioState:{

             }

           

        }
            
    },
  



    getters:{







    },





    mutations:{

        //  别忘了加上state
        getIndexPlay(state,index){
            
            this.state.playIndex=index
            this.state.playSong=state.playList[index]
        
        }





    },




    actions:{








    },



})


export default store