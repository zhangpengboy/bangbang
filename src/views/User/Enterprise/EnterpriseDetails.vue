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
          <el-button type="primary" @click="edit">{{ isEdit?'编辑':'保存' }}</el-button>
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
                <!-- <input  class="desc flex1 col666" type="" name="" :disabled="isEdit" v-model="userInfo.birthday" /> -->
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
                <input  class="desc flex1 col666" type="" name="" :disabled="isEdit" v-model="userInfo.genderTxt"/>
              </div>
              <div class="item flex">
                <p class="backgroud tit">公司</p>
                <input  class="desc flex1 col666" type="" name="" :disabled="isEdit"  />
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
          <el-button type="primary" @click="editShM">{{ isEditShM?'编辑':'保存' }}</el-button>
        </div>
        <el-row class="demand-deltails-box user">
          <el-col :span="12">
            <div class="list">
              <div class="item flex">
                <p class="backgroud tit">实名认证</p>
                <input  class="desc flex1 col666" type="" name="" disabled :value="userInfo.realNameAuth?'已实名':'未实名'" />
              </div>
              <div class="item flex">
                <p class="backgroud tit">性别</p>
               <input  class="desc flex1 col666" type="" name="" :disabled="isEditShM" v-model="realNameInfo&&realNameInfo.genderTxt" />
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
              <img v-if="userInfo.UserRealNameAuthDTO&&userInfo.UserRealNameAuthDTO.idCardUri " :src="userInfo.UserRealNameAuthDTO&&userInfo.UserRealNameAuthDTO.idCardUri" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
            <div class="mt10 text-center">身份证正面</div>
          </div>
          <div class="">
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
              <img v-if="userInfo.UserRealNameAuthDTO&&userInfo.UserRealNameAuthDTO.idCardReverseUri" :src="userInfo.UserRealNameAuthDTO&&userInfo.UserRealNameAuthDTO.idCardReverseUri" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
            <div class="mt10 text-center">身份证背面</div>
          </div>
        </div>

        <!-- <div class="box-demand-title mt15">企业认证</div> -->
        <div class="alCen js-sb flex mt30">
          <div class="box-demand-title">企业认证</div>
          <el-button type="primary" @click="editQiY">{{ isEditQiY?'编辑':'保存' }}</el-button>
        </div>
        <el-row class="demand-deltails-box user">
          <el-col :span="12">
            <div class="list">
              <div class="item flex">
                <p class="backgroud tit">企业认证</p>
                <input  class="desc flex1 col666" type="" name="" :disabled="isEditQiY" v-model="renZhengInfo&&renZhengInfo.name" />
              </div>
              <div class="item flex">
                <p class="backgroud tit">统一社会信用代码</p>
                <input  class="desc flex1 col666" type="" name="" :disabled="isEditQiY" v-model="renZhengInfo&&renZhengInfo.name" />
              </div>
              <div class="item flex">
                <p class="backgroud tit">运营者姓名</p>
               <input  class="desc flex1 col666" type="" name="" :disabled="isEditQiY" v-model="renZhengInfo&&renZhengInfo.name" />
              </div>
              <div class="item flex">
                <p class="backgroud tit">运营者联系方式</p>
               <input  class="desc flex1 col666" type="" name="" :disabled="isEditQiY" v-model="renZhengInfo&&renZhengInfo.name" />
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="list">
              <div class="item flex">
                <p class="backgroud tit">企业名称</p>
                <input  class="desc flex1 col666" type="" name="" :disabled="isEditQiY" v-model="renZhengInfo&&renZhengInfo.name" />
              </div>
              <div class="item flex">
                <p class="backgroud tit">法人</p>
                <input  class="desc flex1 col666" type="" name="" :disabled="isEditQiY" v-model="renZhengInfo&&renZhengInfo.name" />
              </div>
              <div class="item flex">
                <p class="backgroud tit">身份证号</p>
                <input  class="desc flex1 col666" type="" name="" :disabled="isEditQiY" v-model="renZhengInfo&&renZhengInfo.name" />
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
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-success="handleAvatarSuccess2"
            :on-remove="handleRemove2"
          >
            <img v-if="imageUrl2" :src="imageUrl2" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
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
      enterQiYeApply
  } from '../../../api/user.js'
  import { parseTime } from '@/utils/index.js'

