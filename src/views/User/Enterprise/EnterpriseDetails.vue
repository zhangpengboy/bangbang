<template>
  <div class="main">
    <!-- tab按钮切换 -->
    <el-radio-group v-model="tabPosition" style="margin-bottom: 30px;">
      <el-radio-button label="detail">企业详情</el-radio-button>
      <el-radio-button label="joinPro">参加项目</el-radio-button>
    </el-radio-group>
    <!-- tab按钮切换end -->
    <div class="box">
      <!-- 用户详情 -->
      <div v-if="tabPosition == 'detail'" class="demand-deltails">
        <div class="alCen js-sb flex">
          <div class="box-demand-title">基本信息</div>
          <div class="flex alCen">
            <el-button type="primary" @click="edit">{{ isEdit?'编辑':'保存' }}</el-button>
            <el-button type="primary" v-if="isEdit==false" @click="canceledit">取消</el-button>
          </div>
        </div>
        <el-row class="demand-deltails-box user">
          <el-col :span="4">
            <div class="backgroud flex alCen js-center column userCon">
              <img :src="userInfo.headPortrait" class="iocnAvatar">
              <p class="mt20">{{userInfo.realName}}</p>
            </div>
          </el-col>
          <el-col :span="10">
            <div class="list">
              <div class="item flex">
                <p class="backgroud tit">ID</p>
                <input  class="desc flex1 col666" disabled v-model="userInfo.id" />
              </div>
              <div class="item flex">
                <p class="backgroud tit">手机号码</p>
                <input  class="desc flex1 col666" :disabled="isEdit" v-model="userInfo.phone" />
              </div>
              <!-- <div class="item flex">
                <p class="backgroud tit">用户登录</p>
                <input  class="desc flex1 col666" disabled v-model="userIdOrType.userType==0?'企业端':userInfo.userType==1?'工人端':userInfo.userType==2?'管理端':''" />
              </div> -->
              <div class="item flex">
                <p class="backgroud tit">生日</p>
                <el-date-picker
                  :disabled="isEdit"
                  v-model="userInfo.birthday"
                  type="date"
                  @change="birthChange"
                  placeholder="选择日期">
                </el-date-picker>
              </div>
              <div class="item flex">
                <p class="backgroud tit">职业</p>
                <input  class="desc flex1 col666" type="" name="" :disabled="isEdit" v-model="userInfo.occupation" />
              </div>
            </div>
          </el-col>
          <el-col :span="10">
            <div class="list">
              <div class="item flex">
                <p class="backgroud tit">姓名</p>
                <input  class="desc flex1 col666" :disabled="isEdit" v-model="userInfo.realName" />
              </div>
              <div class="item flex">
                <p class="backgroud tit">性别</p>
                <!-- <input  class="desc flex1 col666" type="" name="" :disabled="isEdit" v-model="userInfo.genderTxt"/> -->
                <el-select class="desc flex1 col666" :disabled="isEdit" v-model="userInfo.gender" placeholder="请选择">
                  <el-option
                    v-for="item in genderoptions"
                    :key="item.id"
                    :label="item.labelName"
                    :value="item.id">
                  </el-option>
                </el-select>
              </div>
              <div class="item flex">
                <p class="backgroud tit">公司</p>
                <input  class="desc flex1 col666" type="" name="" v-model="renZhengInfo&&renZhengInfo.enterpriseName" disabled  />
              </div>
              <div class="item flex">
                <p class="backgroud tit">注册时间</p>
                 <input  class="desc flex1 col666" type="" name="" disabled v-model="userInfo.updateTime"/>
              </div>
            </div>
          </el-col>

        </el-row>

        <!-- <div class="box-demand-title">实名认证</div> -->
        <div class="alCen js-sb flex">
          <div class="box-demand-title">实名认证</div>
          <div class="flex alCen">
            <el-button type="primary" @click="editShM">{{ isEditShM?'编辑':'保存' }}</el-button>
            <el-button type="primary" v-if="isEditShM==false" @click="canceleditShM">取消</el-button>
          </div>
        </div>
        <el-row class="demand-deltails-box user">
          <el-col :span="12">
            <div class="list">
              <div class="item flex">
                <p class="backgroud tit">实名认证</p>
                <input  class="desc flex1 col666" type="" name="" disabled :value="userInfo.realNameAuth==1?'已实名':userInfo.realNameAuth==2?'审核中':'未实名'" />
              </div>
              <div class="item flex">
                <p class="backgroud tit">性别</p>
               <!-- <input  class="desc flex1 col666" type="" name="" :disabled="isEditShM" v-model="realNameInfo&&realNameInfo.genderTxt" /> -->
               <el-select class="desc flex1 col666" :disabled="isEditShM" v-model="realNameInfo.gender" placeholder="请选择">
                 <el-option
                   v-for="item in genderoptions"
                   :key="item.id"
                   :label="item.labelName"
                   :value="item.id">
                 </el-option>
               </el-select>
              </div>
              <div class="item flex">
                <p class="backgroud tit">年龄</p>
                <input  class="desc flex1 col666" type="" name="" :disabled="isEditShM" v-model="realNameInfo&&realNameInfo.age" />
              </div>
              <div class="item flex">
                <p class="backgroud tit">籍贯</p>
                <input  class="desc flex1 col666" type="" name="" :disabled="isEditShM" v-model="realNameInfo&&realNameInfo.nativePlace" />
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="list">
              <div class="item flex">
                <p class="backgroud tit">姓名</p>
                <input  class="desc flex1 col666" type="" name="" :disabled="isEditShM" v-model="realNameInfo&&realNameInfo.realName" />
              </div>
              <div class="item flex">
                <p class="backgroud tit">民族</p>
                <input  class="desc flex1 col666" type="" name="" :disabled="isEditShM" v-model="realNameInfo&&realNameInfo.nation" />
              </div>
              <div class="item flex">
                <p class="backgroud tit">身份证号</p>
                <input  class="desc flex1 col666" type="" name="" :disabled="isEditShM" v-model="realNameInfo&&realNameInfo.idNo" />
              </div>
              <div class="item flex">
                <p class="backgroud tit">户籍地</p>
                <input  class="desc flex1 col666" type="" name="" :disabled="isEditShM" v-model="realNameInfo&&realNameInfo.householdRegister" />
              </div>
            </div>
          </el-col>
        </el-row>
        <!-- 身份证 -->
        <div class="mt15 flex">
          <div class="">

            <div v-if="isEditShM">
              <img :src="realNameInfo.idCardUri" style="width: 178px;height: 178px;" @click="IdCardPreview(realNameInfo.idCardUri)">
            </div>
            <div v-else>
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
                <img v-if="realNameInfo.idCardUri" :src="realNameInfo.idCardUri" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon" />
              </el-upload>
            </div>
            <div class="mt10 text-center">身份证正面</div>
          </div>
          <div class="">
            <div v-if="isEditShM" style="margin-left: 20px;">
              <img :src="realNameInfo.idCardReverseUri" style="width: 178px;height: 178px;" @click="IdCardPreview(realNameInfo.idCardReverseUri)">
            </div>
            <div v-else>
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
                <img v-if="realNameInfo.idCardReverseUri" :src="realNameInfo.idCardReverseUri" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon" />
              </el-upload>
            </div>
            <div class="mt10 text-center">身份证背面</div>
          </div>
        </div>

        <!-- <div class="box-demand-title mt15">企业认证</div> -->
        <div class="alCen js-sb flex mt30">
          <div class="box-demand-title">企业认证</div>
          <div class="flex alCen">
            <el-button type="primary" @click="editQiY">{{ isEditQiY?'编辑':'保存' }}</el-button>
            <el-button type="primary" v-if="isEditQiY==false" @click="canceleditQiY">取消</el-button>
          </div>
        </div>
        <el-row class="demand-deltails-box user">
          <el-col :span="12">
            <div class="list">
              <div class="item flex">
                <p class="backgroud tit">企业认证</p>
                <input  class="desc flex1 col666" type="" name="" disabled :value="userInfo.enterpriseAuth==0?'未提交':userInfo.enterpriseAuth==1?'审核中':userInfo.enterpriseAuth==2?'已认证':userInfo.enterpriseAuth==3?'已驳回':''" />
              </div>
              <div class="item flex">
                <p class="backgroud tit">统一社会信用代码</p>
                <input  class="desc flex1 col666" type="" name="" :disabled="isEditQiY" v-model="renZhengInfo&&renZhengInfo.businessLicenseRegistrationNo" />
              </div>
              <div class="item flex">
                <p class="backgroud tit">运营者姓名</p>
               <input  class="desc flex1 col666" type="" name="" :disabled="isEditQiY" v-model="renZhengInfo&&renZhengInfo.operatorName" />
              </div>
              <div class="item flex">
                <p class="backgroud tit">运营者联系方式</p>
               <input  class="desc flex1 col666" type="" name="" :disabled="isEditQiY" v-model="renZhengInfo&&renZhengInfo.operatorMobileNo" />
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="list">
              <div class="item flex">
                <p class="backgroud tit">企业名称</p>
                <input  class="desc flex1 col666" type="" name="" :disabled="isEditQiY" v-model="renZhengInfo&&renZhengInfo.enterpriseName" />
              </div>
              <div class="item flex">
                <p class="backgroud tit">法人</p>
                <input  class="desc flex1 col666" type="" name="" :disabled="isEditQiY" v-model="renZhengInfo&&renZhengInfo.legalRepresentativeName" />
              </div>
              <div class="item flex">
                <p class="backgroud tit">身份证号</p>
                <input  class="desc flex1 col666" type="" name="" :disabled="isEditQiY" v-model="renZhengInfo&&renZhengInfo.operatorIdNo" />
              </div>
              <div class="item flex">
                <p class="backgroud tit" />
                <p class="desc flex1 col666" />
              </div>
            </div>
          </el-col>
        </el-row>
        <!-- 企业照片 -->
        <div class="mt15 flex">
          <div v-if="isEditQiY">
            <img :src="item.url" v-for="(item,index) in renZhengInfo.fileUris" style="width: 146px;height: 146px;" @click="IdCardPreview(item.url)">
          </div>
          <div v-else>
            <el-upload
              name="multipartFile"
              :action="adminUrl"
              list-type="picture-card"
              :file-list="renZhengInfo.fileUris"
              :on-success="qiyeUpsuccess"
              :on-remove="qiyeRemove"
              :on-exceed="handleExceed"
              :limit='3'>
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="qiyeDiaLog">
              <img width="100%" :src="renZhengInfo.fileUris" alt="">
            </el-dialog>
          </div>
        </div>

      </div>
      <!-- 用户详情end -->
      <!-- 参加项目 -->
      <div v-if="tabPosition == 'joinPro'" class="demand-service joinPro">
        <div class="head flex alCen js-sa">
          <div class="headItem alCen flex column">
            <p class="tit">项目总数</p>
            <p class="num mt15">7</p>
          </div>
          <div class="headItem alCen flex column">
            <p class="tit">进行中</p>
            <p class="num mt15">7</p>
          </div>
          <div class="headItem alCen flex column">
            <p class="tit">已完成</p>
            <p class="num mt15">7</p>
          </div>
          <div class="headItem alCen flex column">
            <p class="tit">已取消</p>
            <p class="num mt15">7</p>
          </div>
        </div>
        <div class="pro">
          <div class="flex alCen js-sb">
            <div class="flex alCen">
              <div class="flex alCen">
                <p :class="['proStatue',joinProStatus==0?'proStatueHov':'']" @click="choseProSta(0)">全部</p>
                <p :class="['proStatue',joinProStatus==1?'proStatueHov':'']" @click="choseProSta(1)">进行中</p>
                <p :class="['proStatue',joinProStatus==2?'proStatueHov':'']" @click="choseProSta(2)">已完成</p>
                <p :class="['proStatue',joinProStatus==3?'proStatueHov':'']" @click="choseProSta(3)">已取消</p>
              </div>
              <input v-model="projectName" type="" name="" class="ipt ml10" value="" placeholder="项目名称">
              <el-button type="primary" class="ml10" @click="proSearch">查询</el-button>
              <el-button type="primary" class="ml10" @click="proResed">重置</el-button>
            </div>
            <el-button type="primary" @click="addProject">添加</el-button>
          </div>

        </div>

      </div>
      <!-- 参加项目end -->
      
      <!-- 图片预览 -->
      <el-dialog :visible.sync="dialogVisible1" append-to-body>
        <img width="100%" fit="contain" :src="yulanImg" alt="">
      </el-dialog>
      
    </div>

  </div>
