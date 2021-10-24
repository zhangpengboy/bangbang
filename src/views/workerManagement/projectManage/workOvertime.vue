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
            <p>{{scope.row.projectId}}</p>
            <p class="label" v-if="scope.row.status == 0">
              <span class="lableTxt">邦宁</span>
            </p>
          </template>
        </el-table-column>
        </template>
        <template slot="status">
          <el-table-column label="状态">
            <template slot-scope="{row}">
              <span v-if="row.status === 0" style="color: #f00;">待审批</span>
              <span v-if="row.status === 1">已驳回</span>
              <span v-if="row.status === 2">已同意</span>
            </template>
          </el-table-column>
        </template>
        <template slot="handle">
          <el-table-column label="操作" :width="220">
            <template slot-scope="{row}">
              <el-button type="text" @click="edit(row)">编辑 </el-button>
              <el-button type="text" @click="see(row)">查看加班成员</el-button>
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

    <el-dialog title="编辑" :visible.sync="editVisible">
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="加班开始时间" prop="startTime">
          <el-time-select
           @change="handleChange"
            v-model="form.startTime"
            :picker-options="{
              step: '00:30'
            }"
            placeholder="选择时间">
          </el-time-select>
        </el-form-item>
        <el-form-item label="加班结束时间" prop="endTime">
          <el-time-select
          @change="handleChange"
            v-model="form.endTime"
            :picker-options="{
              start: form.startTime,
              step: '00:30'
            }"
            placeholder="选择时间">
          </el-time-select>
        </el-form-item>
        <el-form-item label="加班工时" prop="totalTime">
          <el-input v-model="diffTime" disabled style="width: 220px" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitEdit">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="加班成员" :visible.sync="seeVisible">
      <ul class="list">
        <li class="itm" v-for="i in 10" :key="i">
          <div class="type">班组长</div>
          <div class="img">
            <el-image style="width: 100px; height: 100px"></el-image>
          </div>
          <div class="name">张三</div>
        </li>
      </ul>
    </el-dialog>

  </div>
</template>

<script>
  import Filters from '../../../components/Filters/index.vue'
  import Table from '@/components/Table'
  import moment from 'moment'
  import {
    getOvertimeList,
    getOvertimeXls
  } from '@/api/project'

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
          {type: 'date', prop: 'startDate', title: '申请日期', placeholder: '请选择时间'},
          {type: 'select', prop: 'status', title: '状态', 
            options: [{label: '待审批', value: 1}, {label: '已驳回', value: 2}, {label: '已同意', value: 3}]},
        ],
        columns: [
          {label: '序号', type: "index", width: 60},
          {slot: "project"},
          {prop: 'name', label: '项目地点'},
          {prop: 'overtimeApplyId', label: '所属服务单'},
          {prop: 'creatorName', label: '申请人'},
          {prop: 'workerId', label: '账号'},
          {prop: 'createTime', label: '申请日期'},
          {prop: 'overtimeBegin', label: '加班开始时间'},
          {prop: 'overtimeEnd', label: '加班结束时间'},
          {prop: 'name', label: '加班时长'},
          {prop: 'name', label: '加班人数'},
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
         form: {
           startTime: '',
           endTime: '',
           totalTime: ''
         },
         rules: {
           startTime: [{required: true, message: '请选择加班开始时间', trigger: 'change'}],
           endTime: [{required: true, message: '请选择加班结束时间', trigger: 'change'}]
         },
         editVisible: false,
         seeVisible: false

      }
    },
    computed: {
      diffTime() {
        return this.form.totalTime + '小时'
      }
    },
    created() {
      this.getWebHeing();
      this.loadData();
    },
    methods: {
      loadData(){
        this.loading = true;
        let params = {
          pageSize: this.pageSize,
          pageNum: this.current,
        }
        getOvertimeList(params).then(res => {
          this.loading = false;
          var data = res.data.list
          this.tableData = data
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
      handleApprove(row) {
        this.$confirm('是否同意「中铁一期项目」项目经理发起的3小时加班申请', '加班审批',{
          confirmButtonText: '同意',
          cancelButtonText: '驳回',
        }).then(()=>{
          console.log('确认')
        }).catch(()=>{
          console.log('取消')
        })
      },
      exportTable() {
        this.loading = true;
        let params = {
          pageSize: this.pageSize,
          pageNum: this.current,
        }
        getOvertimeXls(params).then(res => {
          console.log("🚀 ~ file: workOvertime.vue ~ line 248 ~ getOvertimeList ~ res", res)
        }).finally(()=>{
            this.loading = false;
          })
      },
      edit() {
        this.editVisible = true
      },
      submitEdit() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            console.log('form: ', this.form)
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      handleChange(e) {
        if (this.form.startTime && this.form.endTime) {
          let t1 = moment(this.form.startTime, 'hh:mm')
          let t2 = moment(this.form.endTime, 'hh:mm')
          this.form.totalTime = t2.diff(t1, 'hours', true)
        }
      },
      see() {
        this.seeVisible = true
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

  .list {
    display: flex;
    flex-wrap: wrap;

    .itm {
      list-style: none;
      padding: 5px 20px;
      border: 1px solid #ccc;
      margin: 0 15px 15px 0;
      color: #333;

      &:nth-child(5n) {
        margin-right: 0;
      }
    }

    .type {
      text-align: right;
    }

    .img {
      margin: 0 auto;
    }
  }
</style>
