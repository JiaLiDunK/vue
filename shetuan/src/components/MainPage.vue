<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <el-row :gutter="20" align="middle">
          <el-col :span="8">
            <el-select v-model="value" placeholder="请选择社团" @change="selectMo">
            <el-option
              v-for="item in options"
              :key="item.moId"
              :label="item.moName"
              :value="item.moId">
            </el-option>
          </el-select>
          </el-col>
          <el-col :span="8" class="header-title">社团管理系统</el-col>
          <el-col :span="8" class="header-user">
            <el-dropdown>
              <span class="el-dropdown-link">
                <el-icon><Avatar /></el-icon> {{ context }}
                <el-icon class="el-icon--right">
                  <arrow-down />
                </el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="$router.push('/main/UserController')">个人中心</el-dropdown-item>
                  <el-dropdown-item divided @click="outLine">退出系统</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <Menu></Menu>
        </el-aside>
        <el-container>
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>

    </el-container>
  </div>
</template>

<script>
import { Avatar,ArrowDown  } from '@element-plus/icons-vue'
import Menu from './meun/Menu.vue'
export default {
  components:{
    Avatar,
    ArrowDown,
    Menu,//菜单栏
  },
  data() {
    return {
      context:'默认无登录',
      options: [
        {
          moId:'',
          moName:''
        }
         ],
      value: ''
    };
  },
  created:function(){
    this.createList()
    this.getMo()
  },
  methods: {
      createList(){
        let mo = this.$store.getters.getMo
        let data = {
          "moId":mo.moId
        }
        this.axios({
              method: 'post',
              url: '/shetuan/massOrganization/getMoName',
              data: data
            }).then((res)=>{
              console.log(res)
            if(res.data.code===0){
              this.$message.error(res.data.msg)
            }
            if(res.data.code===1){
              this.value=res.data.data
              this.context='已登录'
            }
            }).catch((err)=>{
              console.log('错误='+err)
            })
      },
      selectMo(){
        console.log(this.value);
        let data={
          "userId":null,
          "moId":this.value
        }
        this.axios({
              method: 'post',
              url: '/shetuan/member/getMoBySelect',
              data: data
            }).then((res)=>{
              console.log(res)
            if(res.data.code===0){
              this.$message.error(res.data.msg)
            }
            if(res.data.code===1){
            this.$store.commit('setMo',res.data.data)
            sessionStorage.setItem('setMo',res.data.data)
            }
            }).catch((err)=>{
              console.log('错误='+err)
            })
      },
      outLine(){
        this.$store.commit('setUser',null)
        sessionStorage.clear()
        this.$router.push({path:'/'})
      },
      getMo(){
        let data={
          "userId":this.$store.getters.getUser.userId
        }
        this.axios({
              method: 'post',
              url: '/shetuan/member/getMoBy',
              data: data
            }).then((res)=>{
              console.log(res)
            if(res.data.code===0){
              this.$message.error(res.data.msg)
            }
            if(res.data.code===1){
              this.options = res.data.data
            }
            }).catch((err)=>{
              console.log('错误='+err)
            })
      }
    }
};
</script>

<style scoped>

.common-layout {
  background-image: url('../img/clouds.jpg');
  background-size: cover;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-color: #eee;
  position: fixed;
}
.el-row{
  padding-top: 10px;
}
.el-header{
  background-color: #545c64;
}
.header-title{
  color: white;
  text-align: center;
}
.header-user{
  text-align: right;
}
.el-dropdown-link{
  margin-top: 10px;
  color: white;
}
</style>
