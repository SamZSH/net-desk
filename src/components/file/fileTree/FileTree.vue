<!--
  文件树
-->

<template>
  <div>
    <el-dialog
        title="移动到"
        :close-on-click-modal="false"
        :visible.sync="visible"
        @closed=""
    >
      <el-tree
          :data="fileTree"
          :props="defaultProps"
          node-key="joinId"
          :default-expanded-keys="[0]"
          :expand-on-click-node="false"
          @node-click="clickNode">

      </el-tree>
    </el-dialog>
  </div>
</template>

<script>
import {reqFileTree,reqMoveFile} from "../../../service/api";

export default {
  name: "FileTree",
  data() {
    return {
      fileTree:[],
      defaultProps: {
        children: 'nodes',
        label: 'fileName'
      },
      moveFileJoinId:'',
      visible:false
    }
  },
  methods: {
    async getFileTree(){
      const data = await reqFileTree();
      console.log(data)
      if (new RegExp('^2.*').test(data.code)){
        this.fileTree = data.data
      }else {
        this.$message({
          type: 'error',
          message: data.msg
        });
      }
    },
    onMoveFile(joinId){
      this.visible = true;
      this.moveFileJoinId = joinId;
    },
    clickNode(node){
      console.log(node.joinId)
      console.log(this.moveFileJoinId)
      if (node.joinId == this.moveFileJoinId){
        return;
      }
      this.$confirm(`文件将移动到${node.fileName},是否继续？`, '移动到', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(async () => {
        let params = {
          joinId:this.moveFileJoinId,
          targetId:node.joinId
        }
        const data = await reqMoveFile(params);
        if (new RegExp('^2.*').test(data.code)){
          this.$message({
            type: 'success',
            message: '文件移动成功!'
          });
          this.clickCommit();
        }else {
          this.$message({
            type: 'error',
            message: data.msg
          });
        }

      }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消移动'
            })
      });
      // this.visible = false;
    },
    clickCommit(){
      this.$emit("moveComplete")
    }
  },
  mounted() {
    this.getFileTree();
    this.onMoveFile();
  },
  beforeDestroy() {
    this.$off("moveComplete");
    this.fileTree = []
  }
}
</script>

<style lang="less" scoped>
  .file-tree {
      position: fixed;
      //justify-content: center;
      //align-items: center;
      background-color: white;
      width: 50%;
      height: 50%;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      margin: auto;
    font-size: 20px;
    }
  .el-tree{
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;

  }
</style>
