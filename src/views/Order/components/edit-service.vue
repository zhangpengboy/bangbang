<template>

	<!-- 编辑-服务单 -->
	<div class="demand-service">
		<div class="box-demand-title">项目信息</div>
		<!-- 项目信息 -->
		<div class="demand-service-info">
			<el-form :model="editFrom" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				<el-form-item label="项目名称">
					<el-input v-model="editFrom.title"></el-input>

				</el-form-item>

				<!-- 	<el-form-item label="项目简称" >
					<el-input v-model="ruleForm.name"></el-input>
				</el-form-item> -->

				<div class="flex">
					<el-form-item label="项目开始时间">
						<el-input :disabled="true" :value="formatDate(editFrom.enterStartTime)"></el-input>
					</el-form-item>
					<el-form-item class="demand-service-end-item" label="项目竣工时间">
						<el-input :disabled="true" :value="formatDate(editFrom.enterEndTime)"></el-input>
					</el-form-item>
				</div>
				<el-form-item label="项目工期">
					<el-input :disabled="true" :value="getDateDiff(editFrom.enterStartTime,editFrom.enterEndTime)">
					</el-input>
				</el-form-item>

				<el-form-item label="项目介绍">
					<el-input type="textarea" v-model="editFrom.description" :rows="4"></el-input>
					<div class="demand-service-upload">
						<el-image style="width: 100px; height: 100px" v-for="(item,index) in editFrom.images"
							:src="item">
						</el-image>
						<!-- <el-upload class="avatar-uploader flex"
							action="/api/commons/file/admin/v1/upload/public" list-type="picture-card"
							name="multipartFile" :on-remove="handleRemoveImg"
							:on-preview="handlePictureCardPreview" :on-exceed="handleExceed"
							:on-success="handleSuccessImg" :limit="4" :before-upload="beforeAvatarUpload">
							<i class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload> -->

						<el-dialog :visible.sync="isImges">
							<img width="100%" :src="dialogImageUrl" alt="">
						</el-dialog>
					</div>
				</el-form-item>

				<el-form-item label="项目地址">
					<span>{{editFrom.address}}</span>
					<!-- 详情地址 -->
					<div class="demand-service-address">
						<!-- <div class="flex fvertical fbetween">
							<p>{{allAddress.address?allAddress.address:allAddress.city}}{{allAddress.title}}</p>
							<el-button type="primary" @click="isAddress = true">修改
							</el-button>
						</div> -->
						<div id="allmap" style="width:100%;height:300px;margin-top: 20px;">
						</div>
					</div>
					<!-- 详情地址end -->

				</el-form-item>

				<el-form-item label="打卡范围">
					<el-select v-model="editFrom.scope" placeholder="请选择">
						<el-option v-for="item in scopeList" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
			</el-form>
		</div>
		<!-- 项目信息end -->

		<!-- 方案信息 -->
		<div class="demand-service-plan">
			<div class="box-demand-title flex fvertical">
				<span>方案信息</span>
				<div class="demand-service-plan-gropu flex">
					<div class="demand-service-plan-gropu-item" :class="index==scheme?'active':''"
						@click="handleRadio(item,index)" v-for="(item,index) in schemeList" :key="index">
						方案{{getNumberTurnChinese(index+1)}}</div>
				</div>

			</div>

			<div class="demand-service-plan-box" v-if="scheme==index" v-for="(item,index) in editFrom.schemes"
				:key="index">
				<!-- 方案标题  -->
				<div class="demand-service-plan-box-title flex fbetween">
					<span class="box-demand-title">方案{{getNumberTurnChinese(index+1)}}：</span>
					<!-- <div class="demand-service-plan-box-del " v-if="schemes.length >1"
						@click="handleDeleteProject(index)">
						<i class="el-icon-delete"></i>
						<span>删除方案</span>
					</div> -->
				</div>
				<!-- 方案标题end  -->

				<!-- 方案基本信息  -->
				<el-form :model="item" ref="ruleForm" label-width="100px">

					<div class="flex demand-service-plan-box-item">
						<el-form-item label="方案标签">
							<el-input v-model="item.tag"></el-input>
						</el-form-item>
						<el-form-item label="简介">
							<el-input v-model="item.description"></el-input>
						</el-form-item>
					</div>

					<div class="flex demand-service-plan-box-item">
						<el-form-item class="" label="换人次数">
							<div class="flex">
								<el-input class="f1" v-model="item.replaceTimes"></el-input>
								<el-input class="demand-service-plan-box-item-second" :disabled="true" value="次">
								</el-input>
							</div>
						</el-form-item>
						<el-form-item label="方案总工程量">
							<el-input v-model="item.totalUnit" :disabled="true"></el-input>
						</el-form-item>
					</div>

				</el-form>
				<!-- 方案基本信息end  -->

				<div class="demand-service-plan-main" v-for="(teams,inx) in item.teams" :key="inx">

					<!-- 班组信息 -->
					<div class="demand-service-plan-box-info">
						<el-form :model="teams" label-width="120px">

							<div class="flex demand-service-plan-box-info-data">
								<el-form-item label="班组名称">
									<el-input v-model="teams.name"></el-input>
								</el-form-item>
								<el-form-item label="进场时间">
									<el-input :value="formatDate(teams.enterStartTime)" :disabled="true"></el-input>

								</el-form-item>
								<el-form-item label="班组工期">
									<el-input v-model="teams.enterDay" :disabled="true"></el-input>
								</el-form-item>
							</div>
							<div class="flex  demand-service-plan-box-info-data">
								<el-form-item label="退场时间">
									<el-input :value="formatDate(teams.enterEndTime)" :disabled="true"></el-input>
								</el-form-item>
								<el-form-item label="班组工程量">
									<div class="flex">
										<el-input class="f1" v-model="teams.totalUnit" :disabled="true">
										</el-input>
										<el-select style="width: 120px;margin-left: 10px;" v-model="teams.unit"
											placeholder="请选择">
											<el-option v-for="item in companyList" :key="item.value" :label="item.label"
												:value="item.value">
											</el-option>
										</el-select>
									</div>
								</el-form-item>
								<el-form-item label="计件单价">
									<div class="flex">
										<el-input class="f1" v-model="teams.unitPrice"
											@input="handleTeamsUniprice(index,inx,teams)"></el-input>
										<span>元/{{geUnit(teams.unit)}}</span>
									</div>
								</el-form-item>
							</div>

							<div class="flex  demand-service-plan-box-info-data">
								<el-form-item label="上班时间">
									<el-time-picker is-range v-model="teams.workTimeList" range-separator="至"
										start-placeholder="开始时间" format='HH:mm'
										@change="handleWorkTime(index,inx,teams)" end-placeholder="结束时间"
										placeholder="选择时间范围" :clearable="false">
									</el-time-picker>
								</el-form-item>
								<el-form-item label="午休时间">
									<el-time-picker is-range v-model="teams.restTimeList" format='HH:mm'
										range-separator="至" start-placeholder="开始时间"
										@change="handleRestTime(index,inx,teams)" end-placeholder="结束时间"
										placeholder="选择时间范围">
									</el-time-picker>
								</el-form-item>
							</div>

						</el-form>
					</div>
					<!-- 班组信息end -->


					<!-- 工种列表数据 -->
					<div class="demand-service-plan-box-list">
						<div class="demand-service-plan-box-list-item"
							v-for="(teamTypes,types_index) in teams.teamTypes">

							<el-form :model="teamTypes" ref="ruleForm" label-width="100px">
								<!-- 固定基本工种  -->
								<div class="flex fbetween">
									<div class="demand-service-plan-box-list-item-box flex fvertical">
										<div class="plan-box-btn"
											@click="handleDeleteWork(index,inx,types_index,teamTypes)">
											<el-button type="primary" size="mini">删除</el-button>
										</div>
										<el-form-item label="工种">
											<!-- <el-input v-model="ruleForm.name"></el-input> -->
											<el-select v-model="teamTypes.name" filterable  placeholder="请选择">
												<el-option v-for="item in options" :key="item.labelName" :label="item.labelName"
													:value="item.labelName">
												</el-option>
											</el-select>
										</el-form-item>
									</div>
									<div class="demand-service-plan-box-list-item-box">
										<el-form-item label="工种标签">
											<!-- <el-input v-model="ruleForm.name"></el-input> -->
											<el-select v-model="teamTypes.tag" placeholder="请选择"
												@change="handleTag(index,inx,types_index,teamTypes)">
												<el-option v-for="item in tagList" :key="item.value" :label="item.label"
													:value="item.label">
												</el-option>
											</el-select>
										</el-form-item>
									</div>
									<div class="demand-service-plan-box-list-item-box">
										<el-form-item label="工种模式">
											<!-- <el-input v-model="ruleForm.name"></el-input> -->
											<el-select v-model="teamTypes.workType" placeholder="请选择"
												@change="handleTypeModel(index,inx,types_index,teamTypes)">
												<template v-if="teamTypes.tag == '班组长'">
													<el-option v-for="item in patternList" :key="item.value"
														:label="item.label" :value="item.value">
													</el-option>
												</template>

												<template v-else>
													<template v-for="(item,index) in patternList">
														<el-option v-if="index != patternList.length -1"
															:key="item.value" :label="item.label" :value="item.value">
														</el-option>
													</template>
												</template>
											</el-select>
										</el-form-item>
									</div>
								</div>

								<div class="flex fbetween">
									<div class="demand-service-plan-box-list-item-box flex fvertical">
										<div class="plan-box-btn"></div>
										<el-form-item label="工种进场时间">
											<!-- <el-input v-model="ruleForm.name"></el-input> -->
											<el-date-picker v-model="teamTypes.enterStartTime"
												value-format="yyyy-MM-dd "
												@change="handleStartTime(index,inx,types_index,teamTypes)" type="date"
												placeholder="请设置进场时间">
											</el-date-picker>
										</el-form-item>
									</div>
									<div class="demand-service-plan-box-list-item-box">
										<el-form-item label="工种工期">
											<div class="flex">
												<el-input style="width: 200px;" v-model="teamTypes.enterDay"
													@input="handleDuration(index,inx,types_index,teamTypes)">
												</el-input>
												<span style="padding-left: 20px;">天</span>
											</div>
										</el-form-item>
									</div>
									<div class="demand-service-plan-box-list-item-box">
										<el-form-item label="工种退场时间">
											<el-input :value="formatDate(teamTypes.enterEndTime)" :disabled="true">
											</el-input>

										</el-form-item>
									</div>
								</div>
								<!-- 固定基本工种end  -->

								<!-- 管理  -->
								<div class="demand-service-plan-box-list-item-type flex"
									v-if="teamTypes.tag == '班组长'  && teamTypes.workType  == 3">
									<!-- <div class="plan-box-btn"></div> -->
									<el-form-item label="每日工时">
										<div class="flex">
											<el-input style="width: 200px;" :value="teams.dailyHours" :disabled="true">
											</el-input>
											<span style="padding-left: 20px;">小时</span>
										</div>
									</el-form-item>
									<el-form-item label="带班管理费">
										<div class="flex">
											<el-input style="width: 200px;" v-model="teamTypes.leaderFee">
											</el-input>
											<span style="padding-left: 20px;">元</span>
										</div>
									</el-form-item>
									<el-form-item label="人数">
										<div class="flex">
											<el-input style="width: 200px;" v-model="teamTypes.number"
												@input="handleQuantity(index,inx,types_index,teamTypes)">
											</el-input>
											<span style="padding-left: 20px;">人</span>
										</div>
									</el-form-item>
								</div>
								<!-- 管理end  -->

								<!-- 普通工种  -->
								<div class="demand-service-plan-box-list-item-type flex"
									v-if="teamTypes.tag != '班组长'  && teamTypes.workType  == 1">
									<!-- <div class="plan-box-btn"></div> -->
									<el-form-item label="个人工程量">
										<div class="flex">
											<el-input style="width: 200px;" v-model="teamTypes.personalQuantity"
												@input="handleQuantity(index,inx,types_index,teamTypes)">
											</el-input>
											<span style="padding-left: 20px;">{{geUnit(teams.unit)}}</span>
										</div>
									</el-form-item>
									<el-form-item label="计件单价">
										<div class="flex">
											<el-input :disabled="true" style="width: 200px;" v-model="teams.unitPrice">
											</el-input>
											<span style="padding-left: 20px;">元/{{geUnit(teams.unit)}}</span>
										</div>
									</el-form-item>
									<el-form-item label="人数">
										<div class="flex">
											<el-input style="width: 200px;" v-model="teamTypes.number"
												@input="handleQuantity(index,inx,types_index,teamTypes)">
											</el-input>
											<span style="padding-left: 20px;">人</span>
										</div>
									</el-form-item>
								</div>
								<!-- 普通工种end  -->

								<!-- 计件/班组长 -->
								<div class="demand-service-plan-box-list-item-group flex fbetween"
									v-if="teamTypes.tag == '班组长' && teamTypes.workType  == 1  ">
									<el-form-item label="个人工程量">
										<div class="flex">
											<el-input style="width: 150px;" v-model="teamTypes.personalQuantity"
												@input="handleQuantity(index,inx,types_index,teamTypes)">
											</el-input>
											<span style="padding-left: 20px;">{{geUnit(teams.unit)}}</span>
										</div>
									</el-form-item>
									<el-form-item label="计件单价">
										<div class="flex">
											<el-input :disabled="true" style="width: 150px;" v-model="teams.unitPrice">
											</el-input>
											<span style="padding-left: 20px;">元/{{geUnit(teams.unit)}}</span>
										</div>
									</el-form-item>
									<el-form-item label="人数">
										<div class="flex">
											<el-input style="width: 150px;" v-model="teamTypes.number"
												@input="handleQuantity(index,inx,types_index,teamTypes)">
											</el-input>
											<span style="padding-left: 20px;">人</span>
										</div>
									</el-form-item>
									<el-form-item label="带班管理费">
										<div class="flex">
											<el-input style="width: 150px;" v-model="teamTypes.leaderFee">
											</el-input>
											<span style="padding-left: 20px;">元/天</span>
										</div>
									</el-form-item>
								</div>
								<!-- 计件/班组长end -->


								<!-- 普通工种  -->
								<div class="demand-service-plan-box-list-item-type flex"
									v-if="teamTypes.workType  == 2">
									<!-- <div class="plan-box-btn"></div> -->
									<el-form-item label="每日工时">
										<div class="flex">
											<el-input style="width: 200px;" :value="teams.dailyHours" :disabled="true">
											</el-input>
											<span style="padding-left: 20px;">小时</span>
										</div>
									</el-form-item>
									<el-form-item label="工时单价">
										<div class="flex">
											<el-input style="width: 200px;" v-model="teamTypes.unitPrice"
												@input="handleUnitPrice(index,inx,types_index,teamTypes)">
											</el-input>
											<span style="padding-left: 20px;">元/小时</span>
										</div>
									</el-form-item>
									<el-form-item label="每日收入">
										<div class="flex">
											<el-input style="width: 220px;" :disabled="true"
												v-model="teamTypes.dailyFee">
											</el-input>
											<!-- <span style="padding-left: 20px;">人</span> -->
										</div>
									</el-form-item>
									<el-form-item label="人数">
										<div class="flex">
											<el-input style="width: 200px;" v-model="teamTypes.number"
												@input="handleQuantity(index,inx,types_index,teamTypes)">
											</el-input>
											<span style="padding-left: 20px;">人</span>
										</div>
									</el-form-item>
									<el-form-item label="加班费">
										<div class="flex">
											<el-input style="width: 200px;" v-model="teamTypes.overtimeFee">
											</el-input>
											<span style="padding-left: 20px;">元/小时</span>
										</div>
									</el-form-item>
									<el-form-item label="带班管理费" v-if="teamTypes.tag == '班组长'">
										<div class="flex">
											<el-input style="width: 150px;" v-model="teamTypes.leaderFee">
											</el-input>
											<span style="padding-left: 20px;">元/天</span>
										</div>
									</el-form-item>
								</div>
								<!-- 普通工种end  -->


								<!--  工作描述 -->
								<div class="demand-service-plan-box-list-item-text">
									<el-form-item label="工作描述">
										<el-input type="textarea" placeholder="请输入"
											:autosize="{ minRows: 2, maxRows: 4}" v-model="teamTypes.description">
										</el-input>
									</el-form-item>
								</div>
								<!--  工作描述end -->

							</el-form>
						</div>

						<div class="demand-service-plan-box-list-btn flex fvertical fcenter">
							<div class="demand-service-plan-box-list-btn-add" @click="handleAddWork(index,inx)">
								添加工种</div>
							<div class="demand-service-plan-box-list-btn-del" @click="hanldeRemoveGroup(index,inx)">删除班组
							</div>
						</div>
					</div>

					<!-- 工种列表数据end -->



				</div>

				<div class="demand-service-plan-add-main flex fcenter" @click="handleAddGroup(index)">添加班组
				</div>


				<!-- 总费用 -->
				<div class="demand-service-plan-box-foot flex fcenter ">
					<div class="demand-service-plan-box-foot-item flex fvertical">
						<span> 施工服务费</span>
						<el-input class="f1" :value="item.serverTotal" :disabled="true"></el-input>
					</div>
					<div class="demand-service-plan-box-foot-item flex fvertical">
						<span> 信息服务费</span>
						<div class="flex">
							<el-input class="f1 demand-service-plan-box-foot-item-server"
								@input="handleInputToals(index)" v-model="item.serviceFeeRate" placeholder="请输入信息服务费比例">
							</el-input>
							<el-input value="%" :disabled="true" class="f1 demand-service-plan-box-foot-item-company">
							</el-input>
							<!-- <span class="f1">{{item.serviceFeeRateNum}}元</span> -->
							<div class="flex fvertical">
								<el-input :value="item.serviceFeeRateNum" :disabled="true"
									class="f1 demand-service-plan-box-foot-item-company">
								</el-input>
								<span style="padding-left: 10px;">元</span>
							</div>
						</div>
					</div>
					<div class="demand-service-plan-box-foot-item flex fvertical">
						<span> 税费</span>
						<div class="flex">
							<el-input class="f1" v-model="item.taxRate" @input="handleInputToals(index)"
								placeholder="请输入信息服务费比例"></el-input>
							<el-input value="%" :disabled="true" class="f1 demand-service-plan-box-foot-item-company">
							</el-input>
							<el-input :value="item.taxRateNum" :disabled="true"
								class="f1 demand-service-plan-box-foot-item-company"></el-input>
						</div>
					</div>
					<div class="demand-service-plan-box-foot-item flex fvertical">
						<span> 总费用</span>
						<el-input class="f1" v-model="item.totalFee" :disabled="true" placeholder="元">
						</el-input>
					</div>
				</div>
				<!-- 总费用end -->
			</div>
			<!-- 方案信息end -->
			<div class="demand-service-plan-box-foot-server-order flex fvertical fcenter " @click="handleAddSerice">
				提交服务单</div>
		</div>
	</div>
	<!--  编辑-服务单end -->
