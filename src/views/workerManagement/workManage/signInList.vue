<template>
  <div class="attendance"  v-loading="loading">
    <!-- 头部  -->
    <div class="top" id="top">
      <div class="top-title ">数据筛选</div>
      <div class="top-content flex fvertical fbetween">
        <div class="top-content-item flex fvertical">
          <div class="flex fvertical top-content-item-status">
            <span>输入查询：</span>
            <el-input v-model="serach" clearable class="top-content-item-input" placeholder="用户ID/账号" />
          </div>
          <div class="flex fvertical top-content-item-status">
            <span>项目来源：</span>
            <el-select v-model="sourcevalue" placeholder="全部">
              <el-option
                v-for="item in allsource"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <div class="flex fvertical top-content-item-status">
            <span>工种类型：</span>
            <el-select v-model="typeWorkvalue" placeholder="全部">
              <el-option
                v-for="item in alltypeWork"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <div class="flex fvertical top-content-item-status">
            <span>签到状态：</span>
            <el-select v-model="signInvalue" placeholder="全部">
              <el-option
                v-for="item in allsignIn"
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
        </div>
      </div>
      <div class="top-content flex fvertical fbetween">
        <div class="top-content-item flex fvertical">
          <div class="flex fvertical top-content-item-status">
            <span>所属项目：</span>
            <el-input v-model="serach" clearable class="top-content-item-input" placeholder="输入项目名称/服务单号" />
          </div>
          <div class="flex fvertical top-content-item-status">
            <span>查询时间：</span>
            <div class="flex alCen flex1">
              <el-date-picker
              clearable
                v-model="startDate"
                type="date"
                placeholder="选择开始日期">
              </el-date-picker>
              <div style="margin: 0 10px;">至</div>
              <el-date-picker
              clearable
                v-model="endDate"
                type="date"
                placeholder="选择结束日期">
              </el-date-picker>
            </div>
          </div>
        </div>
      </div>

    </div>
    <!-- 头部end  -->

    <div class="box">
      <div class="box-top flex fbetween fvertical" id="boxTop">
        <div class="bold">数据列表</div>
        <el-button type="primary" @click="exportTable">导出</el-button>
      </div>
      <!-- 表格  -->
      <el-table :data="tableData" stripe style="width: 100%" border :height="clientHeight+'px'" :cell-style="cellStyle">
        <el-table-column type='index' label="序号" width="60" />
        <el-table-column label="项目来源"  width="120">
          <template slot-scope="scope">
            <p>{{scope.row.name}}</p>
            <p class="label" v-if="scope.row.status == 0">
              <span class="lableTxt">邦宁</span>
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="所属项目" />
        <el-table-column prop="name" label="所属班组"/>
        <el-table-column prop="name" label="工种类型">
          <template slot-scope="scope">
            <p v-if="scope.row.status == 1">计时</p>
            <p style="color: #D9001B;" v-if="scope.row.status == 0">计件</p>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="签到用户"/>
        <el-table-column prop="name" label="手机号"/>
        <el-table-column prop="name" label="签到日期"/>
        <el-table-column prop="name" label="班组考勤时间" width="120"/>
        <el-table-column prop="name" label="签到地点" width="200"/>
        <el-table-column prop="name" label="上班签到">
          <template slot-scope="scope">
            <p :style="scope.row.status == 1?'color: #D9001B;':''">8:00</p>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="下班签到">
          <template slot-scope="scope">
            <p :style="scope.row.status == 1?'color: #D9001B;':''">16:00</p>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="当日工时"/>
        <el-table-column label="签到状态" width="120">
          <template slot-scope="scope">
            <p>{{scope.row.status == 0?'正常':scope.row.status == 1?'早退':''}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="确认状态">
          <template slot-scope="scope">
            <p style="color: #0079FE;" v-if="scope.row.status == 1">待确认</p>
            <p v-if="scope.row.status == 0">已确认</p>
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
        clientHeight:0,
         allsource: [
           {
             label: '邦宁',
             value: '0'
           }, {
             label: '用户',
             value: '1'
           }
         ],
         sourcevalue: '',
         alltypeWork:[
           {
             label: '计时',
             value: '0'
           }, {
             label: '计件',
             value: '1'
           }
         ],
         typeWorkvalue:'',
         allsignIn:[
           {
             label: '迟到',
             value: '0'
           }, {
             label: '早退',
             value: '1'
           }, {
             label: '正常',
             value: '2'
           }, {
             label: '未签到',
             value: '3'
           }, {
             label: '未签退',
             value: '4'
           }, {
             label: '缺卡',
             value: '5'
           }
         ],
         signInvalue:'',
         startDate:'',
         endDate:'',
         tableData:[
           {name:'你好',status:0},
           {name:'你好a',status:1}
         ],

         serach:'',
         loading:false,
         PageIndex: 1, // 页码
         PageSize: 10, // 显示多少条数据
         PageCount: 0, // 总条数

      }
    },
    created() {
      this.getWebHeing();
      // this.loadDate();
    },
    methods: {
      loadDate(status){
        this.loading = true;
        var params = {
          pageSize:20,
          pageNum:1,
          status:status
        }
        getCollectionClass(params).then(res => {
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
        this.sourcevalue = '';
        this.typeWorkvalue = '';
        this.signInvalue = '';
        this.startDate = '';
        this.endDate = '';
        this.PageIndex = 1;
        this.loadDate();
      },
      // 导出
      exportTable(){

      },
      agree(row){
        console.log(row)
        this.$confirm('是否同意申请?', '提示', {
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
      refuse(row){
        console.log(row)
        this.$confirm('是否拒绝申请?', '提示', {
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
      cellStyle({ row, column, rowIndex, columnIndex }) {
          if (columnIndex === 1) {
              return `position:relative;`;
          } else {
              return ''
          }
      },

      /** 计算页面高度 */
      getWebHeing() {
      	this.$nextTick(() => {
      		this.clientHeight = document.documentElement.clientHeight - document.getElementById('top')
      			.offsetHeight - document.getElementById('page')
      			.offsetHeight - document.getElementById('boxTop')
      			.offsetHeight - 180;
      	})
      	window.addEventListener('resize', () => {
      		if(document.getElementById('top')!=null){
      		  this.clientHeight = document.documentElement.clientHeight - document.getElementById('top')
      		  	.offsetHeight - document.getElementById('page')
      		  	.offsetHeight - document.getElementById('boxTop')
      		  	.offsetHeight - 180;
      		  this.$forceUpdate();
      		}
      	})
      },


    }
  }
</script>

<style lang="scss" scoped="scoped">
  .attendance{
    padding-top: 15px;
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

  .box{
    .label{
      display: inline-block;
      width: 0;
      height: 0;
      border-top: 40px solid #333333;
      border-left: 40px solid transparent;
      position: absolute;
      top: 0;
      right: 0;
      .lableTxt{
        width: 40px;
        color: #FFFFFF;
        text-align: center;
        transform: rotate(45deg);
        position: absolute;
        padding: 10px 0;
        right: -7px;
        top: -45px;
        font-size: 12px;
      }
    }
  }



</style>
