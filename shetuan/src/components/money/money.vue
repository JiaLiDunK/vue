<template>
    <div class="common-layout">
      <el-container>
        <el-header>
            <el-row>
                <el-col :span="8">
                    <el-input v-model="memberName" placeholder="请输入负责人名称" />
                </el-col>
                <el-col :span="8">
                    <el-button type="primary" @click="searchName">确定</el-button>
                </el-col>
            </el-row>
        </el-header>
        <el-main>
            <el-table :data="tableData" border style="width: 80%">
                <el-table-column prop="payTime" label="支出时间"  ></el-table-column>
                <el-table-column prop="moName" label="社团名称" ></el-table-column>
                <el-table-column prop="memberName" label="负责人姓名" ></el-table-column>
                <el-table-column prop="money" label="花费金额" ></el-table-column>
                <el-table-column prop="notes" label="备注" ></el-table-column>
                <el-table-column prop="names" label="批准人" ></el-table-column>
               
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
      memberName:'',
      Operations:'操作',
      size:7,
      sum:7,
      tableData:[{
       payTime:'',
       moName:'',
       memberName:'',
       money:'',
       notes:'',
       names:''
       }],
    };
  },
  methods: {
      searchName(){
        this.dianJi(1);
      },
      agree(row){
        console.log(row);
      },
      refuse(row){
        console.log(row);
      },
      dianJi(page){
        console.log('页面');
        let user = this.$store.getters.getUser
        let mo = this.$store.getters.getMo
        console.log(user)
        let data={
          'memberName':this.memberName.trim(),
          'start':(page-1)*this.size,
          'end':this.size,
        }
        this.axios({
              method: 'post',
              url: '/shetuan/fund/getData',
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
