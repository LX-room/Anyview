<template>
  <el-container>
      <el-header height="10" class="login-header">
          <img src="./images/Anyview.svg">
      </el-header>
      <el-main class="login-content">
        <div>
        <el-form label-width="100px" :model="user" status-icon :rules="rules" ref="user">
          <el-form-item label="账号"  prop="username">
            <el-input type="username" placeholder="请输入账号" v-model="user.username"></el-input>
          </el-form-item>
          <el-form-item label="密码"  prop="password" >
            <el-input type="password"  placeholder="请输入密码" v-model="user.password" show-password></el-input>
          </el-form-item>
          <el-form-item label="学校" class="school-select" prop="schoolId">
            <el-select v-model="user.schoolId" placeholder="请选择您的学校"  filterable>
                  <el-option v-for="(school,index) in schoolList" :key="index" :value="school.id" :label="school.schoolName"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="btn">
            <el-button type="primary" @click="login('user')">
              <span v-if="login_status">登陆中<i class="el-icon-loading"></i></span>
              <span v-else>登录</span>
            </el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="danger" style="width:100%">忘记密码</el-button>
          </el-form-item>
          <el-form-item>
             <el-checkbox v-model="user.switch">记住密码</el-checkbox>
          </el-form-item>
        </el-form>
        </div>
      </el-main>
      <el-footer>
        <span>©</span>
        <span>广东工业大学</span>
        <span>可视化创新与系统工具研究工作室</span>
        <span><a href="">Anyview团队</a></span>
      </el-footer>
  </el-container>
</template>

<script>
 import {setCache,getCache} from 'common/js/cache';
 import {getSchoolMsg,getLoginMsg} from '@/api/login'
 import * as types from '@/api/config'

export default {
  inject: ['app'],
  data () {
    return {
      rules: {
        username: [
          { required: true, message: '账号不能为空'},
          { type: 'string', message: '账号必须为数字值'}
        ],
        password: [
          { required: true, message: '密码不能为空'}
        ],
        schoolId: [
            { required: true, message: '请选择学校', trigger: 'change' }
        ],
                
      },
      schoolList:[],
      login_status: false,
      user: {
        roleId: 3,
        username: '',
        password: '',
        schoolId: '',
        switch: true
      }
    }
  },
  mounted () {
    console.log('app',this.app);
    this.$message({
          message: '此版本为内测版本，许多功能并不完善，请合理使用。',
          center: true,
          type: 'warning'
        })
      this._getSchoolist()
    },
  methods: {
      _input(c) {
        console.log(c)
      },
      _getSchoolist(){
        if(this.schoolList.length!=0) return
        // this.axios.get('http://139.159.186.173:9527/studentlogin/getSchool').then(res=>{
        //   console.log(res)
        //   if(res.status==200)
        //     this.schoolList=res.data.content
        // })
        getSchoolMsg('获取学校列表').then((e)=>{
          if(e.type === types.SCHOOL_SUCCESS_TYPE){
            this.schoolList=e.content
          }
        })
      },
      _getUser(){
        let user=this.user
        getLoginMsg(user).then((e)=>{
          this.login_status = false
          if(e.type === types.LOGIN_SUCCESS_TYPE){
            setCache("user",JSON.stringify(e.content))
            this.changeRoute('work')
          }
          else if(e.type === types.LOGIN_ALREADY_TYPE){
            this.messagePrompt("此用户已经登录过")
          }else{
            this.messagePrompt(e.content)
          }
        })
      },
      changeRoute(routeName){
        this.$router.replace(routeName)
      },
      messagePrompt(content){
        this.$message({
          showClose: true,
          message: content,
          duration: 1500,
          type: 'error'
        });
      },
      login (name) {
        this.$refs[name].validate((valid) => {
          if(valid) {
            this.login_status = true
            this._getUser()
          }
        });
      }

  }
}
</script>

<style>
  @import '../assets/css/base.css';
</style>

<style lang="scss" scoped>
  @import '../assets/css/login.scss';
</style>