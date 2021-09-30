<template>

	<div class="service-details-member-box-list-item flex fvertical " v-loading="loading">

		<div class="service-details-member-box-list-item-main flex fvertical">
			<span>工种</span>
			<el-input class="f1" :disabled="true" :value="items.name"></el-input>
		</div>

		<div class="service-details-member-box-list-item-main flex fvertical">
			<span>工种标签</span>
			<el-input class="f1" :disabled="true" :value="items.tag"></el-input>
		</div>

		<div class="service-details-member-box-list-item-main flex fvertical ">
			<span>工种模式</span>
			<el-input class="f1" :disabled="true" :value="getPatternList(items.workType)">
			</el-input>
		</div>

		<div class="service-details-member-box-list-item-main flex fvertical">
			<span>进场时间</span>
			<el-input class="f1" :disabled="true" :value="formatDate(items.enterStartTime)">
			</el-input>
		</div>

		<div class="service-details-member-box-list-item-main flex fvertical">
			<span>工种工期</span>
			<div class="flex f1">
				<el-input class="f1" :disabled="true" :value="items.enterDay"></el-input>
				<el-input class="member-min-input" :disabled="true" value="天"></el-input>
			</div>
		</div>

		<div class="service-details-member-box-list-item-main flex fvertical">
			<span>退场时间</span>
			<el-input class="f1" :disabled="true" :value="formatDate(items.enterEndTime)">
			</el-input>
		</div>



		<!-- 普通 -->
		<template v-if="items.workType == 1">
			<div class="service-details-member-box-list-item-main flex fvertical">
				<span>个人工程量</span>
				<div class="flex f1">
					<el-input class="f1" :disabled="true" :value="items.personalQuantity "></el-input>
					<el-input class="member-min-input" :disabled="true" value="㎡"></el-input>
				</div>
			</div>

			<div class="service-details-member-box-list-item-main flex fvertical">
				<span>计件单价</span>
				<div class="flex f1">
					<el-input class="f1" :disabled="true" :value="items.unitPrice"></el-input>
					<el-input class="member-min-input" :disabled="true" value="元/㎡"></el-input>
				</div>
			</div>

			<div class="service-details-member-box-list-item-main flex fvertical">
				<span>人数</span>
				<div class="flex f1">
					<el-input class="f1" :disabled="true" :value="items.number"></el-input>
					<el-input class="member-min-input" :disabled="true" value="人"></el-input>
				</div>
			</div>

		</template>


		<!-- 普通end -->


		<!-- 带班计件管理 -->
		<!-- 				<div class="flex fvertical fbetween service-details-member-box-list-item-admin">
				<div class=" flex fvertical service-details-member-box-list-item-admin-conter">
					<span class="service-details-member-box-list-item-admin-name">个人工程量</span>
					<div class="flex fvertical f1">
						<el-input class="f1" :disabled="true" :value="items.personalQuantity">
						</el-input>
						<el-input class="member-min-input" :disabled="true" value="㎡"></el-input>
					</div>
				</div>
				<div class=" flex fvertical service-details-member-box-list-item-admin-conter">
					<span class="service-details-member-box-list-item-admin-name">计件单价</span>
					<div class="flex fvertical f1">
						<el-input class="f1" :disabled="true" :value="items.unitPrice"></el-input>
						<el-input class="member-min-input" :disabled="true" value="元/㎡"></el-input>
					</div>
				</div>
				<div class=" flex fvertical service-details-member-box-list-item-admin-conter">
					<span class="service-details-member-box-list-item-admin-name">人数</span>
					<div class="flex fvertical f1">
						<el-input class="f1" :disabled="true" :value="items.number"></el-input>
						<el-input class="member-min-input" :disabled="true" value="人"></el-input>
					</div>
				</div>
			
	
			</div> -->

		<!-- 带班计件管理end -->

		<template v-if="items.workType == 2">
			<!-- 计时 -->
			<div class="service-details-member-box-list-item-main flex fvertical">
				<span>每日工时</span>
				<el-input class="f1" :disabled="true" :value="items.dailyHours"></el-input>
			</div>

			<div class="service-details-member-box-list-item-main flex fvertical">
				<span>工时单价</span>
				<div class="flex f1">
					<el-input class="f1" :disabled="true" :value="items.unitPrice"></el-input>
					<el-input class="member-min-input" :disabled="true" value="元/小时"></el-input>
				</div>
			</div>

			<div class="service-details-member-box-list-item-main flex fvertical">
				<span>每日收入</span>
				<el-input class="f1" :disabled="true" :value="items.dailyFee"></el-input>
			</div>

			<div class="service-details-member-box-list-item-main flex fvertical">
				<span>人数</span>
				<div class="flex f1">
					<el-input class="f1" :disabled="true" :value="items.number"></el-input>
					<el-input class="member-min-input" :disabled="true" value="人"></el-input>
				</div>
			</div>

			<div class="service-details-member-box-list-item-main flex fvertical">
				<span>加班费</span>
				<div class="flex f1">
					<el-input class="f1" :disabled="true" :value="items.overtimeFee"></el-input>
					<el-input class="member-min-input" :disabled="true" value="元/小时"></el-input>
				</div>
			</div>
			<!-- 计时end -->
		</template>


		<div class=" flex fvertical service-details-member-box-list-item-main"
			v-if="items.tag == '班组长' || items.workType == 3">
			<span class="service-details-member-box-list-item-admin-name">带班管理费</span>
			<div class="flex fvertical f1">
				<el-input class="f1" :disabled="true" :value="items.leaderFee"></el-input>
				<el-input class="member-min-input" :disabled="true" value="元/天"></el-input>
			</div>
		</div>


		<div class="service-details-member-box-list-remarks flex fvertical" style="width: 100%;">
			<span>工作描述</span>
			<el-input type="textarea" class="f1" :value="items.description " :disabled="true">
			</el-input>
		</div>

		<!-- 匹配员工 -->
		<div class="service-details-member-box-list-worker flex fvertical">
			<span class="service-details-member-box-list-worker-title">招工人员</span>
			<div class="f1" style="position: relative;">
				<div class="service-details-member-box-list-worker-user flex fvertical">
					<div class="service-details-member-box-list-worker-user-item "
						v-for="(res,list_index) in list" :key="list_index">
						<div>
							<span>{{res.name}} {{res.phone}}</span>
							<i class="el-icon-error" @click="handleDeteleUser(res,index,inx,list_index)"
								v-if="res.enrollStatus == 1"></i>
							<span class="service-details-member-box-list-worker-user-item-go"
								v-if="res.leaveStatus == 1">已离场</span>
							<!-- 下个版本需要 -->
							<!-- <span class="service-details-member-box-list-worker-user-item-go" v-if="res.leaveStatus == 0">已结束</span> -->
						</div>
						<div class="service-details-member-box-list-worker-user-item-sign">
							{{formatDate(res.enrollTime)}}报名
						</div>
					</div>

					<!-- 	<div class="service-details-member-box-list-worker-user-add flex fvertical fbetween fcenter"
							@click="dialogVisible = true">
							<i class="el-icon-plus"></i>
						</div> -->

				</div>
				<!-- 进行中订单 1->未招工，2->报名中,3->进行中，4->已结束,5->已关闭 -->
				<div class="service-details-member-box-list-worke-btn" v-if="memberInfo.orderStatus == 3">
					<el-button type="primary" v-if="items.matchNum != items.number" @click="Republish(items)">重新发布招工
					</el-button>
				</div>
			</div>
		</div>
		<!-- 匹配员工end -->

	</div>

