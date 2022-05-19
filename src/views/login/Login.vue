<template>
  <div class="login-container">
    <div class="stars" ref="starsRef">
      <div
          v-for="(item,index) in starsCount"
          class="star"
          :key="index"
          :style="{
            transformOrigin: `0 0 ${getDistance}px`,
            transform: `
            translate3d(0,0,-${getDistance}px)
            rotateY(${Math.random() * 360}deg)
            rotateX(${Math.random() * -50}deg)
            scale(${getSpeed},${getSpeed})`
          }"
      > </div>
    </div>
    <div class="title"><span>本龙网盘</span></div>
    <div class="login-panel">
      <div class="form">
        <div style="display:flex;">
          <h2 @click="pageStatus = 1">登录</h2>
<!--          <h2 @click="pageStatus = 2" style="margin-left: 10px">注册</h2>-->
        </div>

        <form v-if="pageStatus == 1">
          <div class="inputBox">
            <input type="text" placeholder="用户名" v-model="username">
            <el-button type="text" style="margin-left: 2px" @click="registerFormStatus = true">立即注册</el-button>
          </div>
          <div class="inputBox">
            <input type="password" placeholder="密码" v-model="password">
            <el-button type="text" style="margin-left: 2px">找回密码</el-button>
          </div>
          <div class="inputBox">
            <input type="submit" @click.prevent="toLogin" value="登录">
          </div>
        </form>

<!--        <form v-if="pageStatus == 2">-->
<!--          <div class="inputBox">-->
<!--            <input type="text" placeholder="用户名" v-model="username">-->
<!--          </div>-->
<!--          <div class="inputBox">-->
<!--            <input type="password" placeholder="密码" v-model="password">-->
<!--          </div>-->
<!--          <div class="inputBox">-->
<!--            <input type="password" placeholder="再次确认" v-model="password">-->
<!--          </div>-->
<!--          <div class="inputBox" style="display:flex;">-->
<!--            <input type="email" placeholder="邮箱" v-model="email">-->
<!--            <input type="submit" @click.prevent="sendVerify" value="发送验证码" style="margin-left: 1px">-->
<!--          </div>-->
<!--          <div class="inputBox">-->
<!--            <input type="submit" @click.prevent="toLogin" value="确认注册">-->
<!--          </div>-->
<!--        </form>-->
      </div>
    </div>
    <el-dialog
        title="注册"
        :visible.sync="registerFormStatus"
        width="400px"
        :before-close="registerFormClose">
      <el-form status-icon :model="registerForm" ref="registerForm" :rules="registerFormRules">
        <el-form-item label="用户名" prop="username">
          <el-input type="text"
                    v-model="registerForm.username"
                    autocomplete="off"
                    placeholder="请输入"
                    maxlength="10"
                    show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password"
                    v-model="registerForm.password"
                    autocomplete="off"
                    placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="passwordCheck">
          <el-input type="password"
                    v-model="registerForm.passwordCheck"
                    autocomplete="off"
                    placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
           <el-input type="email"
                     v-model="registerForm.email"
                     autocomplete="off"
                     placeholder="请输入"
           ></el-input>
        </el-form-item>

        <el-form-item label="验证码" prop="verifyCode">
          <div class="modal-email-container">
            <el-input type="text"
                      v-model="registerForm.verifyCode"
                      autocomplete="off"
                      placeholder="请输入"
                      maxlength="6"
                      show-word-limit
            ></el-input>
            <el-button class="email-code" type="primary" @click="sendVerify">获取验证码</el-button>
          </div>
        </el-form-item>


      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="registerFormClose">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
     </span>
    </el-dialog>
  </div>
</template>

<script>
import {removeStore, setStore} from "../../config/global";

