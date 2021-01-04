export default [{
    path:'userStaticstics',
    mate:{
        auth:'userStaticstics'
    },
    name:'userStaticstics',
    component:() => import('@/views/manager/userStaticstics.vue')
},{
    path:'userAuth',
    mate:{
        auth:'userAuth'
    },
    name:'userAuth',
    component:() => import('@/views/manager/userAuth.vue')
},{
    path:'infoPublish',
    mate:{
        auth:'infoPublish'
    },
    name:'infoPublish',
    component:() => import('@/views/manager/infoPublish.vue')
},{
    path:'articleManager',
    mate:{
        auth:'articleManager'
    },
    name:'articleManager',
    component:() => import('@/views/manager/articleManager.vue')
},{
    path:'persional',
    mate:{
        auth:'persional'
    },
    name:'persional',
    component:() => import('@/views/manager/persional.vue')
},{
    path:'myCollection',
    mate:{
        auth:'myCollection'
    },
    name:'myCollection',
    component:() => import('@/views/manager/myCollection.vue')
},{
    path:'privateManange',
    mate:{
        auth:'privateManange'
    },
    name:'privateManange',
    component:() => import('@/views/manager/privateManange.vue')
},{
    path:'myArticle',
    mate:{
        auth:'myArticle'
    },
    name:'myArticle',
    component:() => import('@/views/manager/myArticle.vue')
}

]