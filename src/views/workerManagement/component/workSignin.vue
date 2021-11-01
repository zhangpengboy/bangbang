<template>
  <div class="qdtj"  v-loading="loading">
    <div class="nav flex alCen js-sb" id="nav">
      <div class="navItem flex column alCen js-center">
        <p class="tit">昨日出勤率</p>
        <p class="num">89%</p>
      </div>
      <div class="navItem flex column alCen js-center">
        <p class="tit">昨日全勤率</p>
        <p class="num">89%</p>
      </div>
      <div class="navItem flex column alCen js-center">
        <p class="tit">昨日考勤人数</p>
        <p class="num">89</p>
      </div>
      <div class="navItem flex column alCen js-center">
        <p class="tit">昨日正常人数</p>
        <p class="num">189</p>
      </div>
      <div class="navItem flex column alCen js-center">
        <p class="tit">昨日缺勤人数</p>
        <p class="num">819</p>
      </div>
      <div class="navItem flex column alCen js-center">
        <p class="tit">昨日未确认工时人数</p>
        <p class="num">892</p>
      </div>
    </div>
    <!-- 头部  -->
    <div class="top" id="top">
      <div class="top-title ">数据筛选</div>
      <div class="top-content flex fvertical fbetween">
        <div class="top-content-item flex fvertical">
          <div class="flex fvertical top-content-item-status">
            <span>用户名：</span>
            <el-input v-model="serach" clearable class="top-content-item-input" placeholder="输入姓名/手机号" />
          </div>
          <div class="flex fvertical top-content-item-status">
            <span>进场时间：</span>
            <div class="flex alCen flex1">
              <el-date-picker
                clearable
               class="top-content-item-input"
                v-model="StartDate"
                type="date"
                placeholder="选择开始日期">
              </el-date-picker>
              <div style="margin: 0 10px;">至</div>
              <el-date-picker
                clearable
                class="top-content-item-input"
                v-model="EndDate"
                type="date"
                placeholder="选择结束日期">
              </el-date-picker>
            </div>
          </div>
          <div class="flex fvertical top-content-item-status">
            <span>签到状态：</span>
            <el-select v-model="statusvalue" placeholder="全部" class="top-content-item-input">
              <el-option
                v-for="item in allStatus"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <div class="flex fvertical top-content-item-status">
            <span>出勤状态：</span>
            <el-select v-model="AttendanceVal" placeholder="全部" class="top-content-item-input">
              <el-option
                v-for="item in allAttendance"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </div>
        <div class="top-content-btn">
          <el-button type="primary" @click="search">查询</el-button>
          <el-button @click='raLoad'>重置</el-button>
          <el-button type="primary" @click="exportTable">导出</el-button>
        </div>
      </div>
    </div>
    <!-- 头部end  -->

    <div class="box">
      <div class="box-top flex fvertical" style="justify-content: flex-end;" id="boxTop">
        <el-button type="primary" @click="seeRecord">操作记录</el-button>
        <el-button type="primary" @click="batchConfim">批量确认</el-button>

      </div>
      <!-- 表格  -->
      <el-table :data="tableData" stripe style="width: 100%" border :height="clientHeight+'px'" ref="accountTable">
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column type='index' label="序号" width="60" />
        <el-table-column prop="creatorName" label="姓名" />
        <el-table-column prop="workerId" label="账号" width="120"/>
        <el-table-column prop="name" label="所属班组"/>
        <el-table-column prop="name" label="考勤日期"/>
        <el-table-column prop="name" label="到场签到"/>
        <el-table-column prop="name" label="离厂签到"/>
        <el-table-column prop="name" label="上班总工室"/>
        <el-table-column prop="name" label="加班工时"/>
        <el-table-column prop="name" label="停工时长"/>
        <el-table-column label="签到状态" width="120">
          <template slot-scope="scope">
            <p style="color:#03BF16 ;" v-if="scope.row.exceptionStatus == 0">正常</p>
            <p style="color: #D9001B;" v-if="scope.row.exceptionStatus == 1">迟到</p>
            <p style="color: #D9001B;" v-if="scope.row.exceptionStatus == 2">早退</p>
            <p style="color: #D9001B;" v-if="scope.row.exceptionStatus == 3">异常</p>
            <p style="color: #D9001B;" v-if="scope.row.exceptionStatus == 4">缺卡</p>
            <p style="color: #D9001B;" v-if="scope.row.exceptionStatus == 5">工作中</p>
          </template>
        </el-table-column>
        <el-table-column label="出勤状态" width="120">
          <template slot-scope="scope">
            <p style="color:#D9001B ;" v-if="scope.row.cardType == 1">下班打卡</p>
            <p style="color: #D9001B;" v-if="scope.row.cardType == 0">上班打卡</p>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="signInSta(scope.row)">签到统计</el-button>
            <el-button type="text" size="small" @click="confim(scope.row)">确认出勤</el-button>

          </template>
        </el-table-column>
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

      <!-- 编辑弹窗 -->
      <el-dialog
        title="变更考勤数据"
        :visible.sync="dialogEdit"
        width="30%">
        <div class="popEdit">
          <div class="list">
            <div class="item flex alCen">
              <p class="tit">所属项目</p>
              <p class="name">梵蒂冈地方个</p>
              <p class="tit">所属项目</p>
              <p class="name2">地方个</p>
            </div>
            <div class="item flex alCen">
              <p class="tit">考勤日期</p>
              <p class="name">0202-202-2</p>
              <p class="tit">考勤时间</p>
              <p class="name2">9：:0~20:00</p>
            </div>
            <div class="item flex alCen">
              <p class="tit">上班签到时间</p>
              <div class="name">
                <p class="time" @click="showChangeTime(1)">9:00</p>
                <!-- 修改打卡时间弹窗 -->
                <div class="timePop" v-if="isPopChangeTime">
                  <p class="timePoptit">将打卡结果修改为</p>
                  <div class="con">
                    <template>
                      <el-radio v-model="radio" label="1">正常</el-radio>
                      <el-radio v-model="radio" label="2">缺卡</el-radio>
                      <el-radio v-model="radio" label="3">异常</el-radio>
                    </template>
                    <el-time-picker
                     v-if="radio==3"
                     class="timeChose"
                      v-model="dakaTime"
                      placeholder="时间">
                    </el-time-picker>
                  </div>
                  <div class="foot flex alCen">
                    <el-button @click="isPopChangeTime = false">取 消</el-button>
                    <el-button type="primary" @click="confimChangeTime">确定</el-button>
                  </div>
                </div>
              </div>
              <p class="tit">下班签到时间</p>
              <div class="name">
                <p class="time" @click="showChangeTime(2)">9:00</p>
              </div>
            </div>
            <div class="item flex alCen">
              <p class="tit">工时状态</p>
              <p class="name">未对账</p>
            </div>
          </div>
          <div class="list list2">
            <div class="item flex alCen">
             <p class="tit">实际上班时间</p>
             <p class="name">9:00</p>
             <p class="tit">实际下班时间</p>
             <p class="name2">20:00</p>
            </div>
          </div>

        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogEdit = false">取 消</el-button>
          <el-button type="primary" @click="confimChange">确定</el-button>
        </span>
      </el-dialog>
      <!-- 签到统计弹窗 -->
      <el-dialog
        title="签到统计"
        :visible.sync="dialogSignin"
        width="60%">
        <div class="popTongji">
            <div class="head flex alCen">
              <p class="status">在场</p>
              <p class="total">出勤总天数：24天</p>
            </div>
            <div class="list flex alCen">
              <p class="item colRed">上班总工时：323小时</p>
              <p class="item colRed">加班总工时：323小时</p>
              <p class="item colRed">总施工服务费：323元</p>
              <p class="item">缺卡次数：323次</p>
              <p class="item">迟到次数：323次</p>
              <p class="item">早退次数：323次</p>
            </div>
        </div>
      </el-dialog>


    </div>

  </div>
