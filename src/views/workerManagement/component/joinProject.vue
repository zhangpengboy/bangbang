<template>
  <div>
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
            <p :class="['proStatue',joinProStatus==index?'proStatueHov':'']" v-for="(item,index) in status" @click="choseProSta(index)">{{item.name}}</p>
          <!--  <p :class="['proStatue',joinProStatus==1?'proStatueHov':'']" @click="choseProSta(1)">进行中</p>
            <p :class="['proStatue',joinProStatus==2?'proStatueHov':'']" @click="choseProSta(2)">已完成</p>
            <p :class="['proStatue',joinProStatus==3?'proStatueHov':'']" @click="choseProSta(3)">已取消</p> -->
          </div>
          <input v-model="projectName" type="" name="" class="ipt ml10" value="" placeholder="项目名称">
          <el-button type="primary" class="ml10" @click="proSearch">查询</el-button>
          <el-button type="primary" class="ml10" @click="proResed">重置</el-button>
        </div>
      </div>
      <!-- 项目列表 -->
      <div class="proList">
        <div class="proItem flex alCen">
          <div class="title">项目名称</div>
          <div class="statusCon">
            <div class="flex alCen js-sb">
              <p>当前进度</p>
              <p class="stu">进行中</p>
            </div>
            <el-progress :percentage="50" :show-text='false' ></el-progress>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
 export default{
 	props:{
 		bizCardInfo:{
 			type:Object
 		}
 	},
   data() {
     return {
       status:[
         {
           name:'全部'
         },{
           name:'进行中'
         },{
           name:'已完成'
         },{
           name:'已取消'
         }
       ],
       joinProStatus:0,
       projectName: '', // 项目名称搜索

     }
   },
   methods:{
     choseProSta(index){
       this.joinProStatus = index
     },
      proSearch() {

      },
      proResed() {

      },

   }
 }

</script>

<style lang="scss" scoped="scoped">
 // 参加项目
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
 // 结束
</style>
