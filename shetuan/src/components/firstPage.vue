<template>
    <div class="common-layout">
    <el-container>
      <el-header>
        <el-row :gutter="20">
        <el-col :span="6"></el-col>
        <el-col :span="6"></el-col>
        <el-col :span="6">
          <el-select v-model="value" placeholder="请选择社团" @change="selectMo">
            <el-option
              v-for="item in options"
              :key="item.moId"
              :label="item.moName"
              :value="item.moId">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="6"></el-col>
      </el-row>
      </el-header>
      <el-main>
        <el-carousel :interval="5000" arrow="always">
          <el-carousel-item v-for="(file,index) in fileList" :key="index">
            <el-image :src="file.url">
              <template #error>
                <div class="image-slot">
                  <el-icon><icon-picture /></el-icon>
                </div>
              </template>
            </el-image>
          </el-carousel-item>
        </el-carousel>
      </el-main>
      <el-footer>
        <el-text class="mx-1" type="primary">{{ text }}</el-text>
      </el-footer>
    </el-container>
  </div>
 </template>
<script>
import { Plus,Timer,Picture as IconPicture  } from '@element-plus/icons-vue'
import {ref} from 'vue'
export default {
  created: function(){
    this.getMoNamesAndId()
   },
 components:{
   Plus,
   Timer,
   IconPicture 
 },
 data() {
   return {
    value: '',
    text:'',
    fileList:ref([]),
    options: [
        {
          moId:'',
          moName:''
        }
         ],
         listFiles:[],
        removeList:[],
        pictureList:ref([]),
   };
 },
 methods: {
      getMoNamesAndId(){
        this.axios({
              method: 'post',
              url: '/shetuan/massOrganization/getMoNames',
            }).then((res)=>{
            if(res.data.code===0){
              this.$message.error(res.data.msg)
            }
            if(res.data.code===1){
              this.options = res.data.data
              this.value = this.options[0]
              console.log('value=',this.value);
              this.getText(this.value.moId)
              this.getPicture(this.value.moId)
            }
            }).catch((err)=>{
              console.log('错误='+err)
            })
      },
      selectMo(item){
        console.log("进入选择了",item);
        this.getText(item)
        this.getPicture(item)
      },
      getText(moId){
        let data={
          "moId":moId
        }
        this.axios({
              method: 'post',
              url: '/shetuan/publicize/getText',
              data: data
            }).then((res)=>{
            if(res.data.code===0){
              this.$message.error(res.data.msg)
            }
            if(res.data.code===1){
              this.text = res.data.data
              if(this.text === '' || this.text===null){
                this.text = '该社团暂时没有宣传'
              }
            }
            }).catch((err)=>{
              console.log('错误='+err)
            })
      },
      getPicture(moId){
        this.fileList = []
        let data={
          "moId":moId
        }
        this.axios({
              method: 'post',
              url: '/shetuan/publicize/getPicture',
              data: data
            }).then((res)=>{
            if(res.data.code===0){
              this.$message.error(res.data.msg)
            }
            if(res.data.code===1){
              this.pictureList = res.data.data
              this.forInPicture()
            }
            }).catch((err)=>{
              console.log('错误='+err)
            })
      },
      forInPicture(){
        for (const [index, item] of this.pictureList.entries()) {
        console.log(`Item ${index + 1}: ${item}`);
        this.getPictures(item)
       }
      },
      getPictures(fileName){
        this.axios({
          method:'get',
          url:'/shetuan/upload/download?name='+fileName,
          responseType: 'blob'
        }).then((res)=>{
          if (res.status === 200) {
              console.log('图片回显');
              let fileReader = new FileReader();
              fileReader.onload = (event)=>{
                this.fileList.push({
                  name:fileName,
                  url:event.target.result
                })
              }
              fileReader.readAsDataURL(res.data)
            }
        }).catch((err)=>{
              console.log('错误='+err)
        })
      },
   },

};
</script>
<style scoped>
.el-carousel {
  /* 设置宽度为屏幕的60%，高度自适应 */
  width: 80%;
  height: auto;
  margin: 20px; /* 上下边距为20px，左右边距自动 */
  margin-left: 20px;
  /* 设置背景颜色 */
  background-color: #f5f5f5;

  /* 设置圆角 */
  border-radius: 10px;

  /* 设置阴影 */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.el-text {
  /* 设置文字偏左 */
  text-align: left;

  /* 设置上边距和左边距 */
  margin-top: 20px;
  margin-right: 600px;
}


</style>
