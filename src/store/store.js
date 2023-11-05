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
            playList:[
                {

                }
            ]





        }
    },



    getters:{







    },





    mutations:{






    },




    actions:{








    },





})


export default store