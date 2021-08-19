<template>
	<div class="main">

		<!-- 头部  -->
		<div class="top">
			<div class="top-title ">数据筛选</div>
			<div class="top-content flex fvertical fbetween">
				<div class="top-content-item flex fvertical">
					<div class="flex fvertical top-content-item-status">
						<span>输入查询：</span>
						<el-input class="top-content-item-input" v-model="serach" placeholder="ID/项目名称">
						</el-input>
					</div>
					<div class="flex fvertical top-content-item-status">
						<span>状态：</span>
						<el-select v-model="value" placeholder="请选择">
							<el-option v-for="item in options" :key="item.value" :label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
					</div>
				</div>
				<div class="top-content-btn">
					<el-button type="primary">查询</el-button>
					<el-button>重置</el-button>
				</div>
			</div>
		</div>
		<!-- 头部end  -->
		<!-- 内容  -->
		<div class="box">

			<div class="box-top flex fbetween fvertical">
				<div class="bold">数据列表</div>
				<el-button>导出</el-button>
			</div>

			<el-table :data="tableData" border style="width: 100%" :stripe="true">
				<el-table-column prop="date" label="ID"  width="80">
				</el-table-column>
				<el-table-column prop="name" label="项目名称"  width="120">
				</el-table-column>
				<el-table-column prop="address" label="图片" >
				</el-table-column>
				<el-table-column prop="address" label="充值金额"  width="120">
				</el-table-column>
				<el-table-column prop="address" label="状态"  width="80">
				</el-table-column>
				<el-table-column prop="address" label="申请时间" >
				</el-table-column>
				<el-table-column prop="address" label="操作人" width="100">
				</el-table-column>
				<el-table-column prop="address" label="操作时间" >
				</el-table-column>
				<el-table-column prop="address" label="操作" >
					<template slot-scope="scope">
						<template v-if="scope.$index == 0">
							<el-button size="mini" type="primary" @click="handleMoney(scope.$index,scope.row)">修改金额
							</el-button>
							<el-button size="mini" type="success" @click="handleAdopt(scope.$index, scope.row)">通过
							</el-button>
							<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">拒绝
							</el-button>
						</template>
						<el-button v-else type="text" size="mini" @click="handleLook">查看理由</el-button>
					</template>
				</el-table-column>
			</el-table>


			<div class="flex fcenter page">
				<el-pagination class="page" id="page" background @size-change="handleSizeChange"
					@current-change="handleCurrentChange" :current-page="PageIndex" :page-sizes="[10, 20, 30, 40]"
					:page-size="PageSize" layout="total, prev, pager, next,sizes, jumper" :total="PageCount">
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
				<el-button type="primary" @click="isMoney = false">确 定</el-button>
			</span>
		</el-dialog>
		<!--  编辑金额 -->

		<!--  编辑金额 -->
		<el-dialog title="拒绝理由" :visible.sync="isLook" width="30%" :before-close="handleCloseLookReason">
			<span>工资核对有问题</span>
			<span slot="footer" class="dialog-footer ">
				<el-button type="primary" @click="isLook = false">确 定</el-button>
			</span>
		</el-dialog>
		<!--  编辑金额 -->



	</div>
</template>

<script>
	export default {
		data() {
			return {
				isLook: false, // 是否显示查看理由
				isMoney: false, // 是否显示金额
				PageIndex: 1, // 页码
				PageSize: 10, // 显示多少条数据
				PageCount: 0, // 总条数
				options: [], // 状态列表
				value: "", // 选中
				serach: "", // 搜索
				tableData: [{}], // 表格
				money: "", // 金额
			}
		},
		watch: {
			isMoney(val) {
				if (val) {
					this.$nextTick(() => {
						console.log(this.$refs)
						this.$refs.money.focus();
					})
				}
			}
		},
		methods: {
			/** 显示修改金额 */
			handleMoney() {
				this.isMoney = true;
			},
			/** 通过 */
			handleAdopt() {
				this.$confirm('是否通过对账申请?', '是否通过对账申请', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$message({
						type: 'success',
						message: '操作成功'
					});
				}).catch(() => {

				});
			},
			/** 拒绝 */
			handleDelete() {
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
				}).catch(()=>{
					
				})
			},

			/** 取消修改金额对话框 */
			handleClose() {
				this.isMoney = false
			},
			/** 选择分页 */
			handleSizeChange(e) {
				this.PageSize = e;
				this.PageIndex = 1;
				// this.getPageingUser();
			},
			/** 点击分页 */
			handleCurrentChange(e) {
				this.PageIndex = e;
				// this.getPageingUser();
			},
			/** 查看理由 */
			handleLook(row) {
				this.isLook = true;
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
