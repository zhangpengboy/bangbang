<template>
    <el-dialog
      title="添加实名"
      :visible="realNamePop"
      width="30%"
      center
      @close="closerealNamePop"
    >
      <div class="reanNamePoplist">
        <div class="item">
          <p class="tit">身份证正反面：</p>
          <div class="popIdCard flex alCen">
            <el-upload
              class="avatar-uploader"
              action="123"
              :before-upload="beforeUpload"
              :show-file-list="false"
              ref="newupload"
              name="multipartFile"
              :with-credentials='true'
              :auto-upload="true"
              :on-success="upIdCard"
            >
              <img v-if="idCard" :src="idCard" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
            <el-upload
              class="avatar-uploader"
              style="margin-left: 10px;"
              action="123"
              :before-upload="beforeUpload2"
              :show-file-list="false"
              ref="newupload"
              name="multipartFile"
              :auto-upload="true"
              :with-credentials='true'
              :on-success="upIdCardBack"
            >
              <img v-if="idCardBack" :src="idCardBack" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>

          </div>

        </div>
        <div class="item">
          <p class="tit">姓名：</p>
          <input type="text" name="" v-model="rnName" placeholder="请填姓名" class="ipt" value="">
        </div>
        <div class="item">
          <p class="tit">性别：</p>
          <input type="text" name="" v-model="rnGender" placeholder="请输入性别" class="ipt" value="">
        </div>
        <div class="item">
          <p class="tit">民族：</p>
          <input type="text" name="" v-model="rnNation" placeholder="请输入民族" class="ipt" value="">
        </div>
        <div class="item">
          <p class="tit">年龄：</p>
          <input type="text" name="" v-model="rnAge" placeholder="请输入年龄" class="ipt" value="">
        </div>
        <div class="item">
          <p class="tit">身份证号：</p>
          <input type="text" name="" v-model="rnIdnum" placeholder="请输入身份证号" class="ipt" value="">
        </div>
        <div class="item">
          <p class="tit">籍贯：</p>
          <input type="text" name="" v-model="rnNativePlace" placeholder="请输入籍贯" class="ipt" value="">
        </div>
        <div class="item">
          <p class="tit">户籍地：</p>
          <input type="text" name="" v-model="rnHouse" placeholder="请输入户籍地" class="ipt" value="">
        </div>
        <div class="item">
          <p class="tit">身份证有效期起始时间：</p>
           <el-date-picker
              v-model="rnvalidityStartTime"
              class="ipt"
              type="date"
              placeholder="选择起始日期">
            </el-date-picker>
        </div>
        <div class="item">
          <p class="tit">身份证有效期截止时间：</p>
          <el-date-picker
             v-model="rnvalidityEndTime"
             class="ipt"
             type="date"
             placeholder="选择截止日期">
           </el-date-picker>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closerealNamePop">取 消</el-button>
        <el-button type="primary" @click="realNameTrue">确 定</el-button>
      </span>
    </el-dialog>

</template>

<script>
  import {
      realNameAuth,
      uploadIdCardByAli,
      getPreSignFile,
      uploadpublic
  } from '../../../api/user.js'

 export default {
    props: {
       realNamePop: {
         type: Boolean,
         default: false
       }
    },
    data(){
      return{
        // realNamePop:this.realNamePop,
        idCard: '',
        idCardUp: '', //上传用的
        idCardBack: '',
        idCardBackUp:'',

        // 实名认证
        rnName:'',
        rnGender:'',
        rnNation:'',
        rnAge:'',
        rnIdnum:"",
        rnNativePlace:'',
        rnHouse:'',
        rnvalidityStartTime:'',
        rnvalidityEndTime:'',


      }

    },
    methods:{
      closerealNamePop(){
        // this.realNamePop = false
        this.$emit('update:realNamePop',false)
      },
      upIdCard(res, file) {
        console.log(res)
      },
      upIdCardBack(res, file) {
        console.log(res)
        console.log(file)
      },
      // 身份证正面
      beforeUpload (file) {
        console.log(file)
        let data = new FormData()
        data.append('multipartFile', file)
        data.append('side', 'face')
        uploadIdCardByAli(data).then(res => {
          console.log(res)
          this.rnName = res.data.realName
          this.rnGender = res.data.gender
          this.rnNation = res.data.nation
          this.rnAge = res.data.age
          this.rnIdnum = res.data.idNo
          this.idCardUp = res.data.idCardUri
          this.getIdUrl(1,res.data.idCardUri)
        })
        return false
       },
       // 解析身份证照片
       getIdUrl(type,url){
       	var query = {
       		uri:url
       	}
       	 getPreSignFile(query).then(res => {
       	   console.log(res)
           if(type==1){
             this.idCard = res.data
           }else{
             this.idCardBack = res.data
           }
       	 })
       },
       beforeUpload2(file) {
          console.log(file)
          let data = new FormData()
          data.append('multipartFile', file)
          data.append('side', 'back')
          uploadIdCardByAli(data).then(res => {
            console.log(res)
            this.rnvalidityStartTime = ''
            this.rnvalidityEndTime = ''
            this.idCardBackUp = res.data.idCardUri
            this.getIdUrl(2,res.data.idCardUri)
          })
          return false
       },
       // 添加实名
       realNameTrue(){
         var gender = 0;
         if(this.rnGender=='男'){
           gender = 0
         }else{
           gender = 1
         }
          var params = {
            age:this.rnAge,
            gender:gender,
            householdRegister:this.rnHouse,
            idCardReverseUri:this.idCardBackUp,
            idCardUri:this.idCardUp,
            idNo:this.rnIdnum,
            nation:this.rnNation,
            nativePlace:this.rnNativePlace,
            realName:this.rnName,
            validityEndTime:this.rnvalidityEndTime,
            validityStartTime:this.rnvalidityStartTime
          }

          this.$emit('addRealname',params)
       }
    }

 }

</script>

<style  lang="scss" scoped="scoped">
  .reanNamePoplist{

    .item{
      font-size: 14px;
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      .tit{
        width: 100px;
        text-align: right;
      }
      .ipt{
        flex:1;
        height: 35px;
        padding: 0 8px;
        box-sizing: border-box;
      }
    }
  }

  .el-upload--picture-card{
    width: 120px;
    height: 120px;
    line-height: 120px;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 110px;
    height: 110px;
    line-height: 110px;
    text-align: center;
  }
  .avatar {
    width: 110px;
    height: 110px;
    display: block;
  }
</style>
