<!--
  creator: 张善浩
  create date: 2022/4/3
  desc: 个人设置
-->

<template>
  <div>
    <el-row type="flex" justify="center" align="bottom">
      <el-col :push="10">
<!--        <el-image-->
<!--            style="width: 100px; height: 100px"-->
<!--            :src="url"-->
<!--            :preview-src-list="srcList">-->
<!--          <div slot="placeholder" class="image-slot">-->
<!--            加载中<span class="dot">...</span>-->
<!--          </div>-->
<!--        </el-image>-->
        <el-avatar :size="100" :src="url">img</el-avatar>
      </el-col>
      <el-col :offset="1">
        <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple
            :limit="1"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-col>

<!--      :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          :on-exceed="handleExceed"
          :file-list="fileList"-->
    </el-row>
    <el-row type="flex" justify="center" align="middle">
      <el-col :span="1" class="info-desc__item">邮箱:</el-col>
      <el-col :span="6">
        <el-input :placeholder="userDetailInfo.email" disabled></el-input>
      </el-col>
      <el-col :span="2" :offset="1">
        <el-button type="primary" @click="dialogEmailVisible = true" round>修改绑定</el-button>

      </el-col>
    </el-row>

    <el-row type="flex" justify="center" align="middle">
      <el-col :span="1" class="info-desc__item">密码:</el-col>
      <el-col :span="6">
        <el-input :placeholder="'**************'" disabled></el-input>
      </el-col>
      <el-col :span="2" :offset="1">
        <el-button type="primary" @click="dialogPasswordVisible = true" round>修改密码</el-button>
      </el-col>
    </el-row>

    <el-row type="flex" justify="center" align="middle">
      <el-col :span="1" class="info-desc__item">昵称:</el-col>
      <el-col :span="6">
        <el-input :placeholder="userDetailInfo.nickname" disabled></el-input>
      </el-col>
    </el-row>

    <el-row type="flex" justify="center" align="middle">
      <el-col :span="1" class="info-desc__item">性别:</el-col>
      <el-col :span="6">
        <el-radio v-model="userDetailInfo.sex" :label="0" disabled>男</el-radio>
        <el-radio v-model="userDetailInfo.sex" :label="1" disabled>女</el-radio>
        <el-radio v-model="userDetailInfo.sex" :label="2" disabled>保密</el-radio>
      </el-col>
    </el-row>

    <el-row type="flex" justify="center" align="middle">
      <el-col :span="1" class="info-desc__item">生日:</el-col>
      <el-col :span="6">
        <el-date-picker
            v-model="userDetailInfo.birthday"
            type="date"
            placeholder="选择日期"
        disabled="">
        </el-date-picker>
      </el-col>
    </el-row>

    <el-row type="flex" justify="center" align="middle">

      <el-col :span="6">
        <el-button type="primary" @click="dialogUserInfoVisible = true">修改个人信息</el-button>
      </el-col>
    </el-row>

    <el-dialog
        title="修改绑定邮箱"
        :visible.sync="dialogEmailVisible"
        width="30%"
        :before-close="closeEmailDialog"
    >
      <el-steps :active="activeEmail" finish-status="success">
        <el-step title="输入原邮箱"></el-step>
        <el-step title="请输入邮箱验证码"></el-step>
        <el-step title="请输入新邮箱"></el-step>
      </el-steps>
      <el-form status-icon :model="form" v-if="activeEmail==0">
        <el-form-item label="请输入邮箱" prop="pass">
          <el-input type="email" v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <el-form status-icon :model="form" v-if="activeEmail==1">
        <el-form-item label="请输入验证码" prop="pass">
          <el-input type="text" v-model="form.verifyCode" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <el-form status-icon :model="form" v-if="activeEmail==2">
        <el-form-item label="请输入新邮箱" prop="pass">
          <el-input type="email" v-model="form.newEmail" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeEmailDialog">取 消</el-button>
        <el-button type="primary" @click="nextStepEmail">{{ buttonStr }}</el-button>
      </span>
    </el-dialog>
    <el-dialog
        title="修改密码"
        :visible.sync="dialogPasswordVisible"
        width="30%"
        :before-close="closePasswordDialog"
    >
      <el-form status-icon :model="form" :rules="resetPwdRules" ref="pwdForm" >
        <el-form-item label="旧密码" prop="oldPassword">
          <el-input type="password" v-model="form.oldPassword" autocomplete="off" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input type="password" v-model="form.newPassword" autocomplete="off" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="passwordCheck">
          <el-input type="password" v-model="form.passwordCheck" autocomplete="off" placeholder="请输入"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closePasswordDialog">取 消</el-button>
        <el-button type="primary" @click="nextStepPassword">{{ activePassword<1?'下一步':'确定' }}</el-button>
      </span>
    </el-dialog>
    <el-dialog
        title="修改个人信息"
        :visible.sync="dialogUserInfoVisible"
        width="30%"
        :before-close="closeUserInfoDialog"
    >
      <el-form status-icon :model="userInfoForm" ref="userInfoForm" >
        <el-form-item label="昵称">
          <el-input type="text"
                    v-model="userInfoForm.nickname"
                    autocomplete="off"
                    placeholder="请输入"
                    maxlength="10"
                    show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio v-model="userInfoForm.sex" :label="0" autocomplete="off">男</el-radio>
          <el-radio v-model="userInfoForm.sex" :label="1" autocomplete="off">女</el-radio>
          <el-radio v-model="userInfoForm.sex" :label="2" autocomplete="off">保密</el-radio>
        </el-form-item>
        <el-form-item label="生日">
          <el-date-picker
              v-model="userInfoForm.birthday"
              type="date"
              placeholder="选择日期"
              autocomplete="off"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeUserInfoDialog">取 消</el-button>
        <el-button type="primary" @click="commitUpdateUserInfo">提 交</el-button>
      </span>
    </el-dialog>

  </div>

