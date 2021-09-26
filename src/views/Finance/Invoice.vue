<template>
	<div class="Invoice" v-loading="loading">
		<!-- 头部  -->
		<div class="top" id="top">
			<div class="top-title ">数据筛选</div>
			<div class="top-content flex fvertical fbetween">
				<div class="top-content-item flex fvertical">
					<div class="flex fvertical top-content-item-status">
						<span>输入查询：</span>
						<el-input class="top-content-item-input" v-model="keywords" placeholder="项目名称">
						</el-input>
					</div>
					<div class="flex fvertical top-content-item-status">
						<span>开票类型：</span>
						<el-select v-model="type" placeholder="选择开票类型">
							<el-option v-for="item in typeOptions" :key="item.value" :label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
					</div>
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
			<div class="Invoice-box flex fvertical fbetween" id="boxTop">
				<div class="Invoice-box-title bold ">数据筛选</div>
				<el-button type="primary" size="small" @click='getExport'>导出</el-button>
			</div>

			<el-table :data="tableData" border style="width: 100%" :height="clientHeight+'px'">
				<el-table-column prop="id" label="Id" width="170">
				</el-table-column>
				<el-table-column prop="title" label="项目名称" width="180">
				</el-table-column>
				<el-table-column prop="header" label="姓名">
				</el-table-column>
				<el-table-column prop="phone" label="联系方式">
				</el-table-column>
				<el-table-column prop="fee" label="开票金额">
				</el-table-column>
				<el-table-column prop="type" label="开票类型">
					<template slot-scope="scope">
					{{scope.row.type == 1?"个人":"企业"}}	
					</template>		
				</el-table-column>
				<el-table-column label="状态">
					<template slot-scope="scope">
						<p v-if="scope.row.status == 0" class="color-warning">代开票</p>
						<p v-if="scope.row.status == 1" class="color-success">已完成</p>
						<p v-if="scope.row.status == 2" class="color-error">已驳回</p>
					</template>
				</el-table-column>
				<el-table-column prop="createTime" label="申请时间">
					<template slot-scope="scope">
						<p>{{formatDate(scope.row.createTime)}}</p>
					</template>
				</el-table-column>
				<el-table-column prop="updateName" label="操作人">
				</el-table-column>
				<el-table-column prop="updateTime" label="操作时间">
					<template slot-scope="scope">
						<p>{{formatDate(scope.row.updateTime)}}</p>
					</template>
				</el-table-column>
				<el-table-column prop="id" label="信息">
					<template slot-scope="scope">
						<p class="dateiltxt" @click="checkDetail(scope.row)">查看详情</p>
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
		<!-- 同意开票弹窗输入信息 -->
		<el-dialog
		title="是否完成开票？"
		:visible.sync="InvoiceDialog"
		width="20%"
		:before-close="InvoiceClose">
		<el-input v-model="invoiceCode" placeholder="请输入发票代码"></el-input>
		<span slot="footer" class="dialog-footer">
			<el-button @click="InvoiceDialog = false">取 消</el-button>
			<el-button type="primary" @click="submit">确 定</el-button>
		</span>
		</el-dialog>

		<!-- 发票详情弹窗 -->
		<el-dialog
		title="开票信息"
		:visible.sync="InvoiceDetailDialog"
		width="30%"
		:before-close="InvoiceDetailclose">
		<div class="InvoiceDetailDialog"> <p class="InvoiceDetailDialog-txt"> 开票类型：</p> <div class="InvoiceDetailDialog-inp">{{InvoiceDetail.type == 1?"个人":"企业"}}	</div></div>
		<div class="InvoiceDetailDialog"> <p class="InvoiceDetailDialog-txt"> 发票抬头：</p> <div class="InvoiceDetailDialog-inp">{{InvoiceDetail.header}}</div></div>
		<div class="InvoiceDetailDialog" v-show="InvoiceDetail.type ==2"> <p class="InvoiceDetailDialog-txt"> 纳税人识别号：</p> <div class="InvoiceDetailDialog-inp">{{InvoiceDetail.tin}}</div></div>
		<div class="InvoiceDetailDialog" v-show="InvoiceDetail.type ==2"> <p class="InvoiceDetailDialog-txt"> 公司地址：</p> <div class="InvoiceDetailDialog-inp">{{InvoiceDetail.address}}</div></div>
		<div class="InvoiceDetailDialog" v-show="InvoiceDetail.type ==2"> <p class="InvoiceDetailDialog-txt"> 公司电话：</p> <div class="InvoiceDetailDialog-inp">{{InvoiceDetail.phone}}</div></div>
		<div class="InvoiceDetailDialog" v-show="InvoiceDetail.type ==2"> <p class="InvoiceDetailDialog-txt"> 开户银行：</p> <div class="InvoiceDetailDialog-inp">{{InvoiceDetail.bank}}</div></div>
		<div class="InvoiceDetailDialog"> <p class="InvoiceDetailDialog-txt"> 接收方式：</p> <div class="InvoiceDetailDialog-inp">{{InvoiceDetail.email}}</div></div>
		<div class="InvoiceDetailDialog"> <p class="InvoiceDetailDialog-txt"> 开票金额：</p> <div class="InvoiceDetailDialog-inp">{{InvoiceDetail.fee}}元</div></div>
		<span slot="footer" class="dialog-footer">
			<el-button type="primary" @click="InvoiceDetailDialog = false">确 定</el-button>
		</span>
		</el-dialog>

	</div>
