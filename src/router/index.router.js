//默认路由
export default [{
    path:'/',
    //实现代码分割
    component: () => import(/*webpackChunkName:'home'*/ "@/views/Home.vue")
},{
    //*会被处理到当前路由的最后面
    path:'*',
    component: () =>  import(/*webpackChunkName:'404'*/"@/views/404.vue")
},{
    path:'/mamager',
    component: () =>  import(/*webpackChunkName:'404'*/"@/views/mamager/index.vue"),
    meta:{
        needLogin:true
    }
}]