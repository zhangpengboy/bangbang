<template>
	<div class="main" v-loading="loading">

		<div class="select-btn">
			<el-radio-group v-model="radio" @change="handleRadioGroup">
				<el-radio-button label="未核对"></el-radio-button>
				<el-radio-button label="已核对"></el-radio-button>
			</el-radio-group>
		</div>

		<div class="top" id="top">
			<div class="top-title ">数据筛选</div>
			<div class="top-content flex fvertical fbetween">
				<div class="top-content-item flex fvertical">
					<div class="flex fvertical top-content-item-status">
						<span>输入查询：</span>
						<el-input class="top-content-item-input profit-search" v-model="keyword"
							@keyup.enter.native="handelSearch" placeholder="用户ID/合伙人名称/手机号码">
						</el-input>
					</div>
					<div class="flex fvertical top-content-item-status" v-if="status">
						<span>时间：</span>
						<el-date-picker v-model="date" type="daterange" range-separator="至" start-placeholder="开始日期"
							end-placeholder="结束日期">
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
				<el-table-column prop="userName" label="合伙人名称">
				</el-table-column>
				<el-table-column prop="phone" label="手机号码">
				</el-table-column>
				<el-table-column :label="status?'未核对分润总金额':'已核对分润总金额'" prop="fee">
				</el-table-column>
				<el-table-column label="操作" width="220">
					<template slot-scope="scope">
						<el-button v-if="status == 1" @click="handleSumbit(scope.row)">核对</el-button>
						<el-button v-if="status == 0" @click="handleOpenDetalis(scope.row)">核对详情</el-button>
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

		<!-- 对话框  -->
		<el-dialog :close-on-click-modal="false" top="5vh"  :visible.sync="dialogVisible" width="1000px"
			:before-close="handleClose">
			<div class="profit-dialog flex fvertical fbetween">
				<div class="f1 flex fvertical">
					<span class="bold">张三的分润明细：</span>
					<div class="profit-dialog-date">
						<el-date-picker  v-model="DetailsDate" type="daterange" range-separator="至" start-placeholder="开始日期"
							end-placeholder="结束日期">
						</el-date-picker>
					</div>
					
					<div class="profit-dialog-btn">
						<el-button type="primary" @click="handelDialogSearch"> 查询</el-button>
						<el-button @click="handleDialogReset">重置</el-button>
					</div>
				</div>
				
				<el-button @click="handleDialogExport">导出</el-button>
			</div>
			<el-table ref="multipleTable" :data="dialogTableData" height="600" tooltip-effect="dark" style="width: 100%"
				@selection-change="handleSelectionChange" border>
				<el-table-column prop="date" label="序号" width="60">
					<template slot-scope="scope">
						{{scope.$index}}
					</template>
				</el-table-column>
				<el-table-column prop="userId" label="用户ID" width="200">
				</el-table-column>
				<el-table-column prop="userName" label="推荐工人名称">
				</el-table-column>
				<el-table-column prop="phone" label="手机号码">
				</el-table-column>
				<el-table-column prop="phone" label="收益类型">
				</el-table-column>
				<el-table-column prop="phone" label="收益金额">
				</el-table-column>
				<el-table-column prop="phone" label="收益时间">
				</el-table-column>
			</el-table>
			<div class="profit-dialog-foot flex fvertical fcenter">
				 <el-button type="primary" plain @click="dialogVisible = false">取消</el-button>
				  <el-button type="primary">确定</el-button>
			</div>
		</el-dialog>
		<!-- 对话框end -->
		

	</div>
</template>

<script>
	import {
		getPartnerRebate
	} from '../../api/user.js'
	export default {
		data() {
			return {
				DetailsDate:"", // 分润明细时间
				dialogVisible: false,
				keyword: "", // 搜索条件
				date: "", // 日期
				pageIndex: 1, // 页码
				pageSize: 10, // 页面条数
				pageCount: 0,
				radio: "未核对",
				status: 1, // 0 已核对  1未核对 
				dialogTableData: [],
				tableData: [], // 数组列表
				loading: false, // 是否加载

			}
		},
		mounted() {
			this.getPartnerRebate();
		},
		methods: {
			/** 明细搜索 */
			handelDialogSearch(){
				
			},
			/** 明细重置 */
			handleDialogReset(){
				
			},
			/** 导出明细  */
			handleDialogExport(){
				console.log('导出明细');
			},
			/** 已选择核对信息 */
			handleSelectionChange(e) {
				console.log(e)
			},
			/** 关闭对话框 */
			handleClose() {
				this.dialogVisible = false;
			},
			/** 打开核对详情 */
			handleOpenDetalis(row) {
				console.log('打开核对详情', row)
			},
			/** 核对 */
			handleSumbit(row) {
				console.log(row)
			},
			/** 切换tab */
			handleRadioGroup(val) {
				console.log(val)
				if (this.radio == '未核对') {
					this.status = 1;
				} else {
					this.status = 0;
					this.date = '';
				}
				this.keyword = '';
				this.pageIndex = 1;
				this.getPartnerRebate();

			},
			/** 获取数据列表 */
			async getPartnerRebate() {
				this.loading = true;
				try {
					let param = {};
					param.pageNum = this.pageIndex;
					param.pageSize = this.pageSize;
					param.status = this.status;
					param.keyword = this.keyword;
					if (this.date) {
						param.createTimeBegin = this.date[0];
						param.createTimeEnd = this.date[1];
					}
					// console.log(param);
					let res = await getPartnerRebate(param);
					this.tableData = res.data.list;
					this.pageCount = res.data.total;
					this.loading = false;
				} catch (e) {
					this.loading = false;
					//TODO handle the exception
				}

			},
			/** 搜索 */
			handelSearch() {
				this.pageIndex = 1;
				this.getPartnerRebate();
			},
			/** 重置 */
			handleReset() {
				this.pageIndex = 1;
				this.keyword = '';
				this.date = '';
				this.getPartnerRebate();
			},
			/** 导出 */
			handleExport() {},
			/** 选择分页 */
			handleSizeChange(e) {
				this.pageSize = e;
				this.pageIndex = 1;
				this.getPartnerRebate();
			},
			/** 点击分页 */
			handleCurrentChange(e) {
				this.pageIndex = e;
				this.getPartnerRebate();
			},
		}
	}
</script>

<style lang="scss">
	.select-btn {
		padding-bottom: 20px;
	}
	
	.profit-dialog-foot{
		margin-top: 15px;
		.el-button{
			width: 180px;
			margin-right: 30px;
		}
	}
	.profit-dialog{
		padding: 15px 0;
	}
	.profit-dialog-date{
		padding: 0 40px 0 20px;
	}
	.profit-dialog-btn{
		padding-right: 30px;
	}

	.profit-search {
		width: 250px !important;
	}
</style>
