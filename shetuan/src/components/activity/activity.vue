<template>
     <el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="活动名称">
    <el-input v-model="form.activeName"></el-input>
  </el-form-item>
  <el-form-item label="负责人">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="活动时间">
    <el-col :span="11">
      <el-date-picker
      v-model="form.date"
      type="datetimerange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
    </el-col>
    <el-col class="line" :span="2">-</el-col>
  </el-form-item>
  <el-form-item label="申请金额">
    <el-input v-model="form.activeMoney"></el-input>
  </el-form-item>
  <el-form-item label="活动人数">
    <el-input-number v-model="form.count"  :min="1" :max="10" label="描述文字"></el-input-number>
  </el-form-item>
  <el-form-item label="地点">
    <el-input v-model="form.site"></el-input>
  </el-form-item>
  <el-form-item label="活动形式">
    <el-input type="textarea" v-model="form.desc"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">立即申请</el-button>
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
          activeName:'',
          time:'',
          activeMoney:'',
          name:'',
          overTime:'',
          startTime:'',
          moId:'',
          site:'',
          count:0,
          desc: '',
          date:[],
          state:'',
        }
    };
  },
  methods: {
      onSubmit() {
        console.log('submit!');
        let start = new Date(this.form.date[0])
        let end = new Date(this.form.date[1])
        this.form.startTime = start.toISOString().slice(0,19).replace('T',' ');
        this.form.overTime = end.toISOString().slice(0,19).replace('T',' ');
        console.log(this.form);
        let mo = this.$store.getters.getMo
        this.form.moId = mo.moId
        this.form.state = 1
        this.axios({
              method: 'post',
              url: '/shetuan/active/addActive',
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
        this.form.activeMoney=''
        this.form.activeName=''
        this.form.count=0
        this.form.desc=''
        this.form.name=''
        this.form.site=''
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
