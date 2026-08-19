import { createStore } from 'vuex'
import createVuexAlong from 'vuex-along'

export default createStore({
  state: {
    user:{
      userId:'',
      phone:'',
      studentId:'',
      salt:'',
      names:'',
      mailBox:'',
      passWOrd:'',
      power:'',
      state:'',
      createTime:''
    },
    mo:{
      moId:'',
      moName:'',
      departmentId:'',
      departmentName:'',
      roleId:'',
    },
    tableData:{},
  },
  getters: {
    getUser: state=>{
      return state.user
    },
    getMo: state=>{
      return state.mo
    },
    getTableData: state=>{
      return state.tableData
    }
  },
  mutations: {
    setUser(state,newUser){
      state.user = newUser
    },
    setMo(state,newMo){
      state.mo = newMo
    },
    setTableData(state,newTableData){
      state.tableData = newTableData
    }
  },
  actions: {
  },
  modules: {
  },
  plugins:[createVuexAlong()]
})