export default {
  data() {
    return {
      tabPosition: 'detail',
      imageUrl2: '',
      isEdit: true, // 详情编辑or保存
      isEditShM:true, //实名
      isEditQiY:true,  //企业
      projectName: '', // 项目名称
      joinProStatus: 0,
      userIdOrType:'', //用户id和type
      userInfo:{}, //用户信息
      realNameInfo:{}, //实名信息
      renZhengInfo:{}, //认证信息

    }
  },
  mounted() {
    var userInfo = this.$route.query;
    console.log(userInfo)
    this.userIdOrType = userInfo
    // 这里用户列表进来是1,企业列表进来是2
    if(userInfo.joinType==1){

    }else{

    }
    this.loadDate(userInfo)

  },
  methods: {
    loadDate(userInfo){
      console.log(userInfo);
      if(this.userIdOrType.joinType==1){ //用户企业列表
        var params = {
          id:userInfo.id,
          userType: userInfo.userType
        }
        queryById(params).then(res => {
          var data = res.data
          console.log('res', data)
          data.genderTxt = data.gender==0?'男':'女'
          data.gradeTxt = data.grade==0?'普通工人':data.grade==1?'铜牌':data.grade==2?'银牌':data.grade==3?'金牌工人':''
          if(data.UserRealNameAuthDTO){
            this.realNameInfo = {
               genderTxt: data.UserRealNameAuthDTO.gender==0?'男':'女',
               age:data.UserRealNameAuthDTO.age,
               nativePlace:data.UserRealNameAuthDTO.nativePlace,
               realName:data.UserRealNameAuthDTO.realName,
               nation:data.UserRealNameAuthDTO.nation,
               idNo:data.UserRealNameAuthDTO.idNo,
               householdRegister:data.UserRealNameAuthDTO.householdRegister,
            }
          }
          this.userInfo = data
        })
      }else{  //企业企业列表
        var params = {
          id:userInfo.id
        }
        enterQueryById(params).then(res => {
          var data = res.data
          console.log('res', data)
          data.genderTxt = data.gender==0?'男':'女'
          data.gradeTxt = data.grade==0?'普通工人':data.grade==1?'铜牌':data.grade==2?'银牌':data.grade==3?'金牌工人':''
          if(data.UserRealNameAuthDTO){
            this.realNameInfo = {
               genderTxt: data.UserRealNameAuthDTO.gender==0?'男':'女',
               age:data.UserRealNameAuthDTO.age,
               nativePlace:data.UserRealNameAuthDTO.nativePlace,
               realName:data.UserRealNameAuthDTO.realName,
               nation:data.UserRealNameAuthDTO.nation,
               idNo:data.UserRealNameAuthDTO.idNo,
               householdRegister:data.UserRealNameAuthDTO.householdRegister,
            }
          }
          this.userInfo = data
        })
      }


    },
    // 基本信息编辑--区分用户还是企业
    edit() {
      if(this.isEdit==false){
        var gender = 0;
        if(this.userInfo.genderTxt=='男'){
          gender = 0
        }else{
          gender = 1
        }
        var params = {
          birthday:this.userInfo.birthday,
          gender:gender,
          headPortrait:this.userInfo.headPortrait,
          id:this.userIdOrType.id,
          occupation:this.userInfo.occupation,
          phone:this.userInfo.phone,
          realName:this.userInfo.realName,
        }
        if(this.userIdOrType.joinType==1){
          userupdateInfo(params).then(res => {
            var data = res.data
            console.log(res)
            this.isEdit = true
             this.$message({
               type: 'success',
               message: '操作成功!'
             })
             this.loadDate(this.userIdOrType)
          })
        }else{
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
    // 实名认证
    editShM() {
      if(this.isEditShM==false){
        console.log(this.realNameInfo.genderTxt)
        var gender = 0;
        if(this.realNameInfo.genderTxt=='男'){
          gender = 0
        }else if(this.realNameInfo.genderTxt=='女'){
          gender = 1
        }else{
          gender = 2
        }
       var params = {
         age:this.realNameInfo.age,
         gender:gender,
         householdRegister:this.realNameInfo.householdRegister,
         // idCardReverseUri:this.realNameInfo.idCardReverseUri,
         // idCardUri:this.realNameInfo.idCardUri,
         idCardReverseUri:'http://183.60.156.101:9001/test/20210817/a966352ef9764a0e81e983e801ebbcfa.png',
         idCardUri:'http://183.60.156.101:9001/test/20210817/a966352ef9764a0e81e983e801ebbcfa.png',
         idNo:this.realNameInfo.idNo,
         nation:this.realNameInfo.nation,
         nativePlace:this.realNameInfo.nativePlace,
         realName:this.realNameInfo.realName,
         userId:this.userIdOrType.id,
         userType:this.userIdOrType.userType
       }
       if(this.userIdOrType.joinType==1){
         realNameAuth(params).then(res => {
           var data = res.data
           console.log(res)
           this.isEditShM = true
           this.$message({
             type: 'success',
             message: '操作成功!'
           })
           this.loadDate(this.userIdOrType)

         })
       }else{
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
    // 企业认证
    editQiY() {
      this.$message({
        type: 'warning',
        message: '暂无企业信息!'
      })
      return;
      if(this.isEditShM==false){
        var params = {
          businessLicenseRegistrationNo:this.businessLicenseRegistrationNo,
          enterpriseName:this.enterpriseName,
          fileUris:'http://183.60.156.101:9001/test/20210817/a966352ef9764a0e81e983e801ebbcfa.png',
          legalRepresentativeName:this.legalRepresentativeName,
          operatorIdNo:this.operatorIdNo,
          operatorMobileNo:this.operatorMobileNo,
          operatorName:this.operatorName,
          userId:this.qyuserId
        }
        if(this.userIdOrType.joinType==1){
          qiYeApply(params).then(res => {
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
        }else{
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

    // 身份证正反面
    beforeUpload (file) {
       console.log(file)
       let data = new FormData()
       data.append('multipartFile', file)
       uploadIdCard(data).then(res => {
         console.log(res)

       })
       return false
    },
    beforeUpload2(file) {
       console.log(file)
       let data = new FormData()
       data.append('multipartFile', file)
       uploadIdCard(data).then(res => {
         console.log(res)

       })
       return false
    },
    upIdCard(res, file) {
      console.log(res)
    },
    upIdCardBack(res, file) {
      console.log(res)
      console.log(file)
    },


    handleAvatarSuccess2(res, file) {
      this.imageUrl2 = URL.createObjectURL(file.raw)
    },
    handleRemove2(file, fileList) {
      console.log(file, fileList)
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
