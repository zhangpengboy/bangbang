<template>
  <div class="attendance"  v-loading="loading">
    <!-- 头部  -->
    <div class="top" id="top">
      <div class="top-title ">数据筛选</div>
      <div class="top-content flex fvertical fbetween">
        <div class="top-content-item flex fvertical">
          <div class="flex fvertical top-content-item-status">
            <span>查询时间：</span>
            <el-date-picker
             clearable
              v-model="startTime"
              type="date"
              placeholder="开始日期">
            </el-date-picker>
            <div style="margin: 0 10px;">至</div>
            <el-date-picker
             clearable
              v-model="endTime"
              type="date"
              placeholder="结束日期">
            </el-date-picker>
          </div>
          <div class="flex fvertical top-content-item-status">
            <span>状态：</span>
            <el-select v-model="duizhangvalue" placeholder="全部" clearable>
              <el-option
                v-for="item in allduizhang"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </div>
        <div class="top-content-btn">
          <el-button type="primary" @click="search">查询</el-button>
          <el-button @click='raLoad'>重置</el-button>
          <el-button type="primary" @click="exportTable">导出</el-button>
        </div>
      </div>
    </div>
    <!-- 头部end  -->

    <div class="box">
      <!-- 表格  -->
      <el-table :data="tableData" stripe style="width: 100%" border :height="clientHeight+'px'">
        <el-table-column type='index' label="序号" width="60" />
        <el-table-column prop="name" label="施工人" />
        <el-table-column prop="name" label="工种"/>
        <el-table-column prop="name" label="班组"/>
        <el-table-column prop="name" label="申报工程量" />
        <el-table-column prop="name" label="申报日期" />
        <el-table-column prop="name" label="申报人" />
        <el-table-column prop="name" label="申报人账号" />
        <el-table-column label="状态">
         <template slot-scope="scope">
           <p style="color: #1890ff;" v-if="scope.row.status==0">待验收</p>
           <p style="color: #D9001B;" v-else>已验收</p>
         </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="yanshou(scope.row)">验收</el-button>
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
    getCollectionClass
  } from '../../../api/user.js'
  import { formatDate } from '@/utils/validate'
  export default {
    data() {
      return {
         PageIndex:1,
         tableData:[
           {name:'你好',status:0},
           {name:'你好a',status:1}
         ],
         clientHeight:'',
         startTime:'',
         endTime:'',
         allduizhang:[
           {
             label: '待验收',
             value: '0'
           }, {
             label: '已验收',
             value: '1'
           }
         ],
         duizhangvalue:'',
         loading:false,
         PageIndex: 1, // 页码
         PageSize: 10, // 显示多少条数据
         PageCount: 0, // 总条数

      }
    },
    created() {
      this.getWebHeing();
      // this.loadDate();
    },
    methods: {
      loadDate(status){
        this.loading = true;
        var params = {
          pageSize:20,
          pageNum:1,
          status:status
        }
        getCollectionClass(params).then(res => {
          this.loading = false;
          var data = res.data.list
          console.log('res', data)
          this.tableData = data

        })
      },
      search() {
        console.log('查询')
        this.loadDate();
      },
      // 重置
      raLoad(){
        this.statusvalue = '';
        this.PageIndex = 1;
        this.loadDate();
      },
      exportTable(){

      },
      // 验收
      yanshou(row){
        this.$confirm('本次验收工程量为XXX平方，合计施工服务费XXX.XX元', '确认提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

            this.$message({
              type: 'success',
              message: '操作成功!'
            })
        }).catch(() => {

        })
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
      			.offsetHeight - 180;
      	})
      	window.addEventListener('resize', () => {
      		if(document.getElementById('top')!=null){
      		  this.clientHeight = document.documentElement.clientHeight - document.getElementById('top')
      		  	.offsetHeight - document.getElementById('page')
      		  	.offsetHeight - 180;
      		  this.$forceUpdate();
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
.tab{

  .tabItem{
    border: 1px solid #DCDFE6;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 14px;
  }
  .tabItemHov{
    background-color: #1890ff;
    color: #FFFFFF;
  }
}

</style>
