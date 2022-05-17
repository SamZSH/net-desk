<!--
  creator: 张善浩
  create date: 2022/4/3
  desc: 用户信息组件
-->
<template>
  <div class="info-container">
    <el-popover
        placement="bottom"
        width="320"
        trigger="hover"
        v-model="visible">
      <div class="info-desc">
        <el-row class="info-row">
          <el-col :span="8" class="info-desc__item">用户名:</el-col>
          <el-col :span="14" :offset="2">
            {{ userInfo.nickname }}
          </el-col>
        </el-row>
        <el-row class="info-row">
          <el-col :span="8" class="info-desc__item">登录天数:</el-col>
          <el-col :span="14" :offset="2">
            {{ userInfo.onlineDays }}天
          </el-col>
        </el-row>
        <el-row class="info-row">
          <el-col :span="8" class="info-desc__item">积分:</el-col>
          <el-col :span="14" :offset="2">
            {{ userInfo.integral }}
          </el-col>
        </el-row>
        <el-row class="info-row">
          <el-col :span="8" class="info-desc__item">已用/剩余空间:</el-col>
          <el-col :span="14" :offset="2">
            <el-progress :text-inside="true" :stroke-width="18" :percentage="70"></el-progress>
          </el-col>
        </el-row>
        <el-row class="info-row">
          <el-col class="info-logout">
            <el-button type="danger" size="small" round @click="logout">退出登录</el-button>
          </el-col>
        </el-row>
      </div>
      <div class="avatar-box" slot="reference">
        <el-avatar :src="imgUrl" :size="46"></el-avatar>
      </div>
    </el-popover>
  </div>
</template>

<script>
import {removeStore,getStore} from "../../../config/global";
import {reqUserImg} from "../../../service/api";

export default {
  name: "UserInfo",
  data() {
    return {
      visible: false,
      userInfo: {},
      imgUrl:''
    }
  },
  methods: {
    logout() {
      removeStore('userInfo');
      this.$router.push('/login');
    },
    async getUserImg(){
      const data = await reqUserImg();
      this.imgUrl = window.URL.createObjectURL(data);
    }
  },
  mounted() {
    this.userInfo = JSON.parse(getStore('userInfo'));
    this.getUserImg();
  }
}
</script>

<style lang="less" scoped>
  .info-row {
    margin-bottom: 12px;
    &:last-child {
      margin-bottom: 0;
    }
    .info-desc {
      .info-desc__item {
        text-align: right;
      }
    }
    .info-logout {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }


  .avatar-box {
    cursor: pointer;
  }
</style>
