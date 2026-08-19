<template>
    <div class="common-layout">
    <el-container>
      <el-header>
        <el-row :gutter="20">
        <el-col :span="6"></el-col>
        <el-col :span="6">请选择上传的图片</el-col>
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
      </el-row>
      </el-header>
      <el-main>
        <el-upload
          v-model:file-list="fileList"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          action="/shetuan/upload/test"
          :on-success="handleSuccess">
    <el-icon><Plus /></el-icon>
  </el-upload>
  <el-dialog v-model="dialogVisible">
    <img w-full :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>
      </el-main>
      <el-footer><el-input
    v-model="textarea2"
    :autosize="{ minRows: 2, maxRows: 4 }"
    type="textarea"
    placeholder="请输入宣传信息"
  /></el-footer>
    </el-container>
  </div>
  <el-button type="primary" @click="onsubmit" v-if="!flag">确认提交</el-button>
  <el-button type="primary" @click="updateByThis" v-if="flag">确认修改</el-button>
  </template>
  <script>
  import { Plus,Timer,  } from '@element-plus/icons-vue'
  import {ref} from 'vue'
  export default {
   created: function(){
    this.createList()
    this.getMo()
    this.getText()
    this.getPicture()
    },
   components:{
     Plus,
     Timer
   },
   data() {
     return {
        dialogImageUrl: ref(''),
        dialogVisible: ref(false),
        value: '',
        textarea2:'',
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
        flag:false
     };
   },
   watch:{
   
   },
   methods: {
    updateByThis(){
      let mo = this.$store.getters.getMo
        this.axios({
          method:'post',
          url:'/shetuan/publicize/picture',
          data:{
            fileList:this.listFiles,
            removeList:this.removeList,
            text:this.textarea2,
            moId:mo.moId,
            userId:this.$store.getters.getUser.getUserId,
          }
        }).then((res)=>{
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
      forInPicture(){
        for (const [index, item] of this.pictureList.entries()) {
        console.log(`Item ${index + 1}: ${item}`);
        this.getPictures(item)
       }
      },
      handleRemove(uploadFile, uploadFiles){
        this.removeList.push(uploadFile.savePath)
      },
      handleSuccess(response, file, fileList){
        this.listFiles.push(response.data)
        file.savePath = response.data
      },
      handlePictureCardPreview:(uploadFile) => {
        this.dialogImageUrl.value = uploadFile.url
        this.dialogVisible.value = true
      },
      onsubmit(){
        let mo = this.$store.getters.getMo
        this.axios({
          method:'post',
          url:'/shetuan/publicize/picture',
          data:{
            fileList:this.listFiles,
            removeList:this.removeList,
            text:this.textarea2,
            moId:mo.moId,
            userId:this.$store.getters.getUser.getUserId,
          }
        }).then((res)=>{
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
      createList(){
        let mo = this.$store.getters.getMo
        let data = {
          "moId": mo.moId
        }
        this.axios({
              method: 'post',
              url: '/shetuan/massOrganization/getMoName',
              data: data
            }).then((res)=>{
            if(res.data.code===0){
              this.$message.error(res.data.msg)
            }
            if(res.data.code===1){
              this.value=res.data.data
              
            }
            }).catch((err)=>{
              console.log('错误='+err)
            })
      },
      getMo(){
        let data={
          "userId":this.$store.getters.getUser.userId
        }
        this.axios({
              method: 'post',
              url: '/shetuan/member/getMoBy',
              data: data
            }).then((res)=>{
            if(res.data.code===0){
              this.$message.error(res.data.msg)
            }
            if(res.data.code===1){
              this.options = res.data.data
            }
            }).catch((err)=>{
              console.log('错误='+err)
            })
      },
      selectMo(){
        let mo = this.$store.getters.getMo
        let data={
          "userId":null,
          "moId": mo.moId
        }
        this.axios({
              method: 'post',
              url: '/shetuan/member/getMoBySelect',
              data: data
            }).then((res)=>{
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
      getText(){
        let mo = this.$store.getters.getMo
        let data={
          "moId": mo.moId
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
              this.textarea2 = res.data.data
              if(this.textarea2!=='' || this.textarea2 !== null){
                this.flag = true
              }
            }
            }).catch((err)=>{
              console.log('错误='+err)
            })
      },
      getPicture(){
        let mo = this.$store.getters.getMo
        let data={
          "moId": mo.moId
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
.common-layout {
  background-color: #f8f9fa;
  padding: 20px;
}

.el-container {
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.05);
}

.el-header {
  background-color: #f8f9fa;
  color: #212529;
  line-height: 60px;
  font-size: 18px;
  text-align: center;
}

.el-main {
  padding: 20px;
}

.el-footer {
  background-color: #f8f9fa;
  color: #212529;
  line-height: 60px;
  text-align: center;
}

.el-upload {
  border: 1px dashed #ced4da;
  border-radius: 5px;
  padding: 20px;
  text-align: center;
}

.el-button {
  display: block;
  margin: 20px auto;
  background-color: #007bff;
  color: #fff;
}
</style>

  