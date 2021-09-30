<template>
	
	<div class="service-details-member-box-list-item flex fvertical ">
	
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
							<i class="el-icon-error" @click="handleDeteleUser(res,index,inx,list_index)" v-if="res.enrollStatus == 1"></i>
							<span class="service-details-member-box-list-worker-user-item-go" v-if="res.leaveStatus == 1">已离场</span>
							<!-- 下个版本需要 -->
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
			</div>
			</div>
			<!-- 匹配员工end -->
		</div>
	
</template>

<script>
	export default{
		data(){
			return{
				items:{}
			}
		}
	}
</script>

<style>
</style>
