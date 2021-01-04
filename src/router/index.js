import Vue from 'vue'
import VueRouter from 'vue-router'
import hooks from './hooks'

Vue.use(VueRouter)

//入口页面

//像前端的读写文件，读取文件路径下的所有文件，不包含子目录
const files = require.context("./",false,/\.router.js$/);
console.log(files.keys());
let routes = [];
files.keys().forEach(element => {
  routes.push(...files(element).default)
 console.log(files(element));
});

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
Object.values(hooks).forEach((hook) =>{
  router.beforeEach(hook.bind(router));//将this绑定为router
})
export default router
