<template>
	<div class="main" v-loading="lodaing">
		<!-- 头部  -->
		<div class="top" id="top">
			<div class="top-title ">数据筛选</div>
			<div class="top-content flex fvertical fbetween">
				<div class="top-content-item flex fvertical f1">
					<div class="flex fvertical top-content-item-status">
						<span>输入查询：</span>
						<el-input class="top-content-item-input" v-model="keyword" placeholder="用户ID/账号">
						</el-input>
					</div>
				</div>

				<div class="top-content-btn">
					<el-button type="primary" @click="handelSearch"> 查询</el-button>
					<el-button @click="handleReset">重置</el-button>
				</div>
			</div>
		</div>
		<!-- 头部end -->

		<!-- 数据列表 -->
		<div class="box">
			<div class="box-top flex fbetween fvertical" id="boxTop">
				<div class="bold">数据列表</div>
				<el-button @click="handleExport">导出</el-button>
			</div>
			<el-table :data="tableData" stripe style="width: 100%" border :height="clientHeight+'px'">
				<el-table-column prop="date" label="序号" width="60">
					<template slot-scope="scope">
						{{pageSize * (pageIndex -1) +1 + scope.$index}}
					</template>
				</el-table-column>
				<el-table-column prop="userId" label="ID" width="200">
				</el-table-column>
				<el-table-column prop="userName" label="名称" width="200">
				</el-table-column>
				<el-table-column prop="phone" label="手机号码">
				</el-table-column>
				<el-table-column  label="状态">
					<template slot-scope="scope">
						<p v-if="scope.row.status == 0">审核中</p>
						<p v-if="scope.row.status == 1">审核通过</p>
						<p v-if="scope.row.status == 2">已驳回</p>
					</template>
				</el-table-column>
				<el-table-column  label="申请时间">
					<template slot-scope="scope">
						{{formatDate(scope.row.createTime)}}
					</template>
				</el-table-column>
				<el-table-column  label="操作">
				</el-table-column>
			</el-table>

			<!-- 分页  -->
			<div class="flex fcenter page">
				<el-pagination class="page" id="page" background @size-change="handleSizeChange"
					@current-change="handleCurrentChange" :current-page="pageIndex" :page-sizes="[10, 20, 30, 40]"
					:page-size="pageSize" layout="total, prev, pager, next,sizes, jumper" :total="pageCount">
				</el-pagination>
			</div>
			<!-- 分页end -->
		</div>
		<!-- 数据列表end -->
	</div>
</template>

<script>
	import {
		getApplyRecord
	} from '../../../api/user.js'
	import moment from 'moment'
	export default {
		data() {
			return {
				keyword: "",
				pageIndex: 1, // 页码
				pageSize: 10, // 显示多少条数据
				pageCount: 0, // 总条数
				clientHeight: 0,
				tableData: [], // 表格列表
				lodaing:false
			}
		},
		mounted() {
			this.getWebHeing();
			this.getApplyRecord();
		},
		methods: {
			formatDate(value) {
				return value ? moment(value).format('YYYY-MM-DD') : '';
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
			/** 获取审核列表 */
			async getApplyRecord() {
				this.lodaing = true;
				try{
					let param = {};
					param.pageNum = this.pageIndex
					param.pageSize = this.pageSize;
					param.keyword = this.keyword;
					let res = await getApplyRecord(param);
					this.pageCount = res.data.total;
					this.lodaing = false;
					this.tableData = res.data.list;
				}catch(e){
					this.lodaing = false;
					//TODO handle the exception
					console.log(e)
				}
				
			},
			/** 查询 */
			handelSearch() {
				this.pageIndex = 1;
				this.getApplyRecord();
			},
			/** 重置 */
			handleReset() {
				this.pageIndex = 1;
				this.keyword = '';
				this.getApplyRecord();
			},
			/** 选择分页 */
			handleSizeChange(e) {
				this.pageSize = e;
				this.pageIndex = 1;
				this.getApplyRecord();
			},
			/** 点击分页 */
			handleCurrentChange(e) {
				this.pageIndex = e;
				this.getApplyRecord();
			},
			/** 导出 */
			handleExport() {
				let url =
					`/api/marketing/admin/marketing/partner/apply/v1.0.1/export?pageNum=${this.pageIndex}&keyword=${this.keyword}&pageSize=${this.pageSize}`
				console.log(url)
				window.open(url);

			
			},
		}
	}
</script>

<style>
</style>
