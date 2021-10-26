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
          <el-table-column label="所属项目"  width="120">
          <template slot-scope="scope">
            <p>{{scope.row.name}}</p>
            <p class="label">
              <span class="lableTxt">邦宁</span>
            </p>
          </template>
        </el-table-column>
        </template>
        <template slot="handle">
          <el-table-column label="操作人">
            <template slot-scope="{row}">
              <el-button type="text">admin</el-button>
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
          {type: 'input',prop: 'id', title: '用户名', placeholder: '输入姓名/手机号'},
          {type: 'input', prop: 'project', title: '所属班组', placeholder: '输入班组名称'},
          {type: 'select', prop: 'status', title: '工作模式', 
            options: [{label: '计时', value: 1}, {label: '计件', value: 2}, {label: '班组长', value: 3}]},
          {type: 'daterange', prop: 'startDate', prop: 'endDate', title: '对账日期'},
        ],
        columns: [
          {label: '序号', type: "index", width: 60},
          {prop: 'name', label: '姓名'},
          {prop: 'name', label: '手机号'},
          {slot: "project"},
          {prop: 'name', label: '劳务类型'},
          {prop: 'name', label: '所属班组'},
          {prop: 'name', label: '对账范围'},
          {prop: 'name', label: '带班提成'},
          {prop: 'name', label: '对账金额'},
          {prop: 'name', label: '对账备注'},
          {prop: 'name', label: '操作日期'},
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
