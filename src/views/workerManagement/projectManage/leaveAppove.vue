<template>
  <div class="attendance"  v-loading="loading">
    <!-- 头部  -->
    <div class="top" id="top">
      <div class="top-title ">数据筛选</div>
      <Filters :data="filterData" @search="search" />
    </div>
    <!-- 头部end  -->

    <div class="box">
      <div class="box-top flex fbetween fvertical" id="boxTop">
        <div class="bold">数据列表</div>
        <el-button type="primary" @click="exportTable">导出</el-button>
      </div>
      <!-- 表格  -->
      <Table :data="tableData" :columns="columns" :height="clientHeight+'px'">
        <template slot="project">
          <el-table-column label="项目名称"  width="120">
          <template slot-scope="scope">
            <p>{{scope.row.name}}</p>
            <p class="label" v-if="scope.row.status == 0">
              <span class="lableTxt">邦宁</span>
            </p>
          </template>
        </el-table-column>
        </template>
        <template slot="endDate">
          <el-table-column label="退场时间">
            <template slot-scope="{row}"><span style="color: #f00;">{{row.endDate}}</span></template>
          </el-table-column>
        </template>
        <template slot="status">
          <el-table-column label="状态">
            <template slot-scope="{row}">
              <span v-if="row.status === 0" style="color: #f00;">等待确认</span>
              <span v-if="row.status === 1">已驳回</span>
              <span v-if="row.status === 2">已离队</span>
            </template>
          </el-table-column>
        </template>
        <template slot="handle">
          <el-table-column label="操作" :width="140">
            <template slot-scope="{row}">
              <el-button type="text">去对账</el-button>
              <el-button type="text" v-if="row.status === 0" @click="handleApprove(row)">审批</el-button>
              <el-button type="text" v-if="row.status === 1" style="color: #f00;" @click="handleApprove(row)">重新审批</el-button>
            </template>
          </el-table-column>
        </template>
      </Table>
      <!-- 表格end -->
      <!-- 分页  -->
      <div class="flex fcenter page" id="page">
        <el-pagination
          id="page"
          class="page"
          background
          :current-page="current"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
          layout="total, prev, pager, next,sizes, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
      <!-- 分页end -->

    </div>

  </div>
</template>

<script>
  import Filters from '../../../components/Filters/index.vue'
  import Table from '@/components/Table'
  export default {
    components: {
      Filters,
      Table
    },
    data() {
      return {
        filterData: [
          {type: 'input',prop: 'id', title: '申请人', placeholder: '输入名称/手机号/UID'},
          {type: 'input', prop: 'project', title: '所属项目', placeholder: '项目名称/服务单号'},
          {type: 'date', prop: 'startDate', title: '进场时间', placeholder: '请选择时间'},
          {type: 'date', prop: 'endDate', title: '退场时间', placeholder: '请选择时间'},
          {type: 'select', prop: 'status', title: '状态', 
            options: [{label: '等待确认', value: 1}, {label: '已驳回', value: 2}, {label: '已离队', value: 3}]},
        ],
        columns: [
          {label: '序号', type: "index", width: 60},
          {prop: 'name', label: '申请人'},
          {prop: 'name', label: '账号'},
          {slot: "project"},
          {prop: 'name', label: '所属班组'},
          {prop: 'name', label: '项目地点'},
          {prop: 'name', label: '申请时间'},
          {slot: "endDate"},
          {prop: 'name', label: '到场时间'},
          {prop: 'name', label: '实际服务天数'},
          {prop: 'name', label: '未结施工服务费'},
          {slot: "status"},
          {slot: "handle"},
        ],
         tableData:[
           {name: '你好', status: 0, endDate: '2021-10-31'},
           {name: '你好a', status: 1, endDate: '2021-11-30'}
         ],
         loading:false,
         clientHeight:0,
         current: 1, // 页码
         pageSize: 10, // 显示多少条数据
         total: 0, // 总条数

      }
    },
    created() {
      this.getWebHeing();
      // this.loadData('');
    },
    methods: {
      loadData(){
        console.log('加载数据！！')
      },
      search(e) {
        console.log('查询', e)
        this.loadData();
      },
      /** 选择分页 */
      handleSizeChange(e) {
        this.pageSize = e
        this.current = 1
        this.loadData()
      },
      /** 点击分页 */
      handleCurrentChange(e) {
        this.current = e
        this.loadData()
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
      handleApprove(row) {
        this.$confirm('您确认同意 李三的退场申请吗', '确认提示',{
          confirmButtonText: '确定',
          cancelButtonText: '驳回',
        }).then(()=>{
          console.log('确认')
        }).catch(()=>{
          console.log('取消')
        })
      },
      exportTable() {}
    }
  }
</script>

<style lang="scss" scoped="scoped">
  .attendance{
    padding-top: 15px;
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
