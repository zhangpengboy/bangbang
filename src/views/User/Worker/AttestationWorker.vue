<template>
	<div class="main">
		<!-- 头部  -->
		<div class="top" id="top">
			<div class="top-title ">数据筛选</div>
			<div class="top-content flex fvertical fbetween">
				<div class="top-content-item flex fvertical ">
					<div class="flex fvertical top-content-item-status">
						<span>输入查询：</span>
						<el-input class="top-content-item-input" v-model="keywords" placeholder="用户ID/账号">
						</el-input>
					</div>
					<div class="flex fvertical top-content-item-status">
						<span>状态：</span>
						<el-select v-model="status" placeholder="选择状态">
							<el-option v-for="item in statusList" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</div>
				</div>
				<div class="top-content-btn">
					<el-button type="primary" @click="handelSearch"> 查询</el-button>
					<el-button @click="handleReset">重置</el-button>
				</div>
			</div>
		</div>
		<!-- 头部end -->
		<!-- 表格  -->
		<div class="box">
			<div class="box-top flex fbetween fvertical" id="boxTop">
				<div class="bold">数据列表</div>
				<el-button>导出</el-button>
			</div>
			<el-table :data="tableData" stripe style="width: 100%" border :height="clientHeight+'px'">
				<el-table-column prop="date" label="序号" width="60">
					<template slot-scope="scope">
						{{pageSize * (pageIndex -1) +1 + scope.$index}}
					</template>
				</el-table-column>
				<el-table-column prop="id" label="用户ID " width="200">
				</el-table-column>
				<el-table-column prop="id" label="名称">
				</el-table-column>
				<el-table-column prop="id" label="手机号码">
				</el-table-column>
				<el-table-column prop="id" label="状态">
				</el-table-column>
				<el-table-column prop="id" label="申请时间">
				</el-table-column>
				<el-table-column prop="id" label="操作人">
				</el-table-column>
				<el-table-column prop="id" label="操作时间">
				</el-table-column>
				<el-table-column  label="操作">
					<template slot-scope="scope">
						<el-button type="primary" size="mini">同意</el-button>
						<el-button type="danger" size="mini">拒绝</el-button>
					</template>
				</el-table-column>
<<<<<<< HEAD
			</el-table>	
			
=======
			</el-table>

>>>>>>> dp-dev
			<!-- 分页  -->
			<div class="flex fcenter page">
				<el-pagination class="page" id="page" background @size-change="handleSizeChange"
					@current-change="handleCurrentChange" :current-page="pageIndex" :page-sizes="[10, 20, 30, 40]"
					:page-size="pageSize" layout="total, prev, pager, next,sizes, jumper" :total="PageCount">
				</el-pagination>
			</div>
			<!-- 分页end -->
		</div>
		<!-- 表格end -->
	</div>
</template>

<script>
	export default {
		data() {
			return {
				keywords: "", // 搜索
				status: "", // 状态
				statusList: [{ // 状态列表
					label: "全部",
					value: "",
				}, {
					label: "审核中",
					value: 1,
				}, {
					label: "审核通过",
					value: 2,
				}, {
					label: "已驳回",
					value: 3,
				}],
				pageIndex: 1, // 页码
				pageSize: 10, // 显示多少条数据
				PageCount: 0, // 总条数
				clientHeight: 0,
				tableData: [
          {id:'你好'},
          {id:'你好a'}
        ],
			}
		},
		mounted() {
			this.getWebHeing();
		},
		methods:{
			/** 计算页面高度 */
			getWebHeing() {
				this.$nextTick(() => {
					this.clientHeight = document.documentElement.clientHeight - document.getElementById('top')
						.offsetHeight - document.getElementById('page')
						.offsetHeight - document.getElementById('boxTop')
						.offsetHeight - 180;
				})
				window.addEventListener('resize', () => {
					this.clientHeight = document.documentElement.clientHeight - document.getElementById('top')
						.offsetHeight - document.getElementById('page')
						.offsetHeight - document.getElementById('boxTop')
						.offsetHeight - 180;
					this.$forceUpdate();
				})
			},
			/** 选择分页 */
			handleSizeChange(e) {
				this.pageSize = e;
				this.pageIndex = 1;
			},
			/** 点击分页 */
			handleCurrentChange(e) {
				this.pageIndex = e;
			},
			/** 搜索 */
			handelSearch() {
				this.pageIndex = 1;
			},
			/** 重置 */
			handleReset() {
				this.keywords = '';
				this.pageIndex = 1;
				this.status = '';
			},
		}
	}
</script>

<style>
</style>
