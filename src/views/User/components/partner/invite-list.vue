<template>
	<div>
		<el-table :data="tableData" stripe style="width: 100%" border>
			<el-table-column label="序号" width="60">
				<template slot-scope="scope">
					{{pageSize * (pageIndex -1) +1 + scope.$index}}
				</template>
			</el-table-column>
			<el-table-column prop="inviteeUserId" label="用户ID" width="200">
			</el-table-column>
			<el-table-column prop="inviteeUserName" label="名称">
			</el-table-column>
			<el-table-column prop="inviteePhone" label="手机号码">
			</el-table-column>
			<el-table-column label="认证状态">
				<template slot-scope="scope">
					<p v-if="scope.row.authStatus == 0">未认证</p>
					<p v-if="scope.row.authStatus == 1">已认证</p>
				</template>
			</el-table-column>
			<el-table-column label="注册时间">
				<template slot-scope="scope">
					{{formatDateTime(scope.row.registerTime)}}
				</template>
			</el-table-column>
			<el-table-column  label="状态">
				<template slot-scope="scope">
					<p v-if="scope.row.status == 0">正常</p>
					<p v-if="scope.row.status == 1">冻结</p>
				</template>
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button type="text" @click="handleLook(scope.row)">查看</el-button>
				</template>
			</el-table-column>
		</el-table>
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
			tableData:{
				type:Array
			},
			pageSize:{
				type:Number
			},
			pageIndex:{
				type:Number
			},
			pageCount:{
				type:Number
			}
		},
		methods:{
			/** 选择分页 */
			handleSizeChange(e) {
				this.$emit('handleSizeChange',e);
			},
			/** 点击分页 */
			handleCurrentChange(e) {
				this.$emit('handleCurrentChange',e);
			},
			formatDateTime(value) {
				return value ? moment(value).format('YYYY-MM-DD HH:mm:ss') : '';
			},
			handleLook(row){
				console.log(row)
				this.$router.push({ path: '/User/userdetail', query: { id: row.inviteeUserId ,joinType:1 }})
			},
		}
	}
</script>

<style>
</style>
