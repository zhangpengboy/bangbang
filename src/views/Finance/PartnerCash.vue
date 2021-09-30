<template>
	<div class="main" v-loading="loading">
		<!-- 头部  -->
		<div class="top" id="top">
			<div class="top-title ">数据筛选</div>
			<div class="top-content flex fvertical fbetween">
				<div class="top-content-item flex fvertical">
					<div class="flex fvertical top-content-item-status">
						<span>输入查询：</span>
						<el-input class="top-content-item-input" v-model="keyword" @keyup.enter.native="handelSearch"
							placeholder="用户ID/名称/手机号码">
						</el-input>
					</div>
					<div class="flex fvertical top-content-item-status">
						<span>状态：</span>
						<el-select v-model="status" placeholder="选择类型">
							<el-option v-for="item in statusList" :key="item.value" :label="item.label"
								:value="item.value">
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
		<!-- 头部end  -->
		<div class="box">
			<div class="box-top flex fbetween fvertical" id="boxTop">
				<div class="bold">数据列表</div>
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
				<el-table-column prop="createName" label="名称">
				</el-table-column>
				<el-table-column prop="phone" label="手机号码">
				</el-table-column>
				<el-table-column label="提现金额" prop="fee">
				</el-table-column>
				<el-table-column label="到账微信" width="140" prop="wechatName">
				</el-table-column>
				<el-table-column label="订单号" prop="orderCode">
				</el-table-column>
				<el-table-column label="申请时间">
					<template slot-scope="scope">
						{{formatDate(scope.row.createTime)}}
					</template>
				</el-table-column>
				<el-table-column label="状态">
					<template slot-scope="scope">
						<p v-if="scope.row.status == 0">审核中</p>
						<p v-if="scope.row.status == 1">已驳回</p>
						<p v-if="scope.row.status == 2">已转账</p>
					</template>
				</el-table-column>
				<el-table-column prop="updateName" label="操作人">
				</el-table-column>
				<el-table-column label="操作时间" width="120">
					<template slot-scope="scope">
						{{formatDate(scope.row.updateTime)}}
					</template>
				</el-table-column>
				<el-table-column label="操作" width="220">
					<template slot-scope="scope">
						<el-button type="text" v-if="scope.row.status == 1">查看理由</el-button>
						<div v-else>
							<el-button type="primary" @click="handleSumbit(scope.row)">通过</el-button>
							<el-button type="danger" @click="handleError(scope.row)">拒绝</el-button>
						</div>
					</template>
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
		getPartnerCash,
		getPartnerCashUpdateStatus
	} from '../../api/user.js'
	import moment from 'moment'
	export default {
		data() {
			return {
				keyword: "",
				status: "",
				statusList: [{
					label: "全部",
					value: ""
				}, {
					label: "审核中",
					value: 0
				}, {
					label: "已驳回",
					value: 1
				}, {
					label: "已转账",
					value: 2
				}],
				tableData: [],
				pageCount: 0,
				pageSize: 10,
				pageIndex: 1,
				loading: false,
			}
		},
		mounted() {
			this.getPartnerCash();
		},
		methods: {

			formatDate(value) {
				return value ? moment(value).format('YYYY-MM-DD') : ''
			},
			/** 搜索 */
			handelSearch() {
				this.pageIndex = 1;
				this.getPartnerCash()
			},
			/** 重置 */
			handleReset() {
				this.pageIndex = 1;
				this.status = '';
				this.keyword = '';
				this.getPartnerCash()
			},
			/** 拒绝 */
			handleError(row) {
				let param = {};
				param.id = row.id;
				param.status = 2;
				this.$prompt('是否拒绝提现申请', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					inputPlaceholder: "填写拒绝理由"
				}).then(({
					value
				}) => {
					param.reason = value ? value : '';
					this.getPartnerCashUpdateStatus(param);
				}).catch(() => {});
			},
			/** 通过 */
			handleSumbit(row) {
				this.$message.error('功能暂未开发');
				return;
				let param = {}
				param.id = row.id;
				param.status = 2;
				this.$confirm('是否已经转账', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.getPartnerCashUpdateStatus(param);
				}).catch(() => {});
			},
			async getPartnerCashUpdateStatus(param) {
				let res = await getPartnerCashUpdateStatus(param);
				this.$message.success('提现成功')
				this.getPartnerCash();
			},
			/** 获取数据列表 */
			async getPartnerCash() {
				this.loading = true;
				try {
					let param = {};
					param.pageNum = this.pageIndex;
					param.pageSize = this.pageSize;
					param.keyword = this.keyword;
					param.status = this.status;
					let res = await getPartnerCash(param);
					console.log(res);
					this.pageCount = res.data.total;
					this.tableData = res.data.list
					this.loading = false;
				} catch (e) {
					this.loading = false;
					//TODO handle the exception
				}

			},
			/** 选择分页 */
			handleSizeChange(e) {
				this.pageSize = e;
				this.pageIndex = 1;
				this.getPartnerCash();
			},
			/** 点击分页 */
			handleCurrentChange(e) {
				this.pageIndex = e;
				this.getPartnerCash();
			},
			/**导出 */
			handleExport() {
				let url =
					`/api/marketing/admin/marketing/partner/withdraw/v1.0.1/export?status=${this.status}&keyword=${this.keyword}`
				window.open(url);		
			},
		}
	}
</script>

<style>
</style>
