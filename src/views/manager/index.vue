<template>
<el-conainer>
    <el-aside width="200px">
        <!-- <el-meun
        background-color="#333"
        text-color="#fff"
        active-text-color="#ffd04b"
        class="menu"
        :router="true">
            <el-sunmenu index="persional" :key="1">
                <template slot="title">
                   <span>用户管理</span>
                </template>
                <el-menu-item>用户权限</el-menu-item>
            </el-sunmenu>
            <el-menu-item>
                个人中心
            </el-menu-item>
        </el-meun> -->
    </el-aside>
    <el-main>
        <router-view></router-view>
    </el-main>
</el-conainer>
</template>
<script>
import MyMenu from '../../component/MyMenu.jsx';
export default {
    components:{
        MyMenu
    }
}
</script>
<style scoped>
    .menu{
        border-right: none;
    }
</style>