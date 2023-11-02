// 因为vant组件每次使用都要引入到main.js，所以我们可以把vant组件打包封装成一个插件给main.js使用

import {Button,Form, Field, CellGroup,Tabbar,TabbarItem,Icon,
    Sidebar,SidebarItem,NavBar,Tab,Tabs,Pagination, Grid, GridItem,
    ActionSheet,showToast,showSuccessToast, showFailToast


} from 'vant'


let components=[
    Button,Form, Field, CellGroup,Tabbar,TabbarItem,Icon
    ,Sidebar,SidebarItem,NavBar,Tab,Tabs,Pagination, Grid, GridItem,
    ActionSheet,showToast,showSuccessToast, showFailToast
]

// 封装一个函数，用来注册所有的组件
export default function getVantComponents(app){
    components.forEach( items=>app.use(items)
    )
}