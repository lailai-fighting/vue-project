import {getLocal} from '@/utils/local.js'
import store from '../store';

calss WS{
    constructor(config = {}){
        this.url = config.url || "localhost",
        this.port = config.port || 4000,
        this.protocal = config.protocal || 'ws',
        //心跳检测
        this.time = config.time || 30*1000,
        this.ws = null;
    }
    onOpen = () =>{//给服务器发鉴权请求，一打开就发送
        //必须是对象，包含两个字段
        this.ws.send(JSON.stringify({
            type:'auth',
            data:getLocal("token")
        }))
    }
    onmessage =(e) =>{
        let  {type,data}= JSON.parse(e.data);
        switch(type){
            case 'noAuth':
                console.log("没有权限");
                break;
            case 'heartCheck':
                this.checkServer();
                this.ws.send(JSON.stringify({type:'heartCheck'}));
                break;
            default:
                // console.log('message',data);
                store.commit(type.SET_MESSAGE,data)
        }
    }
    onError = () =>{
        setTimeout(() => {
            this.create();
        },1000)
    }
    onclose = () =>{
        this.ws.close()
    }
    create(){
        this.ws = new WebSocket(`${this.protocol}://${this.url}:${this.port}`)
        this.ws.onopen = this.onOpen;
        this.ws.onmessage = this.onMessage;
        this.onclose = this.onclose;
        this.ws.onerror= this.onError
    }
    checkServer(){
        clearTimeout(this.timer)
        this.timer = setTimeout(()=>{
            this.onclose()
            this.onError()
        },this.time+1000)
    }
    send = (msg)=>{
        this.ws.send(JSON.stringify(msg))
    }
}
export default WS;