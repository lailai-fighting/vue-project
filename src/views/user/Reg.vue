<template>
  <div class="reg-page">
    <el-row>
      <el-col class="title">
        <h2>欢迎注册</h2>
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
          <el-form-item label="密码" prop="checkPass">
            <el-input
              type="password"
              placeholder="请再次输入密码"
              v-model="ruleForm.checkPass"
              autocomplete="off"
            >
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm(ruleForm)">
              注册
            </el-button>
            <el-button type="primary" @click="resetForm(ruleForm)">
              重置
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import * as user from "@/api/user.js";
export default {
    data() {
      var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('年龄不能为空'));
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          pass: '',
          checkPass: '',
          username: ''
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          username: [
            { validator: checkAge, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>