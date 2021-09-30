<template>
	<div class="main" v-loading="loading">

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
					<div class="flex fvertical top-content-item-status">
						<span>状态：</span>
						<el-select v-model="status" placeholder="请选择">
							<el-option v-for="item in options" :key="item.value" :label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
					</div>
				</div>
				<div class="top-content-btn">
					<el-button type="primary" @click="handleSearch">查询</el-button>
					<el-button @click="handleReset">重置</el-button>
				</div>
			</div>
		</div>
		<!-- 头部end  -->
		<!-- 内容  -->
		<div class="box">

			<div class="box-top flex fbetween fvertical" id="boxTop">
				<div class="bold">数据列表</div>
				<el-button>导出</el-button>
			</div>

			<el-table :data="tableData" border style="width: 100%" :stripe="true" :height="clientHeight+'px'">
				<el-table-column prop="orderNum" label="ID" width="170">
				</el-table-column>
				<el-table-column prop="title" label="项目名称" width="120">
				</el-table-column>
				<el-table-column label="图片">
					<template slot-scope="scope">
						<img :src="item" class="table-img" v-for="(item,index) in scope.row.images" :key="index" />
					</template>
				</el-table-column>
				<el-table-column prop="fee" label="充值金额" width="120">
				</el-table-column>
				<el-table-column label="状态" width="80">
					<template slot-scope="scope">
						<p v-if="scope.row.status == 0" class="color-warning">等待对账</p>
						<p v-if="scope.row.status == 1" class="color-success">对账通过</p>
						<p v-if="scope.row.status == 2" class="color-error">已驳回</p>
					</template>
				</el-table-column>
				<el-table-column label="申请时间">
					<template slot-scope="scope">
						<p>{{formatDate(scope.row.createTime)}}</p>
					</template>
				</el-table-column>
				<el-table-column prop="updateName" label="操作人" width="100">
				</el-table-column>
				<el-table-column label="操作时间">
					<template slot-scope="scope">
						<p>{{formatDate(scope.row.updateTime)}}</p>
					</template>
				</el-table-column>
				<el-table-column prop="address" label="操作">
					<template slot-scope="scope">
						<template v-if="scope.row.status == 0">
							<el-button size="mini" type="primary" @click="handleMoney(scope.$index,scope.row)">修改金额
							</el-button>
							<el-button size="mini" type="success" @click="handleAdopt(scope.$index, scope.row)">通过
							</el-button>
							<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">拒绝
							</el-button>
						</template>
						<el-button v-if="scope.row.status == 2 " type="text" size="mini" @click="handleLook(scope.row)">
							查看理由</el-button>
					</template>
				</el-table-column>
			</el-table>


			<div class="flex fcenter page">
				<el-pagination class="page" id="page" background @size-change="handleSizeChange"
					@current-change="handleCurrentChange" :current-page="pageIndex" :page-sizes="[10, 20, 30, 40]"
					:page-size="pageSize" layout="total, prev, pager, next,sizes, jumper" :total="pageCount">
				</el-pagination>
			</div>

		</div>
		<!-- 内容end  -->

		<!--  编辑金额 -->
		<el-dialog title="修改充值金额" :visible.sync="isMoney" width="30%" :before-close="handleClose">
			<el-input v-model="money" ref="money" placeholder="请输入需要修改的充值金额"
				oninput="value=value.replace(/[^0-9.]/g,'')">
			</el-input>
			<span slot="footer" class="dialog-footer ">
				<el-button @click="isMoney = false">取 消</el-button>
				<el-button type="primary" @click="getUpdateFee">确 定</el-button>
			</span>
		</el-dialog>
		<!--  编辑金额 -->

		<!--  拒绝理由 -->
		<el-dialog title="拒绝理由" :visible.sync="isLook" width="30%" :before-close="handleCloseLookReason">
			<span>{{reason}}</span>
			<span slot="footer" class="dialog-footer ">
				<el-button type="primary" @click="isLook = false">确 定</el-button>
			</span>
		</el-dialog>
		<!--  拒绝理由end -->



	</div>
</template>

