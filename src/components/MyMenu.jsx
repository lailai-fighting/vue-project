import {createNamespacedHelpers} from 'vuex'
let {mapState} = createNamespacedHelpers("user")
export default{
    data() {
        return {
            list:[]
        }
    },
    computed:{
        ...mapState(['userInfo'])
    },
    methods: {
        getMenuList(authList){
            let menu = [];
            let map = {};
            authList.forEach(element => {
                element.children = [];
                map(m.id) = m;//{2:caidan}
                if(m.pid == -1){
                    menu.push(m);
                }else{
                    map[m.pid] && map[m.pid].children.push(m);
                }
            });
            return menu;
        }
    },
    mounted() {
       this.list = this.getMenuList(this.userInfo.authList)
    },
    render() {
        let renderChidren = (list) => {
            list.map(child=>{
                child.children.length?
                <el-submenu index={child._id}>
                    <div slot = "title">{child.name}</div>
                </el-submenu>:
                <el-menu-item index={child.path}>
                    {child.name}
                </el-menu-item>
            })
        }
        return  <el-meun
        background-color="#333"
        text-color="#fff"
        active-text-color="#ffd04b"
        class="menu"
        router={true}>
            {/* <el-sunmenu index="persional">
                <template slot="title">
                   <span>用户管理</span>
                </template>
                <el-menu-item>用户权限</el-menu-item>
            </el-sunmenu>
            <el-menu-item>
                个人中心
            </el-menu-item> */}
            {renderChidren(this.list)}
        </el-meun>
    },
}