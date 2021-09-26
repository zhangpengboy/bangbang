<template>
	<div class="main">
		<!-- 头部  -->
		<div class="top" id="top">
			<div class="top-title ">数据筛选</div>
			<div class="top-content flex fvertical fbetween">
				<div class="top-content-item flex fvertical f1">
					<div class="flex fvertical top-content-item-status">
						<span>输入查询：</span>
						<el-input class="top-content-item-input" v-model="keywords" placeholder="用户ID/名称/联系方式">
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

					<div class="flex fvertical top-content-item-status">
						<span>地区：</span>
						<el-select v-model="address" filterable placeholder="选择地区">
							<el-option v-for="item in addressList" :key="item.value" :label="item.label"
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
		<!-- 头部end -->
		<div class="box">
			<div class="box-top flex fbetween fvertical" id="boxTop">
				<div class="bold">数据列表</div>
				<el-button>导出</el-button>
			</div>
			<!-- 表格 -->
			<el-table :data="tableData" stripe style="width: 100%" border :height="clientHeight+'px'">
				<el-table-column prop="date" label="序号" width="60">
					<template slot-scope="scope">
						{{pageSize * (pageIndex -1) +1 + scope.$index}}
					</template>
				</el-table-column>
				<el-table-column prop="id" label="用户ID " width="200">
				</el-table-column>
				<el-table-column prop="id" label="名称 " width="200">
				</el-table-column>
				<el-table-column prop="id" label="联系方式 " width="200">
				</el-table-column>
				<el-table-column prop="id" label="邀请人数 " width="200">
				</el-table-column>
				<el-table-column prop="id" label="成为合伙人时间 " width="200">
				</el-table-column>
				<el-table-column prop="id" label="地区 ">
				</el-table-column>
				<el-table-column prop="id" label="申请状态 " width="200">
				</el-table-column>
				<el-table-column prop="id" label="操作 ">
					<template slot-scope="scope">
						<el-button type="text" size="small" @click="handleOpenLook(scope.row)">
							查看
						</el-button>
						<el-button type="text" size="small" @click="handleSumbitRelationship(scope.row)">
							{{scope.row.contactStatus == 0?'禁用合伙人':' 恢复合伙人'}}
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
		getPartnerExport
	} from '../../../api/user.js'
	export default {
		data() {
			return {
				tableData: [{}],
				keywords: '', // 搜索
				status: "", // 状态
				statusList: [{ // 状态列表
					label: "全部",
					value: ""
				}, {
					label: "正常",
					value: 1
				}, {
					label: "冻结",
					value: 2
				}],
				pageIndex: 1, // 页码
				pageSize: 10, // 显示多少条数据
				PageCount: 0, // 总条数
				clientHeight: 0,
				addressList: [],
				address: ""
			}
		},
		mounted() {
			this.getWebHeing();
			this.getPartnerList();
		},
		methods: {
			/** 打开详情 */
			handleOpenLook(row) {
				this.$router.push({
					path: '/user/partnerListDetails'
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
				let res = await getPartnerList(param);
				console.log('获取合伙人列表', res);
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
				this.getPartnerList();
			},
		}

	}
</script>

<style>
</style>
