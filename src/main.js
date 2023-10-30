import './assets/main.css'

import 'vant/lib/index.css';
import getVantComponents from './assets/vant.js'


import { createApp } from 'vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'


import App from './App.vue'


import router from "./router/index";

import store from './store/store.js'






const app=createApp(App)

// 相当于Vant插件=>app.use(各种组件)
getVantComponents(app)

// element-plus插件
app.use(ElementPlus)

// 路由插件
app.use(router)

// vuex插件
app.use(store)



app.mount('#app')