</template>

<script>
  import {
    getprojectAttendanceLog
  } from '@/api/project'
  // import { formatDate } from '@/utils/validate'
  export default {
    data() {
      return {
         allStatus: [
           {
             label: '正常',
             value: '0'
           }, {
             label: '迟到',
             value: '1'
           }, {
             label: '早退',
             value: '2'
           }, {
             label: '异常',
             value: '3'
           }, {
             label: '缺卡',
             value: '4'
           }, {
             label: '工作中',
             value: '5'
           }
         ],
         statusvalue: '',
         allAttendance:[
           {
             label: '下班打卡',
             value: '1'
           },{
             label: '上班打卡',
             value: '0'
           }
         ],
         AttendanceVal:'',
         serach:'',
         StartDate:'',
         EndDate:'',
         PageIndex:1,
         tableData:[
           {name:'你好',status:0},
           {name:'你好a',status:1}
         ],
         clientHeight:'',

         loading:false,
         PageIndex: 1, // 页码
         PageSize: 10, // 显示多少条数据
         PageCount: 0, // 总条数
         dialogEdit:false,
         radio: '1',
         dakaTime:'',
         isPopChangeTime:false,
         dialogSignin:false,


      }
    },
    created() {
      this.getWebHeing();
      this.loadDate();
    },
    methods: {
      loadDate(){
        this.loading = true;
        var params = {
          pageSize: this.PageSize,
          pageNum: this.PageIndex,
          statusList: this.statusvalue,
          cardTypes: this.AttendanceVal,
          createTimeBegin: this.StartDate,
          createTimeEnd: this.EndDate,
          workerId: this.serach,

        }
        getprojectAttendanceLog(params).then(res => {
          this.loading = false;
          var data = res.data.list
          console.log('res', data)
          this.tableData = data

        })
      },
      search() {
        console.log('查询')
        this.loadDate();
      },
      // 重置
      raLoad(){
        this.statusvalue = '';
        this.PageIndex = 1;
        this.AttendanceVal = ''
        this.StartDate = ''
        this.EndDate = ''
        this.serach = ''
        this.loadDate();
      },
      // 导出
      exportTable(){

      },
      // 操作记录
      seeRecord(){
        this.$router.push({ path: '/workerManagement/workSignInEditRecord'})
      },
      // 批量确认
      batchConfim(){
          let currentSelect = this.$refs.accountTable.selection;
          console.log(currentSelect)
          this.$confirm('确定要批量确认吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {

              this.$message({
                type: 'success',
                message: '操作成功!'
              })
          }).catch(() => {

          })
      },
      // 编辑
      edit(row){
        this.dialogEdit = true
      },
      // 修改打卡时间
      showChangeTime(type){
        if(type==1){
          console.log('修改上班时间')
        }else{
          console.log('修改下班时间')
        }
        this.isPopChangeTime = true
      },
      confimChangeTime(){
        console.log(this.dakaTime);
        this.isPopChangeTime = false
      },
      // 变更考勤
      confimChange(){
        this.dialogEdit = false
      },
      // 签到统计
      signInSta(row){
        this.dialogSignin = true
      },
      // 确认出勤
      confim(row){
        console.log(row)
        this.$confirm('上班签到:'+row.name+' 下班签到:'+row.name+' 出勤工时:'+row.status, '确认出勤', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

            this.$message({
              type: 'success',
              message: '操作成功!'
            })
        }).catch(() => {

        })
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
      /** 计算页面高度 */
      getWebHeing() {
      	this.$nextTick(() => {
      		this.clientHeight = document.documentElement.clientHeight - document.getElementById('top')
      			.offsetHeight - document.getElementById('page')
      			.offsetHeight - document.getElementById('boxTop')
            .offsetHeight - document.getElementById('nav')
      			.offsetHeight - 180;
      	})
      	window.addEventListener('resize', () => {
      		if(document.getElementById('top')!=null){
      		  this.clientHeight = document.documentElement.clientHeight - document.getElementById('top')
      		  	.offsetHeight - document.getElementById('page')
      		  	.offsetHeight - document.getElementById('boxTop')
              .offsetHeight - document.getElementById('nav')
      		  	.offsetHeight - 180;
      		  this.$forceUpdate();
      		}
      	})
      },


    }
  }
