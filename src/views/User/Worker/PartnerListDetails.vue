<template>
	<div class="main">
		<!-- 用户信息 -->
		<div class="details-top flex fvertical" v-loading="userLoading">
			<div class="details-top-img">
				<div class="details-top-icon flex fvertical fcenter">
					<img v-if="info && info.headPortrait" :src="info.headPortrait" alt="">
					<i class="el-icon-s-custom" v-else></i>
				</div>
				<p>{{info&&info.userName?info.userName:''}}</p>
			</div>
			<div class="details-top-info f1 flex fvertical">
				<div class="details-top-info-list">
					<div class="details-top-info-list-item">
						<span class="details-top-info-list-item-name">ID</span>
						<span class="details-top-info-list-item-date">{{info&&info.userId?info.userId:''}}</span>
					</div>
					<div class="details-top-info-list-item">
						<span class="details-top-info-list-item-name">手机号码</span>
						<span class="details-top-info-list-item-date">{{info&&info.phone?info.phone:''}}</span>
					</div>
					<div class="details-top-info-list-item">
						<span class="details-top-info-list-item-name">邀请人数</span>
						<span
							class="details-top-info-list-item-date">{{info&&info.invitationNum?info.invitationNum:0}}人</span>
					</div>
					<div class="details-top-info-list-item">
						<span class="details-top-info-list-item-name">成为合伙人时间</span>
						<span
							class="details-top-info-list-item-date">{{info && info.approvedTime ? formatDateTime(info.approvedTime):''}}</span>
					</div>
					
				</div>
				<div class="details-top-info-list">
					<div class="details-top-info-list-item">
						<span class="details-top-info-list-item-name">名称</span>
						<span class="details-top-info-list-item-date">{{info&&info.userName?info.userName:''}}</span>
					</div>
					<div class="details-top-info-list-item">
						<span class="details-top-info-list-item-name">积分数量</span>
						<span class="details-top-info-list-item-date">{{info&&info.integral?info.integral:''}}</span>
					</div>
					<div class="details-top-info-list-item">
						<span class="details-top-info-list-item-name">地区</span>
						<span class="details-top-info-list-item-date">{{info&&info.cityName?info.cityName:''}}</span>
					</div>
					<div class="details-top-info-list-item">
						<span class="details-top-info-list-item-name">合伙人结束时间</span>
						<span class="details-top-info-list-item-date">{{info&&info.expireTime?info.expireTime:''}}</span>
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
						<p class="partne-data-info-nav-number">{{teamInfo.authNum || 0}}</p>
					</div>
					<div class="partne-data-info-nav">
						<p class="partne-data-info-nav-title">未认证工人（人）</p>
						<p class="partne-data-info-nav-number">{{teamInfo.unAuthNum || 0}}</p>
					</div>
					<div class="partne-data-info-nav">
						<p class="partne-data-info-nav-title">工作中工人（人）</p>
						<p class="partne-data-info-nav-number">{{teamInfo.workingNum || 0}}</p>
					</div>
				</div>

				<div class="partne-data-info-list flex fvertical">
					<div class="partne-data-info-list-item">
						<p class="partne-data-info-list-item-title">已提现金额（元）</p>
						<p class="partne-data-info-list-item-number">{{incomeInfo.withdrawTotalFee || 0}}</p>
					</div>
					<div class="partne-data-info-list-item">
						<p class="partne-data-info-list-item-title">可提现金额（元）</p>
						<p class="partne-data-info-list-item-number">{{incomeInfo.canWithdrawFee || 0}}</p>
					</div>
					<div class="partne-data-info-list-item">
						<p class="partne-data-info-list-item-title">已获得收入（元）</p>
						<p class="partne-data-info-list-item-number">{{incomeInfo.balanceTotalIncome || 0}}</p>
					</div>
				</div>


				<div class="partne-data-info-list flex fvertical">
					<div class="partne-data-info-list-item">
						<p class="partne-data-info-list-item-title">未结算收入（元）</p>
						<p class="partne-data-info-list-item-number">{{incomeInfo.unBalanceTotalIncome || 0}}</p>
					</div>
					<div class="partne-data-info-list-item">
						<p class="partne-data-info-list-item-title">累计提现笔数（元）</p>
						<p class="partne-data-info-list-item-number">{{incomeInfo.withdrawTotalOrder || 0}}</p>
					</div>
					<div class="partne-data-info-list-item">
						<p class="partne-data-info-list-item-title">待处理提现（元）</p>
						<p class="partne-data-info-list-item-number">{{incomeInfo.pendingWithdrawOrder || 0}}</p>
					</div>
				</div>

			</div>
			<div class="partne-data-chart">
				<p class="flex fcenter bold" style="margin: 20px; 0">邀请人数：{{teamInfo.totalNum || 0}}人</p>
				<div id="partneChart" style="width: 100%;height: 100%;"></div>
			</div>
		</div>
		<!-- 数据统计end -->

		<!-- 账单详情 -->
		<div class="partne-bill main" v-show="radio1 == '账单详情'">
			<!-- 头部  -->
			<div class="top">
				<p v-if="billRadio != '积分明细'" class="bold top-content">数据筛选</p>
				<div v-if="billRadio != '积分明细'" class="top-content flex fvertical fbetween">
					<div class="top-content-item flex fvertical ">
						<div class="flex fvertical top-content-item-status">
							<span>输入查询：</span>
							<!--  -->
							<el-input class="top-content-item-input" v-model="keyword"
								:placeholder="billRadio=='提现记录'?'订单ID':'用户ID/名称/手机号码'">
							</el-input>
						</div>
						<div class="flex fvertical top-content-item-status">
							<span>状态：</span>

							<el-select v-model="type" placeholder="选择状态">
								<template v-if="billRadio=='已获得收入'">
									<el-option v-for="item in typeList" :key="item.value" :label="item.label"
										:value="item.value">
									</el-option>
								</template>
								<template v-if="billRadio=='未结算收入'">
									<el-option v-for="item in blliTypeList" :key="item.value" :label="item.label"
										:value="item.value">
									</el-option>
								</template>
								<template v-if="billRadio=='提现记录'">
									<el-option v-for="item in recordList" :key="item.value" :label="item.label"
										:value="item.value">
									</el-option>
								</template>
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
						<el-radio-button label="积分明细"></el-radio-button>
					</el-radio-group>
				</div>
				<div class="partne-bill-title flex fbetween fvertical">
					<div class="bold">数据列表</div>
					<!-- <el-button @click="handleExport">导出</el-button> -->
				</div>

				<!--  已获得收入 / 未结算收入 -->
				<billList v-loading="loading" v-if="billRadio!= '提现记录'" :show="billRadio== '已获得收入'?true:false"
					:tableData="tableData" :pageIndex="pageIndex" :pageSize="pageSize" :pageCount="pageCount"
					@handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange" />
				<!--  已获得收入 / 未结算收入 end -->

				<!-- 提现记录 -->
				<recordList v-else-if="billRadio == '提现记录'" :recordTable="recordTable" :recordCount="recordCount"
					:recordSize="recordSize" :recordIndex="recordIndex" v-loading="recordLoading"
					@handleSizeChangeRecord="handleSizeChangeRecord"
					@handleCurrentChangeRecord="handleCurrentChangeRecord" />
				<!-- 提现记录end -->

				<!--- 积分明细 -->
				<integralList v-else-if="billRadio == '积分明细'" :tableData="tableDataIntegral" :pageIndex="inteIndex"
					:pageSize="inteSize" v-loading="loading" :pageCount="inteCount" @handleSizeChange="handleSizeChangeIntegral"
					@handleCurrentChange="handleCurrentChangeIntegral" />
				<!--- 积分明细end -->
			</div>
			<!-- 头部end -->

		</div>
		<!-- 账单详情end -->
		<!-- 邀请列表 -->
		<div class="partne-invite main" v-show="radio1 == '邀请列表'">
			<div class="top">
				<p class="bold top-content">数据筛选</p>
				<div class="top-content flex fvertical fbetween">
					<div class="top-content-item flex fvertical ">
						<div class="flex fvertical top-content-item-status">
							<span>输入查询：</span>
							<!--  -->
							<el-input class="top-content-item-input" v-model="inviteKeyWord" placeholder="用户ID/名称/手机号码">
							</el-input>
						</div>
						<div class="flex fvertical top-content-item-status">
							<span>认证状态：</span>

							<el-select v-model="inviteStatus" placeholder="选择状态">

								<el-option v-if="inviteRadio == '邀请注册'" v-for="item in inviteList" :key="item.value"
									:label="item.label" :value="item.value">
								</el-option>

								<el-option v-if="inviteRadio == '工作分享'" v-for="item in taskList" :key="item.value"
									:label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</div>
					</div>
					<div class="top-content-btn">
						<el-button type="primary" @click="handelInviteSearch"> 查询</el-button>
						<el-button @click="handleInviteReset">重置</el-button>
					</div>

				</div>

				<div class="invite-tables">
					<el-radio-group v-model="inviteRadio" @change="handleInviteRadio">
						<el-radio-button label="邀请注册"></el-radio-button>
						<el-radio-button label="工作分享"></el-radio-button>
					</el-radio-group>
				</div>

				<!-- 邀请注册列表 -->
				<inviteList v-loading="inviteLoading" v-if="inviteRadio == '邀请注册'" :tableData="inviteTables"
					:pageIndex="inviteIndex" :pageSize="inviteSize" :pageCount="inviteCount"
					@handleSizeChange="handleSizeChangeInvite" @handleCurrentChange="handleCurrentChangeInvite" />
				<!-- 邀请注册列表end -->

				<!-- 任务分享 -->
				<inviteTask v-else v-loading="taskLoading" :tableData="taskTables" :pageIndex="taskIndex"
					:pageSize="taskSize" :pageCount="taskCount" @handleSizeChange="handleSizeChangeTask"
					@handleCurrentChange="handleCurrentChangeTask" />
				<!-- 任务分享end -->

			</div>

		</div>
		<!-- 邀请列表end -->
	</div>

