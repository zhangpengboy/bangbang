<template>
	<div>
		<!-- 已获取收入 -->
		<el-table  v-if="show"   :data="tableData" stripe style="width: 100%" border >
			<el-table-column  label="序号" width="60">
				<template slot-scope="scope">
					{{pageSize * (pageIndex -1) +1 + scope.$index}}
				</template>
			</el-table-column>
			<el-table-column prop="inviteeUserId" label="用户ID " width="200">
			</el-table-column>
			<el-table-column prop="inviteeUserName" label="名称" >
			</el-table-column>
			<el-table-column prop="inviteePhone" label="手机号码" >
			</el-table-column>
			<el-table-column  label="收益类型" >
				<template slot-scope="scope">
					<p v-if="scope.row.type == 0">完成认证奖励</p>
					<p v-if="scope.row.type == 1">施工费用分佣</p>
					<p v-if="scope.row.type == 2">完成施工奖励</p>
				</template>
			</el-table-column>
			<el-table-column prop="fee" label="收益金额" >
			</el-table-column>
			<el-table-column  label="时间" >
				<template slot-scope="scope">
					{{formatDateTime(scope.row.incomeTime)}}
				</template>
			</el-table-column>
			<el-table-column label="操作" >
			</el-table-column>
		</el-table>
		<!-- 已获取收入end -->
		<!-- 未结算收入 -->
		<el-table v-else :data="tableData"  stripe style="width: 100%" border >
			<el-table-column  label="序号" width="60">
				<template slot-scope="scope">
					{{pageSize * (pageIndex -1) +1 + scope.$index}}
				</template>
			</el-table-column>
			<el-table-column prop="userId" label="用户ID " width="200">
			</el-table-column>
			<el-table-column prop="userName" label="名称" >
			</el-table-column>
			<el-table-column prop="inviteePhone" label="手机号码" >
			</el-table-column>
			<el-table-column  label="预计收益类型" >
				<template slot-scope="scope">
					<p v-if="scope.row.type == 0">未成为认证工人</p>
					<p v-if="scope.row.type == 1">未结施工费用分佣</p>
					<p v-if="scope.row.type == 2">未完成施工奖励</p>
				</template>
			</el-table-column>
			<el-table-column prop="fee" label="预计收益金额" >
			</el-table-column>
			<el-table-column  label="时间" >
				<template slot-scope="scope">
					{{formatDateTime(scope.row.incomeTime)}}
				</template>
			</el-table-column>
			<el-table-column label="操作" >
			</el-table-column>
		</el-table>
		<!-- 未结算收入end -->
		<!-- 分页  -->
		<div class="flex fcenter page">
			<el-pagination class="page" id="page" background @size-change="handleSizeChange"
				@current-change="handleCurrentChange" :current-page="pageIndex" :page-sizes="[10, 20, 30, 40]"
				:page-size="pageSize" layout="total, prev, pager, next,sizes, jumper" :total="pageCount">
			</el-pagination>
		</div>
		<!-- 分页end -->
	</div>
</template>

<script>
	import moment from 'moment'
	export default{
		props:{
			show:{
				type:Boolean,
				default:true
			},
			tableData:{
				type:Array
			},
			pageIndex:{
				type:Number
			},
			pageSize:{
				type:Number
			},
			pageCount:{
				type:Number
			},
			
		},
		methods:{
			formatDateTime(value) {
				return value ? moment(value).format('YYYY-MM-DD HH:mm:ss') : '';
			},
			/** 选择分页 */
			handleSizeChange(e) {
				this.$emit('handleSizeChange',e);
			},
			/** 点击分页 */
			handleCurrentChange(e) {
				this.$emit('handleCurrentChange',e);
			},
		}
	}
</script>

<style>
</style>
