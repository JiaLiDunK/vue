<template>
    <div class="login-register">
      <div class="contain">
        <div class="big-box" :class="{ active: isLogin }">
          <div class="big-contain" v-if="isLogin">
            <div class="btitle">账户登录</div>
            <div class="bform">
              <input type="text" placeholder="学号" v-model="form.studentId" />
              <input type="password" placeholder="密码" v-model="form.password" autocomplete="current-password" />
            </div>
            <button class="bbutton" @click="login">登录</button>
          </div>
          <div class="big-contain" v-else>
            <div class="btitle">创建账户</div>
            <div class="bform">
                <el-input v-model="loginData.studentId" placeholder="请输入学号"></el-input>
                <el-input v-model="loginData.phone" placeholder="请输入手机号码"></el-input>
                <el-input v-model="loginData.mailBox" placeholder="请输入邮箱地址"></el-input>
                <el-input v-model="loginData.myName" placeholder="你的姓名"></el-input>
                <el-input v-model="loginData.inputYanZheng" placeholder="请输入验证码" />
                <el-input placeholder="请输入密码" v-model="inputPwd" show-password autocomplete="current-password"></el-input>
                <el-input v-model="inputRePwd" placeholder="请再次输入密码" show-password autocomplete="current-password"></el-input>
            </div>
            <el-button @click="fanSong" :disabled="idDisabled" class="bbutton" v-if="!isLogin" >{{ context }}</el-button>
            <button class="bbutton1" @click="register">注册</button>
          </div>
        </div>
        <div class="small-box" :class="{ active: isLogin }">
          <!-- 注册 -->
          <div class="small-contain" v-if="isLogin">
            <div class="stitle">你好，同学!</div>
            <p class="scontent">开始登录</p>
            <button class="sbutton" @click="changeType">注册</button>
          </div>
          <!-- 登录 -->
          <div class="small-contain" v-else>
            <div class="stitle">欢迎回来!</div>
            <p class="scontent">请注册你的账户</p>
            <button class="sbutton" @click="changeType">登录</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { ElMessage } from 'element-plus'
export default {
  data() {
    return {
      isLogin: true,
      form: {
        studentId: "",
        password: "",
      },
      loginData:{
        studentId:"",
        username: "",
        password: "",
        mailBox:"",
        myName:"",
        inputYanZheng:"",
      },
      
      countdown: 60,
      context: '获取验证码',
    };
  },
  watch:{
      countdown(newVal,oldVal){
        this.idDisabled = newVal === 60 ?false:true;
      }
    },
  methods: {
    // 改变登录或注册页面
    changeType() {
      this.isLogin = !this.isLogin;
      this.form.studentId = "";
      this.form.password = "";
    },
    login() {
      if (this.form.studentId === "" || this.form.password === "") {
        this.$message.error("用户名和密码不能为空");
      } else {
        let user = {'studentId':this.form.studentId ,'passWord':this.form.password}
        console.log("登录:"+user.studentId+"   "+user.passWord);
        this.axios({
          method:'post',
          url: '/shetuan/user/login',
          data: user ,
        }).then((res)=>{
          console.log(res)
          if(res.data.code==0){
            ElMessage({
            message: res.data.msg,
            type: 'warning',
          })
          }
          if(res.data.code == 1){
            this.$store.commit('setUser',res.data.data)
            sessionStorage.setItem('setUser',res.data.data);
            this.getMo(res.data.data.userId)
            console.log('到这步了');
            
            this.$router.push({path:'/main'})
          }
        })
        .catch(function(err){
          console.log('err='+err)
        })
      }
    },
    getMo(row){
      let data = {
        'userId':row
      }
      this.axios({
              method: 'post',
              url: '/shetuan/member/getMo',
              data: data
            }).then((res)=>{
              console.log(res)
            if(res.data.code===0){
              this.$message.error(res.data.msg)
            }
            if(res.data.code===1){
              this.$message({
              message: "登录成功",
              type: 'success'
            });
            this.$store.commit('setMo',res.data.data)
            sessionStorage.setItem('setMo',res.data.data)
            }
            }).catch((err)=>{
              console.log('错误='+err)
            })
    },
    register() {
      if(this.checkAll()){
          let user = {'studentId':this.studentId,'passWord':this.passWord,'phone':this.phone
        ,'yz':this.inputYanZheng,'names':this.myName,'mailBox':this.mailBox}
          console.log(user)
          this.axios({
            method:'post',
            url: '/shetuan/user/register',
            data:user
          }).then(function(res){
          console.log('结果='+res)
          if(res.data.code==0){
            ElMessage({
            message: res.data.msg,
            type: 'warning',
          })
          }
          if(res.data.code == 1){
            ElMessage({
            message: '注册成功',
            type: 'success',
          })
          this.activeName='first'
          }
        }).catch(function(err){
            console.log('err='+err);
          })
        }
    },
    
    checkAll(){
        if(!(this.inputPwd === this.inputRePwd)){
          ElMessage({
            message: '两次输入的密码不一致，请重新输入',
            type: 'warning',
          })
          return false
        }
        if(this.phone===null||this.phone===''){
          ElMessage({
            message: '请输入电话号码',
            type: 'warning',
          })
          return false
        }
        if(this.myName===null||this.myName===''){
          ElMessage({
            message: '请输入姓名',
            type: 'warning',
          })
          return false
        }
        if(this.studentId===null||this.studentId===''){
          ElMessage({
            message: '请输入学号',
            type: 'warning',
          })
          return false
        }
        if(this.mailBox===null||this.mailBox===''){
          ElMessage({
            message: '请输入邮箱',
            type: 'warning',
          })
          return false
        }
        return true
      },
      fanSong(){
        console.log('发送验证码')
        if(this.mailBox===null||this.mailBox===''){
          ElMessage({
            message: '请输入邮箱地址',
            type: 'warning',
          })
        }else{
          if(this.countdown<60){
            return
          }
          let timer = setInterval(()=>{
            if(this.countdown<=0){
              //倒计时结束，清除计时器
              clearInterval(timer);
              //回复按钮文本
              this.context = '确定发送'
              this.countdown = 60
            }else{
              //更新文本按钮
              this.context = '重新发送('+this.countdown+')';
              //倒计时加一
              this.countdown--;
            }
          },1000)
          this.axios({
          method:'post',
          url: '/shetuan/user/send?mailBox='+this.mailBox,
          
        }).then((res)=>{
          console.log(res)
          if(res.data.code==0){
            ElMessage({
            message: res.data.msg,
            type: 'warning',
          })
          }
          if(res.data.code == 1){
            ElMessage({
            message: res.data.msg,
            type: 'success',
          })
          }
        })
        .catch(function(err){
          console.log('err='+err)
        })
        }
      },
  },
};
</script>
    
