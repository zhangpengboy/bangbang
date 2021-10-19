<template>
	<div class="main" v-loading="loading">
		<!-- tab按钮切换 -->
		<el-radio-group v-model="tabPosition" style="margin-bottom: 30px;">
			<el-radio-button label="top">需求单详情</el-radio-button>
			<el-radio-button label="right">报价单</el-radio-button>
		</el-radio-group>
		<!-- tab按钮切换end -->
		<div class="box">
			<!-- 需求详情 -->
			<demanInfo :info="info" v-if="tabPosition == 'top'" />
			<!-- 需求详情end -->
			<template v-else>
				<!-- 编辑服务单  -->
				<editDeman v-if="editFrom.id" ref="editFrom" />
				<!-- 编辑服务单end  -->
				<!-- 服务单 -->
				<div class="demand-service" v-else>
					<div class="box-demand-title">项目信息</div>
					<!-- 项目信息 -->
					<div class="demand-service-info">
						<el-form :model="basicForm" :rules="rules" ref="ruleForm" label-width="100px"
							class="demo-ruleForm">
							<el-form-item label="项目名称" class="demand-service-info-item" prop="title">
								<el-input v-model="basicForm.title" placeholder="请输入项目名称" minlength="2" maxlength="30">
								</el-input>
								<span>已输入{{basicForm.title.length}}/30</span>
							</el-form-item>
							<el-form-item label=" 类型">
								<el-select v-model="basicForm.type" placeholder="选择类型">
									<el-option v-for="item in typeList" :key="item.value" :label="item.label"
										:value="item.value">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="公司名称" class="demand-service-info-item" prop="title">
								<el-input v-model="basicForm.enterpriseName" placeholder="请输入公司名称" minlength="2" maxlength="30">
								</el-input>
								<span>已输入{{basicForm.enterpriseName.length}}/30</span>
							</el-form-item>
							<el-form-item label="联系地址" class="demand-service-info-item" prop="title">
								<el-input v-model="basicForm.enterpriseAddress " placeholder="请输入联系地址">
								</el-input>
							</el-form-item>

							<!-- 	<el-form-item label="项目简称" >
								<el-input v-model="ruleForm.name"></el-input>
							</el-form-item> -->
							<!-- 
							<div class="flex  ">
							<el-form-item label="项目开始时间">
									<el-input :disabled="true" v-model="basicForm.startTime"></el-input>
								</el-form-item>
								<el-form-item class="demand-service-end-item" label="项目竣工时间">
									<el-input :disabled="true" v-model="basicForm.endTime"></el-input>
								</el-form-item>
							</div>
							<el-form-item label="项目工期">
								<el-input :disabled="true" :value="basicForm.duration"></el-input>
							</el-form-item> -->

							<el-form-item label="项目介绍">
								<div class="demand-service-info-item">
									<el-input type="textarea" v-model="basicForm.description" :rows="4"
										placeholder="请输入项目介绍（选填）" maxlength="200"></el-input>
									<span style="top: 60px;">已输入{{basicForm.description.length}}/200</span>
								</div>

								<div class="demand-service-upload flex fvertical">

									<div v-for="(item,index) in basicForm.images" :key="index" class="demand-service-upload-img"
										@mouseover="handleMouseoverImg(item,index)"
										@mouseout="handleMouseoutImg(item,index)">
										<el-image :src="item">
										</el-image>
										<div class="demand-service-upload-img-mask flex fvertical fcenter"
											v-show="current == index">
											<i class="el-icon-zoom-in" @click="handleLookImg(item,index)"></i>
											<i class="el-icon-delete" @click="handleDeteleImg(item,index)"></i>
										</div>
									</div>

									<el-upload class="avatar-uploader flex" v-if="basicForm.images.length < 4"
										action="/api/commons/file/admin/v1/upload/public" :data='{"watermarkSkip":true}' list-type="picture-card"
										name="multipartFile" :on-remove="handleRemoveImg" :on-progress="handleProgress"
										:on-preview="handlePictureCardPreview" :on-error="handleUploadError"
										:on-exceed="handleExceed" :on-success="handleSuccessImg" :limit="4"
										:headers="myHeaders" :show-file-list="false"
										:before-upload="beforeAvatarUpload">
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
								<el-button type="primary" v-if="!allAddress.city" @click="isAddress = true">添加
								</el-button>
								<!-- 详情地址 -->
								<div class="demand-service-address" v-if="allAddress.city">
									<div class="flex fvertical fbetween">
										<p>{{allAddress.address?allAddress.address:allAddress.city}}{{allAddress.title}}
										</p>
										<el-button type="primary" @click="isAddress = true">修改
										</el-button>
									</div>
									<div id="DetailsAddress" style="width:100%;height:300px;margin-top: 20px;"></div>
								</div>
								<!-- 详情地址end -->

							</el-form-item>

							<el-form-item label="打卡范围">
								<el-select v-model="basicForm.scope" placeholder="请选择">
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

							<div class="demand-service-plan-add" v-if="schemeList.length < 3" @click="handleAddPlan">
								<i class="el-icon-plus avatar-uploader-icon"></i>
							</div>
						</div>

						<el-form :model="item" :rules="programmeRules" ref="programmeForm" label-width="100px"
							class="demand-service-plan-box" v-show="scheme==index" v-for="(item,index) in schemes"
							:key="index">
							<!-- 方案标题  -->
							<div class="demand-service-plan-box-title flex fbetween">
								<span class="box-demand-title">方案{{getNumberTurnChinese(index+1)}}：</span>
								<div class="demand-service-plan-box-del " v-if="schemes.length >1"
									@click="handleDeleteProject(index)">
									<i class="el-icon-delete"></i>
									<span>删除方案</span>
								</div>
							</div>
							<!-- 方案标题end  -->

							<!-- 方案基本信息  -->
							<!-- <el-form :model="item" :rules="programmeRules" ref="programmeForm" label-width="100px"> -->

							<div class="flex demand-service-plan-box-item">
								<el-form-item label="方案标签">
									<el-input v-model="item.tag" maxlength="6"></el-input>
								</el-form-item>
								<el-form-item label="简介" prop="description">
									<el-input v-model="item.description" maxlength="16"></el-input>
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
								<el-form-item class="" label="换人次数" prop="replaceTimes">
									<div class="flex">
										<el-input class="f1" v-model="item.replaceTimes"
											oninput="value=value.replace(/^(0+)|[^\d]+/g,'')"></el-input>
										<el-input class="demand-service-plan-box-item-second" :disabled="true"
											value="次"></el-input>
									</div>
								</el-form-item>
								<el-form-item label="方案总工程量">
									<el-input v-model="item.totalUnit" :disabled="true"></el-input>
								</el-form-item>
							</div>

							<!-- </el-form> -->
							<!-- 方案基本信息end  -->

							<div class="demand-service-plan-main" v-for="(teams,inx) in item.teams" :key="inx">

								<!-- 班组信息 -->
								<div class="demand-service-plan-box-info">
									<el-form :model="teams" :rules="teamRules" ref="teamsFrom" label-width="120px">

										<div class="flex demand-service-plan-box-info-data">
											<el-form-item label="班组名称" prop="name">
												<el-input v-model="teams.name"></el-input>
											</el-form-item>
											<el-form-item label="进场时间" prop="enterStartTime">
												<el-input v-model="teams.enterStartTime" :disabled="true"></el-input>

											</el-form-item>
											<el-form-item label="班组工期" prop="enterDay">
												<el-input v-model="teams.enterDay" :disabled="true"></el-input>
											</el-form-item>
										</div>
										<div class="flex  demand-service-plan-box-info-data">
											<el-form-item label="退场时间">
												<el-input v-model="teams.enterEndTime" :disabled="true"></el-input>
											</el-form-item>
											<el-form-item label="班组工程量">
												<div class="flex">
													<el-input class="f1" onkeyup="value=this.value.replace(//D+/g,'')"
														v-model="teams.totalUnit" :disabled="true">
													</el-input>
													<el-select style="width: 120px;margin-left: 10px;"
														v-model="teams.unit" placeholder="请选择">
														<el-option v-for="item in companyList" :key="item.value"
															:label="item.label" :value="item.value">
														</el-option>
													</el-select>
												</div>
											</el-form-item>
											<el-form-item label="计件单价" prop="unitPrice">
												<div class="flex">
													<el-input class="f1" v-model="teams.unitPrice"
														@input="handleTeamsUniprice(index,inx,teams)"></el-input>
													<span>元/{{geUnit(teams.unit)}}</span>
												</div>
											</el-form-item>
										</div>

										<div class="flex  demand-service-plan-box-info-data">
											<el-form-item label="上班时间" prop="workTimeList">
												<el-time-picker is-range v-model="teams.workTimeList"
													range-separator="至" start-placeholder="开始时间" format='HH:mm'
													@change="handleWorkTime(index,inx,teams)" end-placeholder="结束时间"
													placeholder="选择时间范围" :clearable="false">
												</el-time-picker>
											</el-form-item>
											<el-form-item label="午休时间">
												<el-time-picker is-range v-model="teams.restTimeList" format='HH:mm'
													range-separator="至" start-placeholder="开始时间"
													@change="handleRestTime(index,inx,teams)" end-placeholder="结束时间"
													placeholder="选择时间范围" :clearable="false">
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

										<el-form :model="teamTypes" :rules="teamTypesRules" ref="typeRuleForm"
											label-width="110px">
											<!-- 固定基本工种  -->
											<div class="flex fbetween">
												<div class="demand-service-plan-box-list-item-box flex fvertical">
													<div class="plan-box-btn"
														@click="handleDeleteWork(index,inx,types_index,teamTypes)">
														<el-button type="primary" size="mini">删除</el-button>
													</div>
													<el-form-item label="工种">
														<!-- <el-input v-model="ruleForm.name"></el-input> -->
														<el-select v-model="teamTypes.name" filterable
															placeholder="请选择">
															<el-option v-for="item in options" :key="item.labelName"
																:label="item.labelName" :value="item.labelName">
															</el-option>
														</el-select>
													</el-form-item>
												</div>
												<div class="demand-service-plan-box-list-item-box">
													<el-form-item label="工种标签" prop="tag">
														<!-- <el-input v-model="ruleForm.name"></el-input> -->
														<el-select v-model="teamTypes.tag" placeholder="请选择"
															@change="handleTag(index,inx,types_index,teamTypes)">
															<el-option v-for="item in tagList" :key="item.value"
																:label="item.label" :value="item.label">
															</el-option>
														</el-select>
													</el-form-item>
												</div>
												<div class="demand-service-plan-box-list-item-box">
													<el-form-item label="工种模式" prop="workTypeVal">
														<!-- <el-input v-model="ruleForm.name"></el-input> -->
														<el-select v-model="teamTypes.workTypeVal" placeholder="请选择"
															@change="handleTypeModel(index,inx,types_index,teamTypes)">
															<template v-if="teamTypes.tag == '班组长'">
																<el-option v-for="item in patternList" :key="item.value"
																	:label="item.label" :value="item.label">
																</el-option>
															</template>

															<template v-else>
																<template v-for="(item,index) in patternList">
																	<el-option v-if="index != patternList.length -1"
																		:key="item.value" :label="item.label"
																		:value="item.label">
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
													<el-form-item label="工种进场时间" prop="enterStartTime">
														<!-- <el-input v-model="ruleForm.name"></el-input> -->
														<el-date-picker v-model="teamTypes.enterStartTime"
															value-format="yyyy-MM-dd "
															@change="handleStartTime(index,inx,types_index,teamTypes)"
															:clearable="false" type="date" placeholder="请设置进场时间">
														</el-date-picker>
													</el-form-item>
												</div>
												<div class="demand-service-plan-box-list-item-box">
													<el-form-item label="工种工期" prop="enterDay">
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
														<el-input :value="formatDate(teamTypes.enterEndTime)"
															:disabled="true">
														</el-input>

													</el-form-item>
												</div>
											</div>
											<!-- 固定基本工种end  -->

											<!-- 管理  -->
											<div class="demand-service-plan-box-list-item-type flex"
												v-if="teamTypes.tag == '班组长'  && teamTypes.workTypeVal == '管理'">
												<!-- <div class="plan-box-btn"></div> -->
												<el-form-item label="每日工时">
													<div class="flex">
														<el-input style="width: 200px;" :value="teams.dailyHours"
															:disabled="true">
														</el-input>
														<span style="padding-left: 20px;">小时</span>
													</div>
												</el-form-item>
												<el-form-item label="人数" prop="number">
													<div class="flex">
														<el-input style="width: 200px;" v-model="teamTypes.number"
															@input="handleQuantity(index,inx,types_index,teamTypes)">
														</el-input>
														<span style="padding-left: 20px;">人</span>
													</div>
												</el-form-item>
												
												<el-form-item label="带班服务费" prop="leaderFee">
													<div class="flex">
														<el-input @input="handleServiceFee(index,inx,types_index,teamTypes)" style="width: 80px;"  min="0" max="100"  type="number"  v-model="teamTypes.leaderRate">
														</el-input>
														<span style="padding:0 10px;">%</span>
														<el-input v-model="teamTypes.leaderFee" style="width: 100px;" class="demand-service-plan-box-item-second" :disabled="true"
														></el-input>元
													</div>
												</el-form-item>
											</div>
											<!-- 管理end  -->

											<!-- 普通工种  -->
											<div class="demand-service-plan-box-list-item-type flex"
												v-if="teamTypes.tag != '班组长'  && teamTypes.workTypeVal == '计件'">
												<!-- <div class="plan-box-btn"></div> -->
												<el-form-item label="个人工程量" prop="personalQuantity">
													<div class="flex">
														<el-input style="width: 200px;"
															v-model="teamTypes.personalQuantity"
															@input="handleQuantity(index,inx,types_index,teamTypes)">
														</el-input>
														<span style="padding-left: 20px;">{{geUnit(teams.unit)}}</span>
													</div>
												</el-form-item>
												<el-form-item label="计件单价" prop="unitPrice">
													<div class="flex">
														<el-input :disabled="true" style="width: 200px;"
															v-model="teams.unitPrice"></el-input>
														<span
															style="padding-left: 20px;">元/{{geUnit(teams.unit)}}</span>
													</div>
												</el-form-item>
												<el-form-item label="人数" prop="number">
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
												v-if="teamTypes.tag == '班组长' && teamTypes.workTypeVal == '计件'  ">
												<el-form-item label="个人工程量" prop="personalQuantity">
													<div class="flex">
														<el-input style="width: 150px;"
															v-model="teamTypes.personalQuantity"
															@input="handleQuantity(index,inx,types_index,teamTypes)">
														</el-input>
														<span style="padding-left: 20px;">{{geUnit(teams.unit)}}</span>
													</div>
												</el-form-item>
												<el-form-item label="计件单价" prop="unitPrice">
													<div class="flex">
														<el-input :disabled="true" style="width: 150px;"
															v-model="teams.unitPrice"></el-input>
														<span
															style="padding-left: 20px;">元/{{geUnit(teams.unit)}}</span>
													</div>
												</el-form-item>
												<el-form-item label="人数" prop="number">
													<div class="flex">
														<el-input style="width: 150px;" v-model="teamTypes.number"
															@input="handleQuantity(index,inx,types_index,teamTypes)">
														</el-input>
														<span style="padding-left: 20px;">人</span>
													</div>
												</el-form-item>
												<el-form-item label="带班服务费" prop="leaderFee">
													<div class="flex">
														<el-input @input="handleServiceFee(index,inx,types_index,teamTypes)" style="width: 80px;"  min="0" max="100"  type="number" v-model="teamTypes.leaderRate">
														</el-input>
														<span style="padding:0 10px;">%</span>
														<el-input v-model="teamTypes.leaderFee" style="width: 100px;" class="demand-service-plan-box-item-second" :disabled="true"
														></el-input>元
													</div>
												</el-form-item>
											</div>
											<!-- 计件/班组长end -->


											<!-- 普通工种  -->
											<div class="demand-service-plan-box-list-item-type flex"
												v-if="teamTypes.workTypeVal == '计时'">
												<!-- <div class="plan-box-btn"></div> -->
												<el-form-item label="每日工时">
													<div class="flex">
														<el-input style="width: 200px;" :value="teams.dailyHours"
															:disabled="true">
														</el-input>
														<span style="padding-left: 20px;">小时</span>
													</div>
												</el-form-item>
												<el-form-item label="工时单价" prop="unitPrice">
													<div class="flex">
														<el-input style="width: 200px;" v-model="teamTypes.unitPrice"
															oninput="value=value.match(/^\d+(?:\.\d{0,2})?/)"
															@input="handleUnitPrice(index,inx,types_index,teamTypes)">
														</el-input>
														<span style="padding-left: 20px;">元/小时</span>
													</div>
												</el-form-item>
												<el-form-item label="每日收入">
													<div class="flex">
														<el-input style="width: 220px;" :disabled="true"
															v-model="teamTypes.dailyFee"></el-input>
														<!-- <span style="padding-left: 20px;">人</span> -->
													</div>
												</el-form-item>
												<el-form-item label="人数" prop="number">
													<div class="flex">
														<el-input style="width: 200px;" v-model="teamTypes.number"
															@input="handleQuantity(index,inx,types_index,teamTypes)">
														</el-input>
														<span style="padding-left: 20px;">人</span>
													</div>
												</el-form-item>
												<el-form-item label="加班费" prop="overtimeFee">
													<div class="flex">
														<el-input style="width: 200px;" v-model="teamTypes.overtimeFee"
															oninput="value=value.match(/^\d+(?:\.\d{0,2})?/)">
														</el-input>
														<span style="padding-left: 20px;">元/小时</span>
													</div>
												</el-form-item>
												<el-form-item label="带班服务费" prop="leaderFee"
													v-if="teamTypes.tag == '班组长'">
													<div class="flex">
														<el-input @input="handleServiceFee(index,inx,types_index,teamTypes)" style="width: 80px;"  min="0" max="100"  type="number" v-model="teamTypes.leaderRate">
														</el-input>
														<span style="padding:0 10px;">%</span>
														<el-input style="width: 100px;" class="demand-service-plan-box-item-second" :disabled="true"
														:value="teamTypes.leaderFee "></el-input>元
													</div>
												</el-form-item>
											</div>
											<!-- 普通工种end  -->


											<!--  工作描述 -->
											<div class="demand-service-plan-box-list-item-text">
												<el-form-item label="工作描述" prop="description">
													<el-input type="textarea" placeholder="请输入"
														:autosize="{ minRows: 2, maxRows: 4}"
														v-model="teamTypes.description">
													</el-input>
												</el-form-item>
											</div>
											<!--  工作描述end -->

										</el-form>
									</div>

									<div class="demand-service-plan-box-list-btn flex fvertical fcenter">
										<div class="demand-service-plan-box-list-btn-add"
											@click="handleAddWork(index,inx)">
											添加工种</div>
										<div class="demand-service-plan-box-list-btn-del"
											@click="hanldeRemoveGroup(index,inx)">删除班组</div>
									</div>
								</div>
								<!-- 工种列表数据end -->

							</div>

							<div class="demand-service-plan-add-main flex fcenter" @click="handleAddGroup(index)">添加班组
							</div>


							<!-- 总费用 -->
							<div class="demand-service-plan-box-foot flex fcenter ">
								<el-form-item class="demand-service-plan-box-foot-item flex fvertical" label="施工服务费">
									<!-- <span> 施工服务费</span> -->
									<el-input class="f1" :value="item.serverTotal" :disabled="true"></el-input>
								</el-form-item>
								<el-form-item class="demand-service-plan-box-foot-item flex fvertical" label="信息服务费"
									prop="serviceFeeRate">
									<!-- <span>信息服务费</span> -->
									<div class="flex">
										<el-input class="f1 demand-service-plan-box-foot-item-server"
											@input="handleInputToals(index,item)" v-model="item.serviceFeeRate"
											placeholder="请输入信息服务费比例">
										</el-input>
										<el-input value="%" :disabled="true"
											class="f1 demand-service-plan-box-foot-item-company"></el-input>
										<!-- <span class="f1">{{item.serviceFeeRateNum}}元</span> -->
										<div class="flex fvertical">
											<el-input :value="item.serviceFeeRateNum" :disabled="true"
												class="f1 demand-service-plan-box-foot-item-company">
											</el-input>
											<span style="padding-left: 10px;">元</span>
										</div>
									</div>
								</el-form-item>
								<el-form-item class="demand-service-plan-box-foot-item flex fvertical" label="税费"
									prop="taxRate">
									<!-- <span>税费</span> -->
									<div class="flex">
										<el-input class="f1" v-model="item.taxRate"
											@input="handleInputToals(index,item)" placeholder="请输入信息服务费比例"></el-input>
										<el-input value="%" :disabled="true"
											class="f1 demand-service-plan-box-foot-item-company"></el-input>
										<el-input :value="item.taxRateNum" :disabled="true"
											class="f1 demand-service-plan-box-foot-item-company"></el-input>
									</div>
								</el-form-item>
								<el-form-item class="demand-service-plan-box-foot-item flex fvertical" label="总费用">
									<!-- <span>总费用</span> -->
									<el-input class="f1" v-model="item.totalFee" :disabled="true" placeholder="元">
									</el-input>
								</el-form-item>
							</div>
							<!-- 总费用end -->
						</el-form>
						<!-- 方案信息end -->
						<!-- <div class="demand-service-plan-box-foot-server-order flex fvertical fcenter "
							@click="handleAddSerice">提交服务单</div> -->
					<div class="demand-foot-btn flex fright fvertical" >
					<el-button class="demand-foot-btn-item" type="primary" @click="handleAddSerice">提交服务单</el-button>
					</div>
					</div>
				</div>
				<!-- 服务单end -->
			</template>

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

	</div>
