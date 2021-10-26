<template>
  <div class="attendance"  v-loading="loading">
    <div class="typebox">
        <el-radio-group v-model="mtype" @change="handleType">
        <el-radio-button :label="1">请假通知</el-radio-button>
        <el-radio-button :label="2">工作反馈</el-radio-button>
        </el-radio-group>
    </div>
    <!-- 头部  -->
    <div class="top" id="top">
      <Filters :data="filterData" @search="search" />
    </div>
    <!-- 头部end  -->

    <div class="box">
      <!-- 表格  -->
      <Table :data="tableData" :columns="columns" :height="clientHeight+'px'" v-if="mtype === 1">
        <template slot="time">
          <el-table-column label="请假时长">
            <template slot-scope="{row}"><span style="color: #f00;">{{row.endDate}}小时</span></template>
          </el-table-column>
        </template>
      </Table>
      <Table :data="tableData2" :columns="columns2" :height="clientHeight+'px'"  v-if="mtype === 2">
        <template slot="change">
          <el-table-column label="变更记录">
            <template slot-scope="{row}"><span style="color: #f00;">{{row.endDate}}</span></template>
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
          {type: 'input', prop: 'project', title: '所属班组', placeholder: '输入帮组名称'},
          {type: 'date', prop: 'startDate', title: '请假日期', placeholder: '请选择时间'}
        ],
        columns: [
          {label: '序号', type: "index", width: 60},
          {prop: 'name', label: '申请人'},
          {prop: 'name', label: '申请人账号'},
          {prop: 'name', label: '所属班组'},
          {prop: 'name', label: '请假日期'},
          {prop: 'name', label: '请假时间'},
          {slot: "record"},
          {prop: 'name', label: '请假事由'}
        ],
         tableData:[
           {name: '你好', status: 0, endDate: '2021-10-31'},
           {name: '你好a', status: 1, endDate: '2021-11-30'}
         ],
         columns2: [
          {label: '序号', type: "index", width: 60},
          {prop: 'name', label: '反馈人'},
          {prop: 'name', label: '账号'},
          {prop: 'name', label: '所属班组'},
          {prop: 'name', label: '反馈时间'},
          {prop: 'name', label: '反馈内容'},
          {slot: "change"},
          {prop: 'name', label: '变更人'},
          {prop: 'name', label: '变更日期'}
        ],
         tableData2:[
           {name: '你好', status: 0, endDate: '2021-10-31'},
           {name: '你好a', status: 1, endDate: '2021-11-30'}
         ],
         loading:false,
         clientHeight: 300,
         current: 1, // 页码
         pageSize: 10, // 显示多少条数据
         total: 0, // 总条数
         mtype: 1

      }
    },
    created() {
    //   this.getWebHeing();
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
      handleType(e) {
          this.filterData[2].title = e ===1 ? '请假日期' : '反馈日期'
      },
    }
  }
</script>

<style lang="scss" scoped="scoped">
  .attendance{
    padding-top: 20px;
    border: 1px solid #E9E9E9;
  }

  .typebox {
      padding-left: 20px;
      margin-bottom: 20px;
  }

  .top, .box{
    border: 0;
  }

  .box {
      margin-top: 0;
  }
</style>
