<!--
  creator: 张善浩
  create date: 2022/4/3
  desc: 回收站
-->

<template>
  <div>
    <el-row type="flex" justify="start" align="middle">
      <el-col>
        <el-button type="primary">还原文件</el-button>
        <el-button type="danger">彻底删除</el-button>
      </el-col>
    </el-row>
    <el-row type="flex" justify="start" align="middle">
      <el-table
          :data="binList"
          style="width: 100%"
          :header-cell-style="{textAlign: 'center'}"
          :cell-style="{ textAlign: 'center' }"
      >
        <el-table-column
            type="selection"
        />
        <el-table-column
            width="50"
            prop=""
            label="">
          <!--          <i class="el-icon-folder"  style="margin: 0 10px; font-size: 20px; color: black"/>-->
          <template slot-scope="scope">
            <img :src="require(`../../assets/icon/${getFileIcon(scope.row)}.png`)" style="width: 30px;height: 30px;margin: 0 auto;">
          </template>
        </el-table-column>
        <el-table-column
            width="200"
            prop="fileName"
            label="文件名">
        </el-table-column>
        <el-table-column
            width="200"
            prop="binDate"
            label="删除时间">
        </el-table-column>
        <el-table-column
            width="200"
            prop="clearCount"
            label="剩余清空日期">
          <template slot-scope="scope">
            {{scope.row.clearCount}}天
          </template>
        </el-table-column>
        <el-table-column
            width=""
            prop=""
            label="操作区">
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script>
import {reqBinFileList} from "../../service/api";
import {getFileIcon} from "../../config/global";

export default {
  name: "RecycleBin",
  data(){
    return{
      binList:[]
    }
  },
  methods:{
    async initBinList(){
      const data = await reqBinFileList();
      if (new RegExp('^2.*').test(data.code)){
        console.log(data.data)
        this.binList = data.data
      }else {
        this.$message({
          type: 'error',
          message: data.msg
        });
      }
    },
    getFileIcon(fileInfo){
      return getFileIcon(fileInfo)
    }
  },
  mounted() {
    this.initBinList()
  }
}
</script>

<style scoped>
  .el-row {
    margin-bottom: 20px;
    &:last-child {
       margin-bottom: 0;
     }
  }
</style>
