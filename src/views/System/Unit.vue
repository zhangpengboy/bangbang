<template>
	<div class="main" v-loading="loading">
		<div class="top" id="top">
			<div class="top-title ">数据筛选</div>
			<div class="top-content flex fvertical fbetween">
				<div class="top-content-item flex fvertical">
					<div class="flex fvertical top-content-item-status">
						<span>状态：</span>
						<el-select v-model="status" placeholder="全部">
							<el-option v-for="item in statusList" :key="item.value" :label="item.label"
								:value="item.value" />
						</el-select>
					</div>
				</div>
				<div class="top-content-btn">
					<el-button type="primary" @click="handleSearch">查询</el-button>
					<el-button @click='handleRaLoad'>重置</el-button>
				</div>
			</div>
		</div>


		<div class="box">
			<div class="box-top flex fbetween fvertical" id="boxTop">
				<div class="bold">数据列表</div>
				<el-button type="primary" @click="dialogVisible = true">新增</el-button>
			</div>

			<!-- 表格  -->
			<el-table :data="tableData" stripe style="width: 100%" border :height="clientHeight+'px'">
				<el-table-column prop="date" label="序号" width="60">
					<template slot-scope="scope">
						{{pageSize * (pageIndex -1) +1 + scope.$index}}
					</template>
				</el-table-column>
				<el-table-column prop="id" label="ID" width="200">
				</el-table-column>
				<el-table-column prop="createName" label="计件单位">
				</el-table-column>
				<el-table-column prop="createName" label="状态">
				</el-table-column>
				<el-table-column prop="updateName" label="操作人">
				</el-table-column>
				<el-table-column prop="updateName" label="操作时间">
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
						<el-button type="text" @click="handleStatus(scope.row)">启用</el-button>
						<el-button type="text" @click="handleDetele(scope.row)">删除</el-button>
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

		<el-dialog title="新增" :close-on-click-modal="false" :visible.sync="dialogVisible" width="30%"
			:before-close="handleClose">
			<div class="flex fvertical">
				<span>单位：</span>
				<el-input class="f1" type="text" placeholder="请输入单位" ref="name" v-model="unit"></el-input>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="handleSumibt">确 定</el-button>
			</span>
		</el-dialog>

	</div>
</template>

<script>
	import {
		getUnitList,
		getUnitAdd,
		getUnitUpdate,
		getUnitUpdateStatus,
		getUnitDelete
	} from '../../api/user.js'
	import moment from 'moment'
	export default {
		data() {
			return {
				pageIndex: 1,
				pageSize: 10,
				pageCount: 0,
				unit: "",
				status: "", // 状态
				statusList: [{
					label: "全部",
					value: ""
				}, {
					label: "停用",
					value: 0
				}, {
					label: "启用",
					value: 1
				}], // 状态列表
				clientHeight: 0,
				tableData: [],
				dialogVisible: false,
				loading: false,
			}
		},
		watch: {
			dialogVisible(val) {
				if (val) {
					this.$nextTick(() => {
						this.$refs.name.focus()
					})
				}
			}
		},
		mounted() {
			this.getWebHeing();
			this.getUnitList();
		},
		methods: {
			formatDateTime(value) {
				return value ? moment(value).format('YYYY-MM-DD HH:mm:ss') : '';
			},
			formatDate(value) {
				return value ? moment(value).format('YYYY-MM-DD') : '';
			},
			/** 编辑 */
			handleEdit(row) {
				console.log('--------------')
				console.log(row.unit)
				console.log('--------------')
			},
			/** 停用/启用 */
			handleStatus(row) {
				let text = row.status ? '是否确定停用':'是否确定启用';
				this.$confirm(text, '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(async () => {
					let param = {};
					param.id = row.id;
					param.status = row.status ? 0 :1
					let res = await getUnitUpdateStatus(param)
					this.$message.success('操作成功');
					this.getUnitList();
				}).catch(() => {});
			},
			/** 删除 */
			handleStatus(row) {
				this.$confirm('是否确定删除', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(async () => {
					let res = await getUnitDelete({id:row.id})
					this.$message.success('操作成功');
					this.getUnitList();
				}).catch(() => {});
			},
			/** 提交对话框 */
			async handleSumibt() {
				if (this.unit.trim() == '') {
					return this.$message.error('请输入单位')
				}
				let res = await getUnitAdd({
					unit: this.unit
				});
				console.log(res);
				this.$message.success('操作成功');
				this.getUnitList();

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
				})
			},
			/** 获取列表数据 */
			async getUnitList() {
				this.loading = true;
				try {
					let param = {};
					param.pageNum = this.pageIndex;
					param.pageSize = this.pageSize;
					let res = await getUnitList(param);
					this.pageCount = res.data.total;
					this.tableData = res.data.list;
					this.loading = false;
				} catch (e) {
					this.loading = false;
					//TODO handle the exception
				}
			},
			/** 搜索 */
			handleSearch() {
				this.pageIndex = 1;
				this.getUnitList();
			},
			/** 重置 */
			handleRaLoad() {
				this.pageIndex = 1;
				this.status = ''
			},
			/** 选择分页 */
			handleSizeChange(e) {
				this.pageSize = e;
				this.pageIndex = 1;
				this.getUnitList();
			},
			/** 点击分页 */
			handleCurrentChange(e) {
				this.pageIndex = e;
				this.getUnitList();
			},
			/** 取消对话框 */
			handleClose() {
				this.dialogVisible = false;
			}
		}
	}
</script>

<style>
</style>
