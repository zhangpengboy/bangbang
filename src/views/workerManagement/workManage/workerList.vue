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
            <span>工种：</span>
            <el-input v-model="workType" clearable class="top-content-item-input" placeholder="输入工种" />
          </div>
          <div class="flex fvertical top-content-item-status">
            <span>工人来源：</span>
            <el-select v-model="statusvalue" clearable placeholder="全部">
              <el-option
                v-for="item in allStatus"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <div class="flex fvertical top-content-item-status">
            <span>所属项目：</span>
            <el-input v-model="project" clearable class="top-content-item-input" placeholder="输入项目名称/服务单号" />
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
      <div class="box-top flex fbetween fvertical" id="boxTop">
        <div class="bold">数据列表</div>
        <el-button type="primary" @click="exportTable">导出</el-button>
      </div>
      <!-- 表格  -->
      <el-table :data="tableData" stripe style="width: 100%" border :height="clientHeight+'px'">
        <el-table-column type='index' label="序号" width="60" />
        <el-table-column prop="id" label="ID"  width="120"/>
        <el-table-column prop="realName" label="姓名" />
        <el-table-column prop="phone" label="手机号码" width="120"/>
        <el-table-column prop="name" label="性别" width="60">
          <template slot-scope="{row}">{{row.gender === 0 ? '男' : '女' }}</template>
        </el-table-column>
        <el-table-column prop="name" label="工种"/>
        <el-table-column prop="name" label="所属项目"/>
        <el-table-column prop="name" label="工种类型"/>
        <el-table-column prop="name" label="所属班组"/>
        <el-table-column prop="name" label="考勤时间"/>
        <el-table-column prop="name" label="工资标准"/>
        <el-table-column label="工人类型" width="120">
          <template slot-scope="scope">
            <p style="color:#0076FF ;" v-if="scope.row.status == 1">邦宁认证工人</p>
            <p style="color:#D9001B;" v-if="scope.row.status == 0">普通工人</p>
          </template>
         </el-table-column>
        <el-table-column label="工作状态" width="120">
          <template slot-scope="scope">
              {{scope.row.status == 1?'工作中':'休息中'}}
          </template>
         </el-table-column>
         <el-table-column label="账号状态" width="120">
           <template slot-scope="scope">
               {{scope.row.userStatus == 0?'正常':'冻结'}}
           </template>
          </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <template>
              <el-button type="text" size="small" @click="seeDetail(scope.row)">查看详情</el-button>
            </template>

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
    getworkerList
  } from '@/api/project'

  export default {
    data() {
      return {
         allStatus: [
           {
             label: '邦宁劳务',
             value: '0'
           }, {
             label: '用户自有',
             value: '1'
           }
         ],
         statusvalue: '',
         tableData:[
           {name:'你好',status:0},
           {name:'你好a',status:1}
         ],

         serach:'',
         workType:'', //工种
         project:'', //所属项目
         loading:false,
         clientHeight:0,
         PageIndex: 1, // 页码
         PageSize: 10, // 显示多少条数据
         PageCount: 0, // 总条数

      }
    },
    created() {
      this.getWebHeing();
      this.loadDate();
    },
    methods: {
      loadDate(status){
        this.loading = true;
        var params = {
          pageSize: this.PageIndex,
          pageNum: this.PageIndex,
          status: status
        }
        getworkerList(params).then(res => {
          this.loading = false;
          var data = res.data.list
          console.log('res', data)
          this.tableData = data

        })
      },
      search() {
        console.log('查询')
        this.loadDate(this.statusvalue);
      },
      // 重置
      raLoad(){
        this.serach = '';
        this.workType = '';
        this.project = '';
        this.statusvalue = '';
        this.PageIndex = 1;
        this.loadDate(this.statusvalue);
      },
      // 导出
      exportTable(){

      },
      // 查看详情
      seeDetail(row){
         this.$router.push({ path: '/workerManagement/worker-detail', query: { id: row.id }})
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

</style>
