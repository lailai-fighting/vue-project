import {getSlider } from '../api/public';
import WS from '../utils/websocket';
import * as types from './action-types';
export default {
    state: {
        sliders:[],
        ws:null,
        message:'',
    },
    mutations: {
        [types.SET_SLIDERS](state,payload){
            state.sliders = payload
        },
        [types.CREATE_WEBSOCKET](state,payload){
            state.ws = payload
        },
        [types.SET_MESSAGE](state.payload){
            state.message =payload
        }
    },
    actions: {
        async [types.SET_SLIDERS]({commit}){
            let {data} = await getSlider();
            console.log(data);
            commit(types.SET_SLIDERS,data)
        },
        async [types.CREATE_WEBSOCKET]({commit}){
         let ws = new WS();  
            ws.create();
            commit(types.CREATE_WEBSOCKET,ws)
    }
  }
  