<script>
	import {
		getBriefPay,
		getUpdateStatus,
		getUpdateFee
	} from '../../api/user.js'
	import moment from 'moment'
	export default {
		data() {
			return {
				isLook: false, // 是否显示查看理由
				isMoney: false, // 是否显示金额
				pageIndex: 1, // 页码
				pageSize: 10, // 显示多少条数据
				pageCount: 0, // 总条数
				options: [{
					value: '',
					label: "全部"
				}, {
					value: 0,
					label: "等待对账"
				}, {
					value: 2,
					label: "已驳回"
				}, {
					value: 1,
					label: "对账通过"
				}], // 状态列表
				status: "", // 选中
				keywords: "", // 搜索
				tableData: [{}], // 表格
				money: "", // 金额
				reason: "", // 拒绝理由
				rowID: null,
				loading: false,
				clientHeight: 0
			}
		},
		watch: {
			isMoney(val) {
				if (val) {
					this.$nextTick(() => {
						console.log(this.$refs)
						this.$refs.money.focus();
						this.money = ''
					})
				}
			}
		},
		mounted() {
			this.getBriefPay();
			this.getWebHeing();
		},
		methods: {
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
			formatDate(value) {
				return moment(value).format('YYYY-MM-DD')
			},
			/** 查询 */
			handleSearch() {
				this.pageIndex = 1;
				this.getBriefPay();
			},
			/** 重置 */
			handleReset() {
				this.status = '';
				this.keywords = '';
				this.handleSearch();
			},
			/**获取充值列表 */
			async getBriefPay() {
				this.loading = true;
				try {
					let param = {};
					param.pageIndex = this.pageIndex;
					param.pageSize = this.pageSize;
					param.keywords = this.keywords;
					param.status = this.status;
					let res = await getBriefPay(param);
					this.pageCount = res.data.total;
					this.tableData = res.data.records
					this.loading = false;
				} catch (e) {
					this.loading = false;
					//TODO handle the exception
				}
			},
			/** 显示修改金额 */
			handleMoney(index, row) {
				this.isMoney = true;
				this.rowID = row.id;
			},
			/**修改金额  */
			async getUpdateFee() {
				let param = {};
				param.id = this.rowID;
				param.fee = this.money;
				let res = await getUpdateFee(param);
				this.$message.success('操作成功')
				this.getBriefPay();
				this.isMoney = false;
			},
			/** 通过 */
			handleAdopt(index, row) {
				console.log(index, row)
				this.$confirm('是否通过对账申请?', '是否通过对账申请', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.getUpdateStatus(row.id)
				}).catch(() => {

				});
			},
			async getUpdateStatus(id, status = 1, reason = '') {
				try {
					let param = {};
					param.id = id;
					param.status = status;
					param.reason = reason;

					let res = await getUpdateStatus(param);
					this.$message.success('操作成功')
					this.getBriefPay();
				} catch (e) {
					//TODO handle the exception
					console.log(e)
				}


			},
			/** 拒绝 */
			handleDelete(index, row) {
				this.$prompt('是否拒绝提现申请', '确认提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					inputPlaceholder: '填写拒绝理由',
					inputPattern: /^(?!\d)[\u4e00-\u9fa5a-zA-Z0-9_-]{1,25}$/,
					inputErrorMessage: '请输入拒绝申请理由'
				}).then(({
					value
				}) => {
					console.log(value)
					this.getUpdateStatus(row.id, 2, value)
				}).catch(() => {

				})
			},

			/** 取消修改金额对话框 */
			handleClose() {
				this.isMoney = false
			},
			/** 选择分页 */
			handleSizeChange(e) {
				this.pageSize = e;
				this.pageIndex = 1;
				this.getBriefPay();
			},
			/** 点击分页 */
			handleCurrentChange(e) {
				this.pageIndex = e;
				this.getBriefPay();
			},
			/** 查看理由 */
			handleLook(row) {
				this.isLook = true;
				console.log(row)
				this.reason = row.reason;
			},
			/** 关闭查看理由 */
			handleCloseLookReason() {
				this.isLook = false
			},
		}
	}
</script>

<style lang="scss">
	.top {
		border: 1px solid #E9E9E9;

		.top-title {
			font-weight: bold;
			padding: 20px 20px;
			border-bottom: 1px solid #E9E9E9;
		}

		.top-content {
			padding: 15px 20px;

			.top-content-item {
				.top-content-item-status {
					margin-right: 25px;

					span {
						font-weight: bold;
					}
				}

				.top-content-item-input {
					width: 200px;
				}
			}
		}

	}
</style>
