<template>
	<div class="main">
		<!-- 头部  -->
		<div class="top">
			<div class="top-title ">数据筛选</div>
			<div class="top-content flex fvertical fbetween">
				<div class="top-content-item flex fvertical">
					<div class="flex fvertical top-content-item-status">
						<span>输入查询：</span>
						<el-input class="top-content-item-input" v-model="serach" placeholder="ID/项目名称">
						</el-input>
					</div>
					<div class="flex fvertical top-content-item-status">
						<span>余额预警状态：</span>
						<el-select v-model="value" placeholder="选择跟进人">
							<el-option v-for="item in options" :key="item.value" :label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
					</div>
					<div class="flex fvertical top-content-item-status">
						<span>状态：</span>
						<el-select v-model="status" placeholder="选择跟进人">
							<el-option v-for="item in statusList" :key="item.value" :label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
					</div>
				</div>
				<div class="top-content-btn">
					<el-button type="primary">查询</el-button>
					<el-button>重置</el-button>
				</div>
			</div>
		</div>
		<!-- 头部end  -->
		
		<div class="box">
			<!-- 表格  -->
			<el-table :data="tableData" stripe style="width: 100%" border>
				<el-table-column prop="date" label="序号" width="60">
				</el-table-column>
				<el-table-column prop="name" label="ID" width="80">
				</el-table-column>
				<el-table-column prop="address" label="项目名称">
				</el-table-column>
				<el-table-column prop="address" label="已匹配人数">
				</el-table-column>
				<el-table-column prop="address" label="总人数">
				</el-table-column>
				<el-table-column prop="address" label="已付金额">
				</el-table-column>
				<el-table-column prop="address" label="总金额">
				</el-table-column>
				<el-table-column prop="address" label="需求单">
				</el-table-column>
				<el-table-column prop="address" label="余额预警状态">
				</el-table-column>
				<el-table-column prop="address" label="查看工人信息">
				</el-table-column>
				<el-table-column prop="address" label="状态">
				</el-table-column>
				<el-table-column prop="address" label="操作人">
				</el-table-column>
				<el-table-column prop="address" label="操作时间">
				</el-table-column>
				<el-table-column label="操作" width="220">
					<template slot-scope="scope">
						<el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
						<el-button type="text" size="small">去招工</el-button>
						<el-button type="text" size="small">关闭</el-button>
					</template>
				</el-table-column>
			</el-table>
			<!-- 表格end -->
			
			
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
	export default{
		data(){
			return{
				PageIndex: 1, // 页码
				PageSize: 10, // 显示多少条数据
				PageCount: 0, // 总条数
				serach:"", // 搜索内容
				options:[] , // 下拉数组
				statusList:[],
				status:"", // 选中状态
				value:"" ,// 选中
				tableData:[{}] // 表格列表
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
			/** 查看 */
			handleClick(row){
				this.$router.push({path:'/order/service-details'})
			},
		}
	}
</script>

<style>
</style>
