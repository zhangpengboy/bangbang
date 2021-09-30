<template>
  <el-row class="demand-deltails-box2 user">
    <div class="alCen js-sb flex">
      <div class="box-demand-title">基本信息</div>
    </div>
    <div class="demand-deltails-box user el-row">
      <el-col :span="4">
        <div class="backgroud flex alCen js-center column userCon">
          <img src="../../../assets/images/fm.jpg" class="iocnAvatar">
          <p class="mt20">{{bizCardInfo.realName}}</p>
        </div>
      </el-col>
      <el-col :span="10">
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
            <p class="backgroud tit">工人类型</p>
            <div class="desc flex1 col666">
              {{bizCardInfo.behavioralScore}}
            </div>
          </div>
          <div class="item flex" style="position: relative;">
            <p class="backgroud tit">工资标准</p>
            <div class="desc flex1 col666">
              {{bizCardInfo.behavioralScore}}
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="10">
        <div class="list">
          <div class="item flex">
            <p class="backgroud tit">状态</p>
            <p class="desc flex1 col666 flex alCen js-sb">
              <span>{{bizCardInfo.behavioralScore==1?'工作中':'找工中'}}</span>
            </p>
          </div>
          <div class="item flex">
            <p class="backgroud tit">工作时长</p>
            <p class="desc flex1 col666">{{bizCardInfo.behavioralScore}}</p>
          </div>
          <div class="item flex">
            <p class="backgroud tit">工人评分</p>
            <p class="desc flex1 col666 flex alCen">
              <el-rate
                v-model="bizCardInfo.behavioralScore"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value}"
              />
            </p>
          </div>
          <div class="item flex">
            <p class="backgroud tit">注册时间</p>
            <p class="desc flex1 col666">{{bizCardInfo.behavioralScore}}</p>
          </div>
          <div class="item flex">
            <p class="backgroud tit">所属项目</p>
            <p class="desc flex1 col666">{{bizCardInfo.behavioralScore}}</p>
          </div>
        </div>
      </el-col>
    </div>

    <div class="alCen js-sb flex">
      <div class="box-demand-title">项目经验</div>
      <!-- <el-button type="primary" @click="addWork">添加</el-button> -->
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
              v-model="bizCardInfo.workYears"
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
        :on-remove="workRemove"
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
        :on-success="zhengshuSuccess"
        :on-remove="zehngshuRemove"
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
</template>

<script>
  export default{
  	props:{
  		bizCardInfo:{
  			type:Object
  		},
      workPhotoList:{
        type:Array
      },
      zhenshuPhotoList:{
        type:Array
      }
  	},
    data() {
      return {
        adminUrl:'/api/commons/file/admin/v1/upload/public',
        isEditUserInfo:false,
        dialogVisible3:false,
        dialogVisible4:false,
        imageUr3:'',
        imageUr4:'',
        
      }
    },
    methods:{
      workPhotoSuccess(res,file){

      },
      zhengshuSuccess(res,file){

      },
      workRemove(res,file){

      },
      zehngshuRemove(res,file){

      },
      // 提示用户上传的图片数量
      handleExceed(files, fileList) {
      	this.$message.warning('最多上传6张');
      },


    }
  }

</script>

<style lang="scss" scoped="scoped">
  // 用户详情开始
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
    height: 257px;
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
      font-size: 14px;
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
 // 用户详情结束
</style>
