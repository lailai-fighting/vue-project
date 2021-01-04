<template>
  <div class="reg-page">
    <el-row>
      <el-col class="title">
        <h2>欢迎登录</h2>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="10" :offset="7">
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          lable-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item lable="请输入邮箱" prop="username">
            <el-input
              type="text"
              placeholder="请输入邮箱"
              v-model="ruleForm.username"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="pass">
            <el-input
              type="password"
              placeholder="请输入密码"
              v-model="ruleForm.pass"
              autocomplete="off"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="code">
            <el-row>
              <el-col :span="6">
                <el-input
                  type="text"
                  placeholder="验证码"
                  v-model="ruleForm.code"
                  autocomplete="off"
                >
                </el-input>
              </el-col>
              <el-col :span="6" :offset="1">
                <div v-html="verify" @click="getCaptcha"></div>
              </el-col>
              <el-col :span="5" :offset="6">
                <el-button type="text" @click="$router.push('/forget')"
                  >忘记密码</el-button
                >
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm(ruleForm)">
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { v4 } from "uuid";
import { getLocal, setLocal } from "@/utils/local.js";
import { getCaptcha } from "@/api/public";
import {createNamespacedHelpers} from 'vuex';
import * as types from '../../store/action-types'
let {mapActions} = createNamespacedHelpers("user");
export default {
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空"));
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    var checkCode = (rule,value,callback) => {
        if(value.length != 4){
            callback(new Error("验证码必须为4位"));
        }else{
            callback();
        }
    }
    return {
      ruleForm: {
        pass: "",
        username: "",
        code: "",
        verify: "",
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        username: [{ validator: checkAge, trigger: "blur" }],
        cede:[{ validator: checkCode, trigger: "blur" }]
      },
    };
  },
  methods: {
    ...mapActions([types.USER_LOGIN]),
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
            try{
                this[types.USER_LOGIN]({...ruleForm,uid:this.uid})
            }catch(e){
                this.$message({type:'error',message:e})
            }
            
        //   alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    getCaptcha() {
        let { data } = await getCaptcha();
        this.verify = data;
    },
  },
  async created() {
    this.uid = getLocal("uuid");
    if (!this.uid) {
      setLocal("uuid", v4());
    }
    this.getCaptcha();
  },
};
</script>
<style lang="scss">
.title {
  text-align: center;
  line-height: 50px;
}
</style>