import {reqEmailVerify, reqLogin} from '../../service/api'
export default {
  name: "Login",
  data() {
    var validatePass = (rule, value, callback) => {
      console.log(value)
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.registerForm.passwordCheck !== '') {
          this.$refs.registerForm.validateField('passwordCheck');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      console.log(value)
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.registerForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      registerForm:{
        username: '',
        password: '',
        passwordCheck:'',
        email:'',
        verifyCode:''
      },
      registerFormStatus:false,
      pageStatus:1,
      username: '',
      password: '',
      starsCount: 800, //星星数量
      distance: 900, //间距
      registerFormRules:{
        verifyCode:[
          {required: true, message: '请输入验证码', trigger: 'blur'}
        ],
        username:[
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        email: [
          {required: true, message: '请输入邮箱', trigger: 'blur'},
          {
            pattern:/^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g, message: "请输入正确的邮箱", trigger: "blur"
          },
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {
            min: 6,
            max: 18,
            message: '用户密码的长度在6～18个字符',
            trigger: 'blur'
          },
          {validator: validatePass, trigger: 'blur'}
        ],
        passwordCheck: [
          {required: true, message: '请确认密码', trigger: 'blur'},
          {
            min: 6,
            max: 18,
            message: '用户密码的长度在6～18个字符',
            trigger: 'blur'
          },
          {validator: validatePass2, trigger: 'blur'}
        ]
      }
    }
  },
  computed: {
    getSpeed() {
      return 0.2 + Math.random();
    },
    getDistance() {
      return this.distance + Math.random() * 300;
    }
  },
  methods: {
    async toLogin() {
      const {username,password} = this;
      // const res = await reqLogin({username, password});
      const res = await reqLogin({username, password});
      console.log(res)
      if (res.code === '200') {
        setStore('userInfo',res.data);
        this.$router.push('/dashboard');
      }else {
        this.$message({
          type: 'error',
          message: res.msg
        });
      }
    },
    async sendVerify(){
      if (this.registerForm.email != null){
        const data = await reqEmailVerify(this.registerForm.email)
        if (!new RegExp('^2.*').test(data.code)) {
          this.$message({
            type: 'error',
            message: data.msg
          });
        }
      }

    },
    registerFormClose(){
      this.$confirm('关闭窗口后将会清除已填写的数据，确认关闭？')
          .then(_ => {
            this.registerFormStatus=false;
            this.registerForm = {};
            this.$refs.registerForm.clearValidate()
          })
          .catch(_ => {});
    }
  }
}
</script>

<style lang="less" scoped>
  .login-container {
    position: absolute;
    overflow: hidden;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    background: radial-gradient(
        200% 105% at top center,
        #1b2947 10%,
        #75517d 40%,
        #e96f92 65%,
        #f7f7b6
    ) fixed;
    .title{
      padding-top: 15vh;
      margin: 0 auto 100px;
      text-align: center;
      width: 300px;
      user-select:none;
      span{
        cursor: pointer;
        color: white;
        font-size: 36px;
        font-family: '华文彩云', serif;
      }
    }
    .stars {
      transform: perspective(500px);
      transform-style: preserve-3d;
      position: absolute;
      perspective-origin: 50% 100%;
      left: 45%;
      animation: rotate 90s infinite linear;
      bottom: 0;
      .star {
        width: 2px;
        height: 2px;
        background: #f7f7b6;
        position: absolute;
        left: 0;
        top: 0;
        backface-visibility: hidden;
      }
    }

    .login-panel {
      margin: 0 auto;
      width: 400px;
      min-height: 400px;
      display: flex;
      justify-content: center;
      align-items: center;
      backdrop-filter: blur(2px);
      box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.5);
      border-right: 1px solid rgba(255, 255, 255, 0.2);
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 8px;
      .form h2 {
        position: relative;
        color: #fff;
        font-size: 24px;
        font-weight: 600;
        letter-spacing: 5px;
        margin-bottom: 30px;
        cursor: pointer;
      }
      /* 登录标题的下划线样式 */
      .form h2::before {
        content: "";
        position: absolute;
        left: 0;
        bottom: -10px;
        width: 0;
        height: 3px;
        background: #fff;
        transition: 0.5s;
      }

      .form h2:hover:before {
        width: 53px;
      }

      .form .inputBox {
        width: 100%;
        margin-top: 20px;
        display: flex;
      }

      /* 输入框样式 */

      .form .inputBox input {
        width: 100%;
        padding: 10px 20px;
        background: rgba(255, 255, 255, 0.2);
        outline: none;
        border-radius: 30px;
        border: 1px solid rgba(255, 255, 255, 0.5);
        border-right: 1px solid rgba(255, 255, 255, 0.2);
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        font-size: 16px;
        letter-spacing: 1px;
        color: #fff;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
      }

      .form .inputBox input::placeholder {
        color: #fff;
      }

      /* 登录按钮样式 */

      .form .inputBox input[type="submit"] {
        color: #fff;
        max-width: 100px;
        margin-bottom: 20px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.4s linear;
      }
      .form .inputBox input[type="submit"]:hover {
        color: #fff;
        background-color: #ee9f9f;
        box-shadow: 0 0 5px #ee9f9f, 0 0 25px#ee9f9f, 0 0 50px#ee9f9f, 0 0 100px #ee9f9f;
      }
    }
  }

  .modal-email-container {
    display: flex;
    .email-code {
      margin-left: 8px;
      height:40px;
    }
  }

  @keyframes rotate {
    0% {
      transform: perspective(400px) rotateZ(20deg) rotateX(-40deg) rotateY(0);
    }
    100% {
      transform: perspective(400px) rotateZ(20deg) rotateX(-40deg)
      rotateY(-360deg);
    }
  }

</style>
