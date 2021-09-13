<template>
  <div class="attendance"  v-loading="loading">
    <!-- 头部  -->
    <div class="top">
      <div class="top-title ">数据筛选</div>
      <div class="top-content flex fvertical fbetween">
        <div class="top-content-item flex fvertical">
          <div class="flex fvertical top-content-item-status">
            <span>输入查询：</span>
            <el-input v-model="serach" class="top-content-item-input" placeholder="用户ID/账号" clearable/>
          </div>
          <div class="flex fvertical top-content-item-status">
            <span>访问时间：</span>
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
          <div class="flex fvertical top-content-item-status">
            <span>用户登录：</span>
            <el-select v-model="statusvalue" placeholder="全部" clearable>
              <el-option
                v-for="item in allStatus"
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
    </div>
    <!-- 头部end  -->

    <div class="box">
      <div class="box-top flex fbetween fvertical">
        <div class="bold">数据列表</div>
        <el-button type="primary" @click="exportTable">导出</el-button>
      </div>
      <!-- 表格  -->
      <el-table :data="tableData" stripe style="width: 100%" border>
        <el-table-column type='index' label="序号" width="60" />
        <el-table-column prop='id' label="ID" width="180" />
        <el-table-column prop="realName" label="名称"  width="220"/>
        <el-table-column prop="phone" label="手机号码" width="220" />
        <!-- <el-table-column prop="updater" label="用户登录"/> -->

        <el-table-column prop="realNameAuth" label="用户登录" width="220">
          <template slot-scope="scope">
            	{{scope.row.userType == 0 ?'企业端':'工人端'}}
            </template>
        </el-table-column>
        <el-table-column prop="createTime" label="访问时间" width="280"/>
        <el-table-column label="操作"></el-table-column>
      </el-table>
      <!-- 表格end -->
      <!-- 分页  -->
      <div class="flex fcenter page">
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

    <div class="box box2">
      <div id="myChart"></div>
      <div class="nav flex alCen">
        <!-- <div :class="['navItem',navIndex==0?'navItemHov':'']" @click="tabChose(0)">近7日</div>
        <div :class="['navItem',navIndex==1?'navItemHov':'']" @click="tabChose(1)">近30日</div> -->
        <div :class="['navItem',navIndex==index?'navItemHov':'']" @click="tabChose(item,index)" v-for="(item,index) in datas" :key="index">{{item.name}}</div>
      </div>
    </div>


  </div>
</template>

