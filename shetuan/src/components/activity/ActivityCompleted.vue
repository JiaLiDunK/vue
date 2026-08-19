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
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column prop="activeName" label="活动名称"  ></el-table-column>
                <el-table-column prop="time" label="申请时间" ></el-table-column>
                <el-table-column prop="activeMoney" label="所需资金" ></el-table-column>
                <el-table-column prop="name" label="负责人" ></el-table-column>
                <el-table-column prop="startTime" label="开始时间" ></el-table-column>
                <el-table-column prop="overTime" label="结束时间时间" ></el-table-column>
                <el-table-column prop="moName" label="申请的社团" ></el-table-column>
                <el-table-column prop="site" label="地点" ></el-table-column>
                <el-table-column prop="count" label="参与人数" ></el-table-column>
                <el-table-column prop="desc" label="活动形式" ></el-table-column>
                <el-table-column fixed="right" >
                <template #default="scope" label="操作">
                  <el-button size="small" type="primary"  @click="report(scope.row)">活动报备</el-button>
                </template>
                </el-table-column>
            </el-table>
        </el-main>
        <el-footer>
            <el-pagination background layout="prev, pager, next" :total=sum :page-size=size @current-change="dianJi"/>
        </el-footer>
      </el-container>
    </div>
    <el-dialog
        v-model="dialogVisible"
        title="提示框"
        width="50%">
        <el-input v-model="leave" placeholder="请输入剩余资金" />
        <el-input v-model="notes" placeholder="备注" />
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="reportTo">确 定</el-button>
        </span>
      </el-dialog>
     
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
      dialogVisible: ref(false),
      activeName:'',
      leave:'',
      notes:'',
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
        desc:'',
        state:'',
        leave:'',
        approveId:'',
       }],
    };
  },
  methods: {
      searchName(){
        this.dianJi(1);
      },
      reportTo(){
        let row =  this.$store.getters.getTableData
        let data = {
          "leave": this.leave,
          "approveId":this.$store.getters.getUser.userId,
          "activeName":row.activeName,
          "time":row.time,
          "activeMoney":row.activeMoney,
          "name":row.name,
          "startTime":row.startTime,
          "overTime":row.overTime,
          "moName":row.moName,
          "site":row.site,
          "count":row.count,
          "desc":row.desc,
          "state":3,
          "activeId":row.id,
          "moId":row.moId,
          "memberName":row.name,
          "notes":this.notes,
          "id":row.id,
        }
        console.log(data);
        this.axios({
              method: 'post',
              url: '/shetuan/active/finish',
              data:data
            }).then((res)=>{
            if(res.data.code==0){
              ElMessage({
                message: res.data.msg,
                type: 'warning'
              })
            }
            if(res.data.code==1){
              this.$message({
              message: res.data.data,
              type: 'success'
           });
           this.dialogVisible = false
           this.notes=''
           this.leave=''
            }
            }).catch((err)=>{
              console.log('错误='+err)
            })
      },
      report(row){
        console.log(row);
        this.$store.commit('setTableData',row)
        sessionStorage.setItem('setTableData',row);
        this.dialogVisible = true
      },
      dianJi(page){
        console.log('页面');
        let mo = this.$store.getters.getMo
        let data={
          'activeName':this.activeName.trim(),
          'start':(page-1)*this.size,
          'end':this.size,
          'state':2,
          "moId":mo.moId
        }
        console.log(data);
        
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
              this.$message({
              message: "查询成功",
              type: 'success'
           });
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
  