<template>
  <div class="main">
    <div class="box">
      <div class="box-demand-title">实名认证</div>
      <el-row class="demand-deltails-box user">
        <el-col :span="12">
          <div class="list">
            <div class="item flex">
              <p class="backgroud tit">实名认证</p>
              <p class="desc" style="color: #F59A23;">{{allData.status==1?'审核中':allData.status==2?'审核成功':allData.status==3?'审核失败':''}}</p>
            </div>
            <div class="item flex">
              <p class="backgroud tit">性别</p>
              <p class="desc">{{allData.realName}}</p>
            </div>
            <div class="item flex">
              <p class="backgroud tit">年龄</p>
              <p class="desc">{{allData.age}}</p>
            </div>
            <div class="item flex">
              <p class="backgroud tit">籍贯</p>
              <p class="desc">{{allData.nativePlace}}</p>
            </div>
            <div class="item flex">
              <p class="backgroud tit">身份证有效期限</p>
              <p class="desc">{{formatDate(allData.validityStartTime)}}-{{formatDate(allData.validityEndTime)}}</p>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="list">
            <div class="item flex">
              <p class="backgroud tit">姓名</p>
             <p class="desc">{{allData.realName}}</p>
            </div>
            <div class="item flex">
              <p class="backgroud tit">名族</p>
              <p class="desc">{{allData.nation}}</p>
            </div>
            <div class="item flex">
              <p class="backgroud tit">身份证号</p>
              <p class="desc">{{allData.idNo}}</p>
            </div>
            <div class="item flex">
              <p class="backgroud tit">户籍地</p>
             <p class="desc">{{allData.householdRegister}}</p>
            </div>
          </div>
        </el-col>
      </el-row>
      <div class="box-demand-title">照片对比</div>
      <div class="photoCon flex alCen">
        <div id="">
          <img :src="allData.selfPic" class="self">
          <p class="title">自拍照片</p>
        </div>
        <div class="card">
          <img :src="idCardUri" class="cardImg" @click="seeBig(idCardUri)">
          <img :src="idCardReverseUri" class="cardImg" @click="seeBig(idCardReverseUri)">
          <p class="title">上传身份证正反面</p>
        </div>
      </div>
      <div class="foot flex alCen js-center" v-if="allData.status==1">
        <el-button type="success" size="small" @click="agree">同意</el-button>
        <el-button type="danger" size="small" @click="refuse">拒绝</el-button>
      </div>

    </div>
    <!-- 图片预览 -->
    <el-dialog :visible.sync="isSeeBigImg" append-to-body>
      <img width="100%" fit="contain" :src="yulanImg" alt="">
    </el-dialog>

  </div>
</template>

<script>
  import {
    userRealNameApplyone,
    getPreSignFile,
    userRealNameApplyupdateStatus
  } from '../../../api/user.js'
  import moment from 'moment'
  // import { formatDate } from '@/utils/validate'
  export default {
    data() {
      return {
        id:0,
        idCardUri:'',
        idCardReverseUri:'',
        allData:{},
        isSeeBigImg:false,
        yulanImg:'',
      }
    },
    mounted() {
      this.id = this.$route.query.id;
      console.log(this.id)
      this.loadData();
    },
    methods: {
      loadData(){
        var data = {
          id:this.id
        }
        userRealNameApplyone(data).then(res => {
          console.log(res)
           this.getIdUrl(1,res.data.idCardUri)
           this.getIdUrl(2,res.data.idCardReverseUri)
           this.allData = res.data
        })
      },
      seeBig(img){
        this.isSeeBigImg = true;
        this.yulanImg = img
      },
      formatDate(value) {
      	return moment(value).format('YYYY-MM-DD')
      },
      // 解析身份证照片
      getIdUrl(type,url){
      	var query = {
      		uri:url
      	}
      	 getPreSignFile(query).then(res => {
      	   console.log(res)
           if(type==1){
             this.idCardUri = res.data
           }else{
             this.idCardReverseUri = res.data
           }
      	 })
      },
      agree(){
        this.$confirm('是否同意申请?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            var data = {
              id:this.id,
              status:true
            }
            userRealNameApplyupdateStatus(data).then(res => {
              this.$message({
                type: 'success',
                message: '操作成功!'
              })
              this.loadData();
            })

        }).catch(() => {

        })
      },
      refuse(){
        this.$confirm('是否拒绝申请?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            var data = {
              id:this.id,
              status:false
            }
            userRealNameApplyupdateStatus(data).then(res => {
              this.$message({
                type: 'success',
                message: '操作成功!'
              })
              this.loadData();
            })

        }).catch(() => {

        })
      }

    }
  }
</script>

<style  lang="scss" scoped="scoped">
  .backgroud{
    background-color: #f2f2f2;
  }
  .demand-deltails-box {
  	margin: 20px 0;
  	border: 1px solid #E9E9E9;
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
  .desc{
    font-size: 14px;
  }
  .photoCon{
    margin-top: 20px;
    .self{
      width: 345px;
      height: 460px;
      display: block;
    }
    .title{
      margin-top: 20rpx;
      text-align: center;
    }
    .card{
      margin-left: 20px;
      .cardImg{
        width: 455px;
        height: 216px;
        margin-bottom: 20px;
        display: block;
      }
    }

  }
  .foot{
    margin-top: 30px;
  }

</style>
