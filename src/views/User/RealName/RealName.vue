<template>
  <div class="attendance"  v-loading="loading">
    <!-- 头部  -->
    <div class="top" id="top">
      <div class="top-title ">数据筛选</div>
      <div class="top-content flex fvertical fbetween">
        <div class="top-content-item flex fvertical">
          <div class="flex fvertical top-content-item-status">
            <span>输入查询：</span>
            <el-input v-model="serach" clearable class="top-content-item-input" placeholder="用户ID/手机号码/真实姓名" />
          </div>
          <div class="flex fvertical top-content-item-status">
            <span>状态：</span>
            <el-select v-model="statusvalue" placeholder="全部" clearable>
              <el-option
                v-for="item in allStatus"
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
        </div>
      </div>
    </div>
    <!-- 头部end  -->

    <div class="box">
      <div class="box-top flex fbetween fvertical" id="boxTop">
        <div class="bold">数据列表</div>
        <el-button type="primary" @click="exportTable">导出</el-button>
      </div>
      <!-- 表格  -->
      <el-table :data="tableData" stripe style="width: 100%" border :height="clientHeight+'px'">
        <el-table-column type='index' label="序号" width="60" />
        <el-table-column prop="id" label="ID"  width="160"/>
        <el-table-column prop="phone" label="手机号码" width="120"/>
        <el-table-column prop="realName" label="真实姓名" width="120"/>
        <el-table-column  label="性别">
          <template slot-scope="scope">
            {{scope.row.gender == 0 ?'男':scope.row.gender == 1 ?'女':'未知'}}
          </template>
        </el-table-column>
        <el-table-column prop="age" label="年龄"/>
        <el-table-column prop="idNo" label="身份证号" width="180"/>
        <el-table-column label="状态" width="120">
          <template slot-scope="scope">
            <p style="color:#F59A23 ;" v-if="scope.row.status == 1">审核中</p>
            <p style="color: #03BF16;" v-if="scope.row.status == 2">审核成功</p>
            <p style="color: #D9001B;" v-if="scope.row.status == 3">审核失败</p>
          </template>
         </el-table-column>
        <el-table-column prop="updaterName" label="操作人" width="100"/>
        <el-table-column prop="updateTime" label="操作时间" width="200"/>
        <el-table-column label="操作" width="220">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="seeDetail(scope.row)">查看详情</el-button>
            <template v-if="scope.row.status == 1">
              <el-button type="success" size="small" @click="agree(scope.row)">同意</el-button>
              <el-button type="danger" size="small" @click="refuse(scope.row)">拒绝</el-button>
            </template>

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
    userRealNameApplyPage,
    userRealNameApplyexportCsv,
    userRealNameApplyupdateStatus
  } from '../../../api/user.js'
  import { formatDate } from '@/utils/validate'
  export default {
    data() {
      return {
         allStatus: [
           {
             label: '全部',
             value: ''
           }, {
             label: '实名成功',
             value: '2'
           }, {
             label: '实名失败',
             value: '3'
           }
         ],
         statusvalue: '',
         tableData:[],
         serach:'',
         loading:false,
         PageIndex: 1, // 页码
         PageSize: 10, // 显示多少条数据
         PageCount: 0, // 总条数
         clientHeight:0,

      }
    },
    created() {
      this.getWebHeing();
      this.loadDate();
    },
    methods: {
      loadDate(){
        this.loading = true;
        var params = {
          pageSize:this.PageSize,
          pageNum:this.PageIndex,
          status:this.statusvalue,
          keyword:this.serach
        }
        userRealNameApplyPage(params).then(res => {
          this.loading = false;
          for(var i=0;i<res.data.list.length;i++){
            res.data.list[i].updateTime = formatDate(res.data.list[i].updateTime)
          }
          var data = res.data.list
          console.log('res', data)
          this.tableData = data

        })
      },
      search() {
        console.log('查询')
        this.loadDate(this.statusvalue);
      },
      // 重置
      raLoad(){
        this.statusvalue = '';
        this.serach = '';
        this.PageIndex = 1;
        this.loadDate(this.statusvalue);
      },
      // 导出
      exportTable(){
        console.log('导出');
        var query = {
          pageSize:this.PageSize,
          pageNum:this.PageIndex,
          status:this.statusvalue,
          keyword:this.serach
        }
        console.log(query);
        userRealNameApplyexportCsv(query).then(res => {
          console.log(res)
          var responseURL = res.request.responseURL;
          window.open(responseURL,'_blank')
        }).catch(res=>{
          console.log(res)
          this.$message({
              message:'下载失败！',
              type:'error',
              showClose:true
          })
        })
      },
      seeDetail(row){
        console.log(row)
        this.$router.push({ path: '/User/RealNameDetail', query: { id: row.id }})
      },
      agree(row){
        console.log(row)
        this.$confirm('是否同意申请?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            var data = {
              id:row.id,
              status:true
            }
            userRealNameApplyupdateStatus(data).then(res => {
              this.$message({
                type: 'success',
                message: '操作成功!'
              })
              this.loadDate(this.statusvalue);
            })

        }).catch(() => {

        })
      },
      refuse(row){
        console.log(row)
        this.$confirm('是否拒绝申请?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            var data = {
              id:row.id,
              status:false
            }
            userRealNameApplyupdateStatus(data).then(res => {
              this.$message({
                type: 'success',
                message: '操作成功!'
              })
              this.loadDate(this.statusvalue);
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

</style>