</template>

<script>
  import {
    	queryById,
      enterQueryById,
      qiYeupdateInfo,
      userupdateInfo,
      realNameAuth,
      qiYeRealNameAuth,
      qiYeApply,
      enterQiYeApply,
      uploadIdCard,
      uploadIdCardByAli,
      uploadpublic,
      getPreSignFile
  } from '../../../api/user.js'
  import { parseTime } from '@/utils/index.js'
  import { timestamp } from '@/utils/validate'
export default {
  data() {
    return {
      tabPosition: 'detail',
      isEdit: true, // 详情编辑or保存
      isEditShM:true, //实名
      isEditQiY:true,  //企业
      projectName: '', // 项目名称
      joinProStatus: 0,
      userIdOrType:'', //用户id和type
      userInfo:{}, //用户信息
      realNameInfo:{}, //实名信息
      // 企业认证信息
      renZhengInfo:{
        businessLicenseRegistrationNo:'',
        enterpriseName:'',
        fileUris:[],
        legalRepresentativeName:'',
        operatorIdNo:'',
        operatorMobileNo:'',
        operatorName:'',
        userId:''
      },
      qiyeDiaLog:false,
      adminUrl: '/api/commons/file/admin/v1/upload/public',
      genderoptions:[
        {
          labelName:'男',
          id:0
        },
        {
          labelName:'女',
          id:1
        },{
          labelName:'未知',
          id:2
        }
      ],
      dialogVisible1:false,
      yulanImg:'',

    }
  },
  mounted() {
    var userInfo = this.$route.query;
    console.log(userInfo)
    this.userIdOrType = userInfo
    this.loadDate(userInfo)
  },
  methods: {
    async loadDate(userInfo){
        var params = {
          id:userInfo.id
        }
        enterQueryById(params).then(res => {
          var data = res.data
          console.log('res', data)
          // data.genderTxt = data.gender==0?'男':'女'
          data.gradeTxt = data.workerGrade==0?'普通工人':data.workerGrade==1?'铜牌':data.workerGrade==2?'银牌':data.workerGrade==3?'金牌工人':''
          data.enterpriseAuthStatusName = data.enterpriseAuthStatus ==0?'未提交':data.enterpriseAuthStatus ==1?'审核中':data.enterpriseAuthStatus ==2?'已通过':data.enterpriseAuthStatus ==3?'已驳回':''
          if(data.realNameAuthDTO){
            this.realNameInfo = {
               // genderTxt: data.realNameAuthDTO.gender==0?'男':'女',
			   gender:data.realNameAuthDTO.gender,
               age:data.realNameAuthDTO.age,
               nativePlace:data.realNameAuthDTO.nativePlace,
               realName:data.realNameAuthDTO.realName,
               nation:data.realNameAuthDTO.nation,
               idNo:data.realNameAuthDTO.idNo,
               householdRegister:data.realNameAuthDTO.householdRegister,
               idCardUriUp:data.realNameAuthDTO.idCardUri,
               idCardReverseUriUp:data.realNameAuthDTO.idCardReverseUri,
               validityEndTime:data.realNameAuthDTO.validityEndTime,
               validityStartTime:data.realNameAuthDTO.validityStartTime
            }
            this.getIdUrl(1,data.realNameAuthDTO.idCardUri)
            this.getIdUrl(2,data.realNameAuthDTO.idCardReverseUri)
          }
          if(data.enterpriseCertApplyDTO){
            this.renZhengInfo = data.enterpriseCertApplyDTO
            var imgdata = data.enterpriseCertApplyDTO.fileUris.split(',')
            for(var i=0;i<imgdata.length;i++){
               var obj = {};
              obj.url = imgdata[i]
              obj.name = 'img'+ i
              imgdata[i] = obj
            }

            this.renZhengInfo.fileUris = imgdata
            this.renZhengInfo.userId = data.id
          }
          this.userInfo = data
        })



    },
    // 基本信息编辑
    edit() {
      if(this.isEdit==false){
        if(this.userInfo.phone==''){
          this.$message({
            message: '请输入电话号码',
            type: 'warning'
          });
        }else{
          var params = {
            birthday:this.userInfo.birthday,
            gender:this.userInfo.gender,
            headPortrait:this.userInfo.headPortrait,
            id:this.userIdOrType.id,
            occupation:this.userInfo.occupation,
            phone:this.userInfo.phone,
            realName:this.userInfo.realName,
          }
          qiYeupdateInfo(params).then(res => {
            var data = res.data
            console.log(res)
            this.isEdit = true
             this.$message({
               type: 'success',
               message: '操作成功!'
             })
             this.loadDate(this.userIdOrType)
          })
        }

      }else{
        this.isEdit = false
      }
    },
    canceledit(){
      this.isEdit = true
      this.loadDate(this.userIdOrType)
    },
    // 企业认证
    editQiY() {
      if(this.isEditQiY==false){
        var fileUris = [];
        this.renZhengInfo.fileUris.forEach((item)=>{
          fileUris.push(item.url)
        })
        if(fileUris.length==0){
          this.$message({
            message: '请上传照片',
            type: 'warning'
          });
        }else if(this.renZhengInfo.businessLicenseRegistrationNo==''){
          this.$message({
            message: '请输入信用代码',
            type: 'warning'
          });
        }else if(this.renZhengInfo.operatorName==''){
          this.$message({
            message: '请输入运营者姓名',
            type: 'warning'
          });
        }else if(this.renZhengInfo.operatorMobileNo==''){
          this.$message({
            message: '请输入联系方式',
            type: 'warning'
          });
        }else if(this.renZhengInfo.enterpriseName==''){
          this.$message({
            message: '请输入企业名称',
            type: 'warning'
          });
        }else if(this.renZhengInfo.legalRepresentativeName==''){
          this.$message({
            message: '请输入法人姓名',
            type: 'warning'
          });
        }else if(this.renZhengInfo.operatorIdNo==''){
          this.$message({
            message: '请输入法人身份证号',
            type: 'warning'
          });
        }else{
          var params = {
            businessLicenseRegistrationNo:this.renZhengInfo.businessLicenseRegistrationNo,
            enterpriseName:this.renZhengInfo.enterpriseName,
            fileUris:fileUris.join(','),
            legalRepresentativeName:this.renZhengInfo.legalRepresentativeName,
            operatorIdNo:this.renZhengInfo.operatorIdNo,
            operatorMobileNo:this.renZhengInfo.operatorMobileNo,
            operatorName:this.renZhengInfo.operatorName,
            userId:this.userInfo.id
          }
          enterQiYeApply(params).then(res => {
            console.log(res)
            if(res.code==200){
              this.isEditQiY = true
               this.$message({
                 type: 'success',
                 message: '操作成功!'
               })
               this.loadDate(this.userIdOrType)
            }
          })
        }


      }else{
        this.isEditQiY = false
      }
    },
    canceleditQiY(){
      this.isEditQiY = true
      this.loadDate(this.userIdOrType)
    },

    // 身份证正反面
    beforeUpload (file) {
       console.log(file)
       let data = new FormData()
       data.append('multipartFile', file)
       data.append('side', 'face')
       uploadIdCardByAli(data).then(res => {
         console.log(res)
        this.realNameInfo.realName = res.data.realName
        this.realNameInfo.genderTxt = res.data.gender
        this.realNameInfo.nation = res.data.nation
        this.realNameInfo.age = res.data.age
        this.realNameInfo.idNo = res.data.idNo
        this.realNameInfo.idCardUriUp = res.data.idCardUri
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
           this.realNameInfo.idCardUri = res.data
           this.realNameInfo = Object.assign({}, this.realNameInfo)
         }else{
           this.realNameInfo.idCardReverseUri = res.data
           this.realNameInfo = Object.assign({}, this.realNameInfo)
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
         this.realNameInfo.validityEndTime = timestamp(res.data.startDate)
         this.realNameInfo.validityEndTime = timestamp(res.data.endDate)
         this.realNameInfo.idCardReverseUriUp = res.data.idCardUri
         this.getIdUrl(2,res.data.idCardUri)
       })
       return false
    },
    // 实名认证
    editShM() {
      if(this.isEditShM==false){
        if(this.realNameInfo.gender>1){
          this.$message({
            message: '请选择正常性别',
            type: 'warning'
          });
        }else if(this.realNameInfo.age>100){
          this.$message({
            message: '年龄不能超过100岁',
            type: 'warning'
          });
        }else if(this.realNameInfo.age==''){
          this.$message({
            message: '年龄不能为空',
            type: 'warning'
          });
        }else if(this.realNameInfo.realName==''){
          this.$message({
            message: '姓名不能为空',
            type: 'warning'
          });
        }else if(this.realNameInfo.nation==''){
          this.$message({
            message: '民族不能为空',
            type: 'warning'
          });
        }else if(this.realNameInfo.idNo==''){
          this.$message({
            message: '身份证号不能为空',
            type: 'warning'
          });
        }else if(this.realNameInfo.householdRegister==''){
          this.$message({
            message: '户籍地不能为空',
            type: 'warning'
          });
        }else{
          var params = {
            age:this.realNameInfo.age,
            gender:this.realNameInfo.gender,
            householdRegister:this.realNameInfo.householdRegister,
            idCardReverseUri:this.realNameInfo.idCardReverseUriUp,
            idCardUri:this.realNameInfo.idCardUriUp,
            idNo:this.realNameInfo.idNo,
            nation:this.realNameInfo.nation,
            nativePlace:this.realNameInfo.nativePlace,
            realName:this.realNameInfo.realName,
            userId:this.userIdOrType.id,
            validityEndTime:this.realNameInfo.validityEndTime,
            validityStartTime:this.realNameInfo.validityEndTime
          }
          qiYeRealNameAuth(params).then(res => {
            var data = res.data
            console.log(res)
            this.isEditShM = true
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
            this.loadDate(this.userIdOrType)

          })
        }


      }else{
        this.isEditShM = false
      }
    },
    canceleditShM(){
      this.isEditShM = true
      this.loadDate(this.userIdOrType)
    },
    upIdCard(res, file) {
      console.log(res)
    },
    // 点击查看大图
    IdCardPreview(url){
      console.log(url)
      this.yulanImg = url;
      this.dialogVisible1 = true;
    },
    // 提示用户上传的图片数量
    handleExceed(files, fileList) {
    	this.$message.warning('最多上传3张');
    },
    upIdCardBack(res, file) {
      console.log(res)
    },

    qiyeUpsuccess(res,file) {
      var obj = {};
      obj.url = res.data
      obj.name = file.raw.uid
      this.renZhengInfo.fileUris.push(obj);
      console.log(this.renZhengInfo.fileUris)
    },
    qiyeRemove(file,fileList) {
      console.log(file.name)
      for(var i=0;i<this.renZhengInfo.fileUris.length;i++){
        if(this.renZhengInfo.fileUris[i].name==file.name){
              this.renZhengInfo.fileUris.splice(i,1)
            }
      }
      console.log(this.renZhengInfo.fileUris);

    },

    // 添加项目
    addProject() {

    },
    proSearch() {

    },
    proResed() {

    },
    // 选择项目状态
    choseProSta(e) {
      this.joinProStatus = e
    },
    // 选择生日
    birthChange(e){
      var data = parseTime(e);
      console.log(data)
      this.userInfo.birthday = data
    },
    checkTime(i){
      if(i<10){
        i = '0'+i
      }else{
        return i;
      }
    }

  }
}
</script>

