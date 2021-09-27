<template>
	<div class="main">
		<!-- 用户信息 -->
		<div class="details-top flex fvertical" v-loading="userLoading">
			<div class="details-top-img">
				<div class="details-top-icon flex fvertical fcenter">
					<img v-if="info.headPortrait" :src="info.headPortrait" alt="">
					<i class="el-icon-s-custom" v-else></i>
				</div>
				<p>{{info.userName?info.userName:''}}</p>
			</div>
			<div class="details-top-info f1 flex fvertical">
				<div class="details-top-info-list">
					<div class="details-top-info-list-item">
						<span class="details-top-info-list-item-name">ID</span>
						<span class="details-top-info-list-item-date">{{info.userId?info.userId:''}}</span>
					</div>
					<div class="details-top-info-list-item">
						<span class="details-top-info-list-item-name">手机号码</span>
						<span class="details-top-info-list-item-date">{{info.phone?info.phone:''}}</span>
					</div>
					<div class="details-top-info-list-item">
						<span class="details-top-info-list-item-name">地区</span>
						<span class="details-top-info-list-item-date">{{info.cityName?info.cityName:''}}</span>
					</div>
				</div>
				<div class="details-top-info-list">
					<div class="details-top-info-list-item">
						<span class="details-top-info-list-item-name">名称</span>
						<span class="details-top-info-list-item-date">{{info.userName?info.userName:''}}</span>
					</div>
					<div class="details-top-info-list-item">
						<span class="details-top-info-list-item-name">邀请人数</span>
						<span
							class="details-top-info-list-item-date">{{info.invitationNum?info.invitationNum:0}}人</span>
					</div>
					<div class="details-top-info-list-item">
						<span class="details-top-info-list-item-name">成为合伙人时间</span>
						<span class="details-top-info-list-item-date">{{formatDateTime(info.approvedTime)}}</span>
					</div>
				</div>
			</div>
		</div>
		<!-- 用户信息end -->

		<!-- 单选 -->
		<div class="partne-radio">
			<el-radio-group v-model="radio1">
				<el-radio-button label="数据统计"></el-radio-button>
				<el-radio-button label="账单详情"></el-radio-button>
				<el-radio-button label="邀请列表"></el-radio-button>
			</el-radio-group>
		</div>
		<!-- 单选end -->

		<!-- 数据统计 -->
		<div class="partne-data flex " v-show="radio1 == '数据统计'">
			<div class="partne-data-info f1 ">
				<div class="flex fvertical">
					<div class="partne-data-info-nav">
						<p class="partne-data-info-nav-title">认证工人（人）</p>
						<p class="partne-data-info-nav-number">10</p>
					</div>
					<div class="partne-data-info-nav">
						<p class="partne-data-info-nav-title">未认证工人（人）</p>
						<p class="partne-data-info-nav-number">12</p>
					</div>
					<div class="partne-data-info-nav">
						<p class="partne-data-info-nav-title">工作中工人（人）</p>
						<p class="partne-data-info-nav-number">30</p>
					</div>
				</div>

				<div class="partne-data-info-list flex fvertical">
					<div class="partne-data-info-list-item">
						<p class="partne-data-info-list-item-title">已提现金额（元）</p>
						<p class="partne-data-info-list-item-number">1000</p>
					</div>
					<div class="partne-data-info-list-item">
						<p class="partne-data-info-list-item-title">可提现金额（元）</p>
						<p class="partne-data-info-list-item-number">2000</p>
					</div>
					<div class="partne-data-info-list-item">
						<p class="partne-data-info-list-item-title">已获得收入（元）</p>
						<p class="partne-data-info-list-item-number">3000</p>
					</div>
				</div>


				<div class="partne-data-info-list flex fvertical">
					<div class="partne-data-info-list-item">
						<p class="partne-data-info-list-item-title">未结算收入（元）</p>
						<p class="partne-data-info-list-item-number">10000</p>
					</div>
					<div class="partne-data-info-list-item">
						<p class="partne-data-info-list-item-title">累计提现笔数（元）</p>
						<p class="partne-data-info-list-item-number">12</p>
					</div>
					<div class="partne-data-info-list-item">
						<p class="partne-data-info-list-item-title">待处理提现（元）</p>
						<p class="partne-data-info-list-item-number">2</p>
					</div>
				</div>

			</div>
			<div class="partne-data-chart">
				<div id="partneChart" style="width: 100%;height: 100%;"></div>
			</div>
		</div>
		<!-- 数据统计end -->

		<!-- 账单详情 -->
		<div class="partne-bill main" v-show="radio1 == '账单详情'">
			<!-- 头部  -->
			<div class="top">
				<p class="bold top-content">数据筛选</p>
				<div class="top-content flex fvertical fbetween">
					<div class="top-content-item flex fvertical ">
						<div class="flex fvertical top-content-item-status">
							<span>输入查询：</span>
							<el-input class="top-content-item-input" v-model="keyword" placeholder="用户ID/名称/手机号码">
							</el-input>
						</div>
						<div class="flex fvertical top-content-item-status">
							<span>状态：</span>
							<el-select v-model="type" placeholder="选择状态">
								<el-option v-for="item in typeList" :key="item.value" :label="item.label"
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

				<div class="partne-bill-radio">
					<el-radio-group v-model="billRadio" @change="handleBillRoadio">
						<el-radio-button label="已获得收入"></el-radio-button>
						<el-radio-button label="未结算收入"></el-radio-button>
						<el-radio-button label="提现记录"></el-radio-button>
					</el-radio-group>
				</div>
				<!--  已获得收入 -->
				<billList v-loading="loading" :show="billRadio== '已获得收入'?true:false" :tableData="tableData"
					:pageIndex="pageIndex" :pageSize="pageSize" :pageCount="pageCount"
					@handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange" />
				<!--  已获得收入end -->

			</div>
			<!-- 头部end -->

		</div>
		<!-- 账单详情end -->
	</div>

