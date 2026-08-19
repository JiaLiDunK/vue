<template>
    <div class="common-layout">
      <el-container>
        <el-header>
            <el-row>
                <el-col :span="8">
                    <el-input v-model="moNames" placeholder="请输入社团名称" />
                </el-col>
                <el-col :span="8">
                    <el-button type="primary" @click="searchName">确定</el-button>
                </el-col>
                <el-col :span="8">
                    <el-button type="primary" @click="dialogVisible = true"><el-icon><Plus /></el-icon>新增部门</el-button>
                </el-col>
            </el-row>
        </el-header>
        <el-main>
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column fixed prop="moName" label="社团名" ></el-table-column>
                <el-table-column prop="departmentName" label="部门名称" ></el-table-column>
                <el-table-column prop="departmentInfo" label="部门介绍" ></el-table-column>
                <el-table-column prop="names" label="负责人姓名" ></el-table-column>
                <el-table-column prop="studentId" label="负责人学号" ></el-table-column>
                <el-table-column fixed="right" >
                <template #default="scope" label="操作">
                    <el-button @click="handleClick(scope.row)"  size="small">查看</el-button>
                    <el-button size="small" @click="updateState(scope.row)" v-if="scope.row.state===1">禁用</el-button>
                    <el-button size="small" @click="updateState(scope.row)" v-else>启用</el-button>
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
        title="新增部门,请输入"
        width="50%"
        :before-close="handleClose">
        <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
          <el-form-item label="所属社团">
            <el-input v-model="formLabelAlign.moName"></el-input>
          </el-form-item>
          <el-form-item label="部门名称">
            <el-input v-model="formLabelAlign.departmentName"></el-input>
          </el-form-item>
          <el-form-item label="负责人姓名">
            <el-input v-model="formLabelAlign.names"></el-input>
          </el-form-item>
          <el-form-item label="负责人学号">
            <el-input v-model="formLabelAlign.studentId"></el-input>
          </el-form-item>
          <el-form-item label="部门介绍">
            <el-input v-model="formLabelAlign.departmentInfo"></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="cancel">取消</el-button>
            <el-button type="primary" @click="addUser">确定</el-button>
          </span>
        </template>
      </el-dialog>
      <el-dialog
        v-model="dialogVisibleUpdate"
        title="查看(编辑)"
        width="50%"
        :before-close="handleClose">
        <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlignUpdate">
          <el-form-item label="所属社团">
            <el-input v-model="formLabelAlignUpdate.moName"></el-input>
          </el-form-item>
          <el-form-item label="部门名称">
            <el-input v-model="formLabelAlignUpdate.departmentName"></el-input>
          </el-form-item>
          <el-form-item label="负责人姓名">
            <el-input v-model="formLabelAlignUpdate.names"></el-input>
          </el-form-item>
          <el-form-item label="负责人学号">
            <el-input v-model="formLabelAlignUpdate.studentId"></el-input>
          </el-form-item>
          <el-form-item label="部门介绍">
            <el-input v-model="formLabelAlignUpdate.departmentInfo"></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="cancelUpdate">取消</el-button>
            <el-button type="primary" @click="updateUser">确定修改</el-button>
          </span>
        </template>
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
      moNames:'',
      Operations:'操作',
      size:7,
      sum:7,
      tableData:[{
       departmentName:'',
       departmentInfo:'',
       names:'',
       moName:'',
       studentId:'',
       state:''
    }],
      dialogVisible:ref(false),
      dialogVisibleUpdate:ref(false),
      labelPosition: 'right',
      formLabelAlign: {
       departmentName:'',
       departmentInfo:'',
       names:'',
       moName:'',
       studentId:'',
       state:''
      },
      formLabelAlignUpdate: {
       departmentName:'',
       departmentInfo:'',
       names:'',
       moName:'',
       studentId:'',
       state:''
      }
    };
  },
  methods: {
      handleClose(){
        console.log("handleClose");
        this.dialogVisibleUpdate = false
        this.dialogVisible = false
      },
      handleClick(row) {
        console.log("查看",row);
        this.formLabelAlignUpdate.createTime=row.createTime
        this.formLabelAlignUpdate.mailBox=row.mailBox
        this.formLabelAlignUpdate.names=row.names
        this.formLabelAlignUpdate.passWorld=row.passWorld
        this.formLabelAlignUpdate.phone=row.phone
        this.formLabelAlignUpdate.power=row.power
        this.formLabelAlignUpdate.salt=row.salt
        this.formLabelAlignUpdate.studentId=row.studentId
        this.formLabelAlignUpdate.userId=row.userId
        this.formLabelAlignUpdate.departmentName=row.departmentName
        this.formLabelAlignUpdate.moName=row.moName
        this.formLabelAlignUpdate.departmentInfo=row.departmentInfo
        this.dialogVisibleUpdate = true
      },
      searchName(){
        this.dianJi(1);
      },
      updateUser(){
        this.axios({
              method: 'post',
              url: '/shetuan/user/update',
              data: this.formLabelAlignUpdate
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
      updateState(row){
        console.log('状态',row);
        if(row.state==0){
          row.state=1
        }else{
          row.state=0
        }
        this.axios({
              method: 'post',
              url: '/shetuan/user/updateState',
              data: row
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
            this.dianJi(1)
      },
      cancelUpdate(){
        this.formLabelAlignUpdate.createTime=''
        this.formLabelAlignUpdate.mailBox=''
        this.formLabelAlignUpdate.names=''
        this.formLabelAlignUpdate.passWorld=''
        this.formLabelAlignUpdate.phone=''
        this.formLabelAlignUpdate.power=''
        this.formLabelAlignUpdate.salt=''
        this.formLabelAlignUpdate.studentId=''
        this.dialogVisibleUpdate = false
      },
      cancel(){
        this.formLabelAlign.createTime=''
        this.formLabelAlign.mailBox=''
        this.formLabelAlign.names=''
        this.formLabelAlign.passWorld=''
        this.formLabelAlign.phone=''
        this.formLabelAlign.power=''
        this.formLabelAlign.salt=''
        this.formLabelAlign.studentId=''
        this.dialogVisible = false
      },
      addUser(){
        this.axios({
              method: 'post',
              url: '/shetuan/user/add',
              data: this.formLabelAlign
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
            this.cancel()
            this.dianJi(1)
      },
      dianJi(page){
        console.log('页面');
        console.log(page)
        let data={
          'moName':this.moNames.trim(),
          'start':(page-1)*this.size,
          'end':this.size
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
