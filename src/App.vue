<template>
  <div id="app">
    <el-container>
      <el-header>
          <PageHeader></PageHeader>
      </el-header>
      <el-main>
        <router-view></router-view> 
      </el-main>
      <el-footer>
        <PageFooter></PageFooter>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader.vue';
import PageFooter from '@/components/PageFooter.vue';
export default {
  components:{
    PageHeader,
    PageFooter
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
.el-header{
  background: #666;
  height: 60px;
}
.el-footer{
  background: #666;
  height: 60px;
}
.el-main{
  min-height: calc(100vh - 120px);
}
</style>
