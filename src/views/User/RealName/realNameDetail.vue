<template>
  <div class="main">
    <div class="box">
      <div class="box-demand-title">实名认证</div>
      <el-row class="demand-deltails-box user">
        <el-col :span="12">
          <div class="list">
            <div class="item flex">
              <p class="backgroud tit">实名认证</p>
              <p class="desc" style="color: #F59A23;">审核中</p>
            </div>
            <div class="item flex">
              <p class="backgroud tit">性别</p>
              <p class="desc">男</p>
            </div>
            <div class="item flex">
              <p class="backgroud tit">年龄</p>
              <p class="desc">男</p>
            </div>
            <div class="item flex">
              <p class="backgroud tit">籍贯</p>
              <p class="desc">男</p>
            </div>
            <div class="item flex">
              <p class="backgroud tit">身份证有效期限</p>
              <p class="desc">男</p>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="list">
            <div class="item flex">
              <p class="backgroud tit">姓名</p>
             <p class="desc">男</p>
            </div>
            <div class="item flex">
              <p class="backgroud tit">名族</p>
              <p class="desc">男</p>
            </div>
            <div class="item flex">
              <p class="backgroud tit">身份证号</p>
              <p class="desc">男</p>
            </div>
            <div class="item flex">
              <p class="backgroud tit">户籍地</p>
             <p class="desc">男</p>
            </div>
          </div>
        </el-col>
      </el-row>
      <div class="box-demand-title">照片对比</div>
      <div class="photoCon flex alCen">
        <div id="">
          <img src="../../../assets/images/fm.jpg" class="self">
          <p class="title">自拍照片</p>
        </div>
        <div class="card">
          <img src="../../../assets/images/fm.jpg" class="cardImg">
          <img src="../../../assets/images/fm.jpg" class="cardImg">
          <p class="title">上传身份证正反面</p>
        </div>
      </div>
      <div class="foot flex alCen js-center">
        <el-button type="success" size="small" @click="agree">同意</el-button>
        <el-button type="danger" size="small" @click="refuse">拒绝</el-button>
      </div>

    </div>
  </div>
</template>

<script>
  import {
    getCollectionClass
  } from '../../../api/user.js'
  import { formatDate } from '@/utils/validate'
  export default {
    data() {
      return {

      }
    },
    created() {
    },
    methods: {
      agree(){

      },
      refuse(){

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