<script>
  import {
    visitList,
    visitListexportCsv,
    visitListcount
  } from '../../../api/user.js'
  import { formatDate,timestamp } from '@/utils/validate'
  export default {
    data() {
      return {
         allStatus: [
           {
             label: '全部',
             value: ''
           }, {
             label: '企业端',
             value: '0'
           }, {
             label: '工人端',
             value: '1'
           }
         ],
         statusvalue: '',
         serach:'',
         startDate:'',
         endDate:'',
         PageIndex: 1, // 页码
         PageSize: 10, // 显示多少条数据
         PageCount: 0, // 总条数
         tableData:[
           {name:'你好'},
           {name:'你好a'},
           {name:'你好a'},
           {name:'你好a'},
           {name:'你好a'}
         ],
         loading:false,
         navIndex:0,
         datas:[
           {
             name:'近7日',
             count:7
           },
           {
             name:'近30日',
             count:30
           },
           {
             name:'近180日',
             count:180
           }
         ]

      }
    },
    created() {
      this.loadDate();
      this.$nextTick(function() {
       this.drawLine();
      })
    },
    mounted() {

    },
    methods: {
      tabChose(item,index){
        this.navIndex = index
        this.drawLine();
      },
      loadDate(){
        this.loading = true;
        var createTimeBegin=''
        if(this.startDate){
          createTimeBegin = timestamp(formatDate(this.startDate))
        }
        var createTimeEnd=''
        if(this.endDate){
          createTimeEnd = timestamp(formatDate(this.endDate))
        }
        var params = {
          pageSize:this.PageSize,
          pageNum:this.PageIndex,
          createTimeBegin:createTimeBegin,
          createTimeEnd:createTimeEnd,
          phone:this.serach,
          userType:this.statusvalue
        }
        visitList(params).then(res => {
          this.loading = false;
          var data = res.data.list
          console.log('res', data)
          for(var i=0;i<data.length;i++){
              data[i].createTime = formatDate(data[i].createTime)
          }
          this.tableData = data
          this.PageCount = res.data.total


        })
      },
      /** 选择分页 */
      handleSizeChange(e) {
        this.PageSize = e
        this.PageIndex = 1
        this.loadDate();
      },
      /** 点击分页 */
      handleCurrentChange(e) {
        this.PageIndex = e
        this.loadDate();
      },
      search() {
        console.log('查询')
        this.loadDate(this.statusvalue);
      },
      // 重置
      raLoad(){
        this.statusvalue = '';
        this.PageIndex = 1;
        this.startDate = '';
        this.endDate = '';
        this.loadDate(this.statusvalue);
      },
      // 导出
      exportTable(){
        var createTimeBegin=''
        if(this.startDate){
          createTimeBegin = timestamp(formatDate(this.startDate))
        }
        var createTimeEnd=''
        if(this.endDate){
          createTimeEnd = timestamp(formatDate(this.endDate))
        }
        console.log('导出');
        var query = {
          pageSize:this.PageSize,
          pageNum:this.PageIndex,
          createTimeBegin:createTimeBegin,
          createTimeEnd:createTimeEnd,
          phone:this.serach,
          userType:this.statusvalue
        }
        visitListexportCsv(query).then(res => {
          console.log(res)
          var responseURL = res.request.responseURL;
          window.open(responseURL,'_blank')
        }).catch(res=>{
          console.log(res)
          this.$message({
              message:'下载失败！',
              type:'error',
              showClose:true
          })
        })
      },

      async drawLine(){
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        let option = {
           title: {
               text: '趋势统计'
           },
           tooltip: {
               trigger: 'axis'
           },
           legend: {
               data: ['企业端访问人数', '工人端访问人数'],
               bottom:0
           },
           xAxis: {
               type: 'category',
               boundaryGap: false,
               data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
           },
           yAxis: {
               type: 'value',
               axisLabel: {
                   formatter: '{value} '
               }
           },
           series: [
               {
                   name: '企业端访问人数',
                   type: 'line',
                   data: [10, 11, 13, 11, 12, 12, 9]
               },
               {
                   name: '工人端访问人数',
                   type: 'line',
                   data: [1, 40, 2, 5, 3, 2, 0]
               }
           ]
        };

        var query = {
          days:this.datas[this.navIndex].count
        }
        let resolve = await visitListcount(query).then(response => {
          var data = response.data;
          return Promise.resolve(data)
        })
        option.xAxis.data = resolve.dates
        option.series[0].data = resolve.enterpriseCount
        option.series[1].data = resolve.workerCount
        console.log(resolve)
        myChart.setOption(option)
      }



    }
  }
</script>

<style lang="scss" scoped="scoped">
.tit{
  margin-bottom: 15px;

}
.popTextArea{
  width: 100%;
  height: 200px;
}
#myChart{
  width: 100%;
  height:500px ;
}
.box2{
  position: relative;
  .nav{
    position: absolute;
    top:10px;
    right: 30px;
    .navItem{
      cursor: pointer;
      border: 1px solid #999999;
      width: 90px;
      line-height: 34px;
      text-align: center;
      color: #999999;
    }
    .navItem:nth-child(2){
      border-left: none;
      border-right: none;
    }
    .navItemHov{
      border: 1px solid #363698;
      color: #363698;
    }
  }
}
</style>