</template>

<script>
	import moment from 'moment'
	import loadBMap from '../../../utils/loadBMap.js'
	import {
		gettypeWorkClass
	} from '../../../api/user.js'
	export default {
		data() {
			return {
				scheme: 0,
				rules: {},
				isImges: false, // 是否显示大图
				schemeList: [], // 方案列表
				dialogImageUrl: "",
				scopeList: [], // 打卡范围
				options: [], // 工种模式
				editFrom: {},
				companyList: [{ // 工程列表
					label: '㎡',
					value: 1,
				}, {
					label: 'm³',
					value: 2,
				}, {
					label: '吨',
					value: 3,
				}, {
					label: 'kg',
					value: 4,
				}, {
					label: '根',
					value: 5,
				}, {
					label: '块',
					value: 6,
				}, {
					label: '个',
					value: 7,
				}],
				tagList: [{ // 工种模式
					label: "班组长",
					value: 1,
				}, {
					label: "普通",
					value: 2,
				}, {
					label: "小工",
					value: 3,
				}],
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
				addressMap: "",
				addressMk: ""
			}
		},
		methods: {
			async gettypeWorkClass() {
				let param = {};
				param.pageSize = 10000;
				param.pageNum = 1;
				let res = await gettypeWorkClass(param);
				console.log(res);
				this.options = res.data.list;
			},
			// 切换方案
			handleRadio(item, index) {
				this.scheme = index;
			},
			getDataInfo(data) {
				this.editFrom = data;
				this.schemeList = data.schemes;
				this.gettypeWorkClass();
				let lng = data.gpsLocation.split(',')[0];
				let lat = data.gpsLocation.split(',')[1];
				this.getDetailsAdderss({
					lng,
					lat
				})
				this.editFrom.schemes.forEach(item => {
					item.teams.forEach(items => {
						items.workTimeList = [];
						items.workTimeList[0] = this.formatDateTime(items.workStartTime)
						items.workTimeList[1] = this.formatDateTime(items.workEndTime)
						items.restTimeList = [];
						items.restTimeList[0] = this.formatDateTime(items.restStartTime)
						items.restTimeList[1] = this.formatDateTime(items.restEndTime)
						items.teamTypes.forEach((type_item, type_index) => {
							type_item.enterStartTime = this.formatDate(type_item.enterStartTime)
						})
					})
				})

			},
			/** 获取地址 */
			getDetailsAdderss(form) {
				this.$nextTick(() => {
					const {
						lng,
						lat
					} = form;
					this.addressMap = new BMap.Map("allmap", {
						enableMapClick: false
					}) //新建地图实例，enableMapClick:false ：禁用地图默认点击弹框
					var point = new BMap.Point(lng, lat);
					this.addressMap.centerAndZoom(point, 19)
					var opts = {
						width: 120,
						height: 100,
						title: '地址'
					};
					let infoWindow = new BMap.InfoWindow(this.editFrom.address, opts);
					this.addressMap.openInfoWindow(infoWindow, point);
					this.addressMk = new BMap.Marker(point, {
						enableDragging: false
					})
					this.addressMap.addOverlay(this.addressMk) //将覆盖物添加到地图中

					this.addressMk.addEventListener('click', () => {
						let infoWindow = new BMap.InfoWindow(this.editFrom.address, opts);
						this.addressMap.openInfoWindow(infoWindow, point);
						this.addressMk = new BMap.Marker(point, {
							enableDragging: false
						})
					})

				})

			},
			// 获取工程量单位
			geUnit(val) {
				if (val) {
					let res = this.companyList.filter(item => item.value == val)
					return res[0].label
				}
			},
			// 计算班组工期
			getDateDiff(start, end) {
				if (start && end) {
					var diffValue = Math.abs(new Date(end).getTime() - new Date(start).getTime());
					var second = 1000,
						minute = second * 60,
						hour = minute * 60,
						day = hour * 24,
						month = day * 30,
						year = month * 12;
					return Math.ceil(diffValue / day);
				}
				return 0
			},
			formatDateTime(value) {
				return value ? moment(value).format('YYYY-MM-DD HH:mm:ss') : '';
			},
			formatDate(value) {
				return value ? moment(value).format('YYYY-MM-DD') : '';
			},
			// 下标转中文
			getNumberTurnChinese(index) {
				let arr = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
				return arr[index]
			},
			// 提交方案
			handleAddSerice() {}
		}
	}
</script>

<style>
</style>
