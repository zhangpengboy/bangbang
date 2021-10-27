<template>
  <div class="attendance"  v-loading="loading">
      <div class="total">
          <span class="name">施工费对账总额</span><span class="num" style="margin-right: 100px">￥324353.08</span>
          <span class="name">管理费对账总额</span><span class="num">￥324353.08</span>
      </div>
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
              <el-button type="text" @click="handleRe">对账</el-button>
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

    <el-dialog title="木工班组  李三 13898939983（计件工）" :visible.sync="reVisible" width="20%">
        <div class="wrap">
            <div class="date">
                <el-date-picker
                    style="width: 100%"
                    v-model="month"
                    type="month"
                    placeholder="选择薪资月份"
                    format="yyyy年M月薪资表">
                </el-date-picker>
            </div>
            <!-- 计件工 -->
            <div class="row" v-if="false">
                <span>已验收工程量：</span>
                <span>1234平方</span>
            </div>
            <!-- 计时工 -->
            <template v-if="false">
                <div class="row">
                    <span>上班工时：</span>
                    <span>134小时</span>
                </div>
                <div class="row">
                    <span>加班工时：</span>
                    <span>234小时</span>
                </div>
            </template>
            <!-- 计件工（兼职带班） -->
            <template v-if="false">
                <div class="sliderbox">
                    <div class="slider"><el-slider v-model="percent"></el-slider></div><span>{{percent}}%</span>
                </div>
                <div class="row">
                    <span>带班管理费用：</span>
                    <span> 938938.00</span>
                </div>
                <div class="row">
                    <span>已验收工程量：</span>
                    <span>234小时</span>
                </div>
            </template>
            <!-- 计时工（兼职带班） -->
            <template v-if="false">
                <div class="sliderbox">
                    <div class="slider"><el-slider v-model="percent"></el-slider></div><span>{{percent}}%</span>
                </div>
                <div class="row">
                    <span>带班管理费用：</span>
                    <span> 938938.00</span>
                </div>
                <div class="row">
                    <span>上班工时：</span>
                    <span>134小时</span>
                </div>
                <div class="row">
                    <span>加班工时：</span>
                    <span>234小时</span>
                </div>
            </template>
            <!-- 班组长 -->
            <template v-if="true">
                <div class="sliderbox">
                    <div class="slider"><el-slider v-model="percent"></el-slider></div><span>{{percent}}%</span>
                </div>
                <div class="row">
                    <span>带班管理费用：</span>
                    <span> 938938.00</span>
                </div>
            </template>
            <div class="row">
                <span>累计施工服务费：</span>
                <span>6150.00元</span>
            </div>
            <div class="row on" style="margin-bottom: 20px">
                <span>累计待结施工服务费：</span>
                <span>6140.00</span>
            </div>
            <el-form ref="form" :model="form" :rules="rules" label-width="120px" label-position="left">
                <el-form-item label="本次对账金额" prop="total">
                    <el-input v-model="form.total" placeholder="对账金额" />
                </el-form-item>
                <el-form-item label="" prop="mark">
                    <el-input v-model="form.mark" placeholder="工资备注" type="textarea" :rows="3" />
                </el-form-item>
            </el-form>
        </div>
        <span slot="footer">
            <el-button @click="reVisible = false">取消</el-button>
            <el-button type="primary" @click="submit">对账</el-button>
        </span>
    </el-dialog>

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
          {type: 'select', prop: 'mode', title: '工作模式', options: [{label: '计时', value: 1}, {label: '计件', value: 2}, {label: '班组长', value: 3}]},
          {type: 'select', prop: 'status', title: '状态', options: [{label: '未结清', value: 1}, {label: '已结清', value: 2}]},
        ],
        columns: [
          {label: '序号', type: "index", width: 60},
          {prop: 'name', label: '姓名'},
          {prop: 'name', label: '手机号'},
          {prop: 'name', label: '工种'},
          {prop: 'name', label: '工种类型'},
          {prop: 'name', label: '所属班组'},
           {prop: 'name', label: '上班工时'},
          {prop: 'name', label: '加班工时'},
          {prop: 'name', label: '已验收工程量'},
          {slot: 'gzbz'},
          {prop: 'name', label: '管理费标准'},
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
         reVisible: false,
         month: null,
         form: {
             total: '',
             mark: ''
         },
         rules: {
             total: [{ required: true, message: '请输入对账金额', trigger: 'blur' }],
             mark: [{ min: 10, max: 500, message: '长度在 10 到 500 个字符', trigger: 'blur' }]
         },
         percent: 25,

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
      			.offsetHeight - 265;
      	})
      	window.addEventListener('resize', () => {
      		if(document.getElementById('top')!=null){
      		  this.clientHeight = document.documentElement.clientHeight - document.getElementById('top')
      		  	.offsetHeight - document.getElementById('page')
      		  	.offsetHeight - document.getElementById('boxTop')
      		  	.offsetHeight - 265;
      		  this.$forceUpdate();
      		}
      	})
      },
      exportTable() {

      },
      handleRe() {
          this.reVisible = true
      },
      submit() {
          this.$refs.form.validate(valid =>{
              if (valid) {
                alert('submit!');
            } else {
                console.log('valid', valid);
                return false;
            }
          })
      }

    }
  }
</script>

<style lang="scss" scoped="scoped">
  .attendance{
    padding-top: 15px;
  }

  .total {
      margin-bottom: 10px;
      padding: 25px 0;
      text-align: center;
      color: #fff;
      background-color: #1890ff;
      border-radius: 5px;
      .name {
          font-size: 14px;
          margin-right: 5px;
      }
      .num {
          font-size: 22px;
      }
  }

  .wrap {
      width: 90%;
      margin: 0 auto;
  }

  .date {
      text-align: center;
      margin-bottom: 20px;
  }

  .row {
      display: flex;
      justify-content: space-between;
      color: #333;
      padding: 5px 20px 5px 10px;
      margin-bottom: 10px;
      border: 1px solid #ccc;

      &.on {
          color: blue;
      }
  }

  .sliderbox {
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      .slider {
          flex: 1;
      }

      span {
          margin-left: 10px;
      }
  }
</style>