</template>

<script>
	import {
		getPartnerDetails,
		getIncomeDetail,
		getInvitationTeam,
		getInvitationIncome
	} from '../../../api/user.js'
	import billList from '../components/partner/bill-list.vue'
	import moment from 'moment'
	export default {
		data() {
			return {
				notTableData: [], // 未获取收入列表
				notPageIndex: 1,
				notPageSize: 10,
				notPageCount: 0,
				billRadio: "已获得收入",
				radio1: "账单详情",
				keyword: "",
				type: "",
				typeList: [{
					label: "全部",
					value: ""
				}, {
					label: "完成认证奖励",
					value: 0
				}, {
					label: "施工费用分佣",
					value: 1
				}, {
					label: "完成施工奖励",
					value: 2
				}],
				blliTypeList: [{
					label: "全部",
					value: ""
				}, {
					label: "未成为认证工人",
					value: 0
				}, {
					label: "未结施工费用分佣",
					value: 1
				}, {
					label: "未完成施工奖励",
					value: 2
				}],
				status: 0,
				pageIndex: 1, // 页码
				pageSize: 10, // 显示多少条数据
				pageCount: 0, // 总条数
				tableData: [],
				info: {}, // 用户信息
				userLoading: false, // 是否加载用户
				loading: false

			}
		},
		watch: {
			radio1(val) {
				if (val == '数据统计') {
					this.$nextTick(() => {
						this.setChart();
					})
				}
			}
		},
		components: {
			billList
		},
		mounted() {
			// console.log('this.$route',this.$route.query.userId)
			this.userId = this.$route.query.userId;
			this.getPartnerDetails();
			this.getIncomeDetail();
			console.log('-----')
			this.getInvitationTeam();
			this.getInvitationIncome();
		},
		methods: {
			/** 获取数据统计-团队 */
			async getInvitationTeam(){
				let res = await getInvitationTeam(this.userId);
				console.log('获取数据统计-团队',res);
			},
			/** 获取数据统计-收益 */
			async getInvitationIncome(){
				let res = await getInvitationIncome(this.userId);
				console.log('获取数据统计-收益',res);
			},
			/** 切换账单 */
			handleBillRoadio(e) {
				console.log(e)
				switch (e) {
					case '已获得收入':
						this.pageIndex = 1;
						this.type = '';
						this.status = 0;
						this.keyword = '';
						this.getIncomeDetail();
						break;
					case '未结算收入':
						this.pageIndex = 1;
						this.type = '';
						this.status = 1;
						this.keyword = '';
						this.getIncomeDetail();
						break;
					case '提现记录':
						break;
				}
			},
			/** 查询 */
			handelSearch() {
				if (this.billRadio == '提现记录') {
					return
				}
				this.getIncomeDetail();
			},
			/** 重置 */
			handleReset() {
				this.type = '';
				this.pageIndex = 1;
				this.keyword = '';
				if (this.billRadio == '提现记录') {
					return
				}
				this.getIncomeDetail();

			},
			/** 选择分页 */
			handleSizeChange(e) {
				this.pageSize = e;
				this.pageIndex = 1;
				this.getIncomeDetail();
			},
			/** 点击分页 */
			handleCurrentChange(e) {
				this.pageIndex = e;
				this.getIncomeDetail();
			},
			/** 获取账号详情列表 */
			async getIncomeDetail() {
				let param = {};
				param.pageNum = this.pageIndex;
				param.pageSize = this.pageSize;
				param.keyword = this.keyword;
				param.status = this.status;
				param.type = this.type;
				this.loading = true;
				try {
					let res = await getIncomeDetail(param);
					this.tableData = res.data.list
					this.pageCount = res.data.total
					this.loading = false;
				} catch (e) {
					//TODO handle the exception
					this.loading = false;
				}
			},

			formatDateTime(value) {
				return value ? moment(value).format('YYYY-MM-DD HH:mm:ss') : '';
			},
			/** 获取合伙人信息 */
			async getPartnerDetails() {
				this.userLoading = true;
				try {
					let res = await getPartnerDetails(this.userId);
					console.log(res);
					this.userLoading = false;
					this.info = res.data;
				} catch (e) {
					this.userLoading = false;
					//TODO handle the exception
				}


			},
			/** 图表 */
			setChart() {
				let myChart = this.$echarts.init(document.getElementById('partneChart'))
				let option = {
					tooltip: {
						trigger: 'item'
					},
					legend: {
						top: '5%',
						left: 'center'
					},
					color: ['#35CBCB', '#3AA0FF'],
					series: [{
						type: 'pie',
						radius: ['40%', '70%'],
						avoidLabelOverlap: false,
						itemStyle: {
							borderRadius: 10,
							borderColor: '#fff',
							borderWidth: 2
						},
						label: {
							show: false,
							position: 'center'
						},
						emphasis: {
							label: {
								show: true,
								fontSize: '40',
								fontWeight: 'bold'
							}
						},
						labelLine: {
							show: false
						},
						data: [{
								value: 1048,
								name: '认证工人'
							},
							{
								value: 735,
								name: '未认证工人'
							},
						]
					}]
				};
				myChart.setOption(option)
			}
		}
	}
