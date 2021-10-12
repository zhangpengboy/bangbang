<template>
	<div class="main" v-loading="lodaing">
		<!-- 头部  -->
		<div class="top" id="top">
			<div class="top-title ">数据筛选</div>
			<div class="top-content flex fvertical fbetween">
				<div class="top-content-item flex fvertical f1">
					<div class="flex fvertical top-content-item-status">
						<span>接单人输入查询：</span>
						<el-input class="top-content-item-input" v-model="keyword1" placeholder="用户ID/接单人/手机号码">
						</el-input>
					</div>
					<div class="flex fvertical top-content-item-status">
						<span>合伙人输入查询：</span>
						<el-input class="top-content-item-input" v-model="keyword2" placeholder="分享合伙人/合伙人手机号码">
						</el-input>
					</div>


					<div class="flex fvertical top-content-item-status">
						<span>类型：</span>
						<el-select v-model="type" filterable>
							<el-option v-for="item in typeList" :key="item.value" :label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
					</div>
					<div class="flex fvertical top-content-item-status">
						<span>状态：</span>
						<el-select v-model="conditionStatus" placeholder="选择状态">
							<el-option v-for="item in statusList" :key="item.value" :label="item.label"
								:value="item.value">
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


		<!-- 数据列表 -->
		<div class="box">
			<div class="box-top flex fbetween fvertical" id="boxTop">
				<div class="bold">数据列表</div>
			</div>
			<el-table :data="tableData" stripe style="width: 100%" border>
				<el-table-column prop="date" label="序号" width="60">
					<template slot-scope="scope">
						{{pageSize * (pageIndex -1) +1 + scope.$index}}
					</template>
				</el-table-column>
				<el-table-column prop="inviteeUserId" label="用户ID " width="200">
				</el-table-column>
				<el-table-column prop="inviteeUserName" label="接单人" width="200">
				</el-table-column>
				<el-table-column prop="inviteePhone" label="手机号码">
				</el-table-column>
				<el-table-column label="类型">
					<template slot-scope="scope">
						<p v-if="scope.row.type == 1">一次性</p>
						<p v-if="scope.row.type == 2">周期</p>
					</template>
				</el-table-column>
				<el-table-column label="条件">
					<template slot-scope="scope">
						入场满{{scope.row.condition}}天
					</template>
				</el-table-column>
				<el-table-column label="奖励">
					<template slot-scope="scope">
						<p v-if="scope.row.type == 1">{{scope.row.fee}}元</p>
						<p v-if="scope.row.type == 2">验收产值{{scope.row.rate}}%</p>
					</template>
				</el-table-column>
				<el-table-column prop="userName" label="分享合伙人">
				</el-table-column>
				<el-table-column prop="phone" label="合伙人手机号码">
				</el-table-column>
				<el-table-column label="状态">
					<template slot-scope="scope">
						<p v-if="scope.row.conditionStatus == 0">未达标</p>
						<p v-if="scope.row.conditionStatus == 1">达标</p>
					</template>
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<!-- <p v-if="scope.row.conditionStatus == 0">未达标</p> -->
						<el-button v-if="scope.row.conditionStatus == 0" type="primary"
							@click="handleSumbit(scope.row)">达标</el-button>
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
		<!-- 数据列表end -->

	</div>
</template>

<script>
	import {
		getShartList,
		getSbumitShart
	} from '../../../api/user.js'
	export default {
		data() {
			return {
				pageIndex: 1,
				pageSize: 10,
				pageCount: 0,
				keyword1: "",
				keyword2: "",
				type: "",
				typeList: [{
					label: "全部",
					value: ""
				}, {
					label: "一次性",
					value: 0
				}, {
					label: "周期",
					value: 1
				}],
				conditionStatus: "",
				statusList: [{
					label: "全部",
					value: ""
				}, {
					label: "未达标",
					value: 0
				}, {
					label: "达标",
					value: 1
				}],
				tableData: [],
				lodaing: false
			}
		},
		mounted() {
			this.getShartList();
		},
		methods: {
			/** 是否达标 */
			handleSumbit(row) {
				console.log(row)
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let param ={};
					param.id = row.id;
					param.conditionStatus = 1;
					this.getSbumitShart(param)

				}).catch(() => {
					
				});
			},
			/** 是否达标 */
			async getSbumitShart(param) {
				try{
					let res = await getSbumitShart(param);
					this.$message.success('操作成功！');
					this.getShartList();
				}catch(e){
					//TODO handle the exception
				}
				
				
			},
			/** 获取列表 */
			async getShartList() {
				this.lodaing = true;
				try {
					let param = {}
					param.pageNum = this.pageIndex;
					param.pageSize = this.pageSize;
					param.keyword1 = this.keyword1;
					param.keyword2 = this.keyword2;
					param.type = this.type;
					param.conditionStatus = this.conditionStatus;
					let res = await getShartList(param);
					this.pageCount = res.data.total;
					this.tableData = res.data.list;
					this.lodaing = false;
				} catch (e) {
					this.lodaing = false;
					//TODO handle the exception
				}

			},
			/** 查看  */
			handelSearch() {
				this.pageIndex = 1;
				this.getShartList();
			},
			/** 重置 */
			handleReset() {
				this.pageIndex = 1;
				this.keyword1 = '';
				this.keyword2 = '';
				this.type = '';
				this.conditionStatus = '';
				this.getShartList();
			},
			/** 选择分页 */
			handleSizeChange(e) {
				this.pageSize = e;
				this.pageIndex = 1;
				this.getShartList();
			},
			/** 点击分页 */
			handleCurrentChange(e) {
				this.pageIndex = e;
				this.getShartList();
			},
		}
	}
</script>

<style>
</style>