</template>

<script>
	import {
		getPartnerDetails,
		getIncomeDetail,
		getInvitationTeam,
		getInvitationIncome,
		getRecordList,
		getRecordExport,
		getInviteList,
		getTaskList,
		getTaskExport,
		getIncomeDetailExport,
		getIntegralList
	} from '../../../api/user.js'
	import billList from '../components/partner/bill-list.vue'
	import recordList from '../components/partner/record-list.vue'
	import inviteList from '../components/partner/invite-list.vue'
	import inviteTask from '../components/partner/invite-task.vue'
	import integralList from '../components/partner/integral-list.vue'
	import moment from 'moment'
	export default {
		data() {
			return {
				inteIndex:1,
				inteSize:10,
				inteCount:0,
				taskIndex: 1,
				taskSize: 10,
				taskCount: 0,
				taskLoading: false, // 工作任务
				taskTables: [],
				inviteLoading: false, // 邀请注册正在加载
				inviteKeyWord: "", // 邀请注册-搜索
				inviteIndex: 1,
				inviteSize: 10,
				inviteCount: 0,
				inviteTables: [],
				notTableData: [], // 未获取收入列表
				notPageIndex: 1,
				notPageSize: 10,
				notPageCount: 0,
				billRadio: "已获得收入",
				radio1: "数据统计",
				keyword: "",
				type: "",
				inviteRadio: "邀请注册",
				typeList: [{
					label: "全部",
					value: ""
				}, {
					label: "完成认证奖励",
					value: 0
				}, {
					label: "施工费用分佣",
					value: 2
				}, {
					label: "完成施工奖励",
					value: 1
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
				recordList: [{
					label: "全部",
					value: ""
				}, {
					label: "审核中",
					value: 0
				}, {
					label: "已到账",
					value: 2
				}, {
					label: "到账失败",
					value: 1
				}],
				inviteList: [ // 邀请注册
					{
						label: "全部",
						value: ""
					}, {
						label: "未认证",
						value: 0
					}, {
						label: "已认证",
						value: 1
					}
				],
				taskList: [{
					label: "全部",
					value: ""
				}, {
					label: "工作中",
					value: 1
				}, {
					label: "已完成",
					value: 2
				}],
				inviteStatus: "",
				status: 0,
				pageIndex: 1, // 页码
				pageSize: 10, // 显示多少条数据
				pageCount: 0, // 总条数
				tableData: [],
				info: {}, // 用户信息
				userLoading: false, // 是否加载用户
				loading: false,
				incomeInfo: {}, // 统计合伙人收益
				teamInfo: {}, // 统计
				recordIndex: 1, // 页码
				recordSize: 10, // 显示多少条数据
				recordCount: 0, // 总条数
				recordTable: [], // 提现记录
				recordLoading: false, // 是否加载提现记录列表
				tableDataIntegral:[], // 积分列表
			}
		},
		watch: {

		},
		components: {
			billList,
			recordList,
			inviteList,
			inviteTask,
			integralList
		},
		mounted() {
			// console.log('this.$route',this.$route.query.userId)
			this.userId = this.$route.query.userId;
			this.getPartnerDetails();
			this.getIncomeDetail();
			this.getInvitationTeam();
			this.getInvitationIncome();
			this.getInviteList();
			this.getTaskList();
			this.getIntegralList();

		},
		methods: {
			/** 邀请列表-搜索 */
			handelInviteSearch() {
				if (this.inviteRadio == '邀请注册') {
					this.getInviteList();
					return;
				}
				this.getTaskList();
			},
			/** 邀请列表-重置 */
			handleInviteReset() {
				this.inviteKeyWord = '';
				this.inviteStatus = '';
				if (this.inviteRadio == '邀请注册') {
					this.inviteIndex = 1;
					this.getInviteList();
					return;
				}
				this.taskIndex = 1;
				this.getTaskList();
			},
			/** 获取工作分享列表 */
			async getTaskList() {
				let param = {};
				param.pageNum = this.taskIndex;
				param.pageSize = this.taskSize;
				param.userId = this.userId;
				param.keyword = this.inviteKeyWord;
				param.workStatus = this.inviteStatus;
				this.taskLoading = true;
				try {
					let res = await getTaskList(param);
					this.taskSize = res.data.total;
					this.taskTables = res.data.list;
					this.taskLoading = false;
				} catch (e) {
					this.taskLoading = false;
					//TODO handle the exception
				}
			},

			/** 切换-邀请列表 */
			handleInviteRadio(e) {
				this.inviteKeyWord = '';
				this.inviteStatus = '';
				if (e == '邀请注册') {
					this.inviteIndex = 1;
					this.getInviteList();
					return;
				}
				this.taskIndex = 1;
				this.getTaskList();

			},
			/** 获取邀请注册列表 */
			async getInviteList() {
				try {
					let param = {};
					param.pageNum = this.inviteIndex;
					param.pageSize = this.inviteSize;
					param.userId = this.userId;
					param.authStatus = this.inviteStatus;
					param.keyword = this.inviteKeyWord;
					this.inviteLoading = true;
					let res = await getInviteList(param);
					this.inviteLoading = false;
					this.inviteCount = res.data.total;
					this.inviteTables = res.data.list;
				} catch (e) {
					this.inviteLoading = false;
					//TODO handle the exception
				}
			},

			/** 获取账单详情-提现记录 */
			async getRecordList() {
				console.log('获取账单详情-提现记录')
				let param = {};
				param.pageNum = this.recordIndex;
				param.pageSize = this.recordSize;
				param.userId = this.userId;
				param.keyword = this.keyword;
				param.status = this.type;
				this.recordLoading = true;
				try {
					let res = await getRecordList(param);
					this.recordTable = res.data.list;
					this.recordCount = res.data.total
					this.recordLoading = false;
				} catch (e) {
					//TODO handle the exception
					this.recordLoading = false;
				}

			},
			/** 导出账单 */
			async handleExport() {
				let param = {};
				param.pageNum = this.recordIndex;
				param.pageSize = this.recordSize;
				param.userId = this.userId;
				param.keyword = this.keyword;
				param.status = this.type;
				try {
					let res = await getIncomeDetailExport(param);
				} catch (e) {
					//TODO handle the exception
					console.log(e);
				}


			},
			/** 获取数据统计-团队 */
			async getInvitationTeam() {
				try {
					let res = await getInvitationTeam(this.userId);
					this.teamInfo = res.data;
					console.log('获取数据统计-团队', res.data);
					this.setChart();
				} catch (e) {
					console.log(e)
					//TODO handle the exception
				}

			},
			/** 获取数据统计-收益 */
			async getInvitationIncome() {
				let res = await getInvitationIncome(this.userId);
				this.incomeInfo = res.data;
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
						this.recordIndex = 1;
						this.keyword = '';
						this.type = '';
						this.getRecordList();
						break;
					case '积分明细':
						this.getIntegralList();
						this.inteIndex = 1;
						break;
				}
			},
			/** 查询 */
			handelSearch() {
				if (this.billRadio == '提现记录') {
					this.getRecordList();
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
					this.recordIndex = 1;
					this.getRecordList();
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
			handleSizeChangeRecord(e) {
				this.recordSize = e;
				this.recordIndex = 1;
				this.getRecordList();
			},
			handleSizeChangeInvite(e) {
				this.inviteSize = e;
				this.inviteIndex = 1;
				this.getInviteList();
			},
			handleSizeChangeTask(e) {
				this.taskSize = e;
				this.taskIndex = 1;
				this.getTaskList();
			},
			handleSizeChangeIntegral(e){
				this.inteSize = e;
				this.inteIndex = 1;
				this.getIntegralList()
			},
			/** 点击分页 */
			handleCurrentChange(e) {
				this.pageIndex = e;
				this.getIncomeDetail();
			},
			handleCurrentChangeRecord(e) {
				this.recordIndex = e;
				this.getRecordList();
			},
			handleCurrentChangeInvite(e) {
				this.inviteIndex = e
				this.getInviteList();
			},
			handleCurrentChangeTask(e) {
				this.taskIndex = e;
				this.getTaskList();
			},
			handleCurrentChangeIntegral(e){
				this.inteIndex = e;
				this.getIntegralList();
			},
			/** 获取积分明细 */
			async getIntegralList(){
				console.log('获取积分明细')
				this.loading = true;
				try{
					let param = {};
					param.pageNum = this.inteIndex;
					param.pageSize = this.inteSize;
					param.userId = this.userId;
					let res = await getIntegralList(param)
					this.inteCount = res.data.total;
					this.tableDataIntegral = res.data.list;
					this.loading = false
				}catch(e){
					//TODO handle the exception
					this.loading = false
				}
			
			},
			/** 获取账号详情列表 */
			async getIncomeDetail() {
				let param = {};
				param.pageNum = this.pageIndex;
				param.pageSize = this.pageSize;
				param.keyword = this.keyword;
				param.status = this.status;
				param.type = this.type;
				param.userId = this.userId
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
					this.userLoading = false;
					this.info = res.data;
				} catch (e) {
					this.userLoading = false;
					//TODO handle the exception
				}


			},
			/** 计算百分比 */
			getPercent(curNum, totalNum, isHasPercentStr = true) {
				curNum = parseFloat(curNum);
				totalNum = parseFloat(totalNum);

				if (isNaN(curNum) || isNaN(totalNum)) {
					return '-';
				}

				return isHasPercentStr ?
					totalNum <= 0 ? '0%' : (Math.round(curNum / totalNum * 10000) / 100.00 + '%') :
					totalNum <= 0 ? 0 : (Math.round(curNum / totalNum * 10000) / 100.00);
			},
			/** 图表 */
			setChart() {
				let myChart = this.$echarts.init(document.getElementById('partneChart'))
				let data = [{
						value: this.teamInfo.authNum,
						name: '认证工人',
						percent: this.getPercent(this.teamInfo.authNum, (this.teamInfo.authNum + this.teamInfo
							.unAuthNum))
					},
					{
						value: this.teamInfo.unAuthNum,
						name: '未认证工人',
						percent: this.getPercent(this.teamInfo.unAuthNum, (this.teamInfo.authNum + this.teamInfo
							.unAuthNum))
					}
				]
				let option = {
					tooltip: {
						trigger: 'item',
						formatter: '{b}: {c}({d}%)'
					},
					legend: {
						top: '5%',
						left: 'center',
						formatter: function(name) {
							// if ()
							let num = 0;
							let percent = 0;
							// console.log('data',data)
							for (let i = 0; i < data.length; i++) {
								if (data[i].name == name) {
									num = data[i].value
									percent = data[i].percent
								}
							}
							return name + '   ' + num + '     ' + percent
						}

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
						data: data
					}]
				};
				myChart.setOption(option)
			}
		}
	}
</script>

<style lang="scss">
	.details-top {
		// height: 150px;
		border: 1px solid #ccc;
		overflow: hidden;

		.details-top-img {
			width: 300px;
			text-align: center;
			display: inline-block;
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

	.invite-tables {
		border-top: 1px solid #f1f1f1;
		padding: 20px;
	}

	.partne-radio {
		margin: 15px 0;
	}

	.partne-bill-title {
		padding: 20px 20px 10px;
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
