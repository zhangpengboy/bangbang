<template>
  <div class="attendance"  v-loading="loading">
    <!-- 头部  -->
    <div class="top" id="top">
      <div class="top-title ">数据筛选</div>
      <Filters :data="filterData" @search="search" />
    </div>
    <!-- 头部end  -->

    <div class="box">
      <div class="box-top" id="boxTop">
        <div class="flex fbetween fvertical">
            <div class="bold">数据列表</div>
            <el-button type="primary" @click="exportTable">导出</el-button>
        </div>
        <div class="typebox">
            <el-radio-group v-model="mtype">
            <el-radio-button :label="1">邦宁项目</el-radio-button>
            <el-radio-button :label="2">自建项目</el-radio-button>
            </el-radio-group>
        </div>
      </div>
      <!-- 表格  -->
      <Table :data="list0" :columns="columns" :height="clientHeight+'px'" v-if="mtype === 1">
        <template slot="project">
          <el-table-column label="项目名称"  width="120">
          <template slot-scope="scope">
            <p>{{scope.row.title}}</p>
            <p class="label" v-if="scope.row.type == 0">
              <span class="lableTxt">邦宁</span>
            </p>
          </template>
        </el-table-column>
        </template>
        <template slot="status">
          <el-table-column label="项目状态">
            <template slot-scope="{row}">
              <span v-if="row.status === 0">进行中</span>
              <span v-if="row.status === 1" style="color: #f00;">已竣工</span>
              <span v-if="row.status === 2">延期中</span>
              <span v-if="row.status === 3">待进场</span>
            </template>
          </el-table-column>
        </template>
        <template slot="handle">
          <el-table-column label="操作" :width="220">
            <template slot-scope="{row}">
              <el-button type="text" @click="seeCost(row.id, 1)">费用明细</el-button>
              <el-button type="text" @click="seeRecord(row.id, 1)">对账记录</el-button>
            </template>
          </el-table-column>
        </template>
      </Table>
      <Table :data="list1" :columns="columns2" :height="clientHeight+'px'" v-else>
        <template slot="status">
          <el-table-column label="项目状态">
            <template slot-scope="{row}">
              <span v-if="row.status === 0">进行中</span>
              <span v-if="row.status === 1" style="color: #f00;">已竣工</span>
              <span v-if="row.status === 2">延期中</span>
              <span v-if="row.status === 3">待进场</span>
            </template>
          </el-table-column>
        </template>
        <template slot="handle">
          <el-table-column label="操作" :width="220">
            <template slot-scope="{row}">
              <el-button type="text" @click="seeCost(row.id, 2)">费用明细</el-button>
              <el-button type="text" @click="seeRecord(row.id, 2)">对账记录</el-button>
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
  import {
    getprojectMonthlySettlement
  } from '@/api/project'

  export default {
    components: {
      Filters,
      Table
    },
    data() {
      return {
        filterData: [
          {type: 'input',prop: 'id', title: '项目名称', placeholder: '输入项目名称/服务单号'},
          {type: 'input', prop: 'project', title: '项目联系人', placeholder: '输入联系人账号'},
          {type: 'select', prop: 'status', title: '项目状态', 
            options: [{label: '进行中', value: 0}, {label: '已竣工', value: 1}, {label: '延期中', value: 2}, {label: '待进场', value: 3}]},
        ],
        columns: [
          {label: '序号', type: "index", width: 60},
          {slot: "project"},
          {prop: 'orderId', label: '所属服务单'},
          {prop: 'creatorName', label: '项目联系人'},
          {prop: 'enterStartTime', label: '开工时间'},
          {prop: 'enterEndTime', label: '竣工时间'},
          {slot: "status"},
          {prop: 'finishTime', label: '已确认工时'},
          {prop: 'name', label: '已验收工程量'},
          {prop: 'serverTotal', label: '已支付施工服务费'},
          {prop: 'name', label: '待支付施工服务费'},
          {prop: 'name', label: '已对账施工服务费'},
          {prop: 'name', label: '未对账施工服务费'},
          {slot: "handle"},
        ],
         tableData:[
         ],
          columns2: [
          {label: '序号', type: "index", width: 60},
          {prop: 'title', label: '项目名称'},
          {prop: 'creatorName', label: '项目联系人'},
          {prop: 'enterStartTime', label: '开工时间'},
          {prop: 'enterEndTime', label: '竣工时间'},
          {prop: 'createTime', label: '申请日期'},
          {slot: "status"},
          {prop: 'finishTime', label: '已确认工时'},
          {prop: 'name', label: '已对账施工服务费'},
          {prop: 'name', label: '未对账施工服务费'},
          {slot: "handle"},
        ],
         loading:false,
         clientHeight:0,
         current: 1, // 页码
         pageSize: 10, // 显示多少条数据
         total: 0, // 总条数
         mtype: 1

      }
    },
    computed: {
      list0() {
        return this.tableData.filter(item => item.type === 0)
      },
       list1() {
        return this.tableData.filter(item => item.type === 1)
      }
    },
    watch: {
      mtype(val) {
        this.total = val === 1 ? this.list0.length : this.list1.length
      }
    },
    created() {
      this.getWebHeing();
      this.loadData();
    },
    methods: {
      loadData(){
        // console.log('加载数据！！')
        this.loading = true;
        var params = {
          pageSize: this.pageSize,
          pageNum: this.current
        }
        getprojectMonthlySettlement(params).then(res => {
          this.loading = false;
          var data = res.data.list
          console.log('res', data)
          this.tableData = data
          this.total = this.tableData.filter(item => item.type === 0).length
        })
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
      exportTable() {

      },
      seeRecord(id, type) {
          this.$router.push({path: type === 1 ? '/workerManagement/bnRecord' : '/workerManagement/ownRecord',  query: { id }})
      },
      seeCost(id, type) {
          this.$router.push({path: type === 1 ? '/workerManagement/bnCost' : '/workerManagement/ownCost',  query: { id }})
      }
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

  .typebox {
      margin-top: 10px;
  }
</style>
