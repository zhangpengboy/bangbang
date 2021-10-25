<template>
  <div class="projectDetail">
    <div class="main flex js-sb">
      <div class="aside">
        <p class="sign">
          <span class="lableTxt">邦宁项目</span>
        </p>
        <div class="head flex alCen column">
          <div class="avatarCon">
            <p class="status">计时</p>
            <img src="../../../assets/images/xiangmu.png" class="avatar">
          </div>
          <p class="proName">中铁广州一期项目</p>
          <p class="order">所属订单【2021948933493】</p>
        </div>
        <div class="nav flex alCen">
          <p class="navItem" v-for="item in 4">电焊工</p>
        </div>
        <div class="list">
          <div class="item flex alCen js-sb">
            <p class="tit">项目状态</p>
            <p class="desc" style="color: #0079fe;">进行中</p>
          </div>
          <div class="item flex alCen js-sb">
            <p class="tit">项目人数</p>
            <p class="desc" style="color: #0079fe;">456人</p>
          </div>
          <div class="item flex alCen js-sb">
            <p class="tit">项目创建者</p>
            <p class="desc">进行中</p>
          </div>
          <div class="item flex alCen js-sb">
            <p class="tit">项目经理</p>
            <p class="desc" style="max-width: 150px;">
              <span>李华 13867656765</span><span>李华 13867656765</span>
            </p>

          </div>
          <!-- 邦宁项目 -->
          <div class="item flex alCen js-sb">
            <p class="tit">项目工期</p>
            <p class="desc">20天</p>
          </div>
          <div class="item flex alCen js-sb">
            <p class="tit">创建时间</p>
            <p class="desc">2018-06-20 12:41:50</p>
          </div>
          <div class="item flex alCen js-sb">
            <p class="tit">开始时间</p>
            <p class="desc">2018-06-20 12:41:50</p>
          </div>
          <div class="item flex alCen js-sb">
            <p class="tit">竣工时间</p>
            <p class="desc">2018-06-20 12:41:50</p>
          </div>
          <!-- 自建项目 -->
          <div class="item flex alCen js-sb">
            <p class="tit">服务周期</p>
            <p class="desc">20天</p>
          </div>
          <div class="item flex alCen js-sb">
            <p class="tit">创建时间</p>
            <p class="desc">2018-06-20 12:41:50</p>
          </div>
          <div class="item flex alCen js-sb">
            <p class="tit">开始时间</p>
            <p class="desc">2018-06-20 12:41:50</p>
          </div>
          <div class="item flex alCen js-sb">
            <p class="tit">延期天数</p>
            <p class="desc"><span style="color: #FF0000;">12</span>天</p>
          </div>
          <div class="item flex alCen js-sb">
            <p class="tit">结束时间</p>
            <p class="desc">2018-06-20 12:41:50</p>
          </div>
        </div>
        <div class="progressCon">
          <div class="flex js-sb" style="margin-bottom: 15px;">
            <p class="tit">项目进度</p>
            <p class="tit">当前进度90%</p>
          </div>
          <el-progress :percentage="90" :show-text='false' :stroke-width='10' color="#0079fe"></el-progress>
        </div>
        <div class="shuoming">
          该项目工期将在 <span style="color: #FF0000;font-size: 21px;">12</span>  天后到期，请及时跟进项目进度
        </div>

      </div>

      <div class="container">
          <div class="head flex alCen js-sb">
            <div class="box boxBlue flex alCen js-sb">
              <div class="item">
                <p class="tit">订单总额</p>
                <p class="money">2020202</p>
              </div>
              <div class="item">
                <p class="tit">已结施工费用</p>
                <p class="money">2020202</p>
              </div>
              <div class="item">
                <p class="tit">待结施工费用</p>
                <p class="money">2020202</p>
              </div>
            </div>
            <div class="box boxYellow">
              <div class="item">
                <p class="tit">订单余额</p>
                <p class="money">2020202</p>
              </div>
            </div>
          </div>

          <!-- 头部  -->
          <div class="top" id="top">
            <div class="top-title ">数据筛选</div>
            <div class="top-content flex fvertical fbetween">
              <div class="top-content-item flex fvertical">
                <div class="flex fvertical top-content-item-status">
                  <span>用户账户/名字：</span>
                  <el-input v-model="searchUsername" clearable class="top-content-item-input" placeholder="输入用户账户/名字" />
                </div>
                <div class="flex fvertical top-content-item-status">
                  <span>时间筛选：</span>
                  <div class="flex alCen flex1">
                    <el-date-picker
                    clearable
                      v-model="startDate"
                      type="date"
                      placeholder="开始日期">
                    </el-date-picker>
                    <div style="margin: 0 10px;">至</div>
                    <el-date-picker
                    clearable
                      v-model="endDate"
                      type="date"
                      placeholder="结束日期">
                    </el-date-picker>
                  </div>
                </div>
                <div class="top-content-btn">
                  <el-button type="primary" @click="search">查询</el-button>
                  <el-button @click='raLoad'>重置</el-button>
                </div>
              </div>

            </div>

          </div>
          <!-- 头部end  -->
          <div class="conMain">
            <div class="mainNav flex alCen">
              <p :class="['mNavItem',mNavItemIndex==0?'mNavItemHov':'']" @click="choseNav(0)">计件工</p>
              <p :class="['mNavItem',mNavItemIndex==1?'mNavItemHov':'']" @click="choseNav(1)">计时工</p>
              <p :class="['mNavItem',mNavItemIndex==2?'mNavItemHov':'']" @click="choseNav(2)">班组长</p>
            </div>
            <!-- 表格  -->
            <el-table :data="tableData" stripe style="width: 100%; margin-top:15px" border >
              <el-table-column type='index' label="序号" width="60" />
              <el-table-column prop="name" label="日期" />
              <el-table-column prop="name" label="账号" />
              <el-table-column prop="name" label="姓名"/>
              <el-table-column prop="name" label="所属班组"/>
              <!-- 计件 -->
              <el-table-column prop="name" label="验收工程量" v-if="mNavItemIndex==0"/>
              <!-- 计时 -->
              <el-table-column prop="name" label="工时" v-if="mNavItemIndex==1"/>
              <!-- 管理 -->
              <el-table-column prop="name" label="带班管理提成" v-if="mNavItemIndex==2"/>
              <el-table-column prop="name" label="带班管理费" v-if="mNavItemIndex==2"/>

              <el-table-column prop="name" label="施工费用" v-if="mNavItemIndex==0||mNavItemIndex==1"/>
              <el-table-column prop="name" label="工资标准"  v-if="mNavItemIndex !==2" />
              <el-table-column prop="name" label="已对账"/>
              <el-table-column prop="name" label="未对账"/>
            </el-table>
            <!-- 表格end -->
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
        searchUsername:'',
        startDate:'',
        endDate:'',
        mNavItemIndex:0,
        tableData:[
          {name:'你好',status:0},
          {name:'你好a',status:1}
        ],
        PageIndex: 1, // 页码
        PageSize: 10, // 显示多少条数据
        PageCount: 0, // 总条数

      }
    },
    created() {

    },
    methods: {
      choseNav(e){
        this.mNavItemIndex = e
      },
      search(){

      },
      raLoad(){

      },
      /** 选择分页 */
      handleSizeChange(e) {
        this.PageSize = e
        this.PageIndex = 1
        this.loadDate()
      },
      /** 点击分页 */
      handleCurrentChange(e) {
        this.PageIndex = e
        this.loadDate()
      },


    }
  }
