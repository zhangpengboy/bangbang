<template>
	<div class="main">
		<div class="top" id="top">
			<div class="top-title ">数据筛选</div>
			<div class="top-content flex fvertical fbetween">
				<div class="top-content-item flex fvertical">
					<div class="flex fvertical top-content-item-status">
						<span>输入查询：</span>
						<el-input class="top-content-item-input profit-search" v-model="keyword"
							@keyup.enter.native="handelSearch" placeholder="用户ID/推荐工人名称/手机号码">
						</el-input>
					</div>
					<div class="flex fvertical top-content-item-status">
						<span>核对时间：</span>
						<el-date-picker v-model="date" type="date" placeholder="选择日期">
						</el-date-picker>
					</div>
				</div>

				<div class="top-content-btn">
					<el-button type="primary" @click="handelSearch"> 查询</el-button>
					<el-button @click="handleReset">重置</el-button>
				</div>
			</div>
		</div>


		<div class="box">
			<div class="box-top flex fbetween fvertical" id="boxTop">
				<div class="bold">张三已核对总金额：2000元</div>
				<el-button @click="handleExport">导出</el-button>
			</div>

			<!-- 表格  -->
			<el-table :data="tableData" stripe style="width: 100%" border>
				<el-table-column prop="date" label="序号" width="60">
					<template slot-scope="scope">
						{{pageSize * (pageIndex -1) +1 + scope.$index}}
					</template>
				</el-table-column>
				<el-table-column prop="userId" label="用户ID" width="200">
				</el-table-column>
				<el-table-column prop="userName" label="推荐工人名称">
				</el-table-column>
				<el-table-column prop="phone" label="手机号码">
				</el-table-column>
				<el-table-column label="收益类型" prop="fee">
				</el-table-column>
				<el-table-column label="收益金额" prop="fee">
				</el-table-column>
				<el-table-column label="收益时间" prop="fee">
				</el-table-column>
				<el-table-column label="操作人" prop="fee">
				</el-table-column>
				<el-table-column label="核对时间" width="220">
				</el-table-column>
			</el-table>
			<!-- 表格end -->


			<!-- 分页  -->
			<div class="flex fcenter page">
				<el-pagination class="page" id="page" background @size-change="handleSizeChange"
					@current-change="handleCurrentChange" :current-page="pageIndex" :page-sizes="[10, 20, 30, 40]"
					:page-size="pageSize" layout="total, prev, pager, next,sizes, jumper" :total="pageCount">
				</el-pagination>
			</div>
			<!-- 分页end -->
		</div>

	</div>
</template>

<script>
	import {
		getPartnerRebateDetails,
		getPartnerRebateDetailsExport
	} from '../../api/user.js'
	export default {
		data() {
			return {
				tableData: [],
				date: "", // 日期
				keyword: "", // 搜索
				pageIndex: 1, // 页码
				pageSize: 10, // 页数
				pageCount: 0,
				userId:null, // 用户ID
				status:0 , // 用户类型
			}
		},
		methods: {
			/** 获取列表数据 */
			async getPartnerRebateDetailsExport(){
				let param = {};
				param.pageNum = this.pageIndex;
				param.pageSize = this.pageSize;
				param.keyword = this.keyword;
				param.createTimeBegin = this.date;
				param.userId = this.userId;
				param.status = this.status;
				let res = await getPartnerRebateDetailsExport()
			},
			/** 获取列表数据end */
			/** 搜索 */
			handelSearch() {},
			/** 重置 */
			handleReset() {
				this.date = '';
				this.keyword = '';
			},
			/** 选择分页 */
			handleSizeChange(e) {
				this.pageSize = e;
				this.pageIndex = 1;
				this.getPartnerRebateDetailsExport();
			},
			/** 点击分页 */
			handleCurrentChange(e) {
				this.pageIndex = e;
				this.getPartnerRebateDetailsExport();
			},
		}
	}
</script>

<style>
</style>
