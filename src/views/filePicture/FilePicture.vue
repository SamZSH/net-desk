<!--
  creator: 张善浩
  create date: 2022/4/3
  desc: 图片文件
-->

<template>
  <div>
    <FileTitle />
    <el-table
        :data="tableData"
        style="width: 75%">
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
          prop="date"
          label="日期"
          width="180">
      </el-table-column>
      <el-table-column
          prop="name"
          label="姓名"
          width="180">
      </el-table-column>
      <el-table-column
          prop="address"
          label="地址">
      </el-table-column>
      <el-table-column
          prop=""
          label="操作">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import FileTitle from '../../components/file/fileTitle/FileTitle'
import axios from "axios";
export default {
  components: {
    FileTitle
  },
  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  methods: {
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
    }
  },
  mounted () {
    let param = {
      fileType:'3',
      parentId:''
    }
    axios.get('http://localhost:8080/blCloud/file/fileList',{params:param})
    .then(({data}) => {
      console.log(data)
    })
    .catch(err => {
      console.error(err); 
    })
  }
}
</script>

<style scoped>

</style>