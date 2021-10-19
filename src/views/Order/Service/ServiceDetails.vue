<template>
	<div class="service-details page">
		<!-- tab按钮切换 -->
		<el-radio-group v-model="tabPosition" style="margin-bottom: 30px;">
			<el-radio-button label="top">需求单</el-radio-button>
			<el-radio-button label="order">服务单详情</el-radio-button>
			<el-radio-button label="reward">任务奖励</el-radio-button>
			<el-radio-button label="member">成员名单</el-radio-button>
			<el-radio-button label="recharge">充值</el-radio-button>
			<el-radio-button label="invoicing">开票</el-radio-button>
			<el-radio-button label="evaluate">评价</el-radio-button>
		</el-radio-group>
		<!-- tab按钮切换end -->

		<!-- 需求单详情 -->
		<demanInfo :info="info" v-if="tabPosition == 'top'" />
		<!-- 需求单详情end -->

		<!-- 服务单 -->
		<editService ref="editFrom" v-show="tabPosition == 'order'" @handleEditSuccess="handleEditSuccess" />
		
		<!-- 服务单end -->
		<!-- 任务奖励 -->
		<div v-if="tabPosition == 'reward'">
			<div class="top">
				<div class="top-title ">数据筛选</div>
				<div class="top-content flex fvertical fbetween">
					<div class="top-content-item flex fvertical">
						<div class="flex fvertical top-content-item-status">
							<span>输入查询：</span>
							<el-input class="top-content-item-input" v-model="rewardPage.keywords" placeholder="任务名称/班组名称">
								
							</el-input>
						</div>
						<div class="flex fvertical top-content-item-status">
							<span>类型：</span>
							<el-select v-model="rewardPage.type" placeholder="选择类型">
								<el-option v-for="item in rewardTypeList" :key="item.value" :label="item.label"
									:value="item.value">
								</el-option>
							</el-select>
						</div>
						<div class="flex fvertical top-content-item-status">
							<span>状态：</span>
							<el-select v-model="rewardPage.status" placeholder="选择状态">
								<el-option v-for="item in rewardStatusList" :key="item.value" :label="item.label"
									:value="item.value">
								</el-option>
							</el-select>
						</div>
					</div>


					<div class="top-content-btn">
						<el-button type="primary" @click="handelSeracReward">查询</el-button>
						<el-button @click="handleResetReward">重置</el-button>
					</div>
				</div>
			</div>

			<el-table :data="rewardtableData" :key="rewardKey" border style="width: 100%" height="300px">
				<el-table-column type="index" width="50" label="序号">
				</el-table-column>
				<el-table-column prop="teamName" label="班组名称" width="170">
				</el-table-column>
				<el-table-column prop="title" label="任务名称" width="180">
				</el-table-column>
				<el-table-column prop="type" label="类型">
					<template slot-scope="scope">
						{{scope.row.type == 1?'一次性':scope.row.type == 2?'周期':''}}
					</template>
				</el-table-column>
				<el-table-column prop="condition" label="条件">
						<template slot-scope="scope">
						<p v-if="scope.row.condition"> 入场满{{scope.row.condition}}天</p>
						</template>
				</el-table-column>
				<el-table-column prop="reason" label="奖励">
					<template slot-scope="scope">
						<div v-if="scope.row.type">
						<p v-if="scope.row.type == 1">{{scope.row.fee}}元</p>
						<p v-else>验收产值{{scope.row.rate}}%</p>
						</div>
						</template>
				</el-table-column>
				<el-table-column label="状态">
					<template slot-scope="scope">
					<el-switch @change="rewardSwitch(scope.row)"
					:value="scope.row.status == 1?true:false"
					active-color="#13ce66"
					inactive-color="#cac3c3">
					</el-switch>
					</template>
				</el-table-column>
				<el-table-column prop="updateName" label="操作人">
				</el-table-column>
				<el-table-column prop="updateTime" label="操作时间">
					<template slot-scope="scope">
						<p>{{formatDate(scope.row.updateTime)}}</p>
					</template>
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<template >
						<el-button size="mini" type="primary" @click="handleRewardEdit(scope.row)">编辑</el-button>
						<el-button  size="mini"  type="primary"  @click="handleRewardHistory(scope.row)">历史</el-button>
						</template>

					</template>
				</el-table-column>
			</el-table>
			<!-- 分页  -->
				<div class="flex fcenter page">
					<el-pagination class="page" id="page" background @size-change="handleRewrdSizeChange"
						@current-change="handleRewrdCurrentChange" :current-page="rewardPage.PageIndex" :page-sizes="[10, 20, 30, 40]"
						:page-size="rewardPage.PageSize" layout="total, prev, pager, next,sizes, jumper" :total="rewardPage.PageCount">
					</el-pagination>
				</div>
				<!-- 分页end -->
		</div>


		<!--  成员名单 -->
		<div class="service-details-member" v-if="tabPosition == 'member' && memberInfo.scheme"
			v-loading="memberLoading">
			<div class="top">
				<div class="top-title ">数据筛选</div>
				<div class="top-content flex fvertical fbetween">
					<div class="top-content-item flex fvertical">
						<div class="flex fvertical top-content-item-status">
							<span>工种：</span>
							<el-select v-model="teamTypeName" filterable clearable placeholder="选择跟进人">
								<el-option v-for="item in teamTypeNameList" :key="item.labelName"
									:label="item.labelName" :value="item.labelName">
								</el-option>
							</el-select>
							<!-- <el-input class="top-content-item-input" v-model="teamTypeName" placeholder="ID/项目名称">
								
							</el-input> -->
						</div>
						<div class="flex fvertical top-content-item-status">
							<span>工种标签：</span>
							<el-select v-model="memberTab" placeholder="选择跟进人">
								<el-option v-for="item in memberTagList" :key="item.value" :label="item.label"
									:value="item.value">
								</el-option>
							</el-select>
						</div>
						<div class="flex fvertical top-content-item-status">
							<span>招工状态：</span>
							<el-select v-model="memberStatus" placeholder="选择跟进人">
								<el-option v-for="item in memberStatusList" :key="item.value" :label="item.label"
									:value="item.value">
								</el-option>
							</el-select>
						</div>
					</div>


					<div class="top-content-btn">
						<el-button type="primary" @click="handelSeracMember">查询</el-button>
						<el-button @click="handleResetMember">重置</el-button>
					</div>
				</div>
			</div>

			<div class="box">
				<div class="service-details-member-top flex fvertical fbetween">
					<el-radio-group v-model="member" style="margin-bottom: 30px;">
						<el-radio-button label="name">方案名单</el-radio-button>
						<el-radio-button label="delay">延期方案名单</el-radio-button>
					</el-radio-group>
					<div class="top-content-status" v-if="memberInfo.orderStatus==2">报名中</div>
					<div class="top-content-status" v-if="memberInfo.orderStatus==3">进行中</div>
					<!-- <el-tag size="medium">标签一</el-tag> -->
					<el-button type="primary" @click="handleOpenMember">查看详细报名数据</el-button>
				</div>

				<div class="service-details-member-box">

					<!--  方案名单基本信息  -->
					<div class="service-details-member-box-info flex fvertical fbetween">

						<div class="service-details-member-box-info-item flex fvertical">
							<span class="service-details-member-box-info-item-name">方案标签</span>
							<el-input class="f1" :value="memberInfo.scheme.tag" :disabled="true" placeholder="请输入内容">
							</el-input>
						</div>

						<div class="service-details-member-box-info-item flex fvertical">
							<span class="service-details-member-box-info-item-name">简介</span>
							<el-input class="f1" :disabled="true" :value="memberInfo.scheme.description"
								placeholder="请输入内容"></el-input>
						</div>

						<div class="service-details-member-box-info-item flex fvertical">
							<span class="service-details-member-box-info-item-name">换人次数</span>

							<div class="flex f1">
								<el-input class="f1" :disabled="true" :value="memberInfo.scheme.replaceTimes"
									placeholder="请输入内容"></el-input>
								<el-input class="member-min-input" value="次" :disabled="true"></el-input>
							</div>
						</div>

						<div class="service-details-member-box-info-item flex fvertical">
							<span class="service-details-member-box-info-item-name">方案总工程量</span>
							<el-input class="f1" :disabled="true" :value="memberInfo.scheme.totalUnit"
								placeholder="请输入内容"></el-input>
						</div>

					</div>

					<!--  方案名单基本信息end  -->


					<!--  报名列表信息 -->
					<div class="service-details-member-box-list" v-for="(item,index) in memberInfo.teams" :key="index">
						<div class="service-details-member-box-list-top flex fvertical ">
							<div class="service-details-member-box-list-top-item flex fvertical">
								<span>班组名称</span>
								<el-input placeholder="请输入内容" :value="item.name" :disabled="true" class="f1"></el-input>
							</div>
							<div class="service-details-member-box-list-top-item flex fvertical">
								<span>进场时间</span>
								<el-input placeholder="请输入内容" :value="formatDate(item.enterStartTime)" :disabled="true"
									class="f1"></el-input>
							</div>
							<div class="service-details-member-box-list-top-item flex fvertical">
								<span>退场时间</span>
								<el-input placeholder="请输入内容" :value="formatDate(item.enterEndTime)" :disabled="true"
									class="f1"></el-input>
							</div>
							<div class="service-details-member-box-list-top-item flex fvertical">
								<span>班组工期</span>
								<el-input placeholder="请输入内容" :value="item.enterDay"
									:disabled="true" class="f1"></el-input>
							</div>
							<div class="service-details-member-box-list-top-item flex fvertical">
								<span>班组工程量</span>
								<div class="flex f1">
									<el-input placeholder="请输入内容" :value="item.totalUnit" :disabled="true" class="f1">
									</el-input>
									<el-input class="member-min-input" :value="getCompanyUnit(item.unit)" :disabled="true"></el-input>
								</div>

							</div>
							<div class="service-details-member-box-list-top-item flex fvertical">
								<span>计件单价</span>
								<el-input placeholder="请输入内容" :value="item.unitPrice" :disabled="true" class="f1">
								</el-input>
							</div>
							<div class="service-details-member-box-list-top-item flex fvertical">
								<span>上班时间：</span>
								<span>{{formatDateTime(item.workStartTime)}}~{{formatDateTime(item.workEndTime)}}</span>
								<!-- <el-input placeholder="请输入内容" :value="formatDate(item.workStartTime)" :disabled="true"
									class="f1"></el-input> -->
							</div>
							<div class="service-details-member-box-list-top-item flex fvertical">
								<span>午休时间</span>
								<span>{{formatDateTime(item.restStartTime)}}~{{formatDateTime(item.restEndTime)}}</span>
								<!-- <el-input placeholder="请输入内容" :value="formatDate(item.enterEndTime)" :disabled="true" class="f1"></el-input> -->
								<!-- <span></span> -->

							</div>

						</div>


						<div class="service-details-member-box-list-item flex fvertical "
							v-for="(items,inx) in item.teamTypes" :key="inx">

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
									<el-input class="f1" :disabled="true"
										:value="items.enterDay"></el-input>
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
									<span
										class="service-details-member-box-list-worker-name">{{items.matchNum == items.number?'完成匹配':'匹配中'}}（{{items.matchNum+'/'+items.number}}）</span>
									<div class="service-details-member-box-list-worker-user flex fvertical">
										<div class="service-details-member-box-list-worker-user-item "
											v-for="(res,list_index) in items.list" :key="list_index">
											<div> 
											<span>{{res.name}} {{res.phone}}</span>
											<i class="el-icon-error" @click="handleDeteleUser(res,index,inx,list_index)" v-if="res.status != 1"></i>
											<span class="service-details-member-box-list-worker-user-item-go" v-if="res.leaveStatus == 1">已离场</span>
											<!-- 下个版本才有字段判断 -->
											<!-- <span class="service-details-member-box-list-worker-user-item-go" v-if="res.leaveStatus == 0">已结束</span> -->
											</div>
											<div class="service-details-member-box-list-worker-user-item-sign">{{formatDate(res.enrollTime)}}报名</div>
										</div>

										<!-- 	<div class="service-details-member-box-list-worker-user-add flex fvertical fbetween fcenter"
											@click="dialogVisible = true">
											<i class="el-icon-plus"></i>
										</div> -->

									</div>
									<!-- 进行中订单 1->未招工，2->报名中,3->进行中，4->已结束,5->已关闭 -->
									<div class="service-details-member-box-list-worke-btn" v-if="memberInfo.orderStatus == 3"> <el-button type="primary" v-if="items.matchNum != items.number" @click="Republish(items)">重新发布招工</el-button></div>
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
		<div class="service-details-evaluate" v-if="tabPosition == 'recharge'" v-loading="loadingRecharge">
			<!-- 充值列表总数据  -->
			<!-- 	<div class="service-details-evaluate-top flex fvertical">
				<div class="service-details-evaluate-top-item" v-for="(item,index) in rechargeList" :key="index">
					<p class="service-details-evaluate-top-item-title">{{item.title}}</p>
					<p class="service-details-evaluate-top-item-price">{{item.total}}</p>
				</div>
			</div> -->
			<!-- 充值列表总数据end  -->
			<div class="top">
				<div class="top-title ">数据筛选</div>
				<div class="top-content flex fvertical fbetween">
					<div class="top-content-item flex fvertical">
						<!-- <div class="flex fvertical top-content-item-status">
							<span>输入查询：</span>
							<el-input class="top-content-item-input" v-model="keywords" placeholder="ID/项目名称">
							</el-input>
						</div> -->
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
						<el-button type="primary" @click="handleSearch">查询</el-button>
						<el-button @click="handleReset">重置</el-button>
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
					<el-table-column prop="orderNum" label="ID" width="170">
					</el-table-column>
					<el-table-column prop="title" label="项目名称" width="120">
					</el-table-column>
					<el-table-column label="图片">
						<template slot-scope="scope">
							<img :src="item" class="table-img" v-for="(item,index) in scope.row.images" :key="index" />
						</template>
					</el-table-column>
					<el-table-column prop="fee" label="充值金额" width="120">
					</el-table-column>
					<el-table-column label="状态" width="80">
						<template slot-scope="scope">
							<p v-if="scope.row.status == 0" class="color-warning">等待对账</p>
							<p v-if="scope.row.status == 1" class="color-success">对账通过</p>
							<p v-if="scope.row.status == 2" class="color-error">已驳回</p>
						</template>
					</el-table-column>
					<el-table-column label="申请时间">
						<template slot-scope="scope">
							<p>{{formatDate(scope.row.createTime)}}</p>
						</template>
					</el-table-column>
					<el-table-column prop="updateName" label="操作人" width="100">
					</el-table-column>
					<el-table-column label="操作时间">
						<template slot-scope="scope">
							<p>{{formatDate(scope.row.updateTime)}}</p>
						</template>
					</el-table-column>
					<el-table-column prop="address" label="操作">
						<template slot-scope="scope">
							<template v-if="scope.row.status == 0">
								<el-button size="mini" type="primary" @click="handleMoney(scope.$index,scope.row)">修改金额
								</el-button>
								<el-button size="mini" type="success" @click="handleAdopt(scope.$index, scope.row)">通过
								</el-button>
								<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">拒绝
								</el-button>
							</template>
							<el-button v-if="scope.row.status == 2 " type="text" size="mini"
								@click="handleLook(scope.row)">查看理由</el-button>
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
		<!-- 开票页面start -->
		<div v-if="tabPosition == 'invoicing'">
		<!-- 头部  -->
		<div class="top" id="top">
			<div class="top-title ">数据筛选</div>
			<div class="top-content flex fvertical fbetween">
				<div class="top-content-item flex fvertical">
					<div class="flex fvertical top-content-item-status">
						<span>状态：</span>
						<el-select v-model="InvoiceStatus" placeholder="请选择状态">
							<el-option v-for="item in statusList" :key="item.value" :label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
					</div>
				</div>
				<div class="top-content-btn">
					<el-button type="primary" @click="InvoiceSearch">查询</el-button>
					<el-button @click="handleReset">重置</el-button>
				</div>
			</div>
			<!-- 头部end  -->
		<div class="box">
			<div class="Invoice-box flex fvertical fbetween" id="boxTop">
				<div class="Invoice-box-title bold ">数据筛选</div>
			</div>

			<el-table :data="InvoicetableData" border style="width: 100%" :height="'400px'">
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
			</el-table>


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
		<!-- 头部end  -->
		</div>
		<!-- 开票页面end  -->
		<!--  拒绝理由 -->
		<el-dialog title="拒绝理由" :visible.sync="isLook" width="30%" :before-close="handleCloseLookReason">
			<span>{{reason}}</span>
			<span slot="footer" class="dialog-footer ">
				<el-button type="primary" @click="isLook = false">确 定</el-button>
			</span>
		</el-dialog>
		<!--  拒绝理由end -->

		<!-- 发票详情弹窗 -->
		<el-dialog
		title="开票信息"
		:visible.sync="InvoiceDetailDialog"
		width="30%"
		:before-close="InvoiceDetailclose">
		<div class="InvoiceDetailDialog"> <p class="InvoiceDetailDialog-txt"> 开票类型：</p> <div class="InvoiceDetailDialog-inp">{{InvoiceDetail.type == 1?"个人":"企业"}}	</div></div>
		<div class="InvoiceDetailDialog"> <p class="InvoiceDetailDialog-txt"> 发票抬头：</p> <div class="InvoiceDetailDialog-inp">{{InvoiceDetail.header}}</div></div>
		<div class="InvoiceDetailDialog" v-show="InvoiceDetail.type ==2"> <p class="InvoiceDetailDialog-txt" > 纳税人识别号：</p> <div class="InvoiceDetailDialog-inp">{{InvoiceDetail.tin}}</div></div>
		<div class="InvoiceDetailDialog" v-show="InvoiceDetail.type ==2"> <p class="InvoiceDetailDialog-txt" > 公司地址：</p> <div class="InvoiceDetailDialog-inp">{{InvoiceDetail.address}}</div></div>
		<div class="InvoiceDetailDialog" v-show="InvoiceDetail.type ==2"> <p class="InvoiceDetailDialog-txt" > 公司电话：</p> <div class="InvoiceDetailDialog-inp">{{InvoiceDetail.phone}}</div></div>
		<div class="InvoiceDetailDialog" v-show="InvoiceDetail.type ==2"> <p class="InvoiceDetailDialog-txt" > 开户银行：</p> <div class="InvoiceDetailDialog-inp">{{InvoiceDetail.bank}}</div></div>
		<div class="InvoiceDetailDialog"> <p class="InvoiceDetailDialog-txt"> 接收方式：</p> <div class="InvoiceDetailDialog-inp">{{InvoiceDetail.email}}</div></div>
		<div class="InvoiceDetailDialog"> <p class="InvoiceDetailDialog-txt"> 开票金额：</p> <div class="InvoiceDetailDialog-inp">{{InvoiceDetail.fee}}元</div></div>
		<span slot="footer" class="dialog-footer">
			<el-button type="primary" @click="InvoiceDetailDialog = false">确 定</el-button>
		</span>
		</el-dialog>
		
		<!--  任务奖励编辑弹窗 -->
		<el-dialog title="奖励设置" :visible.sync="rewardEditDialog" width="30%" :before-close="handleCloserewardEditDialog">
			<div class="InvoiceDetailDialog"> <p class="InvoiceDetailDialog-txt"> 类型：</p> <div class="rewardEditDialog-inp">  
				<el-select v-model="rewardValue" placeholder="请选择">
					<el-option
					v-for="item in rewardTypeList1"
					:key="item.value"
					:label="item.label"
					:value="item.value">
					</el-option>
				</el-select>
				</div>
				</div>
			<div class="InvoiceDetailDialog"> <p class="InvoiceDetailDialog-txt"> 条件：</p> <div class="rewardEditDialog-inp">请设置入场达标天数</div></div>
			<div class="InvoiceDetailDialog"> <p class="InvoiceDetailDialog-txt"></p> <div class="rewardEditDialog-right"><el-input style="width:80%;margin-right:20px" maxlength="3"  max="365" min="1" v-model="rewardInputday" type="text" oninput="value=value.replace(/\D/g,'')"  placeholder="请输入天数"></el-input>天</div></div>
			<div v-if="rewardValue == 1">
			<div class="InvoiceDetailDialog"> <p class="InvoiceDetailDialog-txt"> 奖励：</p> <div class="rewardEditDialog-inp">达成奖励条件后一次性奖励金额</div></div>
			<div class="InvoiceDetailDialog"> <p class="InvoiceDetailDialog-txt"></p> <div class="rewardEditDialog-right"><el-input style="width:80%;margin-right:20px"  maxlength="3"  max="100" min="1" v-model="rewardInputprice" type="text" oninput="value=value.match(/^\d+(?:\.\d{0,2})?/)" placeholder="请输入奖励"></el-input>元</div></div>
			</div>
			<div v-if="rewardValue == 2">
			<div class="InvoiceDetailDialog"> <p class="InvoiceDetailDialog-txt"> 奖励：</p> <div class="rewardEditDialog-inp">达成奖励条件后，获得被分享工人验收产值的百分比金额</div></div>
			<div class="InvoiceDetailDialog"> <p class="InvoiceDetailDialog-txt"></p> <div class="rewardEditDialog-right"><el-input style="width:80%;margin-right:20px"  :maxlength="3" :max="100" :min="1" v-model="rewardInputrate " type="text" @input="percent" placeholder="请输入奖励"></el-input>%</div></div>
			</div>
			<span slot="footer" class="dialog-footer ">
				<el-button @click="rewardEditDialog = false">取 消</el-button>
				<el-button type="primary" @click="postreward">确 定</el-button>
			</span>
		</el-dialog>
		<!--  任务奖励编辑弹窗end -->
		<!--  任务奖励历史弹窗 -->
		<el-dialog title="历史设置" :visible.sync="rewardHistoryDialog" width="50%" :before-close="handleCloserewardHistory">
			  <el-table :data="rewardHistoryTableData" style="width: 100%" :stripe="true" height="300px">
				<el-table-column type="index" width="50" label="序号">
				</el-table-column>
				<el-table-column prop="type" label="类型">
					<template slot-scope="scope">
						{{scope.row.type == 1?'一次性':scope.row.type == 2?'周期':''}}
					</template>
				</el-table-column>
				<el-table-column prop="condition" label="条件">
						<template slot-scope="scope">
						<p v-if="scope.row.condition"> 入场满{{scope.row.condition}}天</p>
						</template>
				</el-table-column>
				<el-table-column prop="reason" label="奖励">
					<template slot-scope="scope">
						<div v-if="scope.row.type">
						<p v-if="scope.row.type == 1">{{scope.row.fee}}元</p>
						<p v-else>验收产值{{scope.row.rate}}%</p>
						</div>
						</template>
				</el-table-column>
				<el-table-column label="状态">
					<template slot-scope="scope">
					<el-switch
					:value="scope.row.status == 1?true:false"
					active-color="#13ce66"
					inactive-color="#cac3c3">
					</el-switch>
					</template>
				</el-table-column>
				<el-table-column prop="createName" label="操作人">
				</el-table-column>
				<el-table-column prop="address" label="操作时间">
					<template slot-scope="scope">
					<p>{{formatDate(scope.row.createTime)}}</p>
					</template>
				</el-table-column>
			</el-table>
			<span slot="footer" class="dialog-footer ">
				<el-button type="primary" @click="rewardHistoryDialog = false">确 定</el-button>
			</span>
		</el-dialog>

		<!--  任务奖励历史弹窗end -->
	<!--  充值编辑金额 -->
		<el-dialog title="修改充值金额" :visible.sync="rechargeisMoney" width="30%" :before-close="handleClose">
			<el-input v-model="rechargeMoney" ref="money" placeholder="请输入需要修改的充值金额"
				oninput="value=value.match(/^\d+(?:\.\d{0,2})?/)">
			</el-input>

			<span slot="footer" class="dialog-footer ">
				<el-button @click="handleClose">取 消</el-button>
				<el-button type="primary" @click="getUpdateFee">确 定</el-button>
			</span>
		</el-dialog>
		<!--  充值编辑金额 -->

		<!--  充值拒绝理由 -->
		<el-dialog title="拒绝理由" :visible.sync="rechargeisLook" width="30%" :before-close="handleCloseLookReason">
			<span>{{rechargeReason}}</span>
			<span slot="footer" class="dialog-footer ">
				<el-button type="primary" @click="rechargeisLook = false">确 定</el-button>
			</span>
		</el-dialog>
		<!--  充值拒绝理由end -->
	</div>
