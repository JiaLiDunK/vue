<template>
    <div class="common-layout">
      <el-container>
        <el-header>
            <el-row>
                <el-col :span="8">
                    <el-input v-model="moName" placeholder="请输入社团名称" />
                </el-col>
                <el-col :span="8">
                    <el-button type="primary" @click="searchName">确定</el-button>
                </el-col>
            </el-row>
        </el-header>
        <el-main>
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column fixed prop="moName" label="社团名" ></el-table-column>
                <el-table-column prop="names" label="社长" ></el-table-column>
                <el-table-column prop="moInfo" label="社团简介" ></el-table-column>
                <el-table-column prop="director" label="负责老师" ></el-table-column>
                <el-table-column fixed="right" >
                <template #default="scope" label="操作">
                    <el-button @click="joinMo(scope.row)"  size="small">申请加入</el-button>
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
import { ref } from 'vue';
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
      moName:'',
      Operations:'操作',
      size:7,
      sum:7,
      tableData:[{
        moName:'',
        names:'',
        studentId:'',
        moInfo:'',
        director:'',
        phone:''
    }],
    };
  },
  methods: {
      searchName(){
        this.dianJi(1);
      },
      joinMo(row){
        let user = this.$store.getters.getUser
        console.log("user",user);
        
        let data={
          "moId":row.moId,
          "userId":user.userId,
          "roleId":1,
          "state":2,
          "departmentId":null
        }
        this.axios({
              method: 'post',
              url: '/shetuan/member/join',
              data: data
            }).then((res)=>{
              console.log(res)
            if(res.data.code===0){
              this.$message.error(res.data.msg)
            }
            if(res.data.code===1){
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
        console.log(page)
        let data={
          'moName':this.moName.trim(),
          'start':(page-1)*this.size,
          'end':this.size
        }
        this.axios({
              method: 'post',
              url: '/shetuan/massOrganization/getData',
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
