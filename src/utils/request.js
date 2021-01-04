//封装axios
import config from '@/config';
import axios from 'axios';
import {getLocal} from '@/utils/local.js';
// import { getLoacl } from './local';
class HttpRequest {
    constructor(){
        //可以增加实例属性
        //开发模式，和生产模式
        this.baseURL = config.baseURL;
        this.timeout = 3000
    
    }
    setInterceptors(instance){
        instance.intercepters.request.use(config => {
            //增加token jwt
            config.headers.authorization = "Bearer" + getLocal("token");
            return config;
        });
        instance.intercepters.response.use(res => {
            if(res.status == 200){
                if(res.data.err == 0){
                    return Promise.resolve(res.data);
                }else{
                    return Promise.reject(res.data.data)
                }
                
            }else{
                return Promise.reject(res.data.data)
            }
        },err => {
            switch (err.resopnse.status) {
                case '401':
                    break;
                default:
                    break
            }
            return Promise.reject(err)
        })
    }
    request(options){
        const instance = axios.create();
        this.setInterceptors(instance);
        const opts = this.mergeOptions(options)
        return instance(opts)
    }
    get(url,config){
        return this.request({
            method:'get',
            url,
            ...config
        })
    }
    post(url,data){
        return this.request({
            method:'post',
            url,
            data:data
        })
    }
}

export default new HttpRequest