</template>

<script>
	import {
		getInvoice,
		postInvoiceStatus,
		getInvoiceDetail,
	} from '../../api/user.js'
	import moment from 'moment'
	export default {
		data() {
			return {
				// 0->待开票，1->开票成功,2->开票失败 ,
				statusList: [{
					label: "全部",
					value: ""
				}, {
					label: "代开票",
					value: 0
				}, {
					label: "已驳回",
					value: 2
				}, {
					label: "已完成",
					value: 1
				}],
				typeOptions:[{
					label: "全部",
					value: ""
				},{
					label: "个人",
					value: "1"
				},{
					label: "企业",
					value: "2"
				}],
				status: "", // 状态
				keywords: "", // 搜索文字
				type:'', // 开票类型
				pageIndex: 1, // 页码
				pageSize: 10, // 显示多少条数据
				PageCount: 0, // 总条数
				tableData: [],
				loading: false,
				clientHeight:0,
				InvoiceDialog:false, //同意弹窗
				invoiceCode:'', // 发票代码
				rowDate:{},// 当前行发票数据
				InvoiceDetail:[] ,// 当前行发票详情数据
				InvoiceDetailDialog:false //发票详情界面 
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
				this.rowDate = row
				this.InvoiceDialog = true
			},
			// 弹窗取消
			InvoiceClose(){
				this.InvoiceDialog = false
				this.invoiceCode = ''
			},
			/** 拒绝 */
			handleClose(row) {
				this.$confirm('是否拒绝开票申请', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let param = {};
					param.id = row.id;
					param.status = 2;
					this.postInvoiceStatus(param);
				})
			},
			/** 修改状态方法 */
			async postInvoiceStatus(data) {
				let res = await postInvoiceStatus(data);
				this.$message.success('修改成功');
				this.getDataList();
			},
			/** 获取发票列表 */
			async getDataList() {
				let param = {};
				param.pageIndex = this.pageIndex,
				param.pageSize = this.pageSize,
				param.keywords = this.keywords;
				param.status = this.status;
				param.type = this.type;
				this.loading = true;
				try{
					let res = await getInvoice(param);
					this.loading = false;
					this.PageCount = res.data.total;
					this.tableData = res.data.records;
				}catch(e){
					this.loading = false;
				}
				
			},
			// 查看发票详情
			checkDetail(row){
				getInvoiceDetail({id:row.id}).then(res=>{
					this.InvoiceDetail = res.data
					this.InvoiceDetailDialog = true
				})
			},
			//发票弹窗关闭
			InvoiceDetailclose(){
				this.InvoiceDetailDialog = false
			},
			//提交信息同意拒绝开票
			submit(){
			if(!this.invoiceCode){
				this.$message.warning('请输入发票代码');
				return
			}
 			let param = {};
			param.id = this.rowDate.id;
			param.invoiceCode = this.invoiceCode
			param.status = 1;
			this.postInvoiceStatus(param).then(res=>{
				this.InvoiceDialog = false
				this.invoiceCode = ''
				this.$message.success('同意开票成功');
			}).catch(err=>{
				console.log(err)
			})
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
	.Invoice {
		padding-top: 20px;
	}

	.Invoice-box {
		padding-bottom: 20px;
	}
	.dateiltxt{
		cursor: pointer;
		text-align: center;
		color: #1682e6;
	}
	.InvoiceDetailDialog{
		width: 100%;
		display: flex;
		justify-content: start;
		height: 40px;
		line-height: 40px;
		margin-top: 20px;
	}
	.InvoiceDetailDialog-txt{
		width: 20%;
		font-size: 17px;
		color: #333333;
	}
	.InvoiceDetailDialog-inp{
		width: 80%;
		border-radius: 5px;
		height: 40px;
		background: #F2F2F2;
		border: 1px solid #adadad;
		font-size: 17px;
		color: #333333;
		padding-left: 10px;
	}
</style>
