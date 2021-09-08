<template>
  <div class="main">
    <!-- tab按钮切换 -->
    <el-radio-group v-model="tabPosition" style="margin-bottom: 30px;">
      <el-radio-button label="detail">工人详情</el-radio-button>
      <el-radio-button label="card">名片</el-radio-button>
      <el-radio-button label="joinPro">参加项目</el-radio-button>
      <el-radio-button label="withdrawal">提现</el-radio-button>
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
              <img :src="basicInfo.headPortrait" class="iocnAvatar">
              <p class="mt20">{{basicInfo.realName}}</p>
            </div>
          </el-col>
          <el-col :span="10">
            <div class="list">
              <div class="item flex">
                <p class="backgroud tit">ID</p>
                <input  class="desc flex1 col666" disabled v-model="basicInfo.id" />
              </div>
              <div class="item flex">
                <p class="backgroud tit">手机号码</p>
                <input  class="desc flex1 col666" type="" name="" :disabled="isEdit" v-model="basicInfo.phone" />
              </div>
              <div class="item flex">
                <p class="backgroud tit">现住址</p>
                <input  class="desc flex1 col666" type="" name="" :disabled="isEdit" v-model="basicInfo.adr"/>
              </div>
              <div class="item flex">
                <p class="backgroud tit">用户登录</p>
                 <input  class="desc flex1 col666" disabled v-model="basicInfo.userType" />
              </div>
            </div>
          </el-col>
          <el-col :span="10">
            <div class="list">
              <div class="item flex">
                <p class="backgroud tit">名称</p>
                <input  class="desc flex1 col666" type="" name="" :disabled="isEdit" v-model="basicInfo.realName" />
              </div>
              <div class="item flex">
                <p class="backgroud tit">性别</p>
                <el-select class="desc flex1 col666" :disabled="isEdit" v-model="basicInfo.gender" placeholder="请选择">
                  <el-option
                    v-for="item in genderoptions"
                    :key="item.id"
                    :label="item.labelName"
                    :value="item.id">
                  </el-option>
                </el-select>
                <!-- <input  class="desc flex1 col666" type="" name="" :disabled="isEdit" v-model="basicInfo.gender"/> -->
              </div>
              <div class="item flex">
                <p class="backgroud tit">工人等级</p>
                <input  class="desc flex1 col666" disabled v-model="basicInfo.grade" />
              </div>
              <div class="item flex">
                <p class="backgroud tit">注册时间</p>
                <input  class="desc flex1 col666" disabled v-model="basicInfo.updateTime" />
              </div>
            </div>
          </el-col>
        </el-row>

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
                <!-- <input  class="desc flex1 col666" type="" name="" :disabled="isEditShM" v-model="realNameInfo.gender" /> -->
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
                <input  class="desc flex1 col666" type="" name="" :disabled="isEditShM" v-model="realNameInfo.age" />
              </div>
              <div class="item flex">
                <p class="backgroud tit">籍贯</p>
                <input  class="desc flex1 col666" type="" name="" :disabled="isEditShM" v-model="realNameInfo.nativePlace" />
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="list">
              <div class="item flex">
                <p class="backgroud tit">姓名</p>
                <input  class="desc flex1 col666" type="" name="" :disabled="isEditShM" v-model="realNameInfo.realName" />
              </div>
              <div class="item flex">
                <p class="backgroud tit">名族</p>
                <input  class="desc flex1 col666" type="" name="" :disabled="isEditShM" v-model="realNameInfo.nation" />
              </div>
              <div class="item flex">
                <p class="backgroud tit">身份证号</p>
                <input  class="desc flex1 col666" type="" name="" :disabled="isEditShM" v-model="realNameInfo.idNo" />
              </div>
              <div class="item flex">
                <p class="backgroud tit">户籍地</p>
               <input  class="desc flex1 col666" type="" name="" :disabled="isEditShM" v-model="realNameInfo.householdRegister" />
              </div>
            </div>
          </el-col>
        </el-row>
        <!-- 身份证 -->
        <div class="mt15 flex alCen">
          <div class="">
            <el-upload
              class="avatar-uploader"
              action="123"
              :before-upload="beforeUpload"
              :show-file-list="false"
              ref="newupload"
              :disabled='isEditShM'
              name="multipartFile"
              :with-credentials='true'
              :auto-upload="true"
              :on-success="upIdCard"
            >
              <img v-if="realNameInfo.idCardUri" :src="realNameInfo.idCardUri" class="avatar">
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
              :disabled='isEditShM'
              name="multipartFile"
              :auto-upload="true"
              :with-credentials='true'
              :on-success="upIdCardBack"
            >
              <img v-if="realNameInfo.idCardReverseUri" :src="realNameInfo.idCardReverseUri" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
            <div class="mt10 text-center">身份证背面</div>
          </div>
        </div>


      </div>
      <!-- 用户详情end -->
      <!-- 名片 -->
      <div v-if="tabPosition == 'card'" class="demand-service">
        <!-- 工人名片 -->
        <el-row class="demand-deltails-box2 user">
          <div class="alCen js-sb flex">
            <div class="box-demand-title">工人信息</div>
            <el-button type="primary" @click="editUserInfo">{{ isEditUserInfo?'保存':'编辑' }}</el-button>
          </div>
          <div class="demand-deltails-box user el-row">
            <el-col :span="12">
              <div class="list">
                <div class="item flex">
                  <p class="backgroud tit">工人等级</p>
                  <p class="desc flex1 col666">{{bizCardInfo.grade}}</p>
                </div>
                <div class="item flex">
                  <p class="backgroud tit">工龄</p>
                  <p class="desc flex1 col666">{{bizCardInfo.workYears}}年</p>
                </div>
                <div class="item flex">
                  <p class="backgroud tit">行为分</p>
                  <p class="desc flex1 col666">{{bizCardInfo.behavioralScore}}</p>
                </div>
                <div class="item flex">
                  <p class="backgroud tit">工种</p>
                  <div class="desc flex1 col666 flex alCen">
                    <div v-for="item in bizCardInfo.workType" style="margin-right: 20px;position: relative;">
                      <p class="gongzhong">{{item.labelName}}</p>
                      <img v-if="isEditUserInfo" @click="detGongZhong(item)" src="../../../assets/images/icon-close.png" class="iconDet" >
                    </div>
                   <!-- <el-button type="text" size="small" v-if="isEditUserInfo" >添加工种</el-button> -->
                      <el-select size="small" v-if="isEditUserInfo" v-model="gongZhvalue" placeholder="添加工种" @change="choseGongZhong">
                        <el-option
                          v-for="item in gongZhoptions"
                          :key="item.id"
                          :label="item.labelName"
                          :value="item.id">
                        </el-option>
                      </el-select>

                  </div>
                </div>
                <div class="item flex">
                  <p class="backgroud tit">自我介绍</p>
                  <!-- <p class="desc flex1 col666">{{bizCardInfo.selfIntroduction}}</p> -->
                  <input  class="desc flex1 col666" type="" name="" :disabled="isEditUserInfo==false" v-model="bizCardInfo.selfIntroduction" />
                  <el-select  v-if="isEditUserInfo" v-model="bizCardInfo.selfIntroduction" placeholder="请选择"  @change="chosebiref">
                     <el-option
                        v-for="item in productQuestions"
                        :key="item.id"
                        :label="item.content"
                        :value="item.id">
                      </el-option>
                  </el-select>

                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="list">
                <div class="item flex">
                  <p class="backgroud tit">状态</p>
                  <p class="desc flex1 col666 flex alCen js-sb">
                    <span>{{bizCardInfo.workStatus==1?'工作中':'找工中'}}</span>
                    <el-button type="text" size="small" v-if="isEditUserInfo" @click="changeStatus">切换状态</el-button>
                  </p>
                </div>
                <div class="item flex">
                  <p class="backgroud tit">工作时长</p>
                  <p class="desc flex1 col666">{{bizCardInfo.workDays}}</p>
                </div>
                <div class="item flex">
                  <p class="backgroud tit">工人评分</p>
                  <p class="desc flex1 col666 flex alCen">
                    <el-rate
                      v-model="userInfo.workerScore"
                      disabled
                      show-score
                      text-color="#ff9900"
                      score-template="{value}"
                    />
                  </p>
                </div>
                <div class="item flex">
                  <p class="backgroud tit">期望工作地</p>
                  <div class="desc flex1 col666 flex alCen">
                    <div v-for="item in bizCardInfo.expectedPlace" style="margin-right: 20px;position: relative;">
                      <p class="gongzhong">{{item.labelName}}</p>
                      <img v-if="isEditUserInfo" @click="detAdr(item)" src="../../../assets/images/icon-close.png" class="iconDet" >
                    </div>
                    <el-cascader
                      v-if="isEditUserInfo"
                      size="small"
                      placeholder="添加工作地"
                      :options="adrOptions"
                      v-model="selectedOptions"
                      @change="handleChange"
                    >
                    </el-cascader>

                  </div>
                </div>
              </div>
            </el-col>
          </div>

          <div class="alCen js-sb flex">
            <div class="box-demand-title">项目经验</div>
            <el-button type="primary" @click="addWork">添加</el-button>
          </div>
          <div class="pro-exper mt15" >
            <div v-for="(tiem,index) in 3" :key="index" class="experItem">
              <el-row class="">
                <el-col :span="5" class="proDesc flex column js-center alCen">
                  <p class="proTit">广州中体是多少符带饭的符大项目</p>
                </el-col>
                <el-col :span="4" class="proDesc flex column alCen js-center">
                  <p class="col666">工种</p>
                  <p class="mt10 ">组长</p>
                </el-col>
                <el-col :span="5" class="proDesc flex column alCen js-center">
                  <p class="col666">工程时间</p>
                  <p class="mt10 ">组长</p>
                </el-col>
                <el-col :span="6" class="proDesc flex column alCen js-center">
                  <p class="col666">工作地点</p>
                  <p class="mt10 ">组长</p>
                </el-col>
                <el-col :span="4" class="proDesc flex column alCen js-center">
                  <p class="col666">服务评分</p>
                  <el-rate
                    v-model="workScore"
                    class="mt10"
                    disabled
                    show-score
                    text-color="#ff9900"
                    score-template="{value}"
                  />
                </el-col>
              </el-row>
              <div class="proPj">
                <p class="col666">服务评价</p>
                <p class="col333 mt10">服务评价sdvsdg fsg森岛帆高收到符带饭的符的辅导费的罚单</p>
              </div>
            </div>
          </div>

          <div class="box-demand-title mt30">工作成果照片展示</div>
          <div class="mt10 flex alCen">
            <el-upload
              name="multipartFile"
              class="avatar-uploader"
              :action="adminUrl"
              :disabled="isEditUserInfo==false"
              list-type="picture-card"
              :file-list="workPhotoList"
              :on-success="workPhotoSuccess"
              :on-remove="handleRemove3"
              :limit='6'
              :on-exceed="handleExceed"
            >
              <i class="el-icon-plus" />
            </el-upload>
            <el-dialog :visible.sync="dialogVisible3">
              <img width="100%" :src="imageUr3" alt="">
            </el-dialog>
          </div>

         <div class="box-demand-title mt30">我的证书</div>
          <textarea v-if="isEditUserInfo" class="mt20" v-model="bizCardInfo.certificateIntro" rows="10"  cols="80"></textarea>
          <div v-else class="box-demand-title mt20">{{bizCardInfo.certificateIntro}}</div>
          <div class="mt10 flex alCen">
            <el-upload
              name="multipartFile"
              class="avatar-uploader"
              :action="adminUrl"
              :file-list="zhenshuPhotoList"
              :disabled="isEditUserInfo==false"
              list-type="picture-card"
              :on-success="handleAvatarSuccess4"
              :on-remove="handleRemove4"
              :limit='6'
              :on-exceed="handleExceed"
            >
              <i class="el-icon-plus" />
            </el-upload>
            <el-dialog :visible.sync="dialogVisible4">
              <img width="100%" :src="imageUr4" alt="">
            </el-dialog>
          </div>

        </el-row>

      </div>
      <!-- 名片end -->
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
      <!-- 提现 -->
      <div v-if="tabPosition == 'withdrawal'" class="demand-service">
        <div class="box-demand-title">提现</div>

      </div>
      <!-- 提现end -->
    </div>

  </div>
