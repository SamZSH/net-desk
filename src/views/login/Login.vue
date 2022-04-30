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
        <h2>登录</h2>
        <form>
          <div class="inputBox">
            <input type="text" placeholder="用户名" v-model="username">
          </div>
          <div class="inputBox">
            <input type="password" placeholder="密码" v-model="password">
          </div>
          <div class="inputBox">
            <input type="submit" @click.prevent="toLogin" value="登录">
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import {removeStore, setStore} from "../../config/global";

import { reqLogin } from '../../service/api'
export default {
  name: "Login",
  data() {
    return {
      username: '',
      password: '',
      starsCount: 800, //星星数量
      distance: 900 //间距
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
      const res = await reqLogin({username, password});
      if (res.code === '200') {
        setStore('userInfo',res.data);
        this.$router.push('/dashboard');
      }
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