</template>

<script>
	// import loadBMap from '@/src/utils/loadBMap.js'
	import loadBMap from '../../../utils/loadBMap.js'
	import editDeman from '../components/edit-demand.vue'
	import demanInfo from '../components/demand-info.vue'
	import uuid from 'node-uuid'
	import {
		AddOrder,
		getBriefDetail,
		getOrderDetail,
		gettypeWorkAllClass,
		getAttendanceClass
	} from '../../../api/user.js'
	import moment from 'moment'
	export default {
		data() {
			return {
				myHeaders: {
					requestId: uuid.v4().replaceAll('-', '')
				},
				typeList: [{
					value: 1,
					label: "工人推荐"
				}, {
					value: 2,
					label: "劳务分包"
				}], // 类型列表
				info: {},
				loading: false, // 是否显示正在加载
				briefId: 0,
				dialogImageUrl: "",
				isImges: false, // 是否显示大图
				isAddress: false, //显示添加地址
				current: null,
				videoFlag: false, // 是否显示进度条
				videoUploadPercent: 0, // 进度条百分比
				schemeList: [{
					name: "方案一",
					label: '0'
				}], // 方案列表
				scheme: 0,
				tabPosition: 'top',
				ruleForm: {},
				teamTypesRules: {
					tag: [{
						required: true,
						message: '请选择工种标签',
						trigger: 'change'
					}],
					workTypeVal: [{
						required: true,
						message: '请选择工种模式',
						trigger: 'change'
					}],
					number: [{
						required: true,
						message: '请输入入人数',
						trigger: 'blur'
					}],
					leaderFee: [{
						required: true,
						message: '请输入带班服务费',
						trigger: 'blur'
					}],
					enterStartTime: [{
						required: true,
						message: '请选择工种进场时间',
						trigger: 'change'
					}],
					enterDay: [{
						required: true,
						message: '请输入工种工期',
						trigger: 'blur'
					}],
					description: [{
						required: true,
						message: '请输入工作描述',
						trigger: 'blur'
					}],
					// unitPrice:[{
					// 	required: true,
					// 	message: '请输入工时单价',
					// 	trigger: 'blur'
					// }],
					overtimeFee: [{
						required: true,
						message: '请输入加班费',
						trigger: 'blur'
					}],
					personalQuantity: [{
						required: true,
						message: '请输入个人工程量',
						trigger: 'blur'
					}]
				},
				teamRules: {
					name: [{
						required: true,
						message: '请输入班组名称',
						trigger: 'blur'
					}],
					unitPrice: [{
						required: true,
						message: '请输入计件单价',
						trigger: 'blur'
					}],
					workTimeList: [{
						required: true,
						message: '请选择上班时间',
						trigger: 'change'
					}],

				},
				programmeRules: { // 方案
					tag: [{
						required: true,
						message: '请输入方案标签',
						trigger: 'blur'
					}, {
						min: 2,
						max: 6,
						message: '长度在 2 到 6 个字符',
						trigger: 'blur'
					}],
					description: [{
						required: true,
						message: '请输入简介',
						trigger: 'blur'
					}, {
						min: 4,
						max: 16,
						message: '长度在 4 到 16 个字符',
						trigger: 'blur'
					}],
					replaceTimes: [{
						required: true,
						message: '请输入换人次数',
						trigger: 'blur'
					}],
					serviceFeeRate: [{
						required: true,
						message: '请输入信息服务费',
						trigger: 'blur'
					}],
					taxRate: [{
						required: true,
						message: '请输入税费',
						trigger: 'blur'
					}]

				},
				rules: {
					title: [{
							required: true,
							message: '请输入项目名称',
							trigger: 'blur'
						},
						{
							min: 2,
							max: 30,
							message: '长度在 2 到 30 个字符',
							trigger: 'blur'
						}
					],
				},
				scopeList: [], // 距离列表
				distance: "", // 距离
				imageUrl: "", //上传图片
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
				company: "", // 选中工程量
				options: [],
				value: "",
				form: {
					address: '', //详细地址
					addrPoint: { //详细地址经纬度
						lng: 0,
						lat: 0
					}
				},
				map: '', //地图实例
				mk: '', //Marker实例
				allAddress: {},
				value1: "",
				addressMap: "",
				addressMk: "",

				basicForm: {
					title: "", // 项目名称
					startTime: "", // 项目开始时间
					endTime: "", // 项目结束时间
					duration: "", // 项目工期
					description: "", // 项目介绍
					scope: "100", // 打卡范围
					images: [], // 图片地址
					enterpriseName:"", //公司名称
					enterpriseAddress:"",//公司联系地址
					type: null,
				},
				schemes: [{ // 方案
					tag: "", // 标签
					description: "", // 简介
					replaceTimes: "", // 换人次数
					totalUnit: "", // 总工程量
					enterStartTime: "", //方案进场时间
					enterEndTime: "", // 方案退场时间
					enterDay: "", // 方案工期
					serviceFeeRate: "", // 信息服务率
					serviceFeeRateNum: "", //  信息服务费
					taxRate: "", // 税率
					taxRateNum: "", // 税费
					serverTotal: "", // 施工服务费
					totalFee: "", // 总费用
					totalNum: 0, // 总人数
					teams: [{ // 班组信息
						name: "", // 班组名称
						workTimeList: [this.getYear(), this.getYear(64800000)], // 上班/下班 时间数组
						workStartTime: this.formatDateTime(this.getYear()), // 上班时间
						workEndTime: this.formatDateTime(this.getYear(64800000)), // 下班时间
						dailyHours: 9, // 上班时长
						restTimeList: [this.getYear(43200000), this.getYear(46800000)], // 午休时间数组
						restStartTime: this.formatDateTime(this.getYear(43200000)), // 午休开始时间
						restEndTime: this.formatDateTime(this.getYear(46800000)), // 午休结束时间
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
								name: "", // 工种名称
								tag: "", // 标签
								workTypeVal: "", // 工种模式
								enterStartTime: "", // 工种进场时间
								enterEndTime: "", // 工种退场时间
								enterDay: "", //工种工期
								personalQuantity: "", // 个人工程量
								unitPrice: '', //单价 
								number: "", // 人数
								leaderFee: "", // 带班费
								leaderRate:'',// 带班费%
								description: "", // 描述
								overtimeFee: "", // 加班费
								dailyFee: "", //  每日收入
								dailyHours: "", // 每日工时
							}
						],
					}],
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
				editFrom: {},


			}
		},
		components: {
			editDeman,
			demanInfo
		},
		watch: {
			isAddress(val) {
				if (val) {
					this.form = {};
					this.$nextTick(() => {
						this.initMap()
					})
				}
			},
			tabPosition(val) {
				console.log(val)
				if (val == 'right') {
					if (this.info.orderId > 0) {
						this.$nextTick(() => {
							this.$refs.editFrom.getDataInfo(this.editFrom);
						})
					}

				}
			}
		},

		async mounted() {
			let id = this.$route.query.id;
			this.gettypeWorkClass();
			this.getAttendanceClass();
			this.briefId = id;
			this.getBriefDetail(id)
			let res = await loadBMap('oMC0LUxpTjA22qOBPc2PmfKADwHeXhin');
			console.log(this.getYear())
		},
		methods: {
			/** 获取时间日期时钟 */
			getYear(clock = 28800000) {
				var date = new Date();
				var year1 = date.getFullYear();
				var firstMonth = year1 + '-' + '01' + '-' + '01' + ' 00:00:00';
				let day = new Date(firstMonth).getTime() + clock;
				return this.formatDateTime(new Date(day))
			},
			// 删除图片
			handleDeteleImg(item, index) {
				this.basicForm.images.splice(index, 1)
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
			// 打卡范围
			async getAttendanceClass() {
				let param = {
					pageSize: 9999,
					pageNum: 1,
				}
				let res = await getAttendanceClass(param);
				this.scopeList = res.data.list;
				this.basicForm.scope = res.data.list[0].radius
			},
			/** 获取工种列表 */
			async gettypeWorkClass() {
				let param = {};
				param.pageSize = 10000;
				param.pageNum = 1;
				param.type = 0;
				let res = await gettypeWorkAllClass(param);
				this.options = res.data;
				if (this.options.length > 0) {
					this.schemes.forEach(item => {
						item.teams.forEach(data => {
							data.teamTypes.forEach(team_type => {
								team_type.name = this.options[0].labelName
							})
						})
					})
				}
			},
			formatDateTime(value) {
				return value ? moment(value).format('YYYY-MM-DD HH:mm:ss') : '';
			},
			formatDate(value) {
				return value ? moment(value).format('YYYY-MM-DD') : '';
			},
			// 查看服务单详情
			async getOrderDetail(id) {
				try {
					let res = await getOrderDetail(id);
					this.editFrom = res.data;
					if (this.tabPosition == 'right') {
						if (this.info.orderId > 0) {
							this.$nextTick(() => {
								this.$refs.editFrom.getDataInfo(this.editFrom)
							})
						}
					}

				} catch (e) {
					console.log(e)
					//TODO handle the exception
				}

			},
			// 查看需求单详情
			async getBriefDetail(id) {
				this.loading = true;
				try {
					let res = await getBriefDetail(id);
					this.loading = false;
					this.info = res.data;
					this.basicForm.type = res.data.type
					if (res.data.orderId > 0) {
						this.getOrderDetail(res.data.orderId);
					}
				} catch (e) {
					this.loading = false;
					//TODO handle the exception
				}
			},
			// 切换方案
			handleRadio(item, index) {
				this.scheme = index;
			},
			// 删除方案
			handleDeleteProject(index) {
				this.schemes.splice(index, 1);
				this.schemeList.splice(index, 1);
				if (index > 1) {
					this.scheme -= 1
				} else {
					this.scheme = 0;
				}
			},
			// 删除单个工种
			handleDeleteWork(index, inx, type_index, val) {
				this.$confirm('是否删除当前工种信息？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.schemes[index].teams[inx].teamTypes.splice(type_index, 1)
					this.handleQuantity(index, inx, type_index, val)
				}).catch(() => {});
			},
			// 工种模式
			handleTypeModel(index, inx, type_index, val) {
				let newWork = this.patternList.filter(item => item.label == val.workTypeVal)
				val.workType = newWork[0].value
				val.personalQuantity = '';
				val.number = '';
				val.unitPrice = '';
				val.overtimeFee = '';
				val.dailyFee = '';
				this.handleQuantity(index, inx, type_index, val)

			},
			// 计算工时单价
			handleUnitPrice(index, inx, type_index, val) {
				val.unitPrice = val.unitPrice.replace(/^\.+|[^\d.]/g, '')
				let dailyFee = ((this.schemes[index].teams[inx].dailyHours) *
					val.unitPrice).toFixed(2)
				val.dailyFee = dailyFee;
				this.getGroupTotal({
					index,
					inx,
					type_index,
					val
				});
			},
			//  方案输入单价
			handleTeamsUniprice(index, inx, val) {
				val.unitPrice = val.unitPrice.replace(/[^0-9.]/g, '');
				this.getGroupTotal({
					index,
					inx,
					val
				})
			},
			// 计算班组的总数
			getGroupTotal(data) {
				let teamTypes = this.schemes[data.index].teams[data.inx].teamTypes;
				console.log('计算班组的总数::',teamTypes)
				let total = 0;
				let totalNumber = 0;
				for (let i = 0; i < teamTypes.length; i++) {
					if (teamTypes[i].workTypeVal == '计时' && teamTypes[i].dailyFee && teamTypes[i].enterDay && teamTypes[i]
						.number) {
						total += teamTypes[i].dailyFee * teamTypes[i].enterDay * teamTypes[i].number;
						// if (teamTypes[i].tag == '班组长') {
							// total += teamTypes[i].enterDay * teamTypes[i].leaderFee * teamTypes[i].number;
							// total += teamTypes[i].leaderFee?teamTypes[i].leaderFee:0
						// }
					}
					if (teamTypes[i].workTypeVal == '计件') {
						total += teamTypes[i].number * teamTypes[i].personalQuantity * this.schemes[data.index].teams[data
							.inx].unitPrice
						// if (teamTypes[i].tag == '班组长') {
							// total += teamTypes[i].enterDay * teamTypes[i].leaderFee * teamTypes[i].number;
							// total += teamTypes[i].leaderFee?teamTypes[i].leaderFee:0
						// }
					}

					if (teamTypes[i].workTypeVal == '管理') {
						// total += teamTypes[i].enterDay * teamTypes[i].leaderFee * teamTypes[i].number;
						// total += teamTypes[i].leaderFee?teamTypes[i].leaderFee:0
					}
					totalNumber += Number(teamTypes[i].number);
				}
				// 班组总人数
				this.schemes[data.index].teams[data.inx].totalNum = totalNumber;
				console.log('班组总人数',this.schemes[data.index].teams[data.inx].totalNum)
				// 班组总费用
				this.schemes[data.index].teams[data.inx].totalFee = total;
				console.log('班组总费用',this.schemes[data.index].teams[data.inx].totalFee)
				// 计算班组中的班组长服务费
				this.handleServiceFee(data.index,data.inx,data.type_index,data.val)
				// 计算方案总费用
				this.getTotal(data.index);
			},
			// 计算总费用
			handleInputToals(index, val) {
				val.taxRate = val.taxRate.replace(/[^0-9.]/g, '');
				val.serviceFeeRate = val.serviceFeeRate.replace(/[^0-9.]/g, '');
				this.getTotal(index)
			},
			// 计算总的社工服务费
			getTotal(index) {
				let teams = this.schemes[index].teams;
				let total = 0;
				teams.forEach((item, inx) => {
					// console.log(item.teamTypes)
					item.teamTypes.forEach((data, inxx) => {
						if (data.workTypeVal == '计时' && data.dailyFee && data.enterDay && data
							.number) {
							total += data.dailyFee * data.enterDay * data.number;
							if (data.tag == '班组长') {
								// total += data.enterDay * data.leaderFee * data.number;
								// total += data.leaderFee?data.leaderFee:0
							}
						}
						if (data.workTypeVal == '计件') {
							total += data.number * data.personalQuantity * item.unitPrice
							if (data.tag == '班组长') {
								// total += data.enterDay * data.leaderFee * data.number;
								// total += data.leaderFee?data.leaderFee:0
							}
						}
						if (data.workTypeVal == '管理') {
							// total += data.enterDay * data.leaderFee * data.number;
							// total += data.leaderFee?data.leaderFee:0
						}
					})
				})
				// 施工服务费
				this.schemes[index].serverTotal = total;
				//信息服务费
				this.schemes[index].serviceFeeRateNum = ((Number(this.schemes[index].serverTotal) * Number(this
					.schemes[index].serviceFeeRate) / 100));
				//税费百分比
				let taxRate = Number(this.schemes[index].taxRate);
				//施工服务费+信息服务费
				let totals = Number(this.schemes[index].serverTotal) + Number(this.schemes[index]
					.serviceFeeRateNum);
				// 税费 
				this.schemes[index].taxRateNum = (totals * (taxRate/ 100)) ;
				//总费用
				this.schemes[index].totalFee = (total + Number(this.schemes[index].taxRateNum) + Number(this
					.schemes[index].serviceFeeRateNum))

			},
			// 删除组
			hanldeRemoveGroup(index, inx) {
				this.$confirm('是否班组删除信息', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.schemes[index].teams.splice(inx, 1);
					this.getTotal(index);
				})

			},
			// 添加组
			handleAddGroup(index) {
				// console.log(index);
				let param = {
					name: "", // 班组名称
					workTimeList: [this.getYear(), this.getYear(64800000)], // 上班/下班 时间数组, 
					workStartTime: "", // 上班时间
					workEndTime: "", // 下班时间
					dailyHours: 9, // 上班时长
					restTimeList: [this.getYear(43200000), this.getYear(46800000)], // 午休时间数组
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
							leaderRate:'',// 带班费%
							description: "", // 描述
							overtimeFee: "", // 加班费
							dailyFee: "", //  每日收入
							dailyHours: "", // 每日工时
						}
					]
				}
				this.schemes[index].teams.push(param)
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
					dailyHours: "", // 每日工时
				}
				this.schemes[index].teams[inx].teamTypes.push(param)
			},
			// 午休时间
			handleRestTime(index, inx, val) {
				if (!val.restTimeList || val.restTimeList.length == 0) {
					val.restTimelen = 0;
					this.handleWorkTime(index, inx, val);
					return;
				};
				this.handleWorkTime(index, inx, val);
			
			},
			//  上班时间
			handleWorkTime(index, inx, val) {
				console.log('上班时间66：：', val);
				this.getDayLen(index, inx, val);
				for(let i = 0 ; i < val.teamTypes.length;i++){
					if(val.dailyHours && val.teamTypes[i].unitPrice){
						val.teamTypes[i].dailyFee = val.dailyHours * val.teamTypes[i].unitPrice;  
					}
				}
				this.getGroupTotal({
					index,
					inx
				})
			},
			// 计算每日上班时长
			getDayLen(index, inx, val) {
				//  上班时间
				this.schemes[index].teams[inx].workStartTime = this.formatDateTime(val.workTimeList[0]);
				this.schemes[index].teams[inx].workEndTime = this.formatDateTime(val.workTimeList[1]);
				let stratWorkTime = Date.parse(val.workTimeList[0]);
				let endWorkTime = Date.parse(val.workTimeList[1]);
				// 午休时间
				if (val.restTimeList) {
					val.restStartTime = this.formatDateTime(val.restTimeList[0]);
					val.restEndTime = this.formatDateTime(val.restTimeList[1]);
					this.schemes[index].teams[inx].restTimelen = this.timeFn(val.restStartTime, val.restEndTime);
					let endStartTime = this.getMinute(stratWorkTime, endWorkTime) - this.getMinute(val.restStartTime, val
						.restEndTime);
					let {
						minutes,
						seconds
					} = this.getFormatSecond(endStartTime);
					val.dailyHours = Number(minutes + '.' + seconds).toFixed(2);
				} else {
					val.restStartTime = 0;
					val.restEndTime = 0;
					this.schemes[index].teams[inx].dailyHours = this.timeFn(stratWorkTime, endWorkTime);
				}
			

			},


			// 计算工时单价
			getCalculationUnitPrice(timeLen, list) {
				for (let i = 0; i < list.length; i++) {
					list[i].dailyFee = list[i].unitPrice * timeLen
				}
			},
			/** 
			 * 计算器 - 时分秒
			 * @param {Number} second 分钟
			 * */
			getFormatSecond(second) {
				const minutes = Math.floor(((second % 86400) % 3600) / 60);
				const seconds = Math.floor(((second % 86400) % 3600) % 60);
				const forMatDate = {
					minutes: minutes,
					seconds: seconds > 10 ? seconds : '0' + seconds
				};
				return forMatDate;
			},
			/** 计算-相差多少分钟 */
			getMinute(day1, day2) {
				var day_day1 = new Date(day1);
				var day_day2 = new Date(day2);
				let disparity = day_day2.getTime() - day_day1.getTime();
				// 转为分钟数的时候，可能会出现精度丢失;你需要注意下
				return Math.round(disparity / 1000 / 60);
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
			// 获取当前工种标签
			handleTag(index, inx, types_index, val) {
				console.log('获取当前工种标签：：：', val)
				if (val.tag == '班组长') {
					val.workTypeVal = '';
				}
				if (val.tag != '班组长' && val.workType == 3) {
					val.workTypeVal = '';
				}

				// this.$refs.typeRuleForm.clearValidate();
				this.handleQuantity(index, inx, types_index, val)
			},
			// 获取工程量单位
			geUnit(val) {
				if (val) {
					let res = this.companyList.filter(item => item.value == val)
					return res[0].label
				}
			},
			// 时间比较
			bjDate(date, date1) {
				var newDate = new Date(date);
				var newDate1 = new Date(date1);
				if (date.getTime() - date1.getTime() < 0) {
					return date1;
				} else {
					return date;
				}
			},
			// 计算工期最长退场时间
			getExitLenTime(arr) {
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
					console.log('getDateDiff::', diffValue, day);
					return Math.ceil(diffValue / day);
				}
				return 0
			},

			/** 工种进场时间 */
			handleStartTime(index, inx, types_index, val) {
				let teamTypes = this.schemes[index].teams[inx].teamTypes;
				let num = val.enterDay;
				console.log('this.schemes[index].teams[inx]', this.schemes[index].teams[inx]);
				// let enterStartTime = 
				if (val.enterStartTime && num >= 1) {
					let date = this.dateChange((num - 1), val.enterStartTime);
					val.enterEndTime = date;
					this.schemes[index].teams[inx].enterEndTime = this.getExitLenTime(teamTypes);
					this.schemes[index].teams[inx].enterDay = this.getDateDiff(val.enterStartTime, val.enterEndTime);
				} else {
					this.schemes[index].teams[inx].enterEndTime = "";
					this.schemes[index].teams[inx].enterDay = 0
					val.enterEndTime = "";
				}
				this.schemes[index].teams[inx].enterStartTime = this.getComeTime(teamTypes)
				//计算方案开始时间以及方案工期
			 	this.schemes[index].enterStartTime = this.getComeTime(this.schemes[index].teams)
			},
			// 计算班组工程量
			handleQuantity(index, inx, types_index, val) {
				val.number = val.number.replace(/^(0+)|[^\d]+/g, '')
				val.personalQuantity = val.personalQuantity.replace(/^(0+)|[^\d]+/g, '')
				let teamTypes = this.schemes[index].teams[inx].teamTypes;
				let total = 0;
				let allToal = 0;
				for (let i = 0; i < teamTypes.length; i++) {
					if (teamTypes[i].workTypeVal == '计件' && teamTypes[i].number > 0 && teamTypes[i].personalQuantity > 0) {
						total += Number(teamTypes[i].number) * Number(teamTypes[i].personalQuantity)
					}
				}
				this.schemes[index].teams[inx].totalUnit = total;
				for (let i = 0; i < this.schemes[index].teams.length; i++) {
					allToal += this.schemes[index].teams[i].totalUnit;
				}
				this.schemes[index].totalUnit = allToal;
				this.getGroupTotal({
					index,
					inx,
					types_index,
					val
				})
			},
			//计算班组长服务费 方案索引 index 班组索引 inx 工种索引 types_index  当前工种数据val
			handleServiceFee(index, inx, types_index, val){
				// 定位到对应的班组索引循环计算班组长的服务费
				this.schemes[index].teams[inx].teamTypes.forEach(item => {
				item.leaderFee = 0
				item.leaderFee = this.schemes[index].teams[inx].totalFee*((item.leaderRate?item.leaderRate:0)/100)
				})
				
			},
			/** 当用户工种工期输入时 */
			handleDuration(index, inx, types_index, val) {
				let teamTypes = this.schemes[index].teams[inx].teamTypes
				val.enterDay = val.enterDay.replace(/^(0+)|[^\d]+/g, '')
				let num = val.enterDay;
				if (val.enterStartTime && num >= 1) {
					let date = this.dateChange((num - 1), val.enterStartTime);
					val.enterEndTime = date;
					this.schemes[index].teams[inx].enterStartTime = this.getComeTime(teamTypes);
					this.schemes[index].teams[inx].enterEndTime = this.getExitLenTime(teamTypes);
					this.schemes[index].teams[inx].enterDay = this.getDateDiff(this.schemes[index].teams[inx]
						.enterStartTime, this.schemes[index].teams[inx]
						.enterEndTime);
				} else {
					this.schemes[index].teams[inx].enterEndTime = "";
					this.schemes[index].teams[inx].enterDay = 0;
					val.enterEndTime = "";
				}
				this.getGroupTotal({
					index,
					inx,
					types_index,
					val
				});
				// 计算方案结束时间以及方案总工期
				this.schemes[index].enterEndTime = this.getExitLenTime(this.schemes[index].teams);
				this.schemes[index].enterDay = this.getDateDiff(this.schemes[index].enterStartTime,this.schemes[index].enterEndTime)
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
			/** 校验方案信息 */
			getProgrammeForm(len) {
				let programeList = []
				for (let i = 0; i < len; i++) {
					this.$refs.programmeForm[i].validate((vailds) => {
						programeList[i] = vailds;
					})
				}
				return programeList;
			},
			/** 校验工种信息 */
			getTypeRuleForm(len) {
				let typeList = [];
				for (let i = 0; i < len; i++) {
					this.$refs.typeRuleForm[i].validate((vailds) => {
						typeList[i] = vailds;
					})
				}
				return typeList;
			},
			/** 校验班组信息 */
			getTeamsFrom(len) {
				let list = [];
				for (let i = 0; i < len; i++) {
					this.$refs.teamsFrom[i].validate((vailds) => {
						list[i] = vailds;
					})
				}
				return list;

			},
			/** 提交服务单 */
			handleAddSerice() {
				this.$confirm('是否提交服务单？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
				if (!this.allAddress.point) {
					return this.$message.error('请选择项目地址');
				}
				let programeLen = this.$refs.programmeForm.length;
				let typeLen = this.$refs.typeRuleForm.length;
				let teamLen = this.$refs.teamsFrom.length;
				let programeList = [];
				let typeList = [];
				let teamList = [];

				this.$refs.ruleForm.validate((vaild) => {
					if (vaild) {
						programeList = this.getProgrammeForm(programeLen);
					} else {
						this.$message.error('请完善方案信息')
					}
				})

				// 判断方案信息
				let isPrograme = true;
				for (let i = 0; i < programeList.length; i++) {
					if (!programeList[i]) {
						isPrograme = programeList[i];
						return this.$message.error('请完善方案信息')
					}
				}


				// 判断班组信息
				let isTeam = true;
				if (programeList.length > 0 && isPrograme) {
					teamList = this.getTeamsFrom(teamLen)
					if (teamList.length > 0) {
						for (let i = 0; i < teamList.length; i++) {
							if (!teamList[i]) {
								isTeam = teamList[i]
							}
						}
					} else {
						return this.$message.error('请完善方案信息');
					}

				} else {
					return this.$message.error('请完善方案信息');
				}

				// 判断有工种信息
				let isType = true;
				if (isTeam) {
					typeList = this.getTypeRuleForm(typeLen);
					if (typeList.length > 0) {
						for (let i = 0; i < typeList.length; i++) {
							if (!typeList[i]) {
								isType = typeList[i]
							}
						}
					} else {
						return this.$message.error('请完善方案信息');
					}
				} else {
					return this.$message.error('请完善方案信息');
				}

				if (isType) {
					this.getSbmitServer();
				} else {
					return this.$message.error('请完善方案信息');
				}
				})
			},
			// 提交服务单信息
			async getSbmitServer() {
				let param = {};
				// 地区
				param.address = this.allAddress.address ? this.allAddress.address : this.allAddress.city + this
					.allAddress
					.title;
				param.city = this.allAddress.city;
				param.gpsLocation = this.allAddress.point.lng + ',' + this.allAddress.point.lat;
				param.province = this.allAddress.province
				param.region = this.allAddress.region // 地区
				param.briefId = this.briefId; // 需求单id
				param.scope = this.basicForm.scope;
				param.images = this.basicForm.images
				param.description = this.basicForm.description;
				param.title = this.basicForm.title;
				param.type = this.basicForm.type
				param.enterpriseName = this.basicForm.enterpriseName
				param.enterpriseAddress   = this.basicForm.enterpriseAddress  
				let schemes = this.deepClone(this.schemes);
				for (let i = 0; i < schemes.length; i++) {
					for (let j = 0; j < schemes[i].teams.length; j++) {
						schemes[i].teams[j].enterEndTime = new Date(schemes[i].teams[j].enterEndTime).getTime();
						schemes[i].teams[j].enterStartTime = new Date(schemes[i].teams[j].enterStartTime).getTime();
						schemes[i].teams[j].restEndTime = new Date(schemes[i].teams[j].restEndTime).getTime();
						schemes[i].teams[j].restStartTime = new Date(schemes[i].teams[j].restStartTime).getTime();
						schemes[i].teams[j].workEndTime = new Date(schemes[i].teams[j].workEndTime).getTime();
						schemes[i].teams[j].workStartTime = new Date(schemes[i].teams[j].workStartTime).getTime();

						for (let k = 0; k < schemes[i].teams[j].teamTypes.length; k++) {
							if(schemes[i].teams[j].teamTypes[k].workType == 1){
								schemes[i].teams[j].teamTypes[k].unitPrice = schemes[i].teams[j].unitPrice
							}
							schemes[i].teams[j].teamTypes[k].dailyHours = schemes[i].teams[j].dailyHours
							schemes[i].teams[j].teamTypes[k].enterStartTime = new Date(schemes[i].teams[j].teamTypes[k]
								.enterStartTime).getTime();
							schemes[i].teams[j].teamTypes[k].enterEndTime = new Date(schemes[i].teams[j].teamTypes[k]
								.enterEndTime).getTime();
						}
					}
				}
				param.schemes = schemes;
				let res = await AddOrder(param);
				this.$message.success('添加成功');
				this.getBriefDetail(this.briefId);
			},
			deepClone(obj) {
				let _obj = JSON.stringify(obj),
					objClone = JSON.parse(_obj);
				return objClone
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
					that.allAddress.region = res.addressComponents.district
				})
				this.allAddress = this.form.allAddress;
				if (!this.allAddress.city) {
					return this.$message.error('请填写详细地址')
				}
				this.isAddress = false;
				this.getDetailsAdderss(this.form);
			},
			// 关闭对话框
			handleClose() {
				this.isAddress = false;
			},

			/** 选中地址 */
			getDetailsAdderss(form) {
				this.$nextTick(() => {
					const {
						lng,
						lat
					} = form.addrPoint;
					this.addressMap = new BMap.Map("DetailsAddress", {
						enableMapClick: false
					}) //新建地图实例，enableMapClick:false ：禁用地图默认点击弹框

					var point = new BMap.Point(lng, lat);

					this.addressMap.centerAndZoom(point, 19);
					// return;
					var opts = {
						width: 120,
						height: 100,
						title: '地址'
					};
					let infoWindow = new BMap.InfoWindow(form.address, opts);
					this.addressMap.openInfoWindow(infoWindow, form.addrPoint);
					this.addressMk = new BMap.Marker(point, {
						enableDragging: false
					})
					this.addressMap.addOverlay(this.addressMk) //将覆盖物添加到地图中
				})

			},
			// 初始化地图
			initMap() {
				var that = this;
				this.$nextTick(() => {
					this.map = new BMap.Map("map-container", {
						enableMapClick: true
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
			/** 搜索地址 */
			handleSelect(item) {
				var opts = {
					width: 120,
					height: 50,
					title: item.title
				};
				let infoWindow = new BMap.InfoWindow(item.address ? item.address : item.city + item.title, opts);
				this.form.address = item.address ? item.address : item.city + item.title; //记录详细地址，含建筑物名
				this.form.addrPoint = item.point; //记录当前选中地址坐标
				this.form.allAddress = item;
				this.map.clearOverlays() //清除地图上所有覆盖物
				this.mk = new BMap.Marker(item.point) //根据所选坐标重新创建Marker
				this.map.addOverlay(this.mk) //将覆盖物重新添加到地图中
				this.map.panTo(item.point) //将地图的中心点更改为选定坐标点
				this.map.openInfoWindow(infoWindow, item.point);
				console.log('执行666')
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
			// 下标转中文
			getNumberTurnChinese(index) {
				let arr = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
				return arr[index]
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
				this.$set(this.schemeList, len, param)
				let data = { // 方案
					tag: "", // 标签
					description: "", // 简介
					replaceTimes: "", // 换人次数
					totalUnit: "", // 总工程量
					serviceFeeRate: "", // 信息服务率
					serviceFeeRateNum: "", //  信息服务费
					enterStartTime: "", //方案进场时间
					enterEndTime: "", // 方案退场时间
					taxRate: "", // 税率
					taxRateNum: "", // 税费
					serverTotal: "", // 施工服务费
					totalFee: "", // 总费用
					totalNum: 0, // 总人数
					teams: [{ // 班组信息
						name: "", // 班组名称
						workTimeList: [this.getYear(), this.getYear(64800000)], // 上班/下班 时间数组
						// 上班/下班 时间数组
						workStartTime: this.formatDateTime(this.getYear()), // 上班时间
						workEndTime: this.formatDateTime(this.getYear(64800000)), // 下班时间
						dailyHours: 9, // 上班时长
						restTimeList: [this.getYear(43200000), this.getYear(46800000)], // 午休时间数组
						restStartTime: this.formatDateTime(this.getYear(43200000)), // 午休开始时间
						restEndTime: this.formatDateTime(this.getYear(46800000)), // 午休结束时间
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
								leaderRate:'',// 带班费%
								description: "", // 描述
								overtimeFee: "", // 加班费
								dailyFee: "", //  每日收入
								dailyHours: "", // 每日工时
							}
						],
					}],
				}

				this.schemes.push(data);
			},
			// 上传限制
			beforeAvatarUpload(file) {
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
				this.$message.warning(`当前限制选择 4 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
			},
			// 图片上传中
			handlePictureCardPreview(file) {
				console.log('上传中')
				this.dialogImageUrl = file.response.data;
				this.isImges = true;
			},
			// 图片删除
			handleRemoveImg(file, fileList) {
				this.basicForm.images = fileList;
			},
			// 图片上传成功
			handleSuccessImg(response, file, fileList) {
				this.videoFlag = false;
				this.videoUploadPercent = 0;
				this.basicForm.images.push(file.response.data);
			},
		}
	}
</script>

<style lang="scss">
	.demand-service-info-item {
		position: relative;

		span {
			position: absolute;
			right: 10px;
			top: 0;
			color: #ccc;
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
				margin-bottom: 110px;
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
			margin-bottom: 80px;
			.demand-service-plan-box-foot-item {
				width: 50%;
				margin-bottom: 20px;

				.el-form-item__content {
					margin-left: 0 !important;
				}

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


	.autoAddressClass {
		li {
			i.el-icon-search {
				margin-top: 11px;
			}

			.mgr10 {
				margin-right: 10px;
			}

			.title {
				text-overflow: ellipsis;
				overflow: hidden;
			}

			.address {
				line-height: 1;
				font-size: 12px;
				color: #b4b4b4;
				margin-bottom: 5px;
			}
		}
	}
</style>
