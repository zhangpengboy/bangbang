<template>
	<div class="main" v-loading="loading">
		<!-- 头部  -->
		<div class="top" id="top">
			<div class="top-title ">数据筛选</div>
			<div class="top-content flex fvertical fbetween">
				<div class="top-content-item flex fvertical f1">
					<div class="flex fvertical top-content-item-status">
						<span>输入查询：</span>
						<el-input class="top-content-item-input" v-model="keyword" placeholder="用户ID/名称/联系方式">
						</el-input>
					</div>
					<div class="flex fvertical top-content-item-status">
						<span>状态：</span>
						<el-select v-model="status" placeholder="选择状态">
							<el-option v-for="item in statusList" :key="item.value" :label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
					</div>

					<!-- <div class="flex fvertical top-content-item-status">
						<span>地区：</span>
						
						<el-select v-model="address" filterable placeholder="选择地区">
							<el-option v-for="item in addressList" :key="item.value" :label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
					</div> -->

					<div class="flex fvertical top-content-item-status">
						<span>地区：</span>
						<el-cascader style="width:250px" v-model="address" :options="addressList"
							:props="addressconfig"></el-cascader>
					</div>
				</div>

				<div class="top-content-btn">
					<el-button type="primary" @click="handelSearch"> 查询</el-button>
					<el-button @click="handleReset">重置</el-button>
				</div>
			</div>
		</div>
		<!-- 头部end -->
		<div class="box">
			<div class="box-top flex fbetween fvertical" id="boxTop">
				<div class="bold">数据列表</div>
				<el-button @click="handleExport">导出</el-button>
			</div>
			<!-- 表格 -->
			<el-table :data="tableData" stripe style="width: 100%" border :height="clientHeight+'px'">
				<el-table-column prop="date" label="序号" width="60">
					<template slot-scope="scope">
						{{pageSize * (pageIndex -1) +1 + scope.$index}}
					</template>
				</el-table-column>
				<el-table-column prop="userId" label="用户ID " width="200">
				</el-table-column>
				<el-table-column prop="userName" label="名称 " width="200">
				</el-table-column>
				<el-table-column prop="phone" label="联系方式 " width="200">
				</el-table-column>
				<el-table-column prop="invitationNum" label="邀请人数 " width="80">
				</el-table-column>
				<el-table-column prop="id" label="成为合伙人时间 ">
					<template slot-scope="scope">
						{{formatDateTime(scope.row.approvedTime)}}
					</template>
				</el-table-column>
				<el-table-column prop="cityName" label="地区 ">
				</el-table-column>
				<el-table-column label="申请状态 ">
					<template slot-scope="scope">
						{{scope.row.status == 0 ?'正常':'禁用'}}
					</template>
				</el-table-column>
				<el-table-column prop="reason" label="理由 " width="200">
				</el-table-column>
				<el-table-column prop="id" label="操作 ">
					<template slot-scope="scope">
						<el-button type="text" size="small" @click="handleOpenLook(scope.row)">
							查看
						</el-button>
						<el-button type="text" size="small" @click="handleSumbitRelationship(scope.row)">
							{{scope.row.status == 0?'禁用合伙人':' 恢复合伙人'}}
						</el-button>
					</template>
				</el-table-column>
			</el-table>
			<!-- 表格end -->
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
		getPartnerList,
		getPartnerExport,
		getPartnerUpdateStatus,
		getregion
	} from '../../../api/user.js'
	import moment from 'moment'
	export default {
		data() {
			return {
				tableData: [{}],
				keyword: '', // 搜索
				status: "", // 状态
				statusList: [{ // 状态列表
					label: "全部",
					value: ""
				}, {
					label: "正常",
					value: 0
				}, {
					label: "冻结",
					value: 1
				}],
				pageIndex: 1, // 页码
				pageSize: 10, // 显示多少条数据
				PageCount: 0, // 总条数
				clientHeight: 0,
				addressList: [{
					code: "",
					name: "全部"
				}], // 地区列表
				address: "全部", // 地址
				loading: false, // 
				addressconfig: {
					value: 'name',
					label: "name",
					children: 'children'
				}
			}
		},
		mounted() {
			this.getWebHeing();
			this.getPartnerList();
			this.getRegion();
		},
		methods: {
			formatDateTime(value) {
				return value ? moment(value).format('YYYY-MM-DD HH:mm:ss') : '';
			},
			// 获取省市区
			getRegion() {
				getregion().then(res => {
					console.log(res)
					this.addressList = [...this.addressList, ...res.data[0].children]
				})
			},
			/** 修改当前列表状态 */
			handleSumbitRelationship(row) {
				console.log(row)
				let param = {};
				param.id = row.id;
				param.status = row.status == 0 ? 1 : 0;
				if (row.status == 0) {
					this.$prompt('是否禁用当前合伙人', '确认提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						inputPlaceholder: "请填写禁用理由（选填）"
					}).then(({
						value
					}) => {
						console.log(value);
						param.reason = value;
						this.getPartnerUpdateStatus(param);
					}).catch(() => {});
				} else {
					this.$confirm('是否恢复当前合伙人', '确认提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.getPartnerUpdateStatus(param);
					}).catch(() => {});
				}

			},

			/** 修改当前状态 */
			async getPartnerUpdateStatus(data) {
				this.loading = true;
				try {
					let res = await getPartnerUpdateStatus(data);
					this.$message.success('编辑成功');
					this.loading = false;
					this.getPartnerList();

				} catch (e) {
					this.loading = false;
					//TODO handle the exception
				}

			},
			/** 导出 */
			async handleExport() {
				// return;
				let param = {};
				param.pageNum = this.pageIndex;
				param.pageSize = this.pageSize;
				param.status = this.status;
				param.keyword = this.keyword;
				let cityName = ''
				if(this.address == '全部'){
					cityName = ''
				}else if(this.address.length==1){
					cityName = this.address[0]
				} else{
					cityName = this.address[1]
				}
				param.cityName = cityName;
				let url =
					`/api/marketing/admin/marketing/partner/v1.0.1/export?status=${this.status}&keyword=${this.keyword}&cityName=${this.address=='全部'?'':this.address}`
				window.open(url);
			},
			/** 打开详情 */
			handleOpenLook(row) {
				this.$router.push({
					path: '/user/partnerListDetails',
					query: {
						userId: row.userId
					}
				})
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
			/** 获取合伙人列表 */
			async getPartnerList() {
				let param = {};
				param.pageNum = this.pageIndex;
				param.pageSize = this.pageSize;
				param.status = this.status;
				param.keyword = this.keyword;
				let cityName = ''
				if(this.address == '全部'){
					cityName = ''
				}else if(this.address.length==1){
					cityName = this.address[0]
				} else{
					cityName = this.address[1]
				}
				param.cityName = cityName;
				this.loading = true;
				try {
					let res = await getPartnerList(param);
					this.PageCount = res.data.total;
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
				this.getPartnerList();
			},
			/** 点击分页 */
			handleCurrentChange(e) {
				this.pageIndex = e;
				this.getPartnerList();
			},
			/** 搜索 */
			handelSearch() {
				this.pageIndex = 1;
				this.getPartnerList();
			},
			/** 重置 */
			handleReset() {
				this.keywords = '';
				this.pageIndex = 1;
				this.status = '';
				this.address = '';
				this.getPartnerList();
			},
		}

	}
</script>

<style>
</style>