</template>

<script>
	import {
		getTeamType,
		getMembers
	} from '../../../api/user.js'
	import moment from 'moment'
	export default {
		data() {
			return {
				items: {},
				patternList: [{ // 工种模式
					label: "计件",
					value: 1,
				}, {
					label: "计时",
					value: 2,
				}, {
					label: "管理",
					value: 3,
				}],
				memberInfo: {}, // 成员列表
				memberTagList: [{
					label: "全部",
					value: '',
				}, { // 工种模式
					label: "班组长",
					value: 1,
				}, {
					label: "普通",
					value: 2,
				}, {
					label: "小工",
					value: 3,
				}],
				teamTypeId: null,
				loading: false,
				list:[]
			}
		},
		mounted() {
			this.teamTypeId = this.$route.query.id;
			this.getTeamType();
			this.getMembers();
		},
		methods: {
			/** 获取工种信息 */
			async getTeamType() {
				this.loading = true;
				try {
					let res = await getTeamType(this.teamTypeId);
					console.log('获取工种信息', res);
					this.items = res.data;
					this.loading = false;
				} catch (e) {
					this.loading = false;
					//TODO handle the exception
				}

			},
			/** 获取成员列表 */
			async getMembers() {
				try {
					let res = await getMembers({
						teamTypeId: this.teamTypeId
					});
					console.log(res);
					this.list = res.data;
				} catch (e) {
					console.log(e)
					//TODO handle the exception
				}


				// this.memberInfo.teams.forEach((item, index) => {
				// 	item.teamTypes.forEach(async (data, inx) => {
				// 		let teamTypeId = data.id;
				// 		let res = await getMembers({
				// 			teamTypeId
				// 		});
				// 		data.list = res.data;
				// 	})
				// })
			},
			getPatternList(val) {
				for (let i = 0; i < this.patternList.length; i++) {
					if (val == this.patternList[i].value) {
						return this.patternList[i].label
					}
				}
			},
			formatDate(value) {
				return value ? moment(value).format('YYYY-MM-DD') : '';
			},
		}
	}
</script>

<style lang="scss">
	.service-details-member-box-list-item {
		margin-top: 20px;


		.service-details-member-box-list-item-main {
			width: 28%;
			margin-right: 40px;
			margin-bottom: 20px;

			span {
				width: 100px;
			}
		}
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

	.member-min-input {
		width: 80px;
		margin-left: 15px;
	}
	
	.service-details-member-box-list-worker {
		margin-top: 20px;
		width: 100%;
		.service-details-member-box-list-worker-title {
			width: 100px;
		}
		.service-details-member-box-list-worke-btn{
			position: absolute;
			right: 0;
			top: 10px;
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
			.service-details-member-box-list-worker-user-item-sign{
				color: green;
				margin-top: 5px;
			}
			.service-details-member-box-list-worker-user-item-go{
				    padding: 5px;
					border-radius: 20px;
					font-size: 12px;
					background: #636161;
					color: #FFFFFF;
					margin-left: 5px;
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
	
</style>
