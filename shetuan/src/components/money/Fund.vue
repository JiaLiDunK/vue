<template>
    <div class="common-layout">
      <el-container>
        <el-header>
            <el-row>
                <el-col :span="8">
                    <el-input v-model="moName" placeholder="请输入社团名" />
                </el-col>
                <el-col :span="8">
                    <el-button type="primary" @click="searchName">确定</el-button>
                </el-col>
            </el-row>
        </el-header>
        <el-main>
            <el-table :data="tableData" border style="width: 80%">
                <el-table-column prop="money" label="缴存金额"  ></el-table-column>
                <el-table-column prop="time" label="时间" ></el-table-column>
                <el-table-column prop="source" label="来源" ></el-table-column>
                <el-table-column prop="moName" label="社团" ></el-table-column>
                <el-table-column prop="notes" label="备注" ></el-table-column>
                <el-table-column fixed="right" >
                <template #default="scope" label="操作">
                    <el-button v-if="scope.row.state==0" disabled size="small">审核中</el-button>
                    <el-button v-else-if="scope.row.state==1" disabled size="small">已同意</el-button>
                    <el-button v-else-if="scope.row.state==3" disabled size="small">已拒绝</el-button>
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
       money:'',
       time:'',
       source:'',
       moName:'',
       notes:''
       }],
    };
  },
  methods: {
      searchName(){
        this.dianJi(1);
      },

      dianJi(page){
        console.log('页面');
        let user = this.$store.getters.getUser
        let mo = this.$store.getters.getMo
        console.log(user)
        let data={
          'moName':this.moName.trim(),
          'start':(page-1)*this.size,
          'end':this.size,
          'state':1
        }
        this.axios({
              method: 'post',
              url: '/shetuan/fund/getDataByFund',
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