</script>

<style lang="scss">
	.details-top {
		height: 150px;
		border: 1px solid #ccc;
		overflow: hidden;

		.details-top-img {
			width: 300px;
			height: 150px;
			text-align: center;
			display: inline-block;
			border-right: 1px solid #ccc;
			background-color: #f1f1f1;
			padding-left: 20px;

			p {
				font-size: 18px;
				margin-top: 10px;
			}

			.details-top-icon {
				width: 80px;
				height: 80px;
				background-color: #ccc;
				border-radius: 50%;
				margin: 20px auto 0;
				overflow: hidden;

				i {
					color: #fff;
					font-size: 60px;
				}

				img {
					width: 70px;
					height: 70px;
					border-radius: 50%;
				}
			}
		}

		.details-top-info {
			height: 100%;

			.details-top-info-list {
				width: 50%;
				height: 100%;
				border-right: 1px solid #CCCCCC;

				&:nth-last-of-type(1) {
					border-right: none;
				}

				.details-top-info-list-item {
					height: 50px;
					line-height: 50px;
					border-bottom: 1px solid #CCCCCC;
					overflow: hidden;

					.details-top-info-list-item-date {
						padding-left: 20px;
					}

					.details-top-info-list-item-name {
						width: 160px;
						display: inline-block;
						background-color: #f1f1f1;
						text-align: right;
						padding-right: 20px;
						border-right: 1px solid #CCCCCC;
					}
				}
			}
		}
	}

	.partne-radio {
		margin: 15px 0;
	}

	.partne-data {
		margin: 0 50px;

		.partne-data-info {
			.partne-data-info-nav {
				width: 240px;
				height: 110px;
				background-color: rgb(254, 192, 61);
				margin-right: 20px;
				margin-bottom: 20px;
				color: #FFF;
				text-align: center;

				&:nth-last-of-type(1) {
					margin-right: 0;
					background-color: rgb(0, 204, 102);
				}

				&:nth-last-of-type(2) {
					background-color: rgb(88, 163, 247);
				}

				.partne-data-info-nav-title {
					font-size: 13px;
					margin-top: 30px;
				}

				.partne-data-info-nav-number {
					font-size: 26px;
					margin-top: 10px;
				}
			}

			.partne-data-info-list {
				border: 1px solid #CCCCCC;
				margin-top: 40px;
				margin-bottom: 60px;

				.partne-data-info-list-item {
					width: 33.33%;
					padding: 40px 0;
					text-align: center;
					border-right: 1px solid #CCCCCC;

					&:nth-last-of-type(1) {
						border-right: none;
					}

					.partne-data-info-list-item-number {
						font-size: 26px;
						margin-top: 10px;
					}
				}
			}
		}

		.partne-data-chart {
			width: 650px;
			height: 510px;
			margin-left: 50px;
			border: 1px solid #CCCCCC;
		}
	}

	.partne-bill {
		.partne-bill-radio {
			border-top: 1px solid #f1f1f1;
			border-bottom: 1px solid #f1f1f1;
			padding: 20px;
		}

		.partne-bill-table {
			// margin-top: 20px;
			margin: 20px 20px 0;
		}
	}
</style>
