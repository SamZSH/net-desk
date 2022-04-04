<!--
  creator: 张善浩
  create date: 2022/4/3
  desc: 侧边栏面板
-->

<template>
    <div class="dashboard-container">
      <el-row class="tac">
        <!-- 侧边栏 start -->
        <el-col :span="4">
          <div class="bl-title" :style="{...dealTitleStyle}">BL-CLOUD</div>
          <el-menu
              router
              :default-active="activeKey"
              class="el-menu-vertical"
              @select="handleSelect"
              :background-color="BG_TAB"
              :text-color="TAB_COLOR"
              :active-text-color="TAB_COLOR_ACTIVE"
          >
            <div v-for="item in dashboardConfig" :key="item.key">
              <el-submenu :index="item.key" v-if="item.children.length > 0" :disabled="item.disabled">
                <template slot="title">
                  <i class="iconfont" :class="`icon-${item.iconClass}`" />
                  <span>{{ item.label }}</span>
                </template>
                <div v-for="cItem in item.children" :key="cItem.key">
                  <el-menu-item v-if="cItem.visible" :index="cItem.key">
                    <i class="iconfont" :class="`icon-${cItem.iconClass}`" />
                    <span slot="title">{{ cItem.label }}</span>
                  </el-menu-item>
                </div>
              </el-submenu>

              <el-menu-item :index="item.key" v-if="item.children.length === 0 && item.visible" :disabled="item.disabled">
                <i class="iconfont" :class="`icon-${item.iconClass}`" />
                <span slot="title">{{ item.label }}</span>
              </el-menu-item>

            </div>
          </el-menu>
        </el-col>
        <!-- 侧边栏 end -->
        <!-- 内容 start -->
        <el-col :span="20">
          <div class="user-info" :style="{...dealTitleStyle}">
            <UserInfo />
          </div>
          <div class="content-box">
            <router-view></router-view>
          </div>
        </el-col>
        <!-- 内容 end -->
      </el-row>
    </div>
</template>

<script>
import UserInfo from './components/UserInfo'
import {BG_TAB,TAB_COLOR,TAB_COLOR_ACTIVE,TAB_BORDER_COLOR} from '../../style/common.js'
import {dashboardConfig} from '../../config/dashboardConfig'
    export default {
        components: {
          UserInfo
        },
        name: "DashBoard",
        data() {
            return {
              // 常量: start
              dashboardConfig,
              BG_TAB,
              TAB_COLOR,
              TAB_COLOR_ACTIVE,
              TAB_BORDER_COLOR,
              // 常量 end

              activeKey: sessionStorage.getItem('tabBarActiveKey') || 'home',  // 激活菜单的key
            };
        },
      computed: {
        // 处理title样式
        dealTitleStyle() {
          return {
            backgroundColor: BG_TAB,
            color: TAB_COLOR,
            borderBottom: `1px solid ${TAB_BORDER_COLOR}`
          }
        }
      },
      watch : {
        // 处理选中tab改变
        activeKey(value){
          sessionStorage.setItem('tabBarActiveKey',value);
        }
      },
      methods: {
        handleSelect(index) {
          this.activeKey = index;
        }
      }
    }
</script>

<style lang="less" scoped>
    .dashboard-container {
        width: 100%;
        height: 100%;
        background-color: #F5F5F5;
      .bl-title {
        font-size: 24px;
        font-weight: bold;
        color: #333;
        width: 100%;
        height: 70px;
        display: flex;
        justify-content: center;
        align-items: center;
        user-select: none;
      }
      .el-menu-vertical {
        min-height: 100vh;
        box-sizing: border-box;
        .iconfont {
          margin-right: 16px;
          font-size: 20px;
        }
      }
      .user-info {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding-right: 12%;
        width: 100%;
        height: 70px;
        background-color: skyblue;
      }
      .content-box {
        padding: 24px;
      }
    }
</style>