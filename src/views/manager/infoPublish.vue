<template>
    <el-row>
        <el-col>
            <h3>信息发布</h3>
        </el-col>
        <el-col :span="6">
            <el-form>
                <el-form-item>
                    <el-input placeholder="输入" v-model="msg">

                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button
                     type="primary" @click="publish"> 
                        发布消息
                    </el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>
<script>
import {mapState} from 'vuex'
export default {
    computed:{
        ...mapState(['ws'])
    },
    data(){
        return {msg:""}
    },
    methods: {
        publish(){
            this.ws.send({type:'message',data:this.msg})
        }
    },
}
</script>