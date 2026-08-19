import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../components/Login.vue'
import mainPage from '../components/MainPage.vue'
import User from '../components/user/User.vue'
import ManageMo from '../components/mo/manageMo.vue'
import ManageDe from '../components/mo/manageDe.vue'
import JoinMo from '../components/mo/joinMo.vue'
import MeSelect from '../components/me/meSelect.vue'
import DeSelect from '../components/me/deSelect.vue'
import Activity from '../components/activity/activity.vue'
import ActivityApproval from '../components/activity/activityApproval.vue'
import ActivitySelect from '../components/activity/activitySelect.vue'
import ActivityFiling from '../components/activity/activityFiling.vue'
import ActivityMeSelect from '../components/activity/activityMeSelect.vue'
import ActivityCompleted from '../components/activity/ActivityCompleted.vue'
import ManageMe from '../components/me/manageMe.vue'
import JoinDe from '../components/me/joinDe.vue'
import Money from '../components/money/money.vue'
import FundDeposit from '../components/money/fundDeposit.vue'
import ManageFund from '../components/money/manageFund.vue'
import Fund from '../components/money/Fund.vue'
import FirstPage from '../components/firstPage.vue'
import UserController from '../components/user/userController.vue'
import ManagePublicize from '../components/managePublicize.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: Login
  },
  {
    path: '/main',
    name: 'main',
    component: mainPage,
    children:[
      {path:'User',component: User,meta:{title:'用户管理'}},
      {path:'ManageMo',component: ManageMo,meta:{title:'社团管理'}},
      {path:'ManageDe',component: ManageDe,meta:{title:'部门管理'}},
      {path:'MeSelect',component: MeSelect,meta:{title:'入社申请查看'}},
      {path:'DeSelect',component: DeSelect,meta:{title:'入部申请查看'}},
      {path:'JoinMo',component: JoinMo,meta:{title:'加入社团'}},
      {path:'Activity',component: Activity,meta:{title:'活动'}},
      {path:'ActivityApproval',component: ActivityApproval,meta:{title:'活动审批'}},
      {path:'ActivitySelect',component: ActivitySelect,meta:{title:'活动查询'}},
      {path:'ActivityFiling',component: ActivityFiling,meta:{title:'活动报备'}},
      {path:'ActivityCompleted',component: ActivityCompleted,meta:{title:'活动完成报备'}},
      {path:'ActivityMeSelect',component: ActivityMeSelect,meta:{title:'社团活动查询'}},
      {path:'ManageMe',component: ManageMe,meta:{title:'成员管理'}},
      {path:'JoinDe',component: JoinDe,meta:{title:'入部查看'}},
      {path:'Money',component: Money,meta:{title:'资金查看'}},
      {path:'FundDeposit',component: FundDeposit,meta:{title:'资金缴存'}},
      {path:'Fund',component: Fund,meta:{title:'历史缴存'}},
      {path:'ManageFund',component: ManageFund,meta:{title:'缴存审批'}},
      {path:'FirstPage',component:FirstPage,meta:{title:'首页'}},
      {path:'UserController',component:UserController,meta:{title:'用户中心'}},
      {path:'ManagePublicize',component:ManagePublicize,meta:{title:'宣传管理'}}
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.beforeEach((to,from,next)=>{
  // 从 sessionStorage 获取 user
  const user = sessionStorage.getItem('setUser')
  if(to.path==='/'){
    return next();
  }
  // 检查 user 是否存在，以及 user.studentId 是否为 null 或空字符串
  if (user === null || user.studentId===null || user.studentId === '') {
    // 如果 user 不存在，或者 user.studentId 为 null 或空字符串，重定向到登录页面
    return next('/');
  }
  return next();
})
export default router
