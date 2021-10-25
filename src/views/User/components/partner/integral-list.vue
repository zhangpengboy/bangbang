<template>
	<div>
		<el-table :data="tableData" stripe style="width: 100%" border>
			<el-table-column label="序号" width="60">
				<template slot-scope="scope">
					{{pageSize * (pageIndex -1) +1 + scope.$index}}
				</template>
			</el-table-column>
			<el-table-column prop="remark" label="原因" width="200">
			</el-table-column>
			<el-table-column prop="integral" label="变动情况">
				<template slot-scope="scope">
					{{scope.row.integral > 0?'+'+scope.row.integral:scope.row.integral}}
				</template>
			</el-table-column>
			<el-table-column prop="remainIntegral" label="当前积分数">
			</el-table-column>
			<el-table-column prop="inviteePhone" label="时间">
				<template slot-scope="scope">
					{{formatDateTime(scope.row.createTime)}}
				</template>
			</el-table-column>
			<el-table-column label="操作">
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
