<template>
  <el-card class="box-card">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="姓名">
        <el-input v-model="form.names"></el-input>
      </el-form-item>
      <el-form-item label="学号">
        <el-input v-model="form.studentId"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.mailBox"></el-input>
      </el-form-item>
      <el-form-item label="密码(已加密)">
        <el-input type="textarea" v-model="form.passWord"></el-input>
      </el-form-item>
      <el-form-item class="submit-button">
        <el-button type="primary" @click="onSubmit">修改</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
import { Plus,Timer  } from '@element-plus/icons-vue'
import { ref } from 'vue';
export default {
 created: function(){
    this.updateUser();
   },
 components:{
   Plus,
   Timer
 },
 data() {
   return {
     names:'',
     Operations:'操作',
     size:7,
     sum:7,
     form: {
          phone:'',
          studentId:'',
          names:'',
          mailBox:'',
          passWord:'',
          userId:''
        }
   };
 },
 methods: {
     onSubmit() {
       console.log(this.form);
       this.axios({
              method: 'post',
              url: '/shetuan/user/update',
              data: this.form
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
     updateUser(){
      let user = this.$store.getters.getUser
      this.form.mailBox = user.mailBox
      this.form.phone = user.phone
      this.form.names = user.names
      this.form.passWord = user.passWord
      this.form.studentId = user.studentId
      this.form.userId = user.userId
     }
   },

};
</script>
<style scoped>
.box-card {
  margin: 20px;
  padding: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.submit-button {
  text-align: right;
}
</style>
