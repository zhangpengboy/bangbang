<template>
	<div class="examine" v-loading="loading">
		<!-- 头部  -->
		<div class="top" id="top">
			<div class="top-title ">数据筛选</div>
			<div class="top-content flex fvertical fbetween">
				<div class="top-content-item flex fvertical">
					<div class="flex fvertical top-content-item-status">
						<span>输入查询：</span>
						<el-input class="top-content-item-input" v-model="keywords" placeholder="ID/项目名称">
						</el-input>
					</div>
					<!-- <div class="flex fvertical top-content-item-status">
						<span>余额预警状态：</span>
						<el-select v-model="value" placeholder="选择跟进人">
							<el-option v-for="item in options" :key="item.value" :label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
					</div> -->
					<div class="flex fvertical top-content-item-status">
						<span>状态：</span>
						<el-select v-model="status" placeholder="请选择状态">
							<el-option v-for="item in statusList" :key="item.value" :label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
					</div>
				</div>
				<div class="top-content-btn">
					<el-button type="primary" @click="handlekeywords">查询</el-button>
					<el-button @click="handleReset">重置</el-button>
				</div>
			</div>
		</div>
		<!-- 头部end  -->
		<div class="box">
			<div class="examine-box flex fvertical fbetween" id="boxTop">
				<div class="examine-box-title bold ">数据筛选</div>
				<el-button type="primary" size="small" @click='getExport'>导出</el-button>
			</div>

			<el-table :data="tableData" border style="width: 100%" :height="clientHeight+'px'">
				<el-table-column prop="creatorId" label="ID" width="170">
				</el-table-column>
				<el-table-column prop="title" label="项目名称" width="180">
				</el-table-column>
				<el-table-column prop="createName" label="名称">
				</el-table-column>
				<el-table-column prop="phone" label="手机号码">
				</el-table-column>
				<el-table-column prop="reason" label="理由">
				</el-table-column>
				<el-table-column label="状态">
					<template slot-scope="scope">
						<p v-if="scope.row.status == 0" class="color-warning">审核中</p>
						<p v-if="scope.row.status == 1" class="color-success">已通过</p>
						<p v-if="scope.row.status == 2" class="color-error">已拒绝</p>
					</template>
				</el-table-column>
				<el-table-column prop="updateName" label="操作人">
				</el-table-column>
				<el-table-column prop="address" label="操作时间">
					<template slot-scope="scope">
						<p>{{formatDate(scope.row.updateTime)}}</p>
					</template>
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<template v-if="scope.row.status == 0">
							<el-button type="primary" size="small" @click='goRecruit(scope.row)'>通过</el-button>
							<el-button type="danger" size="small" @click="handleClose(scope.row)">拒绝</el-button>
						</template>

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
	</div>
</template>

<script>
	import {
		getExamieList,
		getUpdateExamieList
	} from '../../../api/user.js'
	import moment from 'moment'
	export default {
		data() {
			return {
				statusList: [{
					label: "全部",
					value: ""
				}, {
					label: "审核中",
					value: 0
				}, {
					label: "已拒绝",
					value: 2
				}, {
					label: "已通过",
					value: 1
				}],
				status: "",
				keywords: "",
				pageIndex: 1, // 页码
				pageSize: 10, // 显示多少条数据
				PageCount: 0, // 总条数
				tableData: [],
				loading: false,
				clientHeight:0
			}
		},
		mounted() {
			this.getDataList();
			this.getWebHeing();
		},
		methods: {
			formatDate(value) {
				return value ? moment(value).format('YYYY-MM-DD HH:mm:ss') : '';
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
			/** 导出 */
			getExport() {},
			/** 通过 */
			goRecruit(row) {
				this.$confirm('是否通过取消报名申请', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let param = {};
					param.id = row.enrollId;
					param.status = 1;
					this.getUpdateExamieList(param);
				})
			},
			/** 拒绝 */
			handleClose(row) {
				this.$confirm('是否拒绝取消报名申请', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let param = {};
					param.id = row.enrollId;
					param.status = 2;
					this.getUpdateExamieList(param);
				})
			},
			/** 修改状态方法 */
			async getUpdateExamieList(data) {
				let res = await getUpdateExamieList(data);
				this.$message.success('修改成功');
				this.getDataList();
			},
			/** 获取取消报名审核 */
			async getDataList() {
				let param = {};
				param.pageIndex = this.pageIndex,
				param.pageSize = this.pageSize,
				param.keywords = this.keywords;
				param.status = this.status;
				this.loading = true;
				try{
					let res = await getExamieList(param);
					this.loading = false;
					this.PageCount = res.data.total;
					this.tableData = res.data.records;
					console.log('获取取消报名审核::', res);
				}catch(e){
					this.loading = false;
				}
				
			},
			/** 选择分页 */
			handleSizeChange(e) {
				this.pageSize = e;
				this.pageIndex = 1;
				this.getDataList()
			},
			/** 点击分页 */
			handleCurrentChange(e) {
				this.pageIndex = e;
				this.getDataList()
			},
			/** 搜索 */
			handlekeywords() {
				this.pageIndex = 1;
				this.getDataList();
			},
			/** 重置 */
			handleReset() {
				this.keywords = '';
				this.status = '';
				this.getDataList();
			}
		}
	}
</script>

<style>
	.examine {
		padding-top: 20px;
	}

	.examine-box {
		padding-bottom: 20px;
	}
</style>
