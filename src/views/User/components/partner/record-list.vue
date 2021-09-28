<template>
	<!-- 提现记录 -->
	<!-- v-else v-loading="recordLoading" -->
	<div class="partne-bill-record">
		<el-table :data="recordTable" stripe style="width: 100%" border>
			<el-table-column label="序号" width="60">
				<template slot-scope="scope">
					{{recordSize * (recordIndex -1) +1 + scope.$index}}
				</template>
			</el-table-column>
			<el-table-column prop="orderCode" label="订单ID " width="200">
			</el-table-column>
			<el-table-column prop="fee" label="提现金额">
			</el-table-column>
			<el-table-column prop="wechatName" label="到账微信">
			</el-table-column>
			<el-table-column label="申请时间">
				<template slot-scope="scope">
					{{formatDateTime(scope.row.createTime)}}
				</template>
			</el-table-column>
			<el-table-column label="状态">
				<template slot-scope="scope">
					<p v-if="scope.row.status == 0">审核中</p>
					<p v-if="scope.row.status == 1">到账失败</p>
					<p v-if="scope.row.status == 2">已转账</p>
				</template>
			</el-table-column>
			<el-table-column prop="updaterName" label="操作人">
			</el-table-column>
			<el-table-column label="操作时间">
				<template slot-scope="scope">
					{{formatDateTime(scope.row.updateTime)}}
				</template>
			</el-table-column>
			<el-table-column label="操作">
			</el-table-column>
		</el-table>
		<!-- 分页  -->
		<div class="flex fcenter page">
			<el-pagination class="page" id="page" background @size-change="handleSizeChangeRecord"
				@current-change="handleCurrentChangeRecord" :current-page="recordIndex" :page-sizes="[10, 20, 30, 40]"
				:page-size="recordSize" layout="total, prev, pager, next,sizes, jumper" :total="recordCount">
			</el-pagination>
		</div>
		<!-- 分页end -->
	</div>
	<!-- 提现记录end -->
</template>

<script>
	export default {
		props: {
			recordTable: {
				type: Array
			},
			recordSize: {
				type: Number
			},
			recordIndex: {
				type: Number
			},
			recordCount: {
				type: Number
			}
		},
		methods: {
			handleSizeChangeRecord(e) {
				this.$emit('handleSizeChangeRecord', e)
			},
			handleCurrentChangeRecord(e) {
				this.$emit('handleCurrentChangeRecord', e)
			}

		}
	}
</script>

<style>
</style>