</script>

<style lang="scss" scoped="scoped">
  .qdtj{
    .nav{
      padding: 10px 0;
      .navItem{
        border-radius: 8px;
        width: 180px;
        height: 100px;
        border: 1px solid #adadad;
        .tit{
          font-size: 12px;
          color: #666666;
        }
        .num{
          margin-top: 10px;
          font-size: 30px;
        }
      }
    }
    .top{
      .top-content-item-input{
        width: 150px;
      }
    }

  }
.popList{
  .item{
    margin-top: 10px;
    .tit{
      width: 150px;
    }
    .ipt{
      height: 40px;
      flex: 1;
      border: 1px solid #d9d9d9;
      padding-left: 8px;
    }

  }
}
.popEdit{
  .list{
    border: 1px solid #ededed;
    .item{
      border-bottom: 1px solid #ededed;
      text-align: center;
      font-size: 14px;
      .tit{
        line-height: 35px;
        width: 100px;
        border-right: 1px solid #ededed;
      }
      .name{
        line-height: 35px;
        flex: 1;
        border-right: 1px solid #ededed;
        position: relative;
        .timePop{
          position: absolute;
          top:-200px;
          left: 0;
          background-color: #FFFFFF;
          border-radius: 10px;
          box-shadow: 0 0 10px 2px rgba(0,0,0,0.3);
          width: 400px;
          padding: 10px;
          box-sizing: border-box;
          .timePoptit{
            text-align: left;
          }
          .timeChose{
            width: 120px;
          }
          .foot{
            margin-top: 30px;
            justify-content: flex-end;

          }
        }

      }
      .name2{
        line-height: 35px;
        width: 120px;
      }
      .time{
        color: #1682E6;
      }
    }
  }
  .list2{
    margin-top: 30px;
  }
}
.popTongji{
  .status{
    width: 77px;
    line-height: 33px;
    text-align: center;
    color: #FFFFFF;
    background-color:#4f4f4f ;
    border-radius: 33px;
  }
  .total{
    margin-left: 20px;
    color: #0079fe;
  }
  .list{
    margin-top: 40px;
    flex-wrap: wrap;
    .item{
      width: 30%;
      margin-right: 2%;
      margin-bottom: 30px;
      line-height: 40px;
      text-align: center;
      color: #0079fe;
      background-color: #ebebeb;
      border-radius: 10px;
    }
    .colRed{
      color: #d62647;
    }
  }
}


</style>
