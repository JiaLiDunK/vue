<template>
    <div class="common-layout">
      <el-container>
        <el-header>
            <el-row>
                <el-col :span="8">
                    <el-input v-model="departmentName" placeholder="请输入部门名称" />
                </el-col>
                <el-col :span="8">
                    <el-button type="primary" @click="searchName">确定</el-button>
                </el-col>
            </el-row>
        </el-header>
        <el-main>
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column prop="moName" label="社团名称"  ></el-table-column>
                <el-table-column prop="departmentName" label="部门名称" ></el-table-column>
                <el-table-column prop="departmentInfo" label="部门介绍" ></el-table-column>
                <el-table-column prop="names" label="负责人" ></el-table-column>
                <el-table-column prop="studentId" label="负责人学号" ></el-table-column>
                <el-table-column fixed="right" >
                <template #default="scope" label="操作">
                    <el-button @click="agree(scope.row)"  size="small">申请入部门</el-button>
                    
                </template>
                </el-table-column>
            </el-table>
        </el-main>
        <el-footer>
            <el-pagination background layout="prev, pager, next" :total=sum :page-size=size @current-change="dianJi"/>
        </el-footer>
      </el-container>
    </div>
     
  </template>
<script>
import { Plus,Timer  } from '@element-plus/icons-vue'
export default {
  created: function(){
     this.dianJi(1)
    },
  components:{
    Plus,
    Timer
  },
  data() {
    return {
      departmentName:'',
      Operations:'操作',
      size:7,
      sum:7,
      tableData:[{
        moName:'',
        names:'',
        studentId:'',
        moId:'',
        departmentName:'',
        departmentInfo:''
       }],
    };
  },
  methods: {
      searchName(){
        this.dianJi(1);
      },
      agree(row){
        console.log(row);
        let user = this.$store.getters.getUser
        console.log(user)
        let data={
          'roleId':0,
          'moId':row.moId,
          "departmentId":row.departmentId,
           "state":1,
           "userId":user.userId
        }
        this.axios({
              method: 'post',
              url: '/shetuan/member/joinDe',
              data:data
            }).then((res)=>{
            if(res.data.code==0){
              this.$message.error(res.data.msg)
            }
            if(res.data.code==1){
                console.log(res)
                this.$message({
              message: res.data.data,
              type: 'success'
            });
            }
            }).catch((err)=>{
              console.log('错误='+err)
            })
      },
     
      dianJi(page){
        console.log('页面');
        let user = this.$store.getters.getUser
        let mo = this.$store.getters.getMo
        console.log(user)
        let data={
          'start':(page-1)*this.size,
          'end':this.size,
          'roleId':user.power,
          'moId':mo.moId,
          "departmentName":this.departmentName.trim()
        }
        this.axios({
              method: 'post',
              url: '/shetuan/department/getData',
              data:data
            }).then((res)=>{
            if(res.data.code==0){
              ElMessage({
                message: res.data.msg,
                type: 'warning'
              })
            }
            if(res.data.code==1){
                console.log(res)
                this.sum = res.data.data.count
                this.tableData = res.data.data.list
            }
            }).catch((err)=>{
              console.log('错误='+err)
            })
            
      }
    },

};
</script>
<style scoped>
.common-layout {
    margin: 20px;
}

.el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.el-header .el-row {
    width: 100%;
}

.el-header .el-row .el-col {
    display: flex;
    align-items: center;
}

.el-header .el-row .el-col:nth-child(1) {
    justify-content: flex-start;
}

.el-header .el-row .el-col:nth-child(3) {
    justify-content: flex-end;
}

.el-main {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.el-main .el-table {
    flex-grow: 1;
    height: 100%;
    width: 100%; /* This ensures that the table takes up the full width of the main section */
}

.el-footer {
    display: flex;
    justify-content: flex-end;
}
</style>