<style scoped="scoped">
.login-register {
  background-image: url("../img/starBackGround.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-color: #eee;
  position: fixed;
}


.contain {
  width: 60%;
  height: 60%;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 0 3px #f0f0f0, 0 0 6px #f0f0f0;
}

.big-box {
  width: 70%;
  height: 100%;
  position: absolute;
  border-top-right-radius: inherit;
  border-bottom-right-radius: inherit;
  background: linear-gradient(rgb(230, 181, 181), rgb(157, 213, 235));
  top: 0;
  left: 30%;
  transform: translateX(0%);
  transition: all 1s;
}

.big-contain {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.btitle {
  font-size: 1.5em;
  font-weight: bold;
  color: rgb(249, 102, 126);
}

.bform {
  width: 100%;
  height: 40%;
  padding: 2em 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.bform .errTips {
  display: block;
  width: 50%;
  text-align: left;
  color: red;
  font-size: 0.7em;
  margin-left: 1em;
}

.bform input {
  width: 50%;
  height: 30px;
  border: none;
  outline: none;
  border-radius: 10px;
  padding-left: 2em;
  background-color: #f0f0f0;
}
.bbutton {
  width: 20%;
  height: 40px;
  border-radius: 24px;
  border: none;
  outline: none;
  background-color: rgb(57, 167, 176);
  color: #fff;
  font-size: 0.9em;
  cursor: pointer;
}
.bbutton1 {
  width: 20%;
  height: 40px;
  border-radius: 24px;
  margin-top: 10px;
  border: none;
  outline: none;
  background-color: rgb(57, 167, 176);
  color: #fff;
  font-size: 0.9em;
  cursor: pointer;
}
.small-box {
  width: 30%;
  height: 100%;
  background: linear-gradient(135deg, rgb(57, 167, 176), rgb(56, 183, 145));
  position: absolute;
  top: 0;
  left: 0;
  transform: translateX(0%);
  transition: all 1s;
  border-top-left-radius: inherit;
  border-bottom-left-radius: inherit;
}
.small-contain {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.stitle {
  font-size: 1.5em;
  font-weight: bold;
  color: #fff;
}

.scontent {
  font-size: 0.8em;
  color: #fff;
  text-align: center;
  padding: 2em 4em;
  line-height: 1.7em;
}

.sbutton {
  width: 60%;
  height: 40px;
  border-radius: 24px;
  border: 1px solid #fff;
  outline: none;
  background-color: transparent;
  color: #fff;
  font-size: 0.9em;
  cursor: pointer;
}

/* 滑动动作 */
.big-box.active {
  left: 0;
  transition: all 0.5s;
  border-top-left-radius: inherit;
  border-bottom-left-radius: inherit;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.small-box.active {
  left: 100%;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: inherit;
  border-bottom-right-radius: inherit;
  transform: translateX(-100%);
  transition: all 1s;
}
</style>