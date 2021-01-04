import store from '../store';
import * as types from '../store/action-types';

//登录权限校验
 const loginPermission =async function(to,from,next){
     //验证token是否有效
    let permission = await store.dispatch(`user/${types.USER_VALIDATE}`);
    //取出是否需要登录的标志mate
    let needLogin = to.matched.some(item => item.matched.needLogin);
    if(!store.state.user.hasPermission){//没登陆过
        if(needLogin){//需要登录
            if(permission){//token有效
                next();
            }else{
                next('/login')
            } 
        }else{
            next()
        }
    }else{//登录过
        if(to.path == '/login'){
            next('/')
        }else{
            next();
        }
    }
    next();
}

//菜单权限校验
const menuPermission = async function(to,from,next){
    if(store.state.user.hasPermission){//已经登录过了
        if(!store.state.user.menuPermission){
            store.dispatch(`user/${types.ADD_ROUTE}`)
            next({...to,replace:true});
        }else{
            next()
        }
    }else{
        next();
    }
}
export const createWebSocket =  async function(to,from,next){
    if(store.state.user.hasPermission && !store.state.ws){//已经登录过了,没有ws
        store.dispatch(`${types.CREATE_WEBSOCKET}`);
        next()
    }else{next()}
}
export default{
    loginPermission,
    menuPermission,
    createWebSocket
}
