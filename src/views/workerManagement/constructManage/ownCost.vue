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
      </div>
      <!-- 表格  -->
      <Table :data="tableData" :columns="columns" :height="clientHeight+'px'">
          <template slot="gzbz">
            <el-table-column label="工资标准">
                <template slot-scope="{row}"><span style="color: blue">50元/小时</span></template>
            </el-table-column>
        </template>
        <template slot="fwf">
            <el-table-column label="未对账施工服务费">
                <template slot-scope="{row}"><span style="color: #f60">80000.00元</span></template>
            </el-table-column>
        </template>
        <template slot="status">
          <el-table-column label="状态">
            <template slot-scope="{row}"><span :style="{color: row.status === 1 ? '' : '#f00'}">{{row.status === 1 ? '已结清' : '未结清'}}</span></template>
          </el-table-column>
        </template>
        <template slot="handle">
          <el-table-column label="操作">
            <template slot-scope="{row}">
              <el-button type="text">查看出勤记录</el-button>
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
          {type: 'input',prop: 'no', title: '用户名', placeholder: '输入姓名/手机号'},
          {type: 'select', prop: 'ban', title: '所属班组', options: [{label: '电工班组', value: 1}, {label: '泥工班组', value: 2}]},
          {type: 'select', prop: 'status', title: '状态', options: [{label: '未结清', value: 1}, {label: '已结清', value: 2}]},
        ],
        columns: [
          {label: '序号', type: "index", width: 60},
          {prop: 'name', label: '姓名'},
          {prop: 'name', label: '手机号'},
          {prop: 'name', label: '工种'},
          {prop: 'name', label: '所属班组'},
          {prop: 'name', label: '考勤范围'},
          {prop: 'name', label: '有效出勤天数'},
          {prop: 'name', label: '上班工时'},
          {prop: 'name', label: '加班工时'},
          {slot: 'gzbz'},
          {prop: 'name', label: '已对账施工服务费'},
          {slot: 'fwf'},
          {slot: "status"},
          {slot: "handle"},
        ],
         tableData:[
           {name: '你好', status: 0},
           {name: '你好a', status: 1}
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

    }
  }
</script>

<style lang="scss" scoped="scoped">
  .attendance{
    padding-top: 15px;
  }
</style>
