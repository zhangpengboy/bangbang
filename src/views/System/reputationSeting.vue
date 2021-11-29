<template>
	<div class="main" v-loading="loading">
		<div class="top" id="top">
			<div class="top-title ">数据筛选</div>
			<div class="top-content flex fvertical fbetween">
                <div class="top-content-item flex fvertical">
					<div class="flex fvertical top-content-item-status">
						<span>类型：</span>
						<el-select v-model="type1" placeholder="全部">
							<el-option v-for="item in typeList" :key="item.value" :label="item.label"
								:value="item.value" />
						</el-select>
					</div>
				</div>
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
				<el-table-column prop="reason" label="原因" width="200">
				</el-table-column>
				<el-table-column prop="unit" label="类型">
                    <template slot-scope="scope">
						<p v-if="scope.row.type == 1" style="color: #4593de;">加分</p>
						<p v-if="scope.row.type  == 2" style="color: red;">扣分</p>
					</template>
				</el-table-column>
                <el-table-column prop="score" label="分值">
                </el-table-column>
				<el-table-column label="状态">
					<template slot-scope="scope">
						<p v-if="scope.row.status == 0" style="color: red;">停用</p>
						<p v-if="scope.row.status  == 1">启用</p>
					</template>
				</el-table-column>
				<el-table-column prop="updaterName" label="操作人">
				</el-table-column>
				<el-table-column prop="updateTime" label="操作时间">
                    <template slot-scope="scope">
						 {{formatDateTime(scope.row.updateTime)}}
					</template>
                   
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
						<el-button type="text" @click="handleStatus(scope.row)">{{scope.row.status?'停用':'启用'}}</el-button>
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

		<el-dialog :title="editData.id?'编辑':'新增'" :close-on-click-modal="false" :visible.sync="dialogVisible" width="30%"
			:before-close="handleClose">
            	
            <div class="popList">
					<div class="item flex alCen">
						<p class="tit">类型：</p>
						<el-select v-model="editData.type" placeholder="全部" clearable>
							<el-option v-for="item in typeList1" :key="item.value" :label="item.label"
								:value="item.value" />
				        </el-select>
					</div>
					<div class="item flex alCen">
						<p class="tit">输入原因：</p>
					<el-input class="f1" type="text" placeholder="请输入原因" ref="name" v-model="editData.reason"></el-input>
					</div>
					<div class="item flex alCen">
						<p class="tit">分值：</p>
						<el-input class="f1" type="number" placeholder="请输入分值" ref="name" v-model="editData.score"></el-input>
					</div>
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
		getCreditScore,
		postCreditScoreinsert,
		postCreditScoreupdate,
        postCreditScoreupdatestatus,
		postCreditScoreremove
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
				tableData: [{id:111}],
				dialogVisible: false,
				loading: false,
                type:'',
                type1:'',
                typeList:[{
					label: '全部',
					value: ''
				},{
					label: '加分',
					value: '1'
				},{
					label: '扣分',
					value: '2'
				}],
                 typeList1:[{
					label: '加分',
					value: '1'
				},{
					label: '扣分',
					value: '2'
				}],
                editData:{
                    type:'',
                    reason:'',
                    score:'',

                }
			}
		},
		watch: {
			dialogVisible(val) {
				if (val) {
					this.$nextTick(() => {
						this.$refs.name.focus()
					})
				}else{
					this.editData = {
                    type:'',
                    reason:'',
                    score:'',

                }
				}
			}
		},
		mounted() {
			this.getWebHeing();
			this.getCreditScore();
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
				this.dialogVisible = true;
				this.editData = row;
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
					let res = await postCreditScoreupdatestatus(param)
					this.$message.success('操作成功');
					this.getCreditScore();
				}).catch(() => {});
			},
			/** 删除 */
			handleDetele(row) {
				this.$confirm('是否确定删除', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(async () => {
					let res = await postCreditScoreremove({id:row.id})
					this.$message.success('操作成功');
					this.getCreditScore();
				}).catch(() => {});
			},
			/** 提交对话框 */
			async handleSumibt() {
				// if (this.unit.trim() == '') {
				// 	return this.$message.error('请输入单位')
				// }
				if(this.editData.id){
					console.log(this.editData)
					let res = await postCreditScoreupdate({
					type:this.editData.type,
                    reason:this.editData.reason,
                    score:this.editData.score,
                    id:this.editData.id
					})
					this.$message.success('操作成功');
				}else{
					let res = await postCreditScoreinsert({
					type:this.editData.type,
                    reason:this.editData.reason,
                    score:this.editData.score,
					});
					console.log(res);
					this.$message.success('操作成功');
				}
				this.dialogVisible = false;
				this.getCreditScore();

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
			async getCreditScore() {
				this.loading = true;
				try {
					let param = {};
					param.pageNum = this.pageIndex;
					param.pageSize = this.pageSize;
					param.status = this.status;
                    param.type = this.type1
					let res = await getCreditScore(param);
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
				this.getCreditScore();
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
				this.getCreditScore();
			},
			/** 点击分页 */
			handleCurrentChange(e) {
				this.pageIndex = e;
				this.getCreditScore();
			},
			/** 取消对话框 */
			handleClose() {
				this.dialogVisible = false;
			}
		}
	}
</script>

<style  lang="scss" scoped="scoped">
.popList {
		.item {
			margin-top: 10px;

			.tit {
				width: 150px;
			}

			.ipt {
				height: 40px;
				flex: 1;
				border: 1px solid #d9d9d9;
				padding-left: 8px;
			}

			.ipt-unit {
				height: 40px;
				width: 40px;
				text-align: center;
				margin-left: 10px;
			}
			.ipt-currency{
				height: 40px;
				width: 80px;
				text-align: center;
				margin-left: 10px;
			}

		}
	}
</style>
