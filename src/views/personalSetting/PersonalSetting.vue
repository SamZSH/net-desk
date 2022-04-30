<!--
  creator: 张善浩
  create date: 2022/4/3
  desc: 个人设置
-->

<template>
  <div>个人设置</div>
</template>

<script>
import axios from "axios";
export default {
  name: "PersonalSetting",
  data () {
    return {
      userDetailInfo:{}
    }
  },
  methods: {
    
  },
  mounted () {
    axios.get('http://localhost:8080/blCloud/user/userInfo',{})
    .then(({data}) => {
      console.log(data)
      this.userDetailInfo=data.data;
    })
    .catch(err => {
      console.error(err); 
    })
  }
}
</script>

<style scoped>

</style>