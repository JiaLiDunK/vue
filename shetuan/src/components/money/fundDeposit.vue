<template>
    <el-form ref="form" :model="form" label-width="80px">
 <el-form-item label="缴存金额">
   <el-input v-model="form.money"></el-input>
 </el-form-item>
 <el-form-item label="来源">
   <el-input v-model="form.source"></el-input>
 </el-form-item>
 <el-form-item label="备注">
    <el-input v-model="form.notes"></el-input>
 </el-form-item>
 <el-form-item>
   <el-button type="primary" @click="onSubmit">缴存</el-button>
   <el-button @click="clear">清除</el-button>
 </el-form-item>
</el-form>
 </template>
<script>
import { Plus,Timer  } from '@element-plus/icons-vue'
import { ref } from 'vue';
export default {
 created: function(){
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
        money:'',
        source:'',
        notes:'',
        moId:'',
       }
   };
 },
 methods: {
     onSubmit() {
       console.log('submit!');
       let mo = this.$store.getters.getMo
       this.form.moId = mo.moId
       this.axios({
             method: 'post',
             url: '/shetuan/fund/add',
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
           this.clear()
           }
           }).catch((err)=>{
             console.log('错误='+err)
           })
     },
     clear(){
       this.form.money=''
       this.form.source=''
       this.form.notes=''
     }
   },

};
</script>
<style scoped>
.el-form {
 margin-top: 20px; /* 上边距 */
 margin-left: 20px; /* 左边距 */
}

</style>