</template>

<script>
	import loadBMap from '../../../utils/loadBMap.js'
	import demanInfo from '../components/demand-info.vue'
	import editService from '../components/edit-service.vue'
	import {
		getBriefPay,
		getOrderdetail,
		getOrderTeamType,
		getMembers,
		getMembersEnrollCancel,
		gettypeWorkClass,
		getBriefDetail,
		getInvoice,
		getInvoiceDetail,
		getServiceUpdateStatus,
		getReward,
		postReward,
		getRewardlog,
		getUpdateStatus,
		getUpdateFee
	} from '../../../api/user.js'
	import moment from 'moment'
	export default {
		data() {
			return {
				info: {},
				isLook: false,
				reason: "",
				dialogVisible: false,
				member: "name",
				PageIndex: 1, // 充值-页码
				PageSize: 10, // 充值-显示多少条数据
				PageCount: 0, // 充值-总条数
				tableData: [], // 充值列表数据
				rechargeisLook:false,// 是否显示查看理由
				rechargeisMoney:false,// 是否显示金额
				rechargeMoney:'',//充值修改金额
				rechargeReason:'',//充值拒绝理由
				rowID:'',
				tabPosition: "order",
				typeList: [{
					value: 1,
					label: "劳务派遣"
				}, {
					value: 2,
					label: "劳务分包"
				}], // 类型列表
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
				teamTypeNameList: [], // 工种列表
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
				// orderId: "",
				loadingRecharge: false,
				basicForm: {}, // 服务单详情
				dialogImageUrl: [],
				allAddress: {},
				isImges: false,
				schemeList: [],
				scopeList: [],
				schemes: [], // 方案列表
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
				addressMap: "",
				addressMk: "",
				scheme: 0,
				teamTypeName: "", // 成员名单搜索
				memberStatus: "", // 成员-招工状态
				memberTab: "", // 成员-工种标签
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
				memberStatusList: [{
					label: "全部",
					value: "",
				}, {
					label: "完成匹配",
					value: 1,
				}, {
					label: "匹配中",
					value: 2,
				}],
				memberLoading: false,
				loading: false,
				//开票状态
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
				InvoiceStatus:'', //开票查询状态
				InvoicetableData:[], // 开票列表数据
				InvoiceDetail:[] ,// 当前行发票详情数据
				InvoiceDetailDialog:false, //发票详情界面 
				//任务奖励
				//任务奖励status
				rewardStatusList:[{
					label: "全部",
					value: ""
				}, {
					label: "开启",
					value: 1
				}, {
					label: "关闭",
					value: 2
				},], 
				rewardStatus:'', //任务状态
				//任务奖励type
				rewardTypeList:[{
					label: "全部",
					value: ""
				}, {
					label: "一次性",
					value: 1
				}, {
					label: "周期",
					value: 2
				}],
				//任务奖励type
				rewardTypeList1:[ {
					label: "一次性",
					value: 1
				}, {
					label: "周期",
					value: 2
				}],
				rewardType:'', // 任务类型
				rewardTableData:[], // 任务列表数据
				rewardKey:'',//数据更新组件不刷新 
				rewardEditDialog:false, // 任务奖励编辑弹窗
				rewardRow:{},//当前行数据
				rewardInput:'',// 任务编辑
				rewardValue:'',// 任务编辑status
				rewardInputday:'', // 任务编辑入场天数
				rewardInputprice:'',//任务编辑金额
				rewardInputrate:'',// 任务编辑百分比
				//任务奖励搜索条件
				rewardPage:{
				PageIndex: 1, // -页码
				PageSize: 10, // -显示多少条数据
				PageCount: 0, // -总条数
				status:'',//状态
				type:'',//类型
				keywords:''//模糊搜索
				},
				rewardHistoryTableData:[], //任务历史
				rewardHistoryDialog:false // 任务历史弹窗
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
			tabPosition(val) {
				switch (val) {
					case 'top':
						this.getBriefDetail(this.briefId)
						break;
					// case 'order':
					// 	// basicForm
					// 	console.log(this.basicForm)
					// 	this.$nextTick(()=>{
							
					// 		// this.$refs.editFrom.getDataInfo(this.basicForm);
					// 	})
					// 	break;
				}
			},
		},
		components: {
			demanInfo,
			editService
		},
		async created(){
			let res = await loadBMap('oMC0LUxpTjA22qOBPc2PmfKADwHeXhin');
		},
		 mounted() {
			this.orderId = this.$route.query.id;
			this.briefId = this.$route.query.briefId;
			if (this.$route.query.name == 'top') {
				this.tabPosition = this.$route.query.name;
			}
			this.getBriefPay(this.orderId);
			this.getOrderdetail(this.orderId);
			
			this.getOrderTeamType();
			this.gettypeWorkClass();

			this.getReward()
			console.log('获取百度地图地址：',window)
			console.log(this.basicForm)
			//发票列表
			this.getDataList()
		},
		methods: {
			handleEditSuccess(){
				this.getOrderdetail(this.orderId);
			},
			// 查看需求单详情
			async getBriefDetail(id) {
				this.loading = true;
				try {
					let res = await getBriefDetail(id);
					this.loading = false;
					this.info = res.data;
					if (res.data.orderId > 0) {
						this.getOrderDetail(res.data.orderId);
					}
				} catch (e) {
					this.loading = false;
					//TODO handle the exception
				}
			},

			// 获取班组单位
			getCompanyUnit(val){
				console.log(val);
				for(let i = 0 ; i < this.companyList.length;i++){
					if(val == this.companyList[i].value){
						return this.companyList[i].label;
					}
				}
			},
			// 获取工种列表
			async gettypeWorkClass() {
				let param = {};
				param.pageSize = 10000;
				param.pageNum = 1;
				let res = await gettypeWorkClass(param);
				// console.log(res);
				this.teamTypeNameList = res.data.list;

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
			// 取消报名
			handleDeteleUser(row, index, inx, list_index) {
				console.log(this.memberInfo.teams[index].teamTypes[inx].list)
				this.$confirm('是否确定删除用户', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.getDeteleUser(row.id, index, inx, list_index);
				}).catch(() => {});
			},
			// 删除用户列表
			async getDeteleUser(id, index, inx, list_index) {
				let param = {};
				param.id = id;
				param.status = 2;
				try {
					let res = await getMembersEnrollCancel(param);
					this.$message.success('删除成功')
					let list = this.memberInfo.teams[index].teamTypes[inx].list.splice(list_index, 1);
					this.$forceUpdate();
				} catch (e) {
					//TODO handle the exception
				}

			},
			// 获取成员列表
			getMembers() {
				this.memberInfo.teams.forEach((item, index) => {
					item.teamTypes.forEach(async (data, inx) => {
						let teamTypeId = data.id;
						let res = await getMembers({
							teamTypeId
						});
						data.list = res.data;
					})
				})
			},

			//获取工种模式
			getPatternList(val) {
				for (let i = 0; i < this.patternList.length; i++) {
					if (val == this.patternList[i].value) {
						return this.patternList[i].label
					}
				}
			},
			// 时间比较
			bjDate(start, end) {
				return moment(end).diff(moment(start), 'days');
			},
			/** 查询成员名单信息 */
			handelSeracMember() {
				this.getOrderTeamType();
			},
			/** 重置员名单信息 */
			handleResetMember() {},
			/** 获取成员列表 */
			async getOrderTeamType() {
				let param = {};
				param.orderId = this.orderId;
				param.teamTypeName = this.teamTypeName;
				param.teamTypeTag = this.memberTab;
				param.status = this.memberStatus;
				try {
					this.memberLoading = true;
					let res = await getOrderTeamType(param);
					this.memberLoading = false;
					this.memberInfo = res.data;
					this.getMembers();
				} catch (e) {
					this.memberLoading = false;
					//TODO handle the exception
				}
			},
			formatDateTime(value) {
				return value ? moment(value).format('HH:mm:ss') : '';
			},
			formatDate(value) {
				return value ? moment(value).format('YYYY-MM-DD') : '';
			},
			// 方案切换
			handleRadio(item, index) {
				this.scheme = index;
			},
			// 下标转中文
			getNumberTurnChinese(index) {
				let arr = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
				return arr[index]
			},
			// 获取工程量单位
			geUnit(val) {
				let res = this.companyList.filter(item => item.value == val)
				return res.length > 0 ? res[0].label : this.companyList[0].label
			},

			/** 删除方案 */
			handleAddPlan() {

			},
			/** 获取服务单详情 */
			async getOrderdetail(orderId) {
				try {
					this.loading = true;
					let res = await getOrderdetail({
						id: orderId
					});
					this.loading = false;
					this.basicForm = res.data;
					this.schemes = res.data.schemes
					let lng = res.data.gpsLocation.split(',')[0];
					let lat = res.data.gpsLocation.split(',')[1];
					this.$refs.editFrom.getDataInfo(this.basicForm);
					setTimeout(()=>{
						this.getDetailsAdderss({
							lng,
							lat
						})
					},500)
				} catch (e) {
					this.loading = false;
					//TODO handle the exception
				}
			},
			/** 转成数组格式时间转换 */
			getArrayList(start,end){
				let arr = [];
				arr[0] = start;
				arr[1] = end;
				return arr;
			},
			/** 重置充值 */
			handleReset() {
				this.keywords = '';
				this.status = '';
				this.PageIndex = 1;
				this.getBriefPay(this.orderId);
			},
			/** 获取地址 */
			getDetailsAdderss(form) {
				// this.$nextTick(() => {
					const {
						lng,
						lat
					} = form;
					this.addressMap = new BMap.Map("DetailsAddress", {
						enableMapClick: false
					}) //新建地图实例，enableMapClick:false ：禁用地图默认点击弹框
					var point = new BMap.Point(lng, lat);
					this.addressMap.centerAndZoom(point, 19)
					var opts = {
						width: 120,
						height: 100,
						title: '地址'
					};
					let infoWindow = new BMap.InfoWindow(this.basicForm.address, opts);
					this.addressMap.openInfoWindow(infoWindow, point);
					this.addressMk = new BMap.Marker(point, {
						enableDragging: false
					})
					this.addressMap.addOverlay(this.addressMk) //将覆盖物添加到地图中

					this.addressMk.addEventListener('click', () => {
						let infoWindow = new BMap.InfoWindow(this.basicForm.address, opts);
						this.addressMap.openInfoWindow(infoWindow, point);
						this.addressMk = new BMap.Marker(point, {
							enableDragging: false
						})
					})

				// })

			},
			/** 搜索充值 */
			handleSearch() {
				this.PageIndex = 1;
				this.getBriefPay(this.orderId)
			},
			/** 充值列表 */
			async getBriefPay(orderId) {
				let param = {};
				param.pageIndex = this.PageIndex;
				param.pageSize = this.PageSize;
				param.keywords = this.keywords;
				param.status = this.status;
				param.orderId = orderId;
				this.loadingRecharge = true;
				try {
					let res = await getBriefPay(param);
					this.loadingRecharge = false;
					this.PageCount = res.data.total;
					this.tableData = res.data.records
				} catch (e) {
					this.loadingRecharge = false;
					//TODO handle the exception
				}
			},
			/** 显示修改金额 */
			handleMoney(index, row) {
				this.rechargeisMoney = true;
				this.rowID = row.id;
			},
			/**修改金额  */
			async getUpdateFee() {
				let param = {};
				param.id = this.rowID;
				param.fee = this.rechargeMoney;
				if(!this.rechargeMoney){
					return this.$message.error('金额不能为空')
				}
				let res = await getUpdateFee(param);
				this.$message.success('操作成功')
				this.rechargeMoney = ''
				this.getBriefPay();
				this.rechargeisMoney = false;
			},
			/** 通过 */
			handleAdopt(index, row) {
				console.log(index, row)
				this.$confirm('是否通过对账申请?', '是否通过对账申请', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.getUpdateStatus(row.id)
				}).catch(() => {

				});
			},
			async getUpdateStatus(id, status = 1, reason = '') {
				try {
					let param = {};
					param.id = id;
					param.status = status;
					param.reason = reason;

					let res = await getUpdateStatus(param);
					this.$message.success('操作成功')
					this.getBriefPay();
				} catch (e) {
					//TODO handle the exception
					console.log(e)
				}


			},
			/** 拒绝 */
			handleDelete(index, row) {
				this.$prompt('是否拒绝提现申请', '确认提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					inputPlaceholder: '填写拒绝理由',
					inputPattern: /^(?!\d)[\u4e00-\u9fa5a-zA-Z0-9_-]{1,25}$/,
					inputErrorMessage: '请输入拒绝申请理由'
				}).then(({
					value
				}) => {
					console.log(value)
					this.getUpdateStatus(row.id, 2, value)
				}).catch(() => {

				})
			},
				/** 取消修改金额对话框 */
			handleClose() {
				this.rechargeisMoney = false
				this.rechargeMoney = ''
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
				console.log(this.orderId);
				this.$router.push({
					path: `/order/member-details?orderID=${this.orderId}`
				})
			},
			/** 查看理由 */
			handleLook(row) {
				this.isLook = true;
				this.reason = row.reason;
			},
			/** 关闭查看理由 */
			handleCloseLookReason() {
				this.isLook = false
			},
			//开票 搜索
			InvoiceSearch(){
				console.log('开票查询')
			this.PageIndex = 1;
			this.getDataList()
			},
			/** 获取发票列表 */
			async getDataList() {
				let param = {};
				param.pageIndex = this.PageIndex;
				param.pageSize = this.PageSize;
				param.status = this.InvoiceStatus;
				param.type = this.type;
				param.orderId = this.orderId
				this.loading = true;
				try{
					let res = await getInvoice(param);
					this.loading = false;
					this.PageCount = res.data.total;
					this.InvoicetableData = res.data.records;
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
			// 开票取消弹窗
			InvoiceDetailclose(){
				this.InvoiceDetailDialog = false
			},
				/** 获取任务奖励列表 */
			async getReward() {
				let param = {};
				param.pageIndex = this.rewardPage.PageIndex;
				param.pageSize = this.rewardPage.PageSize;
				param.status = this.rewardPage.status;
				param.keywords = this.rewardPage.keywords;
				param.type = this.rewardPage.type;
				param.orderId = this.orderId
				this.loading = true;
				getReward(param).then(res=>{
					this.rewardKey = Math.random()
					this.rewardtableData = res.data.records;
					this.rewardPage.PageCount = res.data.total;
				})
				
			},
				/** 任务列表选择分页 */
			handleRewrdSizeChange(e) {
				this.rewardPage.PageSize = e;
				this.rewardPage.PageIndex = 1;
				this.getReward()
			},
			/** 任务列表点击分页 */
			handleRewrdCurrentChange(e) {
				this.rewardPage.PageIndex = e;
				this.getReward()
			},
			//任务奖励编辑
			postreward(){
				postReward({
				condition:  this.rewardInputday,
				fee: this.rewardInputprice ,
				rate:this.rewardInputrate,
				status:1 ,
				teamTypeId: this.rewardRow.teamTypeId,
				type:this.rewardValue
				}).then(res=>{
					this.getReward()
					this.$message.success('任务开启成功')
					this.rewardInputday= ''
					this.rewardInputprice= ''
					this.rewardInputrate= ''
					this.rewardEditDialog = false
				})
			},
			//任务奖励 编辑
			handleRewardEdit(row){
				this.rewardRow = row
				this.rewardEditDialog = true
			},
			//任务奖励 关闭
			handleCloserewardEditDialog(){
			this.rewardEditDialog = false
			},
			//任务奖励搜索
			handelSeracReward(){
			this.getReward()
			},
			percent(e){
				if(e>100){
					this.rewardInputrate = 100
				}
			},
			// 任务奖励重置
			handleResetReward(){
				this.rewardPage.status = ""
				this.rewardPage.type = ""
				this.rewardPage.keywords = ""
				this.getReward()
			},
			//任务奖励 历史弹窗
			handleRewardHistory(row){
				getRewardlog({teamTypeId:row.teamTypeId}).then(res=>{
					this.rewardHistoryTableData = res.data.records;
				})
				this.rewardHistoryDialog = true
			},
			// 任务奖励 历史弹窗
			handleCloserewardHistory(){
				this.rewardHistoryDialog = false
			},
			// 任务奖励开关
			rewardSwitch(row){
				if(row.type){
				//有则已经开过 直接关
				if(row.status == 1){
				postReward({
				condition:  row.condition,
				fee: row.fee ,
				rate:row.rate,
				type:row.type,
				status:0 ,
				teamTypeId: row.teamTypeId,
				}).then(res=>{
					this.getReward()
					this.$message.success('任务关闭成功')
					this.rewardInputday= ''
					this.rewardInputprice= ''
					this.rewardInputrate= ''
					this.rewardEditDialog = false
				})
				}else{
					postReward({
					condition:  row.condition,
					fee: row.fee ,
					rate:row.rate,
					type:row.type,
					status:1 ,
					teamTypeId: row.teamTypeId,
				}).then(res=>{
					this.getReward()
					this.$message.success('任务开启成功')
					this.rewardInputday= ''
					this.rewardInputprice= ''
					this.rewardInputrate= ''
					this.rewardEditDialog = false
				})
				}
				
				}else {
				//没有则未填写过规则 打开设置窗
				this.rewardRow = row
				this.rewardEditDialog = true
		
				}
			},
			//重新发布招工
			Republish(item){
				getServiceUpdateStatus({id:this.orderId,status:2}).then(res=>{
					if(res.code == 200){
					this.$message.success('发布招工成功')
					this.getOrderdetail(this.orderId);
					}
				})
			}
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

	.service-details-member-add-user {
		.el-input {
			width: 300px;
		}

		.service-details-member-add-user-btn {
			margin-left: 20px;
		}
	}


	.demand-service {
		.box-demand-title {
			margin-bottom: 20px;
		}

		.demand-service-end-item {
			padding-left: 60px;
		}

		.demand-service-plan {

			.demand-service-plan-gropu {
				padding-left: 20px;
			}

			.demand-service-plan-box {
				border: 1px dashed #d9d9d9;
				border-radius: 20px;

				.demand-service-plan-box-title {
					padding: 20px 20px;

					.demand-service-plan-box-del {
						cursor: pointer;
					}
				}

				.demand-service-plan-box-item {
					.el-form-item {
						width: 48%;
						margin-right: 2%;
					}

					.demand-service-plan-box-item-second {
						width: 80px;
						margin-left: 15px;
						color: #000000;
					}
				}

				.demand-service-plan-box-info {
					padding: 0 20px;
				}
			}
		}


		.demand-service-upload {
			margin-top: 20px;

			.avatar-uploader .el-upload {
				border: 1px dashed #d9d9d9;
				border-radius: 6px;
				cursor: pointer;
				position: relative;
				overflow: hidden;
			}

			.avatar-uploader .el-upload:hover {
				border-color: #409EFF;
			}

			.avatar-uploader-icon {
				font-size: 28px;
				color: #8c939d;
				width: 80px;
				height: 80px;
				line-height: 80px;
				text-align: center;
			}

			.avatar {
				width: 80px;
				height: 80px;
				display: block;
			}
		}

		.demand-service-plan-add {
			border: 1px dashed #d9d9d9;
			border-radius: 6px;
			cursor: pointer;
			position: relative;
			overflow: hidden;
			margin-left: 20px;

			.avatar-uploader-icon {
				font-size: 28px;
				color: #8c939d;
				width: 40px;
				height: 40px;
				line-height: 40px;
				text-align: center;
			}
		}

		.demand-service-plan-box-info-data {
			.el-form-item {
				width: 33.33%;
			}
		}

		.demand-service-plan-box-list-btn {

			.demand-service-plan-box-list-btn-add,
			.demand-service-plan-box-list-btn-del {
				width: 300px;
				height: 50px;
				line-height: 50px;
				border: 1px dashed #d9d9d9;
				text-align: center;
				border-radius: 16px;
				margin-right: 40px;
				margin-bottom: 40px;
				cursor: pointer;
			}

			.demand-service-plan-box-list-btn-add {
				color: #1682E6;
			}
		}

		.demand-service-plan-box-list-item {
			border-top: 1px dashed #d9d9d9;
			margin: 0 20px;
			padding: 20px 0;
		}

		.demand-service-plan-box-list-item-box {
			width: 33.33%;

			input {
				width: 220px;
			}

			.plan-box-btn {
				position: relative;
				// margin-right: 20px;
				// margin-bottom: 20px;
				// margin-left: 20px;
				width: 56px;

				button {
					position: absolute;
					top: 50%;
					left: 80%;
					transform: translate(-50%, -80%);
				}
			}
		}

		.demand-service-plan-box-list-item-type {
			padding-left: 36px;

			.el-form-item {
				width: 33.33%;
			}
		}

		.demand-service-plan-add-main {
			width: 600px;
			height: 50px;
			line-height: 50px;
			color: #fff;
			text-align: center;
			background-color: rgba(0, 121, 254, 1);
			border-radius: 16px;
			margin: 0 auto 20px;
		}



		.demand-service-plan-box-foot {
			margin: 0 60px;

			.demand-service-plan-box-foot-item {
				width: 50%;
				margin-bottom: 20px;

				.demand-service-plan-box-foot-item-server {
					input {
						width: 200px;
					}
				}

				input {
					width: 300px;
				}

				span {
					width: 100px;
					margin-right: 10px;
				}

				.demand-service-plan-box-foot-item-company {
					margin-left: 20px;

					input {
						width: 80px;
					}
				}
			}
		}


		.demand-service-plan-box-foot-server-order {
			width: 260px;
			height: 40px;
			line-height: 40px;
			margin: 40px auto 20px;
			color: #fff;
			background-color: rgba(0, 121, 254, 1);
			border-radius: 8px;
			cursor: pointer;
		}


		.demand-service-plan-gropu {
			border-radius: 16rpx;
			overflow: hidden;

			.demand-service-plan-gropu-item {
				padding: 10px 20px;
				font-size: 14px;
				border-radius: 0;
				border: 1px solid #DCDFE6;
				background-color: #FFFFFF;
				cursor: pointer;

				&.active {
					color: #FFFFFF;
					background-color: #1890ff;
					border-color: #1890ff;
				}
			}
		}



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
	.rewardEditDialog-inp{
		width: 80%;
		border-radius: 5px;
		height: 40px;
	}
	.rewardEditDialog-right{
		display: flex;
		justify-content: start;
	}
</style>
