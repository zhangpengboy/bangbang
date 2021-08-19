<template>
	<div class="member-details page">
		<!-- 头部  -->
		<div class="top  ">
			<div class="top-title ">数据筛选</div>
			<div class="top-content flex fvertical fbetween">
				<div class="top-content-item flex fvertical f1">
					<div class="flex fvertical top-content-item-status">
						<span class="top-content-item-status-title">输入查询：</span>
						<el-input class="top-content-item-input" v-model="serach" placeholder="ID/项目名称">
						</el-input>
					</div>
					<div class="flex fvertical top-content-item-status">
						<span class="top-content-item-status-title">查看班组：</span>
						<el-select v-model="value" placeholder="选择跟进人">
							<el-option v-for="item in options" :key="item.value" :label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
					</div>

					<div class="flex fvertical top-content-item-status">
						<span class="top-content-item-status-title">企业认证：</span>
						<el-select v-model="status" placeholder="选择跟进人">
							<el-option v-for="item in statusList" :key="item.value" :label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
					</div>

					<div class="flex fvertical top-content-item-status">
						<span class="top-content-item-status-title">工人等级：</span>
						<el-select v-model="status" placeholder="选择跟进人">
							<el-option v-for="item in statusList" :key="item.value" :label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
					</div>

					<div class="flex fvertical top-content-item-status">
						<span class="top-content-item-status-title">用户登录：</span>
						<el-select v-model="status" placeholder="选择跟进人">
							<el-option v-for="item in statusList" :key="item.value" :label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
					</div>

					<div class="flex fvertical top-content-item-status">
						<span class="top-content-item-status-title">状态：</span>
						<el-select v-model="status" placeholder="选择跟进人">
							<el-option v-for="item in statusList" :key="item.value" :label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
					</div>

				</div>
				<div class="top-content-btn ">
					<el-button type="primary">查询</el-button>
					<el-button>重置</el-button>
				</div>
			</div>
		</div>
		<!-- 头部end  -->
		<div class="box">
			<!-- 表格数据  -->
			<el-table :data="tableData" border style="width: 100%">
				<el-table-column prop="date" label="ID" >
				</el-table-column>
				<el-table-column prop="name" label="名称" >
				</el-table-column>
				<el-table-column prop="address" label="联系方式">
				</el-table-column>
				<el-table-column prop="address" label="查看过班组">
				</el-table-column>
				<el-table-column prop="address" label="查看时间">
				</el-table-column>
				<el-table-column prop="address" label="报名班组">
				</el-table-column>
				<el-table-column prop="address" label="报名时间">
				</el-table-column>
			</el-table>
			<!-- 表格数据end -->
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
</template>

<script>
	export default {
		data() {
			return {
				PageIndex: 1, // 页码
				PageSize: 10, // 显示多少条数据
				PageCount: 0, // 总条数
				tableData:[]
			}
		},
		methods: {
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
		}
	}
</script>

<style lang="scss">
	.member-details {
		.top-content {}

		.top {
			.top-content-item {

				.top-content-item-status {
					width: 33.33%;
					margin-right: 0;
					margin-bottom: 20px;

					.top-content-item-status-title {
						display: inline-block;
						width: 80px;
					}
				}
			}
		}


	}
</style>
