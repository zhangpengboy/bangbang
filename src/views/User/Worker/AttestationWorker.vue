<template>
	<div class="main">
		<!-- 头部  -->
		<div class="top" id="top">
			<div class="top-title ">数据筛选</div>
			<div class="top-content flex fvertical fbetween">
				<div class="top-content-item flex fvertical ">
					<div class="flex fvertical top-content-item-status">
						<span>输入查询：</span>
						<el-input class="top-content-item-input" clearable v-model="keywords" placeholder="用户ID/名称/手机号码">
						</el-input>
					</div>
					<div class="flex fvertical top-content-item-status">
						<span>状态：</span>
						<el-select v-model="status" placeholder="选择状态" clearable>
							<el-option v-for="item in statusList" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</div>
				</div>
				<div class="top-content-btn">
					<el-button type="primary" @click="handelSearch"> 查询</el-button>
					<el-button @click="handleReset">重置</el-button>
				</div>
			</div>
		</div>
		<!-- 头部end -->
		<!-- 表格  -->
		<div class="box">
			<div class="box-top flex fbetween fvertical" id="boxTop">
				<div class="bold">数据列表</div>
				<el-button type="primary" @click="exportTable">导出</el-button>
			</div>
			<el-table :data="tableData" stripe style="width: 100%" border :height="clientHeight+'px'">
				<el-table-column prop="date" label="序号" width="60">
					<template slot-scope="scope">
						{{pageSize * (pageIndex -1) +1 + scope.$index}}
					</template>
				</el-table-column>
				<el-table-column prop="userId" label="用户ID " width="200">
				</el-table-column>
				<el-table-column prop="realName" label="名称">
				</el-table-column>
				<el-table-column prop="phone" label="手机号码">
				</el-table-column>
				<el-table-column prop="applyStatus" label="状态">
          <template slot-scope="scope">
            <p style="color:#F59A23 ;" v-if="scope.row.applyStatus == 1">审核中</p>
            <p style="color: #03BF16;" v-if="scope.row.applyStatus == 2">审核成功</p>
            <p style="color: #D9001B;" v-if="scope.row.applyStatus == 3">已驳回</p>
          </template>
				</el-table-column>
				<el-table-column prop="createTime" label="申请时间">
				</el-table-column>
				<el-table-column prop="updaterName" label="操作人">
				</el-table-column>
				<el-table-column prop="updateTime" label="操作时间">
				</el-table-column>
				<el-table-column  label="操作">
					<template slot-scope="scope" v-if="scope.row.applyStatus == 1">
						<el-button type="primary" size="mini" @click="agree(scope.row)">同意</el-button>
						<el-button type="danger" size="mini" @click="refuse(scope.row)">拒绝</el-button>
					</template>
				</el-table-column>
			</el-table>

			<!-- 分页  -->
			<div class="flex fcenter page">
				<el-pagination class="page" id="page" background @size-change="handleSizeChange"
					@current-change="handleCurrentChange" :current-page="pageIndex" :page-sizes="[10, 20, 30, 40]"
					:page-size="pageSize" layout="total, prev, pager, next,sizes, jumper" :total="PageCount">
				</el-pagination>
			</div>
			<!-- 分页end -->
		</div>
		<!-- 表格end -->
	</div>
</template>

<script>
  import {
    userMemberApplyPage,
    userMemberApplyexportCsv,
    userMemberApplyupdateStatus
  } from '../../../api/user.js'
  import { formatDate } from '@/utils/validate'
	export default {
		data() {
			return {
				keywords: "", // 搜索
				status: "", // 状态
				statusList: [{ // 状态列表
					label: "全部",
					value: "",
				}, {
					label: "审核中",
					value: 1,
				}, {
					label: "审核通过",
					value: 2,
				}, {
					label: "已驳回",
					value: 3,
				}],
				pageIndex: 1, // 页码
				pageSize: 10, // 显示多少条数据
				PageCount: 0, // 总条数
				clientHeight: 0,
				tableData: [],
			}
		},
		mounted() {
			this.getWebHeing();
      this.loadDate();
		},
		methods:{
			loadDate(){
			  this.loading = true;
			  var params = {
			    pageSize:this.pageSize,
			    pageNum:this.pageIndex,
			    applyStatus:this.status,
			    keyword:this.keywords
			  }
			  userMemberApplyPage(params).then(res => {
			    this.loading = false;
			    for(var i=0;i<res.data.list.length;i++){
			      res.data.list[i].updateTime = formatDate(res.data.list[i].updateTime)
            res.data.list[i].createTime = formatDate(res.data.list[i].createTime)
			    }
			    var data = res.data.list
			    console.log('res', data)
			    this.tableData = data

			  })
			},
			/** 选择分页 */
			handleSizeChange(e) {
				this.pageSize = e;
				this.pageIndex = 1;
        this.loadDate();
			},
			/** 点击分页 */
			handleCurrentChange(e) {
				this.pageIndex = e;
        this.loadDate();
			},
			/** 搜索 */
			handelSearch() {
				this.pageIndex = 1;
        this.loadDate();
			},
			/** 重置 */
			handleReset() {
				this.keywords = '';
				this.pageIndex = 1;
				this.status = '';
        this.loadDate();
			},
      // 导出
      exportTable(){
        console.log('导出');
        var query = {
          pageSize:this.pageSize,
          pageNum:this.pageIndex,
          applyStatus:this.status,
          keyword:this.keywords
        }
        userMemberApplyexportCsv(query).then(res => {
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
      agree(row){
        this.$confirm('是否同意申请?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           this.changeStatus(row.id,true)
        }).catch(() => {

        })
      },
      refuse(row){
        this.$confirm('是否拒绝申请?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           this.changeStatus(row.id,false)
        }).catch(() => {

        })
      },
      changeStatus(id,status){
        var params = {
          id:id,
          status:status
        }
        userMemberApplyupdateStatus(params).then(res => {
          this.$message({
            type: 'success',
            message: '操作成功!'
          })
          this.loadDate();
        })
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
      		this.clientHeight = document.documentElement.clientHeight - document.getElementById('top')
      			.offsetHeight - document.getElementById('page')
      			.offsetHeight - document.getElementById('boxTop')
      			.offsetHeight - 180;
      		this.$forceUpdate();
      	})
      },
		}
	}
</script>

<style>
</style>
