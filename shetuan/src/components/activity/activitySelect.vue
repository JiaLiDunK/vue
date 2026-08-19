<template>
  <div class="common-layout">
    <el-container>
      <el-header>
          <el-row>
              <el-col :span="8">
                  <el-input v-model="activeName" placeholder="请输入活动名称" />
              </el-col>
              <el-col :span="8">
                  <el-button type="primary" @click="searchName">确定</el-button>
              </el-col>
          </el-row>
      </el-header>
      <el-main>
          <el-table :data="tableData" border style="width: 75%">
              <el-table-column prop="activeName" label="活动名称"  width="60px"></el-table-column>
              <el-table-column prop="time" label="申请时间" width="120px"></el-table-column>
              <el-table-column prop="activeMoney" label="所需资金" width="90px"></el-table-column>
              <el-table-column prop="name" label="负责人" width="90px"></el-table-column>
              <el-table-column prop="startTime" label="开始时间" width="120px"></el-table-column>
              <el-table-column prop="overTime" label="结束时间时间" width="120px"></el-table-column>
              <el-table-column prop="moName" label="申请的社团" width="120px"></el-table-column>
              <el-table-column prop="site" label="地点" width="200px"></el-table-column>
              <el-table-column prop="count" label="参与人数" width="90px"></el-table-column>
              <el-table-column prop="desc" label="活动形式" width="90px"></el-table-column>
              <el-table-column fixed="right" >
              <template #default="scope" label="操作">
                <el-button v-if="scope.row.state==1" size="small" type="primary" disabled >申请中</el-button>
                    <el-button v-else-if="scope.row.state==2" size="small" type="success" disabled>已同意</el-button>
                    <el-button v-else-if="scope.row.state==3" size="small" type="success" disabled>已报备</el-button>
                    <el-button v-else-if="scope.row.state==0" size="small" type="success" disabled>已拒绝</el-button>
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
    activeName:'',
    Operations:'操作',
    size:7,
    sum:7,
    tableData:[{
      activeName:'',
      time:'',
      activeMoney:'',
      name:'',
      startTime:'',
      overTime:'',
      moName:'',
      site:'',
      count:'',
      desc:''
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
        'activeName':this.activeName.trim(),
        'start':(page-1)*this.size,
        'end':this.size,
        'state':null
      }
      this.axios({
            method: 'post',
            url: '/shetuan/active/getData',
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
