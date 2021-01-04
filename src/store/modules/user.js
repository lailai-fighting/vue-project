export * as user from '@/api/user.js';
import * as types from '../action-types';
import {setLocal,getLocal} from '@/utils/local';
// import { getLoacl } from '../../utils/local';
import per from '@/router/per.js';
import router from '@/router';
const filterRoter = (authList) =>{//authList后台返回的
    let auths = authList.map(auth => auth.auth);
    function filter(routers){
       return  routers.filter(route => {
            if(auths.includes(route.mate.auth)){
                if(route.children){
                    route.children = filter(route.children);
                }
                return route;
            }
        })
    }
    return filter(per);
}
export default {
    state:{
        userInfo:{},
        hasPermission:false,
        menuPermission:false,
    },
    mutations:{
        [types.SET_USER](state,payload){
            state.userInfo = payload;
            if(payload && payload.token){
                setLocal("token",payload.token);
            }else{
                localStorage.clear("token")
            }
            
        },
        [types.SET_PERMISIION](state,payload){
            state.hasPermission = payload;
        },
        [types.USER_VALIDATE](state,payload){
            state.hasPermission = payload;
        },
        [types.SET_MENU_PERMISSION](state,payload){
            state.menuPermission = payload;
        }
    },
    actions:{
        async [types.SET_USER]({commit},{payload,permission}){
            commit(types.SET_USER,payload);
            commit(types.SET_PERMISIION,permission)
        },
        async [types.USER_LOGIN]({commit,dispatch},payload){
            try{
                let result = await user.login(payload);
                dispatch(types.SET_USER,{payload:result.data,permission:true})
                // commit(types.SET_USER,result.data);
                // commit(types.SET_PERMISIION,true)
            }catch(e){  
                return Promise.reject(e);
            }
           
        },
        async [types.USER_VALIDATE]({dispatch}){
            if(!getLocal("token")){
                return false;
            }
            try{
                let result = await user.validate();
                // commit(types.USER_VALIDATE,result.data);
                // commit(types.SET_PERMISIION,true);
                dispatch(types.SET_USER,{payload:result.data,permission:true})
                return true;
            }catch(e){  
                // commit(types.USER_VALIDATE,{});
                dispatch(types.SET_USER,{payload:{},permission:false});
                // commit(types.SET_PERMISIION,false);
                return false;
            }
           
        },
        async [types.USER_LOGOUT]({dispatch}){
            // commit(types.USER_VALIDATE,{});
            // commit(types.SET_PERMISIION,false);
            dispatch(types.SET_USER,{payload:{},permission:false});
        },
        async [types.ADD_ROUTE]({commit,state}){
            let authList = state.userInfo.authList;
            if(authList){
                let routes = filterRouter(authList)
                //用户所有配置的路由信息
                let route = router.options.routes.find(item => item.path ==='/manager')
                route.children = routes;
                routers.addRoutes([route]);
                commit(types.SET_MENU_PERMISSION,true)
            }
        }
    }
}