</template>

<script>
import axios from "axios";
import {reqCheckEmail, reqCheckVerifyCode, reqUpdateEmail, reqUserImg} from "../../service/api";
import {getStore, setStore} from "../../config/global";

export default {
  name: "PersonalSetting",
  data () {
    var validatePass = (rule, value, callback) => {
      console.log(value)
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.form.passwordCheck !== '') {
          this.$refs.pwdForm.validateField('passwordCheck');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      console.log(value)
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.form.newPassword) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      userDetailInfo: {},
      srcList: [],
      url: '',
      dialogEmailVisible: false,
      dialogPasswordVisible: false,
      dialogUserInfoVisible:false,
      activeEmail: 0,
      activePassword: 1,
      form: {
        newEmail:'',
        email: '',
        verifyCode: '',
        oldPassword: '',
        newPassword: '',
        passwordCheck: ''
      },
      userInfoForm:{
      },

      resetPwdRules: {
        oldPassword: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {
            min: 6,
            max: 18,
            message: '用户密码的长度在6～18个字符',
            trigger: 'blur'
          },
          {validator: validatePass, trigger: 'blur'}
        ],
        newPassword: [
          {required: true, message: '请输入新密码', trigger: 'blur'},
          {
            min: 6,
            max: 18,
            message: '用户密码的长度在6～18个字符',
            trigger: 'blur'
          },
          {validator: validatePass, trigger: 'blur'}
        ],
        passwordCheck: [
          {required: true, message: '请确认新密码', trigger: 'blur'},
          {
            min: 6,
            max: 18,
            message: '用户密码的长度在6～18个字符',
            trigger: 'blur'
          },
          {validator: validatePass2, trigger: 'blur'}
        ]
      },
    };

  },
  methods: {
    async getUserImg(){
      const data = await reqUserImg();
      this.url = window.URL.createObjectURL(data);
    },
    uploadUserImg(){

    },
    async nextStepEmail(){
      if (this.activeEmail==0) {
        //发送校验邮箱请求
        if (this.form.email != ''){
          let params = {
            email:this.form.email
          }
          const data = await reqCheckEmail(params);
          if (new RegExp('^2.*').test(data.code)){
            this.activeEmail++
          }else {
            this.$message({
              type: 'error',
              message: data.msg
            });
          }
        }else {
          this.$message({
            type: 'error',
            message: '请填写邮箱！'
          });
        }

      }else if (this.activeEmail == 1){
        //发送校验验证码请求
        if (this.form.verifyCode != ''){
          let params = {
            verifyCode: this.form.verifyCode
          }
          const data = await reqCheckVerifyCode(params);
          if (new RegExp('^2.*').test(data.code)){
            this.activeEmail++
          }else {
            this.$message({
              type: 'error',
              message: data.msg
            });
          }
        }else {
          this.$message({
            type: 'error',
            message: '请填写验证码！'
          });
        }
      }else {
        //发送变更请求
        //如果成功就关闭，否则就显示错误信息，不关闭弹窗。
        if (this.form.newEmail != ''){
          const data = await reqUpdateEmail({email:this.form.newEmail});
          if (new RegExp('^2.*').test(data.code)){
            console.log(JSON.stringify(data.data))
            setStore('userInfo',JSON.stringify(data.data))
            this.dialogEmailVisible = false;
            this.activeEmail = 0;
          }else {
            this.$message({
              type: 'error',
              message: data.msg
            });
          }
        }else {
          this.$message({
            type: 'error',
            message: '请输入新邮箱！'
          });
        }

      }
    },
    nextStepPassword(){
      // if (this.activePassword == 0){
      //   //发送验证请求
      //   this.activePassword++;
      // }else if (this.activePassword == 1){
      //   //发送修改密码请求
      //   this.activePassword == 0;
      // }

      //发送修改请求
      this.$refs.pwdForm.validate((valid)=>{
        if (!valid) return;
        //发送修改密码请求
        this.dialogPasswordVisible = false;
        this.form = {};
        this.$refs.pwdForm.clearValidate();
      })

    },
    commitUpdateUserInfo(){
      // this.userDetailInfo.nickname = this.userInfoForm.nickname;
      // this.userDetailInfo.sex = this.userInfoForm.sex;
      // this.userDetailInfo.birthday = this.userInfoForm.bitShift;
      ////变更成功后：同步修改localStorage里的userInfo对象（nickname，sex，birthday）
      this.dialogUserInfoVisible = false;
    },
    closeEmailDialog(){
      this.$confirm('关闭后已输入数据将会被清空，确认关闭？')
          .then(_ => {
            this.dialogEmailVisible = false;
            this.activeEmail = 0;
          })
    },
    closePasswordDialog(){
        this.$confirm('关闭后已输入数据将会被清空，确认关闭？')
            .then(_ => {
              this.dialogPasswordVisible = false;
              this.form = {};
              this.$refs.pwdForm.clearValidate();
            })
    },
    closeUserInfoDialog(){
      this.$confirm('关闭后已输入数据将会被清空，确认关闭？')
          .then(_ => {
            this.dialogUserInfoVisible = false;
            this.userInfoForm = {nickname:this.userDetailInfo.nickname,sex:this.userDetailInfo.sex,birthday:this.userDetailInfo.birthday}
            this.$refs.userInfoForm.clearValidate();
          })
    }
  },
  mounted () {
    // axios.get('http://localhost:8080/blCloud/user/userInfo',{})
    // .then(({data}) => {
    //   console.log(data)
    //   this.userDetailInfo=data.data;
    // })
    // .catch(err => {
    //   console.error(err);
    // });
    this.userDetailInfo = getStore('userInfo')?JSON.parse(getStore('userInfo')):{};
    this.userInfoForm = {nickname:this.userDetailInfo.nickname,sex:this.userDetailInfo.sex,birthday:this.userDetailInfo.birthday}
    this.getUserImg();
  },
  computed: {
    buttonStr:{
      get(){
        if (this.activeEmail != 2){
          return '下一步'
        }else {
          return '确定'
        }
      }
    }
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
