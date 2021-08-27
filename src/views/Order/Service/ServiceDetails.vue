<template>
	<div class="service-details page">
		<!-- tab按钮切换 -->
		<el-radio-group v-model="tabPosition" style="margin-bottom: 30px;">
			<el-radio-button label="order">服务单详情</el-radio-button>
			<el-radio-button label="member">成员名单</el-radio-button>
			<el-radio-button label="recharge">充值</el-radio-button>
			<el-radio-button label="invoicing">开票</el-radio-button>
			<el-radio-button label="evaluate">评价</el-radio-button>
		</el-radio-group>
		<!-- tab按钮切换end -->

		<!--  成员名单 -->
		<div class="service-details-member" v-if="tabPosition == 'member'">
			<div class="top">
				<div class="top-title ">数据筛选</div>
				<div class="top-content flex fvertical fbetween">
					<div class="top-content-item flex fvertical">
						<div class="flex fvertical top-content-item-status">
							<span>工种：</span>
							<el-input class="top-content-item-input" v-model="serach" placeholder="ID/项目名称">
							</el-input>
						</div>
						<div class="flex fvertical top-content-item-status">
							<span>工种标签：</span>
							<el-select v-model="value" placeholder="选择跟进人">
								<el-option v-for="item in options" :key="item.value" :label="item.label"
									:value="item.value">
								</el-option>
							</el-select>
						</div>
						<div class="flex fvertical top-content-item-status">
							<span>招工状态：</span>
							<el-select v-model="status" placeholder="选择跟进人">
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

			<div class="box">
				<div class="service-details-member-top flex fvertical fbetween">
					<el-radio-group v-model="scheme" style="margin-bottom: 30px;">
						<el-radio-button label="name">方案名单</el-radio-button>
						<el-radio-button label="delay">延期方案名单</el-radio-button>
					</el-radio-group>
					<div class="top-content-status">报名中</div>
					<!-- <el-tag size="medium">标签一</el-tag> -->
					<el-button type="primary" @click="handleOpenMember">查看详细报名数据</el-button>
				</div>

				<div class="service-details-member-box">

					<!--  方案名单基本信息  -->
					<div class="service-details-member-box-info flex fvertical fbetween">

						<div class="service-details-member-box-info-item flex fvertical">
							<span class="service-details-member-box-info-item-name">方案标签</span>
							<el-input class="f1" :disabled="true" placeholder="请输入内容"></el-input>
						</div>

						<div class="service-details-member-box-info-item flex fvertical">
							<span class="service-details-member-box-info-item-name">简介</span>
							<el-input class="f1" :disabled="true" placeholder="请输入内容"></el-input>
						</div>

						<div class="service-details-member-box-info-item flex fvertical">
							<span class="service-details-member-box-info-item-name">换人次数</span>

							<div class="flex f1">
								<el-input class="f1" :disabled="true" placeholder="请输入内容"></el-input>
								<el-input class="member-min-input" value="次" :disabled="true"></el-input>
							</div>
						</div>

						<div class="service-details-member-box-info-item flex fvertical">
							<span class="service-details-member-box-info-item-name">方案总工程量</span>
							<el-input class="f1" :disabled="true" placeholder="请输入内容"></el-input>
						</div>

					</div>

					<!--  方案名单基本信息end  -->


					<!--  报名列表信息 -->
					<div class="service-details-member-box-list">
						<div class="service-details-member-box-list-top flex fvertical ">
							<div class="service-details-member-box-list-top-item flex fvertical">
								<span>班组名称</span>
								<el-input placeholder="请输入内容" :disabled="true" class="f1"></el-input>
							</div>
							<div class="service-details-member-box-list-top-item flex fvertical">
								<span>进场时间</span>
								<el-input placeholder="请输入内容" :disabled="true" class="f1"></el-input>
							</div>
							<div class="service-details-member-box-list-top-item flex fvertical">
								<span>退场时间</span>
								<el-input placeholder="请输入内容" :disabled="true" class="f1"></el-input>
							</div>
							<div class="service-details-member-box-list-top-item flex fvertical">
								<span>班组工期</span>
								<el-input placeholder="请输入内容" :disabled="true" class="f1"></el-input>
							</div>
							<div class="service-details-member-box-list-top-item flex fvertical">
								<span>班组工程量</span>
								<div class="flex f1">
									<el-input placeholder="请输入内容" :disabled="true" class="f1"></el-input>
									<el-input class="member-min-input" placeholder="次" :disabled="true"></el-input>
								</div>

							</div>
							<div class="service-details-member-box-list-top-item flex fvertical">
								<span>计件单价</span>
								<el-input placeholder="请输入内容" :disabled="true" class="f1"></el-input>
							</div>
							<div class="service-details-member-box-list-top-item flex fvertical">
								<span>上班时间</span>
								<el-input placeholder="请输入内容" :disabled="true" class="f1"></el-input>
							</div>
							<div class="service-details-member-box-list-top-item flex fvertical">
								<span>午休时间</span>
								<el-input placeholder="请输入内容" :disabled="true" class="f1"></el-input>
							</div>

						</div>


						<div class="service-details-member-box-list-item flex fvertical " v-for="item in 5">

							<div class="service-details-member-box-list-item-main flex fvertical">
								<span>工种</span>
								<el-input class="f1" :disabled="true" value="电工"></el-input>
							</div>

							<div class="service-details-member-box-list-item-main flex fvertical">
								<span>工种标签</span>
								<el-input class="f1" :disabled="true" value="电工"></el-input>
							</div>

							<div class="service-details-member-box-list-item-main flex fvertical ">
								<span>工种模式</span>
								<el-input class="f1" :disabled="true" value="电工"></el-input>
							</div>

							<div class="service-details-member-box-list-item-main flex fvertical">
								<span>进场时间</span>
								<el-input class="f1" :disabled="true" value="电工"></el-input>
							</div>

							<div class="service-details-member-box-list-item-main flex fvertical">
								<span>工种工期</span>
								<div class="flex f1">
									<el-input class="f1" :disabled="true" value="电工"></el-input>
									<el-input class="member-min-input" :disabled="true" value="次"></el-input>
								</div>
							</div>

							<div class="service-details-member-box-list-item-main flex fvertical">
								<span>退场时间</span>
								<el-input class="f1" :disabled="true" value="2021-6-25"></el-input>
							</div>



							<!-- 普通 -->

							<div class="service-details-member-box-list-item-main flex fvertical">
								<span>个人工程量</span>
								<div class="flex f1">
									<el-input class="f1" :disabled="true" value="电工"></el-input>
									<el-input class="member-min-input" :disabled="true" value="㎡"></el-input>
								</div>
							</div>

							<div class="service-details-member-box-list-item-main flex fvertical">
								<span>计件单价</span>
								<div class="flex f1">
									<el-input class="f1" :disabled="true" value="电工"></el-input>
									<el-input class="member-min-input" :disabled="true" value="元/㎡"></el-input>
								</div>
							</div>

							<div class="service-details-member-box-list-item-main flex fvertical">
								<span>人数</span>
								<div class="flex f1">
									<el-input class="f1" :disabled="true" value="电工"></el-input>
									<el-input class="member-min-input" :disabled="true" value="人"></el-input>
								</div>
							</div>
							<!-- 普通end -->


							<!-- 带班计件管理 -->
							<div class="flex fvertical fbetween service-details-member-box-list-item-admin">
								<div class=" flex fvertical service-details-member-box-list-item-admin-conter">
									<span class="service-details-member-box-list-item-admin-name">个人工程量</span>
									<div class="flex fvertical f1">
										<el-input class="f1" :disabled="true" value="2000"></el-input>
										<el-input class="member-min-input" :disabled="true" value="㎡"></el-input>
									</div>

								</div>
								<div class=" flex fvertical service-details-member-box-list-item-admin-conter">
									<span class="service-details-member-box-list-item-admin-name">计件单价</span>
									<div class="flex fvertical f1">
										<el-input class="f1" :disabled="true" value="2000"></el-input>
										<el-input class="member-min-input" :disabled="true" value="元/㎡"></el-input>
									</div>
								</div>
								<div class=" flex fvertical service-details-member-box-list-item-admin-conter">
									<span class="service-details-member-box-list-item-admin-name">人数</span>
									<div class="flex fvertical f1">
										<el-input class="f1" :disabled="true" value="2000"></el-input>
										<el-input class="member-min-input" :disabled="true" value="人"></el-input>
									</div>
								</div>
								<div class=" flex fvertical service-details-member-box-list-item-admin-conter">
									<span class="service-details-member-box-list-item-admin-name">带班管理费</span>
									<div class="flex fvertical f1">
										<el-input class="f1" :disabled="true" value="2000"></el-input>
										<el-input class="member-min-input" :disabled="true" value="元/天"></el-input>
									</div>
								</div>

							</div>


							<!-- 带班计件管理end -->
							<!-- 计时 -->

							<div class="service-details-member-box-list-item-main flex fvertical">
								<span>每日工时</span>
								<el-input class="f1" :disabled="true" value="㎡"></el-input>
							</div>

							<div class="service-details-member-box-list-item-main flex fvertical">
								<span>工时单价</span>
								<div class="flex f1">
									<el-input class="f1" :disabled="true" value="电工"></el-input>
									<el-input class="member-min-input" :disabled="true" value="元/小时"></el-input>
								</div>
							</div>

							<div class="service-details-member-box-list-item-main flex fvertical">
								<span>每日收入</span>
								<el-input class="f1" :disabled="true" value="240元"></el-input>
							</div>

							<div class="service-details-member-box-list-item-main flex fvertical">
								<span>人数</span>
								<div class="flex f1">
									<el-input class="f1" :disabled="true" value="电工"></el-input>
									<el-input class="member-min-input" :disabled="true" value="人"></el-input>
								</div>
							</div>

							<div class="service-details-member-box-list-item-main flex fvertical">
								<span>加班费</span>
								<div class="flex f1">
									<el-input class="f1" :disabled="true" value="电工"></el-input>
									<el-input class="member-min-input" :disabled="true" value="元/小时"></el-input>
								</div>
							</div>
							<!-- 计时end -->


							<div class="service-details-member-box-list-remarks flex fvertical">
								<span>工作描述</span>
								<el-input type="textarea" class="f1" :disabled="true"></el-input>
							</div>
							<!-- 匹配员工 -->
							<div class="service-details-member-box-list-worker flex fvertical">
								<span class="service-details-member-box-list-worker-title">招工人员</span>
								<div class="f1">
									<span class="service-details-member-box-list-worker-name">完成匹配（3/3）</span>
									<div class="service-details-member-box-list-worker-user flex fvertical">
										<div class="service-details-member-box-list-worker-user-item flex fvertical fbetween"
											v-for="item in 10">
											<span>张三 18888888888</span>
											<i class="el-icon-error"></i>
										</div>

										<div class="service-details-member-box-list-worker-user-add flex fvertical fbetween fcenter"
											@click="dialogVisible = true">
											<!-- <span>张三 18888888888</span> -->
											<i class="el-icon-plus"></i>
										</div>

									</div>
								</div>
							</div>
							<!-- 匹配员工end -->
						</div>

					</div>
					<!--  报名列表信息end -->

				</div>


			</div>
		</div>
		<!--  成员名单end -->


		<!--  添加成员 -->
		<el-dialog title="添加成员" :visible.sync="dialogVisible" width="600px">

			<el-form :model="ruleForm" status-icon ref="ruleForm" label-width="100px"
				class="service-details-member-add-user">
				<el-form-item label="搜索信息" prop="pass">
					<div class="flex fvertical">
						<el-input ref="userName"></el-input>
						<el-button class="service-details-member-add-user-btn" type="primary">查询</el-button>
					</div>
				</el-form-item>
				<el-form-item label="用户ID" prop="checkPass">
					<el-input :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="用户名称" prop="age">
					<el-input :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="联系方式" prop="age">
					<el-input :disabled="true"></el-input>
				</el-form-item>

			</el-form>






			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
			</span>
		</el-dialog>



		<!-- 充值页面  -->
		<div class="service-details-evaluate" v-if="tabPosition == 'recharge'">
			<div class="service-details-evaluate-top flex fvertical">
				<div class="service-details-evaluate-top-item" v-for="(item,index) in rechargeList" :key="index">
					<p class="service-details-evaluate-top-item-title">{{item.title}}</p>
					<p class="service-details-evaluate-top-item-price">{{item.total}}</p>
				</div>
			</div>

			<div class="top">
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
						<el-button type="primary">查询</el-button>
						<el-button>重置</el-button>
					</div>
				</div>
			</div>

			<div class="box">
				<div class="box-top flex fbetween fvertical">
					<div class="bold">数据列表</div>
					<el-button>导出</el-button>
				</div>
				<!--  表格 -->
				<el-table :data="tableData" border style="width: 100%" :stripe="true">
					<el-table-column prop="orderNum" label="ID"  width="170">
					</el-table-column>
					<el-table-column prop="title" label="项目名称"  width="120">
					</el-table-column>
					<el-table-column  label="图片" >
						<template  slot-scope="scope">
							<img :src="item" class="table-img"  v-for="(item,index) in scope.row.images" :key="index" />
						</template>
					</el-table-column>
					<el-table-column prop="fee" label="充值金额"  width="120">
					</el-table-column>
					<el-table-column  label="状态"  width="80">
						<template  slot-scope="scope">
							<p v-if="scope.row.status == 0" class="color-warning">等待对账</p>
							<p v-if="scope.row.status == 1" class="color-success">对账通过</p>
							<p v-if="scope.row.status == 2" class="color-error">已驳回</p>
						</template>
					</el-table-column>
					<el-table-column label="申请时间" >
						<template slot-scope="scope">
							<p>{{formatDate(scope.row.createTime)}}</p>
						</template>
					</el-table-column>
					<el-table-column prop="updateName" label="操作人" width="100">
					</el-table-column>
					<el-table-column label="操作时间" >
						<template slot-scope="scope">
							<p>{{formatDate(scope.row.updateTime)}}</p>
						</template>
					</el-table-column>
					<el-table-column prop="address" label="操作" >
						<template slot-scope="scope">
							<template v-if="scope.row.status == 0">
								<el-button size="mini" type="primary" @click="handleMoney(scope.$index,scope.row)">修改金额
								</el-button>
								<el-button size="mini" type="success" @click="handleAdopt(scope.$index, scope.row)">通过
								</el-button>
								<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">拒绝
								</el-button>
							</template>
							<el-button  v-if="scope.row.status == 2 " type="text" size="mini" @click="handleLook(scope.row)">查看理由</el-button>
						</template>
					</el-table-column>
				</el-table>
				
				<!--  表格end -->
				<!-- 分页  -->
				<div class="flex fcenter page">
					<el-pagination class="page" id="page" background @size-change="handleSizeChange"
						@current-change="handleCurrentChange" :current-page="PageIndex" :page-sizes="[10, 20, 30, 40]"
						:page-size="PageSize" layout="total, prev, pager, next,sizes, jumper" :total="PageCount">
					</el-pagination>
				</div>
				<!-- 分页end -->
			</div>

		</div>
		<!-- 充值页面end  -->
		
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
	import {getBriefPay} from '../../../api/user.js'
	import moment from 'moment'
	export default {
		data() {
			return {
				isLook:false,
				reason:"",
				dialogVisible: false,
				scheme: "name",
				PageIndex: 1, // 页码
				PageSize: 10, // 显示多少条数据
				PageCount: 0, // 总条数
				tableData: [], // 充值列表数据
				tabPosition: "order",
				rechargeList: [{
					title: "项目余额/元",
					total: 7800
				}, {
					title: "余额可用时间/天",
					total: 2
				}, {
					title: "每日消耗/元",
					total: 4000
				}, {
					title: "已付金额/元",
					total: 48000
				}, {
					title: "项目总金额/元",
					total: 98400
				}],
				ruleForm: {},
				orderId: null, // 订单ID
				keywords: "", // 充值搜索内容
				status: "", //状态
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
			}
		},
		watch: {
			dialogVisible(val) {
				if (val) {
					this.$nextTick(() => {
						this.$refs.userName.focus();
					})
				}

			},
		},
		mounted() {
			// console.log(this.$route.query)
			let orderId = this.$route.query.id;
			console.log(orderId)
			this.getBriefPay(orderId);
		},
		methods: {
			formatDate(value) {
			        return moment(value).format('YYYY-MM-DD')
			},
			/** 充值列表 */
			async getBriefPay(orderId) {
				let param = {};
				param.pageIndex = this.PageIndex;
				param.pageSize = this.PageSize;
				param.keywords = this.keywords;
				param.status = this.status;
				param.orderId = orderId;
				let res = await getBriefPay(param);
				this.PageCount = res.data.total;
				this.tableData = res.data.records
				console.log(res);
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
			/** 打开查看详情名单 */
			handleOpenMember() {
				this.$router.push({
					path: '/order/member-details'
				})
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
	// 充值页面
	.service-details-evaluate {
		.service-details-evaluate-top {
			border: 1px solid #E9E9E9;
			margin-bottom: 20px;

			.service-details-evaluate-top-item {
				width: 20%;
				text-align: center;

				p {
					margin: 0;
				}

				.service-details-evaluate-top-item-title {
					font-size: 20px;
					padding: 20px 0 0;
				}

				.service-details-evaluate-top-item-price {
					font-size: 32px;
					line-height: 32px;
					padding: 20px 0;
				}
			}
		}
	}

	.service-details-member-top {
		margin-bottom: 20px;

		.top-content-status {
			width: 250px;
			height: 40px;
			line-height: 40px;
			background-color: #ecf5ff;
			color: #409eff;
			text-align: center;
			border: 1px solid #d9ecff;
			border-radius: 5px;

		}
	}

	// 成员名单
	.service-details-member-box {
		.service-details-member-box-info {
			.service-details-member-box-info-item {
				width: 45%;
				margin-bottom: 20px;

				.service-details-member-box-info-item-name {
					width: 100px;
					margin-right: 20px;
				}
			}
		}
	}


	.service-details-member-box-list {
		background-color: rgba(242, 242, 242, 1);
		padding: 20px;

		.service-details-member-box-list-top {
			border-bottom: 1px dashed rgb(121, 121, 121);

			.service-details-member-box-list-top-item {
				width: 28%;
				margin-bottom: 20px;
				margin-right: 40px;

				span {
					width: 100px;
				}
			}
		}

		.service-details-member-box-list-item {
			margin-top: 20px;

			border-bottom: 1px dashed rgb(121, 121, 121);

			.service-details-member-box-list-item-main {
				width: 28%;
				margin-right: 40px;
				margin-bottom: 20px;

				span {
					width: 100px;
				}
			}
		}
	}

	.member-min-input {
		width: 80px;
		margin-left: 15px;
	}

	.service-details-member-box-list-item-admin {
		width: 100%;
		margin-bottom: 20px;

		.service-details-member-box-list-item-admin-name {
			width: 100px;
		}

		.service-details-member-box-list-item-admin-conter {
			width: 22%;
			margin-right: 15px;
		}
	}

	.service-details-member-box-list-remarks {
		span {
			width: 100px;
		}
	}

	.service-details-member-box-list-worker {
		margin-top: 20px;

		.service-details-member-box-list-worker-title {
			width: 100px;
		}

		.service-details-member-box-list-worker-name {
			color: #0079FE;
			margin-bottom: 20px;
			display: inline-block;
		}

		.service-details-member-box-list-worker-user-item {
			border: 1px solid #CCCCCC;
			padding: 10px 20px;
			margin-bottom: 20px;
			margin-right: 20px;

			i {
				margin-left: 20px;
				cursor: pointer;
			}
		}

		.service-details-member-box-list-worker-user-add {
			border: 1px solid #CCCCCC;
			width: 212px;
			height: 40px;
			text-align: center;
			margin-bottom: 20px;
			cursor: pointer;
		}
	}

	.service-details-member-add-user {
		.el-input {
			width: 300px;
		}

		.service-details-member-add-user-btn {
			margin-left: 20px;
		}
	}
</style>
