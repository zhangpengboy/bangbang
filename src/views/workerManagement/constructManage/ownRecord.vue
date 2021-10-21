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
        <template slot="money">
          <el-table-column label="对账金额">
          <template slot-scope="scope">
            <span style="color: #f00">12304.00元</span>
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
            {type: 'daterange', prop: 'startDate', prop: 'endDate', title: '对账日期'},
            {type: 'input',prop: 'id', title: '用户名', placeholder: '输入姓名/手机号'}
        ],
        columns: [
          {label: '序号', type: "index", width: 60},
          {prop: 'name', label: '姓名'},
          {prop: 'name', label: '手机号'},
          {prop: 'name', label: '所属班组'},
          {prop: 'name', label: '对账日期'},
          {prop: 'name', label: '对账工时'},
          {slot: 'money'},
          {prop: 'name', label: '对账人'},
          {prop: 'name', label: '对账备注'}
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
      exportTable() {}
    }
  }
</script>

<style lang="scss" scoped="scoped">
  .attendance{
    padding-top: 15px;
  }
</style>