</script>

<style lang="scss" scoped="scoped">
 .projectDetail{
   .main{

     .aside{
       border:1px solid #E9E9E9;
       padding: 40px 15px 20px;
       box-sizing: border-box;
       width: 300px;
       position: relative;
       .sign{
         display: inline-block;
         width: 0;
         height: 0;
         border-top: 60px solid #333333;
         border-right: 60px solid transparent;
         position: absolute;
         top: 0;
         left: 0;
         .lableTxt{
           width: 60px;
           color: #FFFFFF;
           text-align: center;
           transform: rotate(-45deg);
           position: absolute;
           padding: 10px 0;
           left: -7px;
           top: -54px;
           font-size: 12px;
         }
       }
       .head{
         .avatarCon{
           position: relative;
           .status{
             position: absolute;
             background-color: #006aff;
             border-radius: 50px 50px 50px 0;
             width: 76px;
             line-height: 30px;
             text-align: center;
             color: #FFFFFF;
             top:-15px;
             right: -30px;

           }
           .avatar{
             width: 100px;
             height: 100px;
             border-radius: 50%;
           }
         }
         .proName{
           font-weight: bold;
           font-size: 24px;
           margin-top: 15px;
         }
         .order{
           margin-top: 10px;
           font-size: 14px;
         }
       }
       .nav{
         flex-wrap: wrap;
         margin-top: 30px;
         .navItem{
           font-size: 14px;
           color: #FFFFFF;
           background-color: #0079fe;
           padding: 4px 8px;
           margin: 0 10px 10px 0;
           border-radius: 15px;
         }
       }
       .list{
         margin-top: 30px;
         font-size: 14px;
         .item{
           margin-bottom: 20px;
          flex-wrap: nowrap;
          .tit{
            position: relative;
          }
          .tit::before{
            content: "";
            background: #666666;
            display: inline-block;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            position: relative;
            margin-right: 4px;
          }
         }
       }
       .progressCon{
         margin-top: 20px;
         border-top: 1px solid #d9d9d9;
         padding-top: 20px;
       }
       .shuoming{
         margin-top: 30px;
       }
     }

     .container{
       border:1px solid #E9E9E9;
       padding:10px;
       box-sizing: border-box;
       flex: 1;
       margin-left: 15px;
       .head{

         .box{
           width: 48%;
           padding: 30px;
           box-sizing: border-box;
           color: #FFFFFF;
           border-radius: 8px;
           .tit{
             font-size: 12px;
           }
           .money{
             font-size: 22px;
             font-weight: bold;
             margin-top: 15px;
           }
         }
         .boxBlue{
           background-color: #0079fe;
         }
         .boxYellow{
           background-color: #fe9500;
         }

       }
       .conMain{
         margin-top: 30px;
         .mainNav{
            border-radius: 4px;
            overflow: hidden;
           .mNavItem{
             width: 80px;
             line-height: 35px;
             text-align: center;
             color: #666666;
             border: 1px solid #d3d3d3;
             cursor: pointer;
           }
           .mNavItem:first-child{
             border-radius: 4px 0 0 4px;
           }
           .mNavItem:last-child{
             border-radius: 0 4px 4px 0;
           }
           .mNavItemHov{
              border: 1px solid #0079fe;
              color: #0079fe;
           }
         }

       }
     }
   }


 }

</style>