</template>

<script>
import {
    queryById,
    gongrenQueryById,
    updateInfo,
    gongrenupdateInfo,
    uploadIdCard,
    realNameAuth,
    gongRenRealNameAuth,
    bizCard,
    workerBizCard,
    getgongzhong,
    workCardAdd,
    getbiref,
    workCardAddGongRen,
    workCardRemove,
    workCardRemoveGongRen,
    uploadIdCardByAli,
    uploadpublic,
    getPreSignFile
} from '../../../api/user.js'
import { regionData, CodeToText } from "element-china-area-data";
import { timestamp } from '@/utils/validate'

export default {
  data() {
    return {
      tabPosition: 'detail',
      isEdit: true, // 详情编辑or保存
      isEditShM:true,
      isEditUserInfo: false, // 个人名片
      workPhotoList: [], // 工作成果照片
      imageUr3: '',
      dialogVisible3:false,
      zhenshuPhotoList: [], // 证书
      imageUr4: '',
      dialogVisible4:false,
      projectName: '', // 项目名称
      joinProStatus: 0,
      workScore:3.4,

      userIdOrType:'', //用户id和joinType,用户列表进来是1,工人列表进来是2
      userInfo:{}, //用户信息
      basicInfo:{}, //基本信息
      realNameInfo:{}, //实名信息
      bizCardInfo:{}, //名片信息

      adrOptions: regionData,
      selectedOptions: [],

      gongZhoptions: [],
      gongZhvalue: '',
      productQuestions:[],
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
      ]

    }
  },
  mounted() {
    var userInfo = this.$route.query;
    this.userIdOrType = userInfo

    this.loadDate()
    this.loadGongZh();
    this.loadBiref();
  },
  methods: {
    // 获取工种
    loadGongZh(){
      var params = {}
      getgongzhong(params).then(res => {
        console.log(res)
        if(res.code==200){
          this.gongZhoptions = res.data
        }
      })
    },
    // 获取自我介绍
    loadBiref(){
      var params = {
        pageSize:20,
        pageNum:1,
        status:1
      }
      getbiref(params).then(res => {
        console.log(res)
        if(res.code==200){
          this.productQuestions = res.data.list
        }
      })
    },
    // 添加期望地
    handleChange() {
      var loc = "";
      var code = 0;
      for (let i = 0; i < this.selectedOptions.length; i++) {
        code = this.selectedOptions[i]
        loc += CodeToText[this.selectedOptions[i]];
      }
      var params = {
        labelId:code,
        labelName:loc,
        labelType:1,
        userBusinessCardId:this.bizCardInfo.id
      }
      workCardAddGongRen(params).then(res => {
        console.log(res)
        if(res.code==200){
          this.loadDate()
        }
      })



    },
    loadDate(){
      this.getGongrenDetail();
    },
    getGongrenDetail(){
      var userInfo = this.userIdOrType;
      var params = {
        id:userInfo.id
      }
      gongrenQueryById(params).then(res => {
        var data = res.data
        console.log('res', data)
        this.userInfo = data
        this.basicInfo = {
          id:data.id,
          headPortrait:data.headPortrait,
          realName:data.realName,
          phone:data.phone,
          adr:data.address ,
          userType:userInfo.userType==0?'企业端':userInfo.userType==1?'工人端':userInfo.userType==2?'管理端':'',
          gender:data.gender,
          grade:data.workerGrade==0?'普通工人':data.workerGrade==1?'铜牌':data.workerGrade==2?'银牌':data.workerGrade==3?'金牌工人':'',
          updateTime :data.updateTime
        }
        this.realNameInfo = {
          realNameAuth : data.realNameAuth?'已实名':'未实名'
        }
        if(data.realNameAuthDTO){
        this.realNameInfo = {
          // gender:data.realNameAuthDTO.gender==0?'男':'女',
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
        this.bizCardInfo = {
          id:data.bizCard.id,
          grade:data.workerGrade==0?'普通工人':data.workerGrade==1?'铜牌':data.workerGrade==2?'银牌':data.workerGrade==3?'金牌工人':'',
          workYears:data.bizCard.workYears,
          behavioralScore:data.behavioralScore,
          workType:data.bizCard.workType,
          selfIntroduction:data.bizCard.selfIntroduction,
          workStatus:data.bizCard.workStatus,
          workDays:data.workDays,
          expectedPlace:data.bizCard.expectedPlace,
          workResultUrl:data.bizCard.workResultUrl,
          certificateIntro:data.bizCard.certificateIntro,
          certificateUrl:data.bizCard.certificateUrl
        }
        if(data.bizCard.workResultUrl){
          var imgdata = data.bizCard.workResultUrl.split(',')
          console.log(imgdata)
          for(var i=0;i<imgdata.length;i++){
             var obj = {};
            obj.url = imgdata[i]
            obj.name = 'img'+ i
            imgdata[i] = obj
          }
          this.workPhotoList = imgdata
        }
        if(data.bizCard.certificateUrl){
          var imgdata2 = data.bizCard.certificateUrl.split(',')
          for(var i=0;i<imgdata2.length;i++){
             var obj = {};
            obj.url = imgdata2[i]
            obj.name = 'img'+ i
            imgdata2[i] = obj
          }
          this.certificateUrl = imgdata2
        }

      })
    },


    // 基本信息编辑
    edit() {
      if(this.isEdit==false){
        var params = {
          id:this.userIdOrType.id,
          address :this.basicInfo.adr,
          gender:this.basicInfo.gender,
          phone :this.basicInfo.phone,
          realName :this.basicInfo.realName
        }
        gongrenupdateInfo(params).then(res => {
          var data = res.data
          console.log(res)
          this.$message({
            type: 'success',
            message: '操作成功!'
          })
          this.isEdit = true
          this.loadDate(this.userIdOrType)
        })

      }else{
        this.isEdit = false
      }

    },
    // 实名认证
    editShM() {
      if(this.isEditShM==false){
        console.log(this.realNameInfo.gender)
        console.log('保存')
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
       gongRenRealNameAuth(params).then(res => {
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
        this.isEditShM = false
      }

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
         this.realNameInfo.gender = res.data.gender
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
         var data = res.data
         this.realNameInfo.validityEndTime = timestamp(res.data.startDate)
         this.realNameInfo.validityEndTime = timestamp(res.data.endDate)
         this.realNameInfo.idCardReverseUriUp = res.data.idCardUri
         this.getIdUrl(2,res.data.idCardUri)
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

    workPhotoSuccess(res,file) {
      var obj = {};
      obj.url = res.data
      obj.name = file.raw.uid
      this.workPhotoList.push(obj)
      // this.dialogVisible3 = true;
      console.log(this.workPhotoList);
    },
    handleRemove3(file,fileList) {
      console.log(file.name)
      for(var i=0;i<this.workPhotoList.length;i++){
        if(this.workPhotoList[i].name==file.name){
              this.workPhotoList.splice(i,1)
            }
      }
      console.log(this.workPhotoList);

    },
    handleAvatarSuccess4(res, file) {
      var obj = {};
      obj.url = res.data
      obj.name = file.raw.uid
      this.zhenshuPhotoList.push(obj)
      // this.dialogVisible3 = true;
      console.log(this.zhenshuPhotoList);
    },
    handleRemove4(file, fileList) {
      console.log(file.name)
      for(var i=0;i<this.zhenshuPhotoList.length;i++){
        if(this.zhenshuPhotoList[i].name==file.name){
              this.zhenshuPhotoList.splice(i,1)
            }
      }
      console.log(this.zhenshuPhotoList);
    },
    // 提示用户上传的图片数量
    handleExceed(files, fileList) {
    	this.$message.warning('最多上传6张');
    },
    // 添加项目经验
    addWork() {

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
    // 名片
    // 编辑
    editUserInfo() {
      if(this.isEditUserInfo){
        var zhenshuPhotoList = [];
        this.zhenshuPhotoList.forEach((item)=>{
          zhenshuPhotoList.push(item.url)
        })
        console.log(zhenshuPhotoList)
        var workPhotoList = [];
        this.workPhotoList.forEach((item)=>{
          workPhotoList.push(item.url)
        })
        console.log(workPhotoList)
        var params = {
          certificateIntro:this.bizCardInfo.certificateIntro,
          certificateUrl:zhenshuPhotoList.join(','),
          selfIntroduction:this.bizCardInfo.selfIntroduction,
          userId:this.userInfo.id,
          workResultUrl:workPhotoList.join(','),
          workStatus:this.bizCardInfo.workStatus
        }
        workerBizCard(params).then(res => {
          console.log(res)
          if(res.code==200){
            this.loadDate()
            this.isEditUserInfo = false
          }
        })
      }else{
          this.isEditUserInfo = true
      }

    },
    // 修改工作状态
    changeStatus(){
      if(this.bizCardInfo.workStatus){
        this.bizCardInfo.workStatus = 0
      }else{
        this.bizCardInfo.workStatus = 1
      }
    },
    // 添加工种
    choseGongZhong(id){
      var item = {}
      for(var val of this.gongZhoptions){
        if(val.id==id){
          item = val
        }
      }
      console.log(item)
      var params = {
        labelId:item.id,
        labelName:item.labelName,
        labelType:0,
        userBusinessCardId:this.bizCardInfo.id
      }
      workCardAddGongRen(params).then(res => {
        console.log(res)
        if(res.code==200){
          this.loadDate()
        }
      })

    },
    // 删除工种
    detGongZhong(item){
      console.log(item)
      var params = {
        id:item.id
      }
      workCardRemoveGongRen(params).then(res => {
        console.log(res)
        if(res.code==200){
          this.loadDate()
        }
      })

    },
    // 删除工作地
    detAdr(item){
      console.log(item)
      var params = {
        id:item.id
      }
      workCardRemoveGongRen(params).then(res => {
        console.log(res)
        if(res.code==200){
          this.loadDate()
        }
      })

    },
    // 选择自我介绍
    chosebiref(id){
      var item = {}
      for(var val of this.productQuestions){
        if(val.id==id){
          item = val
        }
      }
      console.log(item.content)
      this.bizCardInfo.selfIntroduction = item.content
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
    }
    .list{
      border-left: 1px solid #E9E9E9;
    }
    .item{
      line-height: 50px;
      border-bottom: 1px solid #E9E9E9;
      .tit{
        width: 140px;
        padding-right: 20px;
        text-align: right;
        border-right: 1px solid #E9E9E9;
      }
      .desc{
        padding: 0 10px;
        box-sizing: border-box;
        border: none;
        .gongzhong{

        }
        .iconDet{
          position: absolute;
          top:7px;
          right: -5px;
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }
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
