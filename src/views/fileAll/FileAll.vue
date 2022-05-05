<template>
  <div>
    
    <FileTitle @searchData="onSearch" @createFileDir="createFileDir"/>
    <div v-show="this.record.length>1" style="heigth: 20%;display: flex;font-size:20px;margin:5px">
      <el-button @click="" type="text" size="small" style="font-size:20px">返回上一级</el-button>
      <span style="font-size:20px;margin:5px">|</span>
      
      <div v-for="(item,index) in record" :key="item.joinId" >
        <el-button @click="recordFileList(item.joinId,index)" type="text" size="small" style="font-size:20px" :disabled="index > record.length-2">
        {{item.name}}</el-button>
        <template v-if="index < record.length-1">
          <span style="margin:5px">&gt;</span>
        </template>
      </div>
      
    </div>
    <el-table
        :data="fileList"
        style="width: 75%;font-size:20px">
      <el-table-column
          type="selection"
      />
      <el-table-column
          prop=""
          label=""
          width="50">
          <i class="el-icon-folder"  style="margin: 0 10px; font-size: 20px; color: black"/>
      </el-table-column>
      <el-table-column
          prop="fileName"
          label="文件名"
          width="300">
          <template slot-scope="scope">
            <el-button @click="flashFileList(scope.row)" type="text" size="small" style="font-size:20px">{{scope.row.fileName}}</el-button>
          </template>
      </el-table-column>
      <el-table-column
          prop="saveDate"
          label="修改日期"
          width="180">
      </el-table-column>
      <el-table-column
          prop="fileSizeStr"
          label="大小">
      </el-table-column>
      <el-table-column
          prop=""
          label="操作">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from "axios";
import FileTitle from '../../components/file/fileTitle/FileTitle'
import {reqFileList,reqCreateFileDir} from '../../service/api'
export default {
  components: {
    FileTitle
  },
  name: "FileAll",
  data () {
    return {
      fileList:[],
      curJoinId:0,
      record:[{joinId:'',name:'全部文件'}],
      searchContent: ''
    }
  },
  mounted () {
    this.initList()
  },
  methods: {
    async initList(params = {}) {

      const data = await reqFileList(params)
      // const data = res.data;
      if (new RegExp('^2.*').test(data.code)) {
        this.fileList = data.data
      } else{
        console.error(data)
      }
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    async flashFileList(row){

      if(row.isDir){
          this.curJoinId = row.joinId
          let recordItem = {
            joinId:row.joinId,
            name:row.fileName
          }
          this.record.push(recordItem)

          let params = {
            parentId:row.joinId
          }
          const data = await reqFileList(params)
          // const data = res.data;
          if (new RegExp('^2.*').test(data.code)) {
            this.fileList = data.data
          } else{
            console.error(data)
          }
        }else{
          //TODO:可以快捷查看文件。
          console.log('暂时先查看文件详情。')
        }
    },
    async recordFileList(joinId,index){
      this.record.splice(index+1,this.record.length-1)
      let params = {
        parentId:joinId
      }
      const data = await reqFileList(params)
      // const data = res.data;
      if (new RegExp('^2.*').test(data.code)) {
        this.fileList = data.data
      } else{
        console.error(data)
      }
    },
    onSearch(data) {
      this.searchContent = data;
      this.initList({keyWord:data});
    },
    createFileDir(){
        this.$prompt('请输入文件夹名称', '新建文件夹', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
          // inputErrorMessage: '邮箱格式不正确'
        }).then(async ({ value }) => {
          const params = {
            targetId:this.curJoinId,
            fileName:value
          }
          const data = await reqCreateFileDir(params);
          console.log(data);
          if (new RegExp('^2.*').test(data.code)){
            this.$message({
              type: 'success',
              message: '新建文件夹成功：' + value
            });
            this.initList({parentId:this.curJoinId})
          }else {
            this.$message({
              type: 'error',
              message: data.msg
            });
          }

        }).catch(() => {
          this.$message({
            type: 'error',
            message: '取消输入'
          });
        });
      }
  }
}
</script>

<style scoped>

</style>