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
          </div>
          <input v-model="projectName" type="" name="" class="ipt ml10" value="" placeholder="项目名称">
          <el-button type="primary" class="ml10" @click="proSearch">查询</el-button>
          <el-button type="primary" class="ml10" @click="proResed">重置</el-button>
        </div>
      </div>
      <!-- 项目列表 -->
      <div class="proList">
        <div class="proItem flex alCen" v-for="item in allData">
          <div class="label" v-if="item.isZiJian">
            <p class="lableItem">邦宁</p>
          </div>
          <div class="titles">{{item.name}}</div>
          <!-- 取消的 -->
          <template  v-if="item.statue == 3">
            <div class="itemLi2">
              <p class="tit">报名时间</p>
              <p class="desc">2020-2-32</p>
            </div>
            <div class="itemLi2">
              <p class="tit">取消时间</p>
              <p class="desc">2020-2-32</p>
            </div>
            <div class="itemLi3">
              <p class="tit">取消理由</p>
              <p class="desc">圣诞节福利副经理几点睡的；付款；福建省酸辣粉基斯里夫经理简历的看法流量计</p>
            </div>
          </template>
          <template v-else>
            <div class="statusCon" v-if="item.statue == 1">
              <div class="flex alCen js-sb" style="margin-bottom: 10px;">
                <p>当前进度 {{item.progess}}%</p>
                <p class="stu">进行中</p>
              </div>
              <el-progress :percentage="item.progess" :show-text='false' ></el-progress>
            </div>
            <!-- 完工的 -->
            <div class="statusCon" v-if="item.statue == 2">
              <div class="flex alCen js-sb" style="margin-bottom: 10px;">
                <p>当前进度 100%</p>
                <p class="stu2">已完工</p>
              </div>
              <el-progress :percentage="100" color="#F75858" :show-text='false' ></el-progress>
            </div>
            <div class="itemLi">
              <p class="tit">创建时间</p>
              <p class="desc">2020-2-32</p>
            </div>
            <!-- 完工的 -->
            <div class="itemLi"  v-if="item.statue == 2">
              <p class="tit">竣工时间</p>
              <p class="desc">2020-2-32</p>
            </div>
            <div class="itemLi">
              <p class="tit">项目身份</p>
              <p class="desc">木工</p>
            </div>
            <div class="itemLi">
              <p class="tit">薪资标准</p>
              <p class="desc">50元/小时</p>
            </div>
            <div class="itemLi">
              <p class="tit">服务评分</p>
              <p class="desc" style="color: #FF0000;">4.3分</p>
            </div>
            <div class="itemLi">
              <p class="tit">用工协议</p>
              <p class="desc">未签协议</p>
            </div>
            <!-- 完工的 -->
            <div class="itemLi" v-if="item.statue == 2">
              <p class="tit">总施工服务费</p>
              <p class="desc" style="color: #0079FE;">4823423</p>
            </div>
          </template>


        </div>
      </div>
    </div>
    <!-- 分页  -->
    <div class="flex fcenter page" id="page">
      <el-pagination
        id="page"
        class="page"
        background
        :current-page="PageIndex"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="PageSize"
        layout="total, prev, pager, next,sizes, jumper"
        :total="PageCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <!-- 分页end -->

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
      allData:[
        {
          name:'项目名称',
          statue:1,
          progess:40,
          isZiJian:true
        }, {
          name:'项目名称',
          statue:2,
          progess:40,
          isZiJian:false
        }, {
          name:'项目名称',
          statue:3,
          progess:100,
          isZiJian:false
        }
      ],
      PageIndex: 1, // 页码
      PageSize: 10, // 显示多少条数据
      PageCount: 0, // 总条数

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
     /** 选择分页 */
     handleSizeChange(e) {
       this.PageSize = e
       this.PageIndex = 1
       // this.loadDate()
     },
     /** 点击分页 */
     handleCurrentChange(e) {
       this.PageIndex = e
       // this.loadDate()
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

     .proList{
       margin-top: 15px;
       .proItem{
         padding: 25px 0;
         border-bottom: 1px solid #d0d0d0;
         color: #333333;
         font-size: 14px;
         position: relative;
        .label{
           display: inline-block;
           width: 0;
           height: 0;
           border-top: 50px solid #999999;
           border-right: 50px solid transparent;
           position: absolute;
           top: 0;
           left: 0;


          .lableItem{
            width: 40px;
            color: #FFFFFF;
            text-align: center;
            transform: rotate(-45deg);
            position: absolute;
            padding: 10px 0;
            left: -2px;
            top: -50px;
            font-size: 12px;
          }
        }
         .titles{
           font-size: 20px;
           width: 200px;
           text-align: center;
         }
         .statusCon{
           width: 200px;
           .stu{
             color: #666666;
           }
           .stu::before{
             content: "";
             background: #0079FE;
             display: inline-block;
             width: 8px;
             height: 8px;
             border-radius: 50%;
             position: relative;
             margin-right: 4px;
           }
           .stu2{
             color: #666666;
           }
           .stu2::before{
             content: "";
             background: #F75858;
             display: inline-block;
             width: 8px;
             height: 8px;
             border-radius: 50%;
             position: relative;
             margin-right: 4px;
           }
         }

         .itemLi{
           display: flex;
           flex-direction: column;
           align-items: center;
           margin-left: 20px;
           min-width: 120px;
           .desc{
             margin-top: 10px;
           }
           .tit{
             color: #666666;
           }
         }
         .itemLi2{
           min-width: 120px;
            .desc{
              margin-top: 10px;
            }
            .tit{
              color: #666666;
            }
         }
         .itemLi3{
           min-width: 600px;
           align-items: flex-start;
           .desc{
             margin-top: 10px;
           }
           .tit{
             color: #666666;
           }
         }

       }
     }

   }

 }
 // 结束
</style>
