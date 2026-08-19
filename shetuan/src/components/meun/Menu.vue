<template>
      <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="el-menu-vertical-demo"
        default-active="2"
        text-color="#fff"
        style="height: 92vh"
        default-active:true>
        <el-menu-item index="FirstPage" @click="$router.push('/main/FirstPage')">
          <el-icon><House /></el-icon>
          <span>首页</span>
        </el-menu-item>
        <el-menu-item index="/main/JoinMo" @click="$router.push('/main/JoinMo')">
          <el-icon><HomeFilled /></el-icon>
          <span>加入社团</span>
        </el-menu-item>
        <el-sub-menu index="2"  v-if="roleId === 5 || roleId === 4 || roleId === 3 || roleId === 2 || roleId === 0">
          <template #title>
            <el-icon><Grid /></el-icon>
            <span>社团中心</span>
          </template>
            <el-menu-item index="/main/MeSelect" @click="$router.push('/main/MeSelect')"
            v-if="roleId === 5 || roleId === 4 || roleId === 3 ">入社申请查看</el-menu-item>
            <el-menu-item index="/main/DeSelect" @click="$router.push('/main/DeSelect')" 
            v-if="roleId === 5 || roleId === 4 || roleId === 3 ">入部申请查看</el-menu-item>
            <el-menu-item index="/main/JoinDe" @click="$router.push('/main/JoinDe')" 
            v-if="roleId === 5 || roleId === 4 || roleId === 3 || roleId === 2 || roleId === 0">申请入部</el-menu-item>
            <el-menu-item index="/main/mangeMe" @click="$router.push('/main/ManageMe')"
            v-if="roleId === 5 || roleId === 4 ">人员管理</el-menu-item>
            <el-menu-item index="/main/FundDeposit" @click="$router.push('/main/FundDeposit')"
            v-if="roleId === 5 || roleId === 4 ">资金缴存</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="3" v-if="roleId === 5 || roleId === 4 || roleId === 3">
          <template #title>
            <el-icon><Notebook /></el-icon>
            <span>活动</span>
          </template>
            <el-menu-item index="/main/Activity" @click="$router.push('/main/Activity')">活动申报</el-menu-item>
            <el-menu-item index="/main/ActivityCompleted" @click="$router.push('/main/ActivityCompleted')">活动完成报备</el-menu-item>
            <el-menu-item index="/main/ActivityFiling" @click="$router.push('/main/ActivityFiling')">活动报备</el-menu-item>
            <el-menu-item index="/main/ActivityMeSelect" @click="$router.push('/main/ActivityMeSelect')">社团活动查询</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="4" v-if="roleId === 5 || roleId === 4 || roleId === 3">
          <template #title>
            <el-icon><IconMenu /></el-icon>
            <span>部门及社团管理</span>
          </template>
            <el-menu-item index="/main/mangeMo" @click="$router.push('/main/ManageMo')" v-if="roleId === 5 || roleId === 4">社团管理</el-menu-item>
            <el-menu-item index="/main/mangeDe" @click="$router.push('/main/ManageDe')">部门管理</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="/main/ActivityApprpval" @click="$router.push('/main/ActivityApproval')" v-if="roleId === 5">
          <el-icon><Coin /></el-icon>
          <span>活动审批</span>
        </el-menu-item>
        <el-menu-item index="/main/ActivitySelect" @click="$router.push('/main/ActivitySelect')">
          <el-icon><Football /></el-icon>
          <span>活动查询</span>
        </el-menu-item>
        <el-sub-menu index="5" v-if="roleId === 5">
          <template #title>
            <el-icon><Money /></el-icon>
            <span>资金情况</span>
          </template>
            <el-menu-item index="/main/Money" @click="$router.push('/main/Money')">历史支出</el-menu-item>
            <el-menu-item index="/main/Fund" @click="$router.push('/main/Fund')">历史缴存</el-menu-item>
            <el-menu-item index="/main/ManageFund" @click="$router.push('/main/ManageFund')">缴存审核</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="/main/User" @click="$router.push('/main/User')" v-if="roleId === 5">
          <el-icon><UserFilled /></el-icon>
          <span>人员管理</span>
        </el-menu-item>
        <el-menu-item index="/main/ManagePublicize" @click="$router.push('/main/ManagePublicize')" v-if="roleId === 5 || roleId === 4">
          <el-icon><ChatLineRound /></el-icon>
          <span>宣传管理</span>
        </el-menu-item>
      </el-menu>
</template>
<script>
import { Location,Menu as IconMenu,Document,Setting
  ,UserFilled,HomeFilled,House,Money,Football,Coin,Grid,Notebook,ChatLineRound   } from '@element-plus/icons-vue'
export default {
  components:{
    Location,
    IconMenu,
    Document,
    Setting,
    UserFilled,
    HomeFilled,
    House,
    Money,
    Football,
    Coin,
    Grid,
    Notebook,
    ChatLineRound 
  },
  created: function(){
   this.getMoId()
   },
  data() {
    return {
     roleId:-1,
    };
  },
  methods:{
    getMoId(){
      let mo = this.$store.getters.getMo
      this.roleId = mo.roleId
    }
  }

};
</script>
