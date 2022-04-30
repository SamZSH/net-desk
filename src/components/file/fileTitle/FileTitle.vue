<!--
  creator: 张善浩
  create date: 2022/4/3
  desc: 文件头部
-->

<template>
  <div class="file-title-container">
    <div class="file-title-container__left">
      <el-button type="primary">新建文件夹</el-button>
      <el-button type="primary">上传文件</el-button>
    </div>
    <div class="file-title-container__right">
      <el-input
          class="file-title-container__right--input"
          placeholder="请输入文件名"
          v-model="searchFile">
        <i slot="prefix" class="el-input__icon el-icon-search" />
      </el-input>
      <el-button type="primary" round @click="onSearchFile">搜索</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "FileTitle",
  data() {
    return {
      searchFile: ''
    }
  },
  methods: {
    onSearchFile() {
      this.$emit('searchData',this.searchFile)
    }
  }
}
</script>

<style lang="less" scoped>
  .file-title-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    .file-title-container__right {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .file-title-container__right--input {
        margin-right: 8px;
        width: 320px;
      }
    }
  }
</style>