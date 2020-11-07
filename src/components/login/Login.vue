<template>
<div class="Login" >
  <div class="cover" ref="BgRef" style="opacity: 1;"></div>
  <div :class="{blur:blur}"  @click="getblur"></div>
  <div class="content" :class="{bgcolor:blur}">
    <img src="~@/assets/img/mangologo.png" alt="" class="logo">
    <p class="logintitle">Login</p>
    <div class="loginbox">
      <el-form :model="userinfo" :rules="rules" ref="ruleForm" >
      <div class="username">
        <el-form-item  prop="username">
          <el-input placeholder="请输入网易云手机号" @focus="gefocus" v-model="userinfo.username"></el-input>
        </el-form-item>
      </div>
      <div class="password">
      <el-form-item  prop="password">
          <el-input show-password placeholder="请输入密码" @focus="gefocus" v-model="userinfo.password"></el-input>
      </el-form-item>
      </div>
      </el-form>
    <button class="loginbtn" @click="login">登陆</button>
    </div>
    <span>- mango-music</span>
  </div>
  <div class="from">
    <p ref="pinfo">Login by mango-music</p>
    <a ref="ainfo" href="https://eax888.cn" target="_blank">By Eax D18C4208</a>
  </div>
</div>

</template>

<script>
import {login} from '@/network/login'
export default {
  name:'Login',
  data() {
    return {
      blur:false,
      userinfo:{username:'17520633370',password:'a3436500'},
      rules:{username:{ required: true, message: '请输入手机号', trigger: 'blur' },
             password:{ required: true, message: '请输入密码', trigger: 'blur' }
            }
    }
  },
  methods: {
    gefocus(){
      this.blur = true
      this.$refs.BgRef.style = 'opacity: 1; transform: scale(1.1);'
      this.$refs.ainfo.style = this.$refs.pinfo.style = 'color:#cbcdcf;'
    },
    getblur(){
      this.blur = false 
      this.$refs.BgRef.style = 'opacity: 1;'
      this.$refs.ainfo.style = this.$refs.pinfo.style = ''
    },
    login(){
      this.$refs.ruleForm.validate(valid => {
        if(valid){
          login(this.userinfo.username,this.userinfo.password).then(res => {
            if(res.data.code !==200){return this.$message.error(res.data.msg)}
            this.$message.success('登陆成功')
            this.$router.go(-1)
            window.localStorage.setItem('info',JSON.stringify(res.data))
            window.localStorage.setItem('cookie',res.data.cookie)
          }).catch(err => {
            if(err && err.response){
              this.$message.error(err.response.data.msg)
            }
          })
        }else{
          this.$message.error('信息填写不完整!')
        }
      })
    }
  },
}
</script>

<style scoped>
.Login{
  min-height: 550px;
  width: 100%;
  height: 100vh;
  align-items: center;
  display: flex;
  justify-content: center;
  overflow: hidden;
  position: relative;
}
.cover{
  width: 100%;
  height: 100%;
  background: url('~@/assets/img/login_bg1.jpg') no-repeat;
  background-size: cover;
  background-attachment: fixed;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  transition:opacity 1s,transform .25s,filter .25s;
}
.blur{
  position: absolute;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter:  blur(10px);
  z-index: 20;
  background-image: radial-gradient(rgba(0,0,0,0) 0%,rgba(0,0,0,0.5) 100%),radial-gradient(rgba(0,0,0,0) 33%,rgba(0,0,0,0.3) 166%);
  transition: all .25s;
}
.content{
  text-align: center;
  z-index: 999 ;
  width: 21.9em;
  height: 27.4em;
  background-color: rgba(255, 255, 255, 0.45);
  border-radius: 8px;
  box-shadow: rgba(0,0,0,.2) 0 0 10px;
  transition: all .25s linear;
  position: relative;
}
.content span{
  position: absolute;
  bottom: 3%;
  right: 10%;
  font-size: 12px;
  color: rgb(250, 250, 250);
}
.bgcolor{
  background-color: rgba(255,255,255,.55);
  transition: all .25s linear;
}
.logo{
  width: 100px;
  margin-bottom: -10px;
}
.username,.password{
  width: 80%;
  margin: 0 auto;
  position: relative;
}
.username::before,.password::before{
  position: absolute;
  font-family: 'iconfont';
  left: 9px;
  top: 50%;
  transform: translateY(-50%);
  color: black;
}
.username::before{
  content: '\e63a';
}
.password::before{
  content: '\e60d';
  font-size: 18px;
}
.from{
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  position: absolute;
  bottom: 5%;
  cursor: pointer;
  z-index: 999;
  transition: all .25s;
  font-size: 14px;
}
.from p{
  margin: 0;
  padding: 5px 0;
  transition: all .25s;
}
.from a{
  text-decoration: none;
  outline:none;
  color: #4a4a4a;
  transition: all .25s;
}
.from a:hover{
  color:#f5ceae;
  transition: all .6s;
}
@media (max-height:600px){
  .from{
    display: none;
  }
}
.logintitle{
  margin: 0 0 20px;
  padding: 0;
  font-size: 20px;
  color: rgb(255, 255, 255);
  font-weight: 400;
}
.password{
  margin-top: 10px;
}
.loginbtn{
  color: white;
  font-size: 14px;
  display: block;
  margin: 40px auto 0;
  border-radius: 4px;
  width: 80%;
  height: 40px;
  outline: none;
  border: none;
  background-image: linear-gradient(120deg, #a6c0fe,#fda9b9,#d783bf,#a6c0fe);
  background-size: 200%;
  cursor: pointer;
  position: relative;
  z-index: 1;
}
.loginbtn::before{
  content:"";
  position: absolute;
  left: -3px;
  right: -3px;
  top: -3px;
  bottom: -3px;
  background-image: linear-gradient(120deg, #a6c0fe,#fda9b9,#d783bf,#a6c0fe);
  background-size: 400%;
  border-radius: 4px;
  filter: blur(20px);
  z-index: -1;
}
.loginbtn:hover,.loginbtn:hover::before{
  /* background-image: linear-gradient(120deg, #fbc2eb 0%, #a6c1ee 100%); */
  animation: run 8s infinite;
}

@keyframes run{
  100%{
    background-position: -400% 0;
  }
}
</style>