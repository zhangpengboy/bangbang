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
        <template slot="status">
          <el-table-column label="状态">
            <template slot-scope="{row}">{{row.status}}</template>
          </el-table-column>
        </template>
        <template slot="handle">
          <el-table-column label="状态">
            <template slot-scope="{row}">
              <el-button type="text">查看协议</el-button>
              <el-button type="text">下载</el-button>
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
          {type: 'input',prop: 'no', title: '合同编号', placeholder: '输入合同编号'},
          {type: 'input', prop: 'jia', title: '甲方', placeholder: '输入名字/手机号'},
          {type: 'input', prop: 'yi', title: '乙方', placeholder: '输入名字/手机号'},
          {type: 'select', prop: 'status', title: '状态', placeholder: '输入名字/手机号', options: [{label: '生效中', value: 1}, {label: '已到期', value: 2}]},
        ],
        columns: [
          {label: '序号', type: "index", width: 60},
          {prop: 'name', label: '合同编号'},
          {prop: 'name', label: '协议名称'},
          {prop: 'name', label: '所属公司'},
          {prop: 'name', label: '甲方'},
          {prop: 'name', label: '甲方账号'},
          {prop: 'name', label: '乙方'},
          {prop: 'name', label: '乙方账号'},
          {prop: 'name', label: '生效日期'},
          {prop: 'name', label: '失效日期'},
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
