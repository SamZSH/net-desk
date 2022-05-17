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
        style="width: 75%;font-size:20px"
        :header-cell-style="{textAlign: 'center'}"
        :cell-style="{ textAlign: 'center' }">
      <el-table-column
          type="selection"
      />
      <el-table-column
          prop=""
          label=""
          width="50"
      >
<!--          <i class="el-icon-folder"  style="margin: 0 10px; font-size: 20px; color: black"/>-->
        <template slot-scope="scope">
          <img :src="require(`../../assets/icon/${getFileIcon(scope.row)}.png`)" style="width: 30px;height: 30px;margin: 0 auto;">
        </template>
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
        <template slot-scope="scope">
          <el-dropdown>
            <span class="el-dropdown-link">
              ···<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item disabled>下载</el-dropdown-item>
              <el-dropdown-item @click.native="delFile(scope.row.joinId)">删除</el-dropdown-item>
              <el-dropdown-item @click.native="renameFile(scope.row.joinId,scope.row.fileName)">重命名</el-dropdown-item>
              <el-dropdown-item @click.native="moveFile(scope.row.joinId)">移动</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
<!--    文件夹生成树  -->
    <FileTree v-if="isFileTree" ref="fileTree" @moveComplete="moveComplete"></FileTree>
  </div>
</template>

<script>
import {getFileIcon} from "../../config/global";
import FileTitle from '../../components/file/fileTitle/FileTitle';
import FileTree  from "../../components/file/fileTree/FileTree";
import {reqFileList,reqCreateFileDir,reqDelFile,reqRenameFile} from '../../service/api';
export default {
  components: {
    FileTitle,
    FileTree
  },
  name: "FileAll",
  data () {
    return {
      fileList:[],
      curJoinId:0,
      record:[{joinId:'',name:'全部文件'}],
      searchContent: '',
      isFileTree:false
    }
  },
  mounted () {
    this.initList()
  },
  methods: {
    async delFile(joinId){
      console.log(joinId)
      const data = await reqDelFile(joinId)
      if (new RegExp('^2.*').test(data.code)){
        this.$message({
          type: 'success',
          message: '删除成功'
        });
        this.initList({parentId:this.curJoinId})
      }else {
        this.$message({
          type: 'error',
          message: data.msg
        });
      }
    },
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
        this.curJoinId = joinId
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
      },
    renameFile(joinId,oldFileName){
      this.$prompt('请输入名称', '修改文件名', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        // inputErrorMessage: '邮箱格式不正确'
        inputValue: oldFileName
      }).then(async ({ value }) => {
        const params = {
          joinId:joinId,
          fileName:value
        }
        const data = await reqRenameFile(params);
        console.log(data);
        if (new RegExp('^2.*').test(data.code)){
          this.$message({
            type: 'success',
            message: '修改文件名称成功：' + value
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
    },
    moveFile(joinId){
      this.isFileTree = true;
      this.$nextTick(()=>{
        this.$refs.fileTree.onMoveFile(joinId);
      })
    },
    moveComplete(){
      this.isFileTree = false;
      this.record = [{joinId:'',name:'全部文件'}];
      this.initList({});
    },
    getFileIcon(fileInfo){
      return getFileIcon(fileInfo);
    }
  }
}
</script>

<style scoped>

</style>
