<template>
  <div>
    
    <FileTitle @searchData="onSearch" />
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
import {reqFileList} from '../../service/api'
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
      /*axios.get('http://localhost:8080/blCloud/file/fileList',params)
          .then(({data}) => {
            if(new RegExp('^2.*').test(data.code)){
              console.log(data)
              this.fileList = data.data
            }else{
              console.error(data)
            }
          })
          .catch(err => {
            console.error(err);
          })*/

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
      console.log(row.joinId)


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
    recordFileList(joinId,index){
      this.record.splice(index+1,this.record.length-1)
      let params = {
        parentId:joinId
      }
      axios.get('http://localhost:8080/blCloud/file/fileList',{params})
        .then(({data}) => {
          if(new RegExp('^2.*').test(data.code)){
            console.log(data)
            this.fileList = data.data
          }else{
            console.error(data)
          }
        })
        .catch(err => {
          console.error(err); 
        })
    },
    onSearch(data) {
      this.searchContent = data;

      this.initList({keyWord:data});
    }
  }
}
</script>

<style scoped>

</style>