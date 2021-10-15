<template>

	<!-- 编辑-服务单 -->
	<div class="demand-service active">
		<div class="box-demand-title flex fbetween">
			<span>项目信息</span>
			<template v-if="editFrom.schemeId == 0">
				<el-button type="primary" v-if="isShowEdit" @click="handleUpdate">修改</el-button>
				<!-- <el-button type="danger" v-else @click="handleCloseEdit">取消</el-button> -->
			</template>

		</div>
		<!-- 项目信息 -->
		<div class="demand-service-info">
			<el-form :model="editFrom" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				<el-form-item label="项目名称">
					<el-input :disabled="isShowEdit" v-model="editFrom.title"></el-input>

				</el-form-item>
				<el-form-item label=" 类型">
					<el-select v-model="editFrom.type" :disabled="isShowEdit" placeholder="选择类型">
						<el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="公司名称" class="demand-service-info-item" prop="title">
					<el-input :disabled="isShowEdit" v-model="editFrom.enterpriseName" placeholder="请输入公司名称" minlength="2" maxlength="30">
					</el-input>
					<span>已输入{{editFrom.enterpriseName.length}}/30</span>
				</el-form-item>
				<el-form-item label="联系地址" class="demand-service-info-item" prop="title">
					<el-input :disabled="isShowEdit" v-model="editFrom.enterpriseAddress " placeholder="请输入联系地址">
					</el-input>
				</el-form-item>
				<!-- 	<el-form-item label="项目简称" >
					<el-input v-model="ruleForm.name"></el-input>
				</el-form-item> -->

				<!-- <div class="flex">
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
				</el-form-item> -->

				<el-form-item label="项目介绍">
					<el-input type="textarea" :disabled="isShowEdit" v-model="editFrom.description" :rows="4">
					</el-input>
					<div class="demand-service-upload flex">
						<div v-for="(item,index) in editFrom.images" :key="index" class="demand-service-upload-img"
							@mouseover="handleMouseoverImg(item,index)" @mouseout="handleMouseoutImg(item,index)">
							<el-image :src="item">
							</el-image>
							<div class="demand-service-upload-img-mask flex fvertical fcenter"
								v-show="!isShowEdit &&current == index">
								<i class="el-icon-zoom-in" @click="handleLookImg(item,index)"></i>
								<i class="el-icon-delete" @click="handleDeteleImg(item,index)"></i>
							</div>
						</div>
						<el-upload v-if="!isShowEdit && editFrom.images.length < 4" class="avatar-uploader flex"
							action="/api/commons/file/admin/v1/upload/public" :data='{"watermarkSkip":true}' list-type="picture-card"
							name="multipartFile" :show-file-list="false" :on-progress="handleProgress"
							:on-remove="handleRemoveImg" :on-preview="handlePictureCardPreview"
							:on-exceed="handleExceed" :on-success="handleSuccessImg" :limit="limit"
							:before-upload="beforeAvatarUpload" :on-error="handleUploadError">
							<i class="el-icon-plus avatar-uploader-icon" v-if="videoFlag == false"></i>
							<el-progress :stroke-width="5" v-if="videoFlag == true" type="circle"
								:percentage="videoUploadPercent" style="margin-top:12px;"></el-progress>
						</el-upload>

						<el-dialog :visible.sync="isImges">
							<img width="100%" :src="dialogImageUrl" alt="">
						</el-dialog>
					</div>
				</el-form-item>

				<el-form-item label="项目地址">

					<!-- 详情地址 -->
					<div class="demand-service-address">
						<div class="flex fvertical fbetween">
							<span>{{editFrom.address}}</span>
							<el-button v-if="!isShowEdit" type="primary" @click="isAddress = true">修改
							</el-button>
						</div>
						<div id="allmap" style="width:100%;height:300px;margin-top: 20px;">
						</div>
					</div>
					<!-- 详情地址end -->

				</el-form-item>

				<el-form-item label="打卡范围">
					<el-select :disabled="isShowEdit" v-model="editFrom.scope" placeholder="请选择">
						<el-option v-for="(item,i) in scopeList" :key="i" :label="item.radius"
							:value="item.radius">
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
				<div class="demand-service-plan-add" v-if="!isShowEdit && schemeList.length < 3" @click="handleAddPlan">
					<i class="el-icon-plus avatar-uploader-icon"></i>
				</div>

			</div>

			<div class="demand-service-plan-box" v-if="scheme==index" v-for="(item,index) in editFrom.schemes"
				:key="index">
				<!-- 方案标题  -->
				<div class="demand-service-plan-box-title flex fbetween">
					<span class="box-demand-title">方案{{getNumberTurnChinese(index+1)}}：</span>
					<div class="demand-service-plan-box-del " v-if="schemeList.length >1 && !isShowEdit"
						@click="handleDeleteProject(index)">
						<i class="el-icon-delete"></i>
						<span>删除方案</span>
					</div>
				</div>
				<!-- 方案标题end  -->

				<!-- 方案基本信息  -->
				<el-form :model="item" ref="ruleForm" label-width="100px">

					<div class="flex demand-service-plan-box-item">
						<el-form-item label="方案标签">
							<el-input :disabled="isShowEdit" v-model="item.tag"></el-input>
						</el-form-item>
						<el-form-item label="简介">
							<el-input :disabled="isShowEdit" v-model="item.description"></el-input>
						</el-form-item>
					</div>
					<div class="flex demand-service-plan-box-item">
						<el-form-item label="方案进场时间">
							<el-input :value="formatDate(item.enterStartTime)" :disabled="true"></el-input>
						</el-form-item>
						<el-form-item class="" label="方案工期">
							<div class="flex">
								<el-input :disabled="true" class="f1" v-model="item.enterDay"
									oninput="value=value.replace(/^(0+)|[^\d]+/g,'')"></el-input>
								<el-input class="demand-service-plan-box-item-second" :disabled="true"
									value="天"></el-input>
							</div>
						</el-form-item>
					</div>
					<div class="flex demand-service-plan-box-item">
						<el-form-item class="" label="换人次数">
							<div class="flex">
								<el-input :disabled="isShowEdit" class="f1" v-model="item.replaceTimes"></el-input>
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
									<el-input v-model="teams.name" :disabled="isShowEdit"></el-input>
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
										<el-select style="width: 120px;margin-left: 10px;" :disabled="isShowEdit"
											v-model="teams.unit" placeholder="请选择">
											<el-option v-for="item in companyList" :key="item.value" :label="item.label"
												:value="item.value">
											</el-option>
										</el-select>
									</div>
								</el-form-item>
								<el-form-item label="计件单价">
									<div class="flex">
										<el-input class="f1" :disabled="isShowEdit" v-model="teams.unitPrice"
											@input="handleTeamsUniprice(index,inx,teams)"></el-input>
										<span>元/{{geUnit(teams.unit)}}</span>
									</div>
								</el-form-item>
							</div>

							<div class="flex  demand-service-plan-box-info-data">
								<el-form-item label="上班时间">
									<el-time-picker :disabled="isShowEdit" is-range v-model="teams.workTimeList"
										range-separator="至" start-placeholder="开始时间" format='HH:mm'
										@input="handleWorkTime(index,inx,teams)" end-placeholder="结束时间"
										placeholder="选择时间范围" :clearable="false">
									</el-time-picker>
								</el-form-item>
								<el-form-item label="午休时间">
									<el-time-picker :disabled="isShowEdit" is-range v-model="teams.restTimeList"
										format='HH:mm' range-separator="至" start-placeholder="开始时间"
										@input="handleRestTime(index,inx,teams)" end-placeholder="结束时间"
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
							v-for="(teamTypes,types_index) in teams.teamTypes" :key="types_index">

							<el-form :model="teamTypes" ref="ruleForm" label-width="100px">
								<!-- 固定基本工种  -->
								<div class="flex fbetween">
									<div class="demand-service-plan-box-list-item-box flex fvertical">
										<div class="plan-box-btn">
											<el-button :disabled="isShowEdit"
												@click="handleDeleteWork(index,inx,types_index,teamTypes)"
												type="primary" size="mini">删除</el-button>
										</div>
										<el-form-item label="工种">
											<!-- <el-input v-model="ruleForm.name"></el-input> -->
											<el-select :disabled="isShowEdit" v-model="teamTypes.name" filterable
												placeholder="请选择">
												<el-option v-for="item in options" :key="item.labelName"
													:label="item.labelName" :value="item.labelName">
												</el-option>
											</el-select>
										</el-form-item>
									</div>
									<div class="demand-service-plan-box-list-item-box">
										<el-form-item label="工种标签">
											<!-- <el-input v-model="ruleForm.name"></el-input> -->
											<el-select :disabled="isShowEdit" v-model="teamTypes.tag" placeholder="请选择"
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
											<el-select :disabled="isShowEdit" v-model="teamTypes.workType"
												placeholder="请选择"
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
											<el-date-picker :disabled="isShowEdit" v-model="teamTypes.enterStartTime"
												type="date" value-format="yyyy-MM-dd"
												@change="handleStartTime(index,inx,types_index,teamTypes)"
												:clearable="false" placeholder="请设置进场时间">
											</el-date-picker>
										</el-form-item>
									</div>
									<div class="demand-service-plan-box-list-item-box">
										<el-form-item label="工种工期">
											<div class="flex">
												<el-input :disabled="isShowEdit" style="width: 200px;"
													v-model="teamTypes.enterDay"
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
											<el-input style="width: 200px;" :value="teamTypes.dailyHours"
												:disabled="true">
											</el-input>
											<span style="padding-left: 20px;">小时</span>
										</div>
									</el-form-item>
									<el-form-item label="带班服务费" prop="leaderFee"
										v-if="teamTypes.tag == '班组长'">
										<div class="flex">
											<el-input @input="handleServiceFee(index,inx,types_index,teamTypes)" style="width: 80px;"  min="0" max="100"  type="number" :disabled="isShowEdit" v-model="teamTypes.leaderRate">
											</el-input>
											<span style="padding:0 10px;">%</span>
											<el-input v-model="teamTypes.leaderFee" style="width: 100px;" class="demand-service-plan-box-item-second" :disabled="true"></el-input>元
										</div>
									</el-form-item>
									<el-form-item label="人数">
										<div class="flex">
											<el-input style="width: 200px;" :disabled="isShowEdit"
												v-model="teamTypes.number"
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
											<el-input style="width: 200px;" :disabled="isShowEdit"
												v-model="teamTypes.personalQuantity"
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
											<el-input style="width: 200px;" :disabled="isShowEdit"
												v-model="teamTypes.number"
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
											<el-input style="width: 150px;" :disabled="isShowEdit"
												v-model="teamTypes.personalQuantity"
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
											<el-input style="width: 150px;" :disabled="isShowEdit"
												v-model="teamTypes.number"
												@input="handleQuantity(index,inx,types_index,teamTypes)">
											</el-input>
											<span style="padding-left: 20px;">人</span>
										</div>
									</el-form-item>
									<el-form-item label="带班服务费" prop="leaderFee"
									v-if="teamTypes.tag == '班组长'">
									<div class="flex">
										<el-input @input="handleServiceFee(index,inx,types_index,teamTypes)" style="width: 80px;"  min="0" max="100"  type="number" :disabled="isShowEdit" v-model="teamTypes.leaderRate">
										</el-input>
										<span style="padding:0 10px;">%</span>
										<el-input v-model="teamTypes.leaderFee" style="width: 100px;" class="demand-service-plan-box-item-second" :disabled="true"></el-input>元
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
											<el-input style="width: 200px;" :value="teamTypes.dailyHours"
												:disabled="true">
											</el-input>
											<span style="padding-left: 20px;">小时</span>
										</div>
									</el-form-item>
									<el-form-item label="工时单价">
										<div class="flex">
											<el-input style="width: 200px;" :disabled="isShowEdit"
												v-model="teamTypes.unitPrice"
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
											<el-input style="width: 200px;" :disabled="isShowEdit"
												v-model="teamTypes.number"
												@input="handleQuantity(index,inx,types_index,teamTypes)">
											</el-input>
											<span style="padding-left: 20px;">人</span>
										</div>
									</el-form-item>
									<el-form-item label="加班费">
										<div class="flex">
											<el-input style="width: 200px;" :disabled="isShowEdit"
												v-model="teamTypes.overtimeFee">
											</el-input>
											<span style="padding-left: 20px;">元/小时</span>
										</div>
									</el-form-item>
									<el-form-item label="带班服务费" prop="leaderFee"
									v-if="teamTypes.tag == '班组长'">
									<div class="flex">
										<el-input @input="handleServiceFee(index,inx,types_index,teamTypes)" style="width: 80px;"  min="0" max="100"  type="number" :disabled="isShowEdit" v-model="teamTypes.leaderRate">
										</el-input>
										<span style="padding:0 10px;">%</span>
										<el-input v-model="teamTypes.leaderFee" style="width: 100px;" class="demand-service-plan-box-item-second" :disabled="true"></el-input>元
									</div>
								</el-form-item>
								</div>
								<!-- 普通工种end  -->


								<!--  工作描述 -->
								<div class="demand-service-plan-box-list-item-text">
									<el-form-item label="工作描述">
										<el-input :disabled="isShowEdit" type="textarea" placeholder="请输入"
											:autosize="{ minRows: 2, maxRows: 4}" v-model="teamTypes.description">
										</el-input>
									</el-form-item>
								</div>
								<!--  工作描述end -->

							</el-form>
						</div>

						<div class="demand-service-plan-box-list-btn flex fvertical fcenter" v-if="!isShowEdit">
							<div class="demand-service-plan-box-list-btn-add" @click="handleAddWork(index,inx)">
								添加工种</div>
							<div class="demand-service-plan-box-list-btn-del" @click="hanldeRemoveGroup(index,inx)">删除班组
							</div>
						</div>
					</div>

					<!-- 工种列表数据end -->
				</div>

				<div class="demand-service-plan-add-main flex fcenter" v-if="!isShowEdit"
					@click="handleAddGroup(index)">添加班组
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
								@input="handleInputToals(index)" :disabled="isShowEdit" v-model="item.serviceFeeRate"
								placeholder="请输入信息服务费比例">
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
							<el-input class="f1" :disabled="isShowEdit" v-model="item.taxRate"
								@input="handleInputToals(index)" placeholder="请输入信息服务费比例"></el-input>
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

		</div>


		<el-dialog title="提示" :visible.sync="isAddress" width="800px" :before-close="handleClose">
			<el-autocomplete style="width:100%;" popper-class="autoAddressClass" v-model="form.address"
				:fetch-suggestions="querySearchAsync" :trigger-on-focus="false" placeholder="详细地址"
				@select="handleSelect" clearable>
				<template slot-scope="{ item }">
					<i class="el-icon-search fl mgr10"></i>
					<div style="overflow:hidden;">
						<div class="title">{{ item.title }}</div>
						<span class="address ellipsis">{{ item.address }}</span>
					</div>
				</template>
			</el-autocomplete>

			<div id="map-container" style="width:100%;height:500px;margin-top: 20px;"></div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="isAddress = false">取 消</el-button>
				<el-button type="primary" @click="handleAddress">确 定</el-button>
			</span>
		</el-dialog>

		<div class="demand-foot-btn flex fright fvertical" v-if="!isShowEdit">
			<!-- <div class="demand-foot-btn-item flex fvertical fcenter " v-if="!isShowEdit"
				@click="handleAddSerice">
				提交服务单</div> -->
			<el-button class="demand-foot-btn-item" type="primary" @click="handleAddSerice">提交服务单</el-button>
			<el-button class="demand-foot-btn-item" type="info" @click="handleCloseEdit">取消编辑</el-button>
		</div>
	</div>
	<!--  编辑-服务单end -->
</template>

<script>
	import moment from 'moment'
	import loadBMap from '../../../utils/loadBMap.js'
	import {
		getUpdateOrder,
		getAttendanceClass,
		gettypeWorkClass
	} from '../../../api/user.js'
	export default {
		data() {
			return {
				current: null,
				scheme: 0,
				rules: {},
				isAddress: false,
				isImges: false, // 是否显示大图
				schemeList: [], // 方案列表
				dialogImageUrl: "",
				scopeList: [], // 打卡范围
				options: [], // 工种模式
				editFrom: {},
				videoFlag: false,
				videoUploadPercent: 0,
				limit: 4, //上传图片的长度
				typeList: [{
					value: 1,
					label: "工人推荐"
				}, {
					value: 2,
					label: "劳务分包"
				}], // 类型列表
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
				addressMk: "",
				form: {},
				map: "",
				mk: "",
				isShowEdit: true,
				recordFrom: {}
			}
		},
		watch: {
			isAddress(val) {
				if (val) {
					this.initMap();
				}
			}
		},
		methods: {
			// 计算工时单价
			handleUnitPrice(index, inx, type_index, val) {
				// let dailyFee = (this.editFrom.schemes[index].teams[inx].workTimelen - this.editFrom.schemes[index].teams[
				// 		inx].restTimelen) *
				// 	val.unitPrice
				let dailyFee = ((val.dailyHours) * val.unitPrice).toFixed(2)
				val.dailyFee = dailyFee;
				this.getGroupTotal({
					index,
					inx,
					type_index,
					val
				});
			},
			/** 上传中 */
			handleProgress(event, file, fileList) {
				this.videoFlag = true;
				this.videoUploadPercent = Number(file.percentage);
			},
			/** 上传失败 */
			handleUploadError() {
				this.videoUploadPercent = 0;
				this.videoFlag = false;
				this.$message.error('上传失败');
			},
			// 午休时间
			handleRestTime(index, inx, val) {
				if (!val.restTimeList || val.restTimeList.length == 0) {
					val.restTimelen = 0;
					this.handleWorkTime(index, inx, val);
					return;
				};
				val.restStartTime = this.formatDateTime(val.restTimeList[0]);
				val.restEndTime = this.formatDateTime(val.restTimeList[1]);
				let stratTime = Date.parse(val.restTimeList[0]);
				let endTime = Date.parse(val.restTimeList[1]);
				val.restTimelen = this.timeFn(stratTime, endTime);
				this.handleWorkTime(index, inx, val);
				this.$forceUpdate();

			},
			//  上班时间
			handleWorkTime(index, inx, val) {
				console.log('上班时间', val);
				this.editFrom.schemes[index].teams[inx].workStartTime = this.formatDateTime(val.workTimeList[0]);
				this.editFrom.schemes[index].teams[inx].workEndTime = this.formatDateTime(val.workTimeList[1]);
				let stratTime = Date.parse(val.workTimeList[0]);
				let endTime = Date.parse(val.workTimeList[1]);
				this.editFrom.schemes[index].teams[inx].workTimelen = this.timeFn(stratTime, endTime);
				let teamTypes = this.editFrom.schemes[index].teams[inx].teamTypes;
				let timeLen = val.workTimelen - val.restTimelen;
				this.getCalculationUnitPrice(timeLen, teamTypes);
				this.$forceUpdate();
			},
			// 计算工时单价
			getCalculationUnitPrice(timeLen, list) {
				for (let i = 0; i < list.length; i++) {
					list[i].dailyFee = list[i].unitPrice * timeLen
				}
			},
			// 计算时分
			timeFn(startTime, endTime) { //di作为一个变量传进来
				//如果时间格式是正确的，那下面这一步转化时间格式就可以不用了
				var dateBegin = new Date(startTime); //将-转化为/，使用new Date
				var dateEnd = new Date(endTime); //获取当前时间
				var dateDiff = dateEnd.getTime() - dateBegin.getTime(); //时间差的毫秒数
				var dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000)); //计算出相差天数
				var leave1 = dateDiff % (24 * 3600 * 1000) //计算天数后剩余的毫秒数
				var hours = Math.floor(leave1 / (3600 * 1000)) //计算出小时数
				//计算相差分钟数
				var leave2 = leave1 % (3600 * 1000) //计算小时数后剩余的毫秒数
				var minutes = Math.floor(leave2 / (60 * 1000)) //计算相差分钟数
				//计算相差秒数
				var leave3 = leave2 % (60 * 1000) //计算分钟数后剩余的毫秒数
				var seconds = Math.round(leave3 / 1000);
				return ((hours * 100) + minutes) / 100
			},
			// 删除图片
			handleDeteleImg(item, index) {
				this.editFrom.images.splice(index, 1)
			},
			// 查看图片
			handleLookImg(item, index) {
				this.isImges = true;
				this.dialogImageUrl = item;
			},
			// 鼠标经过
			handleMouseoverImg(item, index) {
				this.current = index;
			},
			// 鼠标移出
			handleMouseoutImg(item, index) {
				this.current = null;
			},
			// 显示编辑
			handleUpdate() {
				this.recordFrom = this.deepClone(this.editFrom);
				this.isShowEdit = !this.isShowEdit;
			},
			//  取消编辑
			handleCloseEdit() {
				// console.log(this.recordFrom)
				this.$confirm('是否取消编辑？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
				this.isShowEdit = !this.isShowEdit;
				this.editFrom = this.recordFrom
				})
			},
			// 添加组
			handleAddGroup(index) {
				// console.log(index);
				let param = {
					name: "", // 班组名称
					workTimeList: [new Date(2016, 9, 10, 8, 0), new Date(2016, 9, 10, 18,
						0)], // 上班/下班 时间数组
					workStartTime: "", // 上班时间
					workEndTime: "", // 下班时间
					workTimelen: 10, // 上班时长
					restTimeList: [new Date(2016, 9, 10, 12, 0), new Date(2016, 9, 10, 13,
						0)], // 午休时间数组
					restStartTime: "", // 午休开始时间
					restEndTime: "", // 午休结束时间
					restTimelen: 1, // 午休时长
					unitPrice: "", // 计件单价
					unit: 1, // 单位
					enterStartTime: "", //进场时间
					enterEndTime: "", // 退场时间
					enterDay: "", // 班组工期
					totalUnit: "", // 班组工程量 
					totalNum: 0, // 总人数
					totalFee: 0, // 班组总费用

					teamTypes: [ // 工种列表
						{
							name: this.options[0].labelName ? this.options[0].labelName : '', // 工种名称
							tag: "", // 标签
							workTypeVal: "", // 工种模式
							enterStartTime: "", // 工种进场时间
							enterEndTime: "", // 工种退场时间
							enterDay: "", //工种工期
							personalQuantity: "", // 个人工程量
							unitPrice: '', //单价 
							number: "", // 人数
							leaderFee: "", // 带班费
							description: "", // 描述
							overtimeFee: "", // 加班费
							dailyFee: "", //  每日收入
							dailyHours: "", // 每日工时
						}
					]
				}
				// this.editFrom.schemes[index].teams.push(param)
				this.$set(this.editFrom.schemes[index].teams, this.editFrom.schemes[index].teams.length, param)
			},
			/** 关闭对话框 */
			handleClose() {
				this.isAddress = false;
			},
			/**
			 * 逆地址解析函数（根据坐标点获取详细地址）
			 * @param {Object} point   百度地图坐标点，必传
			 */
			getAddrByPoint(point) {
				var that = this;
				var geco = new BMap.Geocoder();
				geco.getLocation(point, function(res) {
					// console.log('内容解析', res) //内容见下图
					that.mk.setPosition(point) //重新设置标注的地理坐标
					that.map.panTo(point) //将地图的中心点更改为给定的点
					that.form.address = res.address; //记录该点的详细地址信息
					that.form.addrPoint = point; //记录当前坐标点
				})
			},
			/** 确认添加项目地址 */
			handleAddress() {
				if (!this.form.addrPoint) {
					return this.$message.error('请输入正确的地址')
				}
				let point = this.form.addrPoint;
				var that = this;
				var geco = new BMap.Geocoder();
				geco.getLocation(point, function(res) {
					that.editFrom.address = res.address
					that.editFrom.province = res.addressComponents.province;
					that.editFrom.region = res.addressComponents.district;
				})
				this.isAddress = false;
				this.getDetailsAdderss(this.form);
			},
			/**
			 * 浏览器定位函数
			 */
			geolocation() {
				var that = this;
				var geolocation = new BMap.Geolocation();
				geolocation.getCurrentPosition(function(res) {
					if (this.getStatus() == BMAP_STATUS_SUCCESS) {
						that.getAddrByPoint(res.point) //当成功时，调用逆地址解析函数
					} else {
						// alert('failed' + this.getStatus()); //失败时，弹出失败状态码
						// this.form = {};
					}
				}, {
					enableHighAccuracy: true
				}) //enableHighAccuracy：是否要求浏览器获取最佳效果，默认为false
			},
			// 初始化地图
			initMap() {
				var that = this;
				this.$nextTick(() => {
					this.map = new BMap.Map("map-container", {
						enableMapClick: false
					}) //新建地图实例，enableMapClick:false ：禁用地图默认点击弹框
					var point = new BMap.Point(113.45229348086244, 23.166207444960165);
					this.map.centerAndZoom(point, 19)
					this.mk = new BMap.Marker(point, {
						enableDragging: true
					}) //创建一个图像标注实例，enableDragging：是否启用拖拽，默认为false
					// this.map.addOverlay(this.mk)
					var navigationControl = new BMap.NavigationControl({ //创建一个特定样式的地图平移缩放控件
						anchor: BMAP_ANCHOR_TOP_RIGHT, //靠右上角位置
						type: BMAP_NAVIGATION_CONTROL_SMALL //SMALL控件类型
					})
					this.map.addControl(navigationControl) //将控件添加到地图

					var geolocationControl = new BMap.GeolocationControl({
						anchor: BMAP_ANCHOR_BOTTOM_LEFT
					}) //创建一个地图定位控件
					geolocationControl.addEventListener("locationSuccess", function(e) { //绑定定位成功后事件
						// that.getAddrByPoint(e.point) //定位成功后调用逆地址解析函数
					});
					geolocationControl.addEventListener("locationError", function(e) { //绑定定位失败后事件
						alert(e.message);
					});
					this.map.addControl(geolocationControl) //将控件添加到地图
					this.geolocation()
					this.map.addEventListener('click', function(e) { //给地图绑定点击事件

						that.getAddrByPoint(e.point) //点击后调用逆地址解析函数
					})
				})

			},
			querySearchAsync(str, cb) {
				var options = {
					onSearchComplete: function(res) { //检索完成后的回调函数
						var s = [];
						if (local.getStatus() == BMAP_STATUS_SUCCESS) {
							for (var i = 0; i < res.getCurrentNumPois(); i++) {
								s.push(res.getPoi(i));
							}
							cb(s) //获取到数据时，通过回调函数cb返回到<el-autocomplete>组件中进行显示
						} else {
							cb(s)
						}
					}
				}
				var local = new BMap.LocalSearch(this.map, options) //创建LocalSearch构造函数
				local.search(str) //调用search方法，根据检索词str发起检索
			},
			handleSelect(item) {
				var opts = {
					width: 120,
					height: 50,
					title: item.title
				};
				let infoWindow = new BMap.InfoWindow(item.address ? item.address : item.city + item.title, opts);
				// console.log(item)
				this.form.address = item.address ? item.address : item.city + item.title; //记录详细地址，含建筑物名
				this.form.addrPoint = item.point; //记录当前选中地址坐标
				this.form.allAddress = item;
				this.map.clearOverlays() //清除地图上所有覆盖物
				this.mk = new BMap.Marker(item.point) //根据所选坐标重新创建Marker
				this.map.addOverlay(this.mk) //将覆盖物重新添加到地图中
				this.map.panTo(item.point) //将地图的中心点更改为选定坐标点
				this.map.openInfoWindow(infoWindow, item.point);

			},
			// 打卡范围
			async getAttendanceClass() {
				let param = {
					pageSize: 9999,
					pageNum: 1,
				}
				let res = await getAttendanceClass(param);
				this.scopeList = res.data.list;
			},

			// 工种模式
			handleTypeModel(index, inx, type_index, val) {
				let newWork = this.patternList.filter(item => item.value == val.workType);
				val.workType = newWork[0].value
				val.personalQuantity = '';
				val.number = '';
				val.unitPrice = '';
				val.overtimeFee = '';
				val.dailyFee = '';
				this.handleQuantity(index, inx, type_index, val)

			},
			/** 当用户工种工期输入时 */
			handleDuration(index, inx, types_index, val) {
				let teamTypes = this.editFrom.schemes[index].teams[inx].teamTypes;
				val.enterDay = val.enterDay.replace(/[^0-9.]/g, '')
				let num = val.enterDay;
				if (val.enterStartTime && num >= 1) {
					console.log('val.enterStartTime', val.enterStartTime);
					let date = this.dateChange((num - 1), this.formatDate(val.enterStartTime));
					val.enterEndTime = date;
					this.editFrom.schemes[index].teams[inx].enterStartTime = this.getComeTime(teamTypes);
					this.editFrom.schemes[index].teams[inx].enterEndTime = this.getExitLenTime(teamTypes);
					this.editFrom.schemes[index].teams[inx].enterDay = this.getDateDiff(this.editFrom.schemes[index].teams[
							inx]
						.enterStartTime, this.editFrom.schemes[index].teams[inx]
						.enterEndTime);
				} else {
					this.editFrom.schemes[index].teams[inx].enterEndTime = "";
					this.editFrom.schemes[index].teams[inx].enterDay = 0;
					val.enterEndTime = "";
				}
				this.getGroupTotal({
					index,
					inx,
					types_index,
					val
				});
			},
			// 删除单个工种
			handleDeleteWork(index, inx, type_index, val) {
				this.$confirm('是否删除当前工种信息？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.editFrom.schemes[index].teams[inx].teamTypes.splice(type_index, 1)
					this.handleQuantity(index, inx, type_index, val)
				}).catch(() => {});
			},
			// 添加工种
			handleAddWork(index, inx) {
				let param = {
					name: this.options[0].labelName ? this.options[0].labelName : '', // 工种名称
					tag: "", // 标签
					workTypeVal: "", // 工种模式
					enterStartTime: "", // 工种进场时间
					enterEndTime: "", // 工种退场时间
					enterDay: "", //工种工期
					personalQuantity: "", // 个人工程量
					unitPrice: '', //单价 
					number: "", // 人数
					leaderFee: "", // 带班费
					description: "", // 描述
					overtimeFee: "", // 加班费
					dailyFee: "", //  每日收入
					dailyHours: this.timeFn(this.editFrom.schemes[index].teams[inx].workStartTime, this.editFrom.schemes[index].teams[inx].workEndTime)-1, // 每日工时
				}
				// this.timeFn(this.editFrom.schemes[index].teams[inx].workStartTime, this.editFrom.schemes[index].teams[inx].workEndTime)
				this.editFrom.schemes[index].teams[inx].teamTypes.push(param);
			},
			// 删除组
			hanldeRemoveGroup(index, inx) {
				this.$confirm('是否班组删除信息', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.editFrom.schemes[index].teams.splice(inx, 1);
					this.getTotal(index);
				})

			},
			// 计算总费用
			handleInputToals(index) {
				this.getTotal(index)
			},
			/**
			 * 冒泡排序获取最排序 进场时间
			 * @param {Array}  arr 循环数组
			 * @param {Boolen}  issort 是否倒序 
			 * */
			getComebSort(arr, issort = false) {
				var len = arr.length;
				for (var i = 0; i < len - 1; i++) {
					for (var j = 0; j < len - 1 - i; j++) {
						if (issort) {
							// 相邻元素两两对比，元素交换，大的元素交换到后面
							if (new Date(arr[j]).getTime() < new Date(arr[j + 1]).getTime()) {
								var temp = arr[j];
								arr[j] = arr[j + 1];
								arr[j + 1] = temp;
							}
						} else {
							if (new Date(arr[j]).getTime() > new Date(arr[j + 1]).getTime()) {
								var temp = arr[j];
								arr[j] = arr[j + 1];
								arr[j + 1] = temp;
							}
						}

					}
				}
				return arr[0];
			},
			// 计算工期最长退场时间
			getExitLenTime(arr) {
				console.log('计算工期最长退场时间：：', arr)
				if (arr.length <= 1) {
					return arr[0].enterEndTime;
				}
				let newArr = [];
				for (let i = 0; i < arr.length; i++) {
					if (arr[i].enterEndTime) {
						newArr.push(arr[i].enterEndTime)
					}
				}
				if (newArr.length <= 1) {
					return newArr[0];
				}
				return this.getComebSort(newArr, true)
			},

			// 计算最早进场时间
			getComeTime(arr) {
				if (arr.length <= 1) {
					return arr[0].enterStartTime;
				}
				let newArr = [];
				for (let i = 0; i < arr.length; i++) {
					if (arr[i].enterStartTime) {
						newArr.push(arr[i].enterStartTime)
					}
				}
				if (newArr.length <= 1) {
					return newArr[0];
				}
				return this.getComebSort(newArr);

			},
			/** 工种进场时间 */
			handleStartTime(index, inx, types_index, val) {
				let teamTypes = this.editFrom.schemes[index].teams[inx].teamTypes;
				let num = val.enterDay;
				if (val.enterStartTime && num >= 1) {
					let date = this.dateChange((num - 1), this.formatDate(val.enterStartTime));
					val.enterEndTime = date;
					this.editFrom.schemes[index].teams[inx].enterEndTime = this.getExitLenTime(teamTypes)
					this.editFrom.schemes[index].teams[inx].enterDay = this.getDateDiff(this.editFrom.schemes[index].teams[
							inx]
						.enterStartTime, this.editFrom.schemes[index].teams[inx]
						.enterEndTime);
				} else {
					this.editFrom.schemes[index].teams[inx].enterEndTime = "";
					this.editFrom.schemes[index].teams[inx].enterDay = 0
					val.enterEndTime = "";
				}
				this.editFrom.schemes[index].teams[inx].enterStartTime = this.getComeTime(teamTypes)
			},
			/** 计算工期 */
			dateChange(num = 1, date = false) {
				if (!date) {
					date = new Date(); //没有传入值时,默认是当前日期
					date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
				}
				date += " 00:00:00"; //设置为当天凌晨12点
				date = Date.parse(new Date(date)) / 1000; //转换为时间戳
				date += (86400) * num; //修改后的时间戳
				var newDate = new Date(parseInt(date) * 1000); //转换为时间
				let month = (newDate.getMonth() + 1) < 10 ? '0' + (newDate.getMonth() + 1) : (newDate.getMonth() + 1);
				let day = newDate.getDate() < 10 ? '0' + newDate.getDate() : newDate.getDate();
				return newDate.getFullYear() + '-' + month + '-' + day;
			},
			// 获取当前工种标签
			handleTag(index, inx, types_index, val) {
				if (val.tag == '班组长') {
					val.workTypeVal = '';
				}
				this.handleQuantity(index, inx, types_index, val)
			},
			// 计算班组工程量
			handleQuantity(index, inx, types_index, val) {
				let teamTypes = this.editFrom.schemes[index].teams[inx].teamTypes;
				let total = 0;
				let allToal = 0;
				for (let i = 0; i < teamTypes.length; i++) {
					if (teamTypes[i].workType == 1 && teamTypes[i].number > 0 && teamTypes[i].personalQuantity > 0) {
						total += Number(teamTypes[i].number) * Number(teamTypes[i].personalQuantity)
					}
				}
				this.editFrom.schemes[index].teams[inx].totalUnit = total;
				for (let i = 0; i < this.editFrom.schemes[index].teams.length; i++) {
					allToal += this.editFrom.schemes[index].teams[i].totalUnit;
				}
				// console.log('计算班组工程量',allToal);
				this.editFrom.schemes[index].totalUnit = allToal;
				this.getGroupTotal({
					index,
					inx,
					types_index,
					val
				})
			},
			//  方案输入单价
			handleTeamsUniprice(index, inx, val) {
				val.unitPrice = val.unitPrice.replace(/[^0-9.]/g, '');
				//编辑时修改班组计件单价 循环赋值到对应工种unitPrice中
				val.teamTypes.forEach(item=>{
					item.unitPrice = val.unitPrice
				})
				this.getGroupTotal({
					index,
					inx,
					val
				})
			},
			// 计算数组的总数
			getGroupTotal(data) {
				// let teamTypes = this.editFrom.schemes[data.index].teams[data.inx].teamTypes;
				let teamTypes = this.editFrom.schemes[data.index].teams[data.inx].teamTypes;
				let total = 0;
				let totalNumber = 0;
				for (let i = 0; i < teamTypes.length; i++) {
					if (teamTypes[i].workType == 2 && teamTypes[i].dailyFee && teamTypes[i].enterDay && teamTypes[i]
						.number) {
						total += teamTypes[i].dailyFee * teamTypes[i].enterDay * teamTypes[i].number;
						if (teamTypes[i].tag == '班组长') {
							// total += teamTypes[i].enterDay * teamTypes[i].leaderFee * teamTypes[i].number;
							total += teamTypes[i].leaderFee?teamTypes[i].leaderFee:0
						}
					}
					if (teamTypes[i].workType == 1) {
						total += teamTypes[i].number * teamTypes[i].personalQuantity * this.editFrom.schemes[data.index]
							.teams[data
								.inx].unitPrice
						if (teamTypes[i].tag == '班组长') {
							// total += teamTypes[i].enterDay * teamTypes[i].leaderFee * teamTypes[i].number;
							total += teamTypes[i].leaderFee?teamTypes[i].leaderFee:0
						}
					}

					if (teamTypes[i].workType == 3) {
						// total += teamTypes[i].enterDay * teamTypes[i].leaderFee * teamTypes[i].number;
						total += teamTypes[i].leaderFee?teamTypes[i].leaderFee:0
					}
					totalNumber += Number(teamTypes[i].number);
				}
				this.editFrom.schemes[data.index].teams[data.inx].totalNum = totalNumber
				this.editFrom.schemes[data.index].teams[data.inx].totalFee = total;
				this.handleServiceFee(data.index,data.inx,data.type_index,data.val)
				this.getTotal(data.index);
			},
			// 计算总的社工服务费
			getTotal(index) {
				let teams = this.editFrom.schemes[index].teams;
				let total = 0;
				teams.forEach((item, inx) => {
					// console.log(item.teamTypes)
					item.teamTypes.forEach((data, inxx) => {
						console.log(data);
						if (data.workType == 2 && data.dailyFee && data.enterDay && data
							.number) {
							total += data.dailyFee * data.enterDay * data.number;
							if (data.tag == '班组长') {
								// total += data.enterDay * data.leaderFee * data.number;
								total += data.leaderFee?data.leaderFee:0
							}
						}
						if (data.workType == 1) {
							total += data.number * data.personalQuantity * item.unitPrice
							if (data.tag == '班组长') {
								// total += data.enterDay * data.leaderFee * data.number;
								total += data.leaderFee?data.leaderFee:0
							}
						}
						if (data.workType == 3) {
							// total += data.enterDay * data.leaderFee * data.number;
							total += data.leaderFee?data.leaderFee:0
						}
					})
				})
				this.editFrom.schemes[index].serverTotal = total;
				let serviceFeeRateNum = (Number(this.editFrom.schemes[index].serverTotal) * Number(this.editFrom.schemes[
					index].serviceFeeRate) / 100);
				this.editFrom.schemes[index].serviceFeeRateNum = serviceFeeRateNum;
				let taxRate = Number(this.editFrom.schemes[index].taxRate);
				let totals = Number(this.editFrom.schemes[index].serverTotal) + Number(this.editFrom.schemes[index]
					.serviceFeeRateNum);
				this.editFrom.schemes[index].taxRateNum = (totals * taxRate) / 100;
				this.editFrom.schemes[index].totalFee = total + Number(this.editFrom.schemes[index].taxRateNum) + Number(
					this.editFrom
					.schemes[index].serviceFeeRateNum)
				this.$forceUpdate()
			},
			//计算班组长服务费 方案索引 index 班组索引 inx 工种索引 types_index  当前工种数据val
			handleServiceFee(index, inx, types_index, val){
				// 定位到对应的班组索引循环计算班组长的服务费
				this.editFrom.schemes[index].teams[inx].teamTypes.forEach(item => {
				item.leaderFee = 0
				if(item.workType == 1 ){
				//计件  需要加上自身计件总价(个人工程量*计件单价)*百分比  
				// this.schemes[index].teams[inx].teamTypes[types_index].leaderFee = (this.schemes[index].teams[inx].totalFee + this.schemes[index].teams[inx].unitPrice*val.personalQuantity)*(this.schemes[index].teams[inx].teamTypes[types_index].leaderRate/100)
				item.leaderFee = (this.editFrom.schemes[index].teams[inx].totalFee + this.schemes[index].teams[inx].unitPrice*item.personalQuantity)*((item.leaderRate?item.leaderRate:0)/100)
				}else if(item.workType == 2){
				// 计时 需要加上自身计时总价(每日收入*工作天数)*百分比  
				// this.schemes[index].teams[inx].teamTypes[types_index].leaderFee = (this.schemes[index].teams[inx].totalFee + val.enterDay*val.dailyFee)*(this.schemes[index].teams[inx].teamTypes[types_index].leaderRate/100)
				item.leaderFee = (this.editFrom.schemes[index].teams[inx].totalFee + item.enterDay*item.dailyFee)*((item.leaderRate?item.leaderRate:0)/100)
				} else {
				// 纯管理 班组总费用*带班服务费百分比
				// this.schemes[index].teams[inx].teamTypes[types_index].leaderFee = this.schemes[index].teams[inx].totalFee*(this.schemes[index].teams[inx].teamTypes[types_index].leaderRate/100)
				item.leaderFee = this.editFrom.schemes[index].teams[inx].totalFee*((item.leaderRate?item.leaderRate:0)/100)
				}
						})
				
			},
			// 删除方案
			handleDeleteProject(index) {
				this.schemeList.splice(index, 1);
				if (index > 1) {
					this.scheme -= 1
				} else {
					this.scheme = 0;
				}
			},
			/** 添加方案 */
			handleAddPlan() {
				let len = this.schemeList.length
				if (len == 3) {
					return;
				}
				let param = {
					label: len
				};
				// this.$set(this.schemeList, len, param)
				this.schemeList.push(param);

				let data = { // 方案
					tag: "", // 标签
					description: "", // 简介
					replaceTimes: "", // 换人次数
					totalUnit: "", // 总工程量
					teams: [{ // 班组信息
						name: "", // 班组名称
						workTimeList: [new Date(2016, 9, 10, 8, 0), new Date(2016, 9, 10, 18,
							0)], // 上班/下班 时间数组
						workStartTime: "", // 上班时间
						workEndTime: "", // 下班时间
						workTimelen: 10, // 上班时长
						restTimeList: [new Date(2016, 9, 10, 12, 0), new Date(2016, 9, 10, 13,
							0)], // 午休时间数组
						restStartTime: "", // 午休开始时间
						restEndTime: "", // 午休结束时间
						restTimelen: 1, // 午休时长
						unitPrice: "", // 计件单价
						unit: 1, // 单位
						enterStartTime: "", //进场时间
						enterEndTime: "", // 退场时间
						enterDay: "", // 班组工期
						totalUnit: "", // 班组工程量 
						totalNum: 0, // 总人数
						totalFee: 0, // 班组总费用
						teamTypes: [ // 工种列表
							{
								name: "电工", // 工种名称
								tag: "", // 标签
								workTypeVal: "", // 工种模式名称
								workType: 0, // 工种模式
								enterStartTime: "", // 工种进场时间
								enterEndTime: "", // 工种退场时间
								enterDay: "", //工种工期
								personalQuantity: "", // 个人工程量
								unitPrice: '', //单价 
								number: "", // 人数
								leaderFee: "", // 带班费
								description: "", // 描述
								overtimeFee: "", // 加班费
								dailyFee: "", //  每日收入
								dailyHours: "", // 每日工时
							}
						],
					}],
				};
				this.$set(this.editFrom.schemes, len, data);
			},
			/** 获取工种信息 */
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
				console.log('编辑数据', data);
				this.editFrom = data;
				this.schemeList = data.schemes;
				this.gettypeWorkClass();
				this.getAttendanceClass();
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
							type_item.enterEndTime = this.formatDate(type_item.enterEndTime)
						})
					})
				})

			},
			/** 获取地址 */
			getDetailsAdderss(form) {
				this.editFrom.address = this.form.address ? this.form.address : this.editFrom.address;
				let lng = '';
				let lat = '';
				if (form.addrPoint) {
					lng = form.addrPoint.lng;
					lat = form.addrPoint.lat;
				} else {
					lat = form.lat;
					lng = form.lng;
				}

				this.editFrom.gpsLocation = lng + ',' + lat;
				this.$nextTick(() => {
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
					return Math.ceil(diffValue / day) + 1;
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
			// 上传限制
			beforeAvatarUpload(file) {
				// this.limit = this.limit - this.
				const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
				const isLt2M = file.size / 1024 / 1024 < 10;
				if (!isJPG) {
					this.$message.error('上传头像图片只能是 jpg或者png 格式!');
				}
				if (!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 10MB!');
				}
				return isJPG && isLt2M;
			},

			// 提示用户上传的图片数量
			handleExceed(files, fileList) {
				this.$message.warning(`当前限制选择 4 个文件`);
			},
			// 图片上传中
			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.response.data;
				this.isImges = true;
			},
			// 图片删除
			handleRemoveImg(file, fileList) {
				this.editFrom.images = fileList;
			},
			// 图片上传成功
			handleSuccessImg(response, file, fileList) {
				this.videoFlag = false;
				this.videoUploadPercent = 0;
				this.editFrom.images.push(file.response.data);
			},
			// 提交方案
			async handleAddSerice() {
				this.$confirm('是否提交服务单？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
				let param = this.deepClone(this.editFrom);
				let schemes = param.schemes;
				for (let i = 0; i < schemes.length; i++) {
					for (let j = 0; j < schemes[i].teams.length; j++) {
						
						schemes[i].teams[j].enterEndTime = new Date(schemes[i].teams[j].enterEndTime).getTime();
						schemes[i].teams[j].enterStartTime = new Date(schemes[i].teams[j].enterStartTime).getTime();
						schemes[i].teams[j].restEndTime = new Date(schemes[i].teams[j].restEndTime).getTime();
						schemes[i].teams[j].restStartTime = new Date(schemes[i].teams[j].restStartTime).getTime();
						schemes[i].teams[j].workEndTime = new Date(schemes[i].teams[j].workEndTime).getTime();
						schemes[i].teams[j].workStartTime = new Date(schemes[i].teams[j].workStartTime).getTime();
						for (let k = 0; k < schemes[i].teams[j].teamTypes.length; k++) {
							// schemes[i].teams[j].teamTypes[k].dailyHours = schemes[i].teams[j].workTimelen - schemes[i]
							// 	.teams[j].restTimelen
							schemes[i].teams[j].teamTypes[k].enterStartTime = new Date(schemes[i].teams[j].teamTypes[k]
								.enterStartTime).getTime();
							schemes[i].teams[j].teamTypes[k].enterEndTime = new Date(schemes[i].teams[j].teamTypes[k]
								.enterEndTime).getTime();
						}
					}
				};
				getUpdateOrder(param).then(res=>{
				this.$message.success('修改成功');
				this.isShowEdit = true;
				 })
				}).catch(() => {});
			
			},
			deepClone(obj) {
				let _obj = JSON.stringify(obj),
					objClone = JSON.parse(_obj);
				return objClone
			},

		}
	}
</script>

<style>
	.demand-service.active {
		padding-bottom: 100px;
	}

	.demand-foot-btn-item {
		margin-right: 30px;
	}

	.demand-foot-btn {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 80px;
		background-color: #fff;
		border-top: 1px solid #f1f1f1;
		box-shadow: 20px 20px 30px #888888;
	}

	.demand-service-upload-img {
		width: 148px;
		height: 148px;
		margin-right: 15px;
		border-radius: 6px;
		overflow: hidden;
		position: relative;
	}

	.demand-service-upload-img .demand-service-upload-img-mask {
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.3);
		position: absolute;
		top: 0;
	}

	.demand-service-upload-img .demand-service-upload-img-mask i {
		font-size: 22px;
		color: #fff;
		cursor: pointer;
		margin-right: 12px;
	}
</style>