<style lang="scss">
  .backgroud{
    background-color: #f2f2f2;
  }
	.demand-deltails-box {
		margin: 20px 0;
		border: 1px solid #E9E9E9;

		.demand-deltails-box-item {
			border-bottom: 1px solid #E9E9E9;

			&:nth-last-child(1) {
				border-bottom: none;
			}

			.demand-deltails-box-item-title {
				width: 120px;
				background-color: #f2f2f2;
				padding: 20px;
				text-align: right;
				font-size: 14px;
			}

			.demand-deltails-box-item-conter {
				padding: 20px;
				border-left: 1px solid #E9E9E9;
				font-size: 14px;

				.demand-deltails-box-item-mp3 {
					margin-right: 15px;
				}
			}
		}
	}
  .user{
    .userCon{
      height: 204px;
    }
    .iocnAvatar{
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background-color: #008489;
    }
    .list{
      border-left: 1px solid #E9E9E9;
    }
    .item{
      line-height: 50px;
      border-bottom: 1px solid #E9E9E9;
      .tit{
        width: 150px;
        font-size: 14px;
        padding-right: 20px;
        text-align: right;
        border-right: 1px solid #E9E9E9;
      }
      .desc{
        padding: 0 10px;
        box-sizing: border-box;
        border: none;
      }
    }

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
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
    .demand-deltails-box2{
      margin: 20px 0;

    }
    .pro-exper{
      border: 1px solid #d9d9d9;
      border-top: transparent;
      .experItem{
        border-top: 1px solid #d9d9d9;
        .proDesc{
          border-right: 1px solid #d9d9d9;
          height: 80px;
          .proTit{
            font-size: 20px;
            font-weight: bold;
            padding:  0 15px;
            box-sizing: border-box;
          }

        }
        .proDesc:last-child{
          border: none;
        }
        .proPj{
          border-top: 1px solid #d9d9d9;
          padding: 20px 15px;
          box-sizing: border-box;
        }
      }
    }
    .joinPro{
      .head{
        border: 1px solid #d9d9d9;
        padding: 20px 0;
        .tit{
          font-size: 14px;
        }
        .num{
          font-size: 20px;
        }
      }
      .pro{
        border: 1px solid #d9d9d9;
        padding: 15px;
        box-sizing: border-box;
        .proStatue{
          border: 1px solid #d9d9d9;
          width: 100px;
          line-height: 35px;
          text-align: center;
          font-size: 14px;
        }
        .proStatueHov{
          border: 1px solid #1890ff;
          color: #1890ff;
        }
        .ipt{
          height: 35px;
          width: 180px;
          padding: 0 10px;
          font-size: 14px;
        }

      }

    }

</style>
