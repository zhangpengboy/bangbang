<template>
	<div class="member-details page">
		<!-- 头部  -->
		<div class="top  ">
			<div class="top-title ">
				<span style="margin-right: 15px;">数据列表</span>
				 <el-radio-group v-model="radio">
				      <el-radio-button label="查看记录"></el-radio-button>
				      <el-radio-button label="报名记录"></el-radio-button>
				    </el-radio-group>
			
			</div>
			<!-- <div class="top-content flex fvertical fbetween">
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
		 -->
		</div>
		<!-- 头部end  -->
		<div class="box">
			<template v-if="radio=='查看记录'">
				<!-- 表格数据  -->
				<el-table :data="tableData" border style="width: 100%">
					<el-table-column prop="id" label="ID" >
					</el-table-column>
					<el-table-column prop="createName" label="名称" >
					</el-table-column>
					<el-table-column prop="phone" label="联系方式">
					</el-table-column>
					<el-table-column prop="teamTypeName" label="查看过工种">
					</el-table-column>
					<el-table-column  label="查看时间">
						<template slot-scope="scope">
							{{formatDate(scope.row.createTime)}}
						</template>
					</el-table-column>
					
				</el-table>
				<!-- 表格数据end -->
				<!-- 分页  -->
				<div class="flex fcenter page">
					<el-pagination class="page" id="page" background @size-change="handleSizeChange"
						@current-change="handleCurrentChange" :current-page="pageIndex" :page-sizes="[10, 20, 30, 40]"
						:page-size="pageSize" layout="total, prev, pager, next,sizes, jumper" :total="pageCount">
					</el-pagination>
				</div>
				<!-- 分页end -->
			</template>
			<!--  报名记录 -->
			<template v-else>
				<!-- 表格数据  -->
				<el-table :data="recordList" border style="width: 100%">
					<el-table-column prop="id" label="ID" >
					</el-table-column>
					<el-table-column prop="createName" label="名称" >
					</el-table-column>
					<el-table-column prop="phone" label="联系方式">
					</el-table-column>
					<el-table-column prop="name" label="报名工种">
					</el-table-column>
					<el-table-column  label="报名时间">
						<template slot-scope="scope">
							{{formatDate(scope.row.enrollTime)}}
						</template>
					</el-table-column>
					
				</el-table>
				<!-- 表格数据end -->
				<!-- 分页  -->
				<div class="flex fcenter page">
					<el-pagination class="page" id="page" background @size-change="handleRecordSizeChange"
						@current-change="handleRecordCurrentChange" :current-page="recorPageIndex" :page-sizes="[10, 20, 30, 40]"
						:page-size="recorPageSize" layout="total, prev, pager, next,sizes, jumper" :total="recorPageCount">
					</el-pagination>
				</div>
				<!-- 分页end -->
			</template>
		</div>
	</div>
</template>

<script>
	import {getBrowseList,getMembersList} from '../../../api/user.js'
	import moment from 'moment'
	export default {
		data() {
			return {
				pageIndex: 1, // 页码
				pageSize: 10, // 显示多少条数据
				pageCount: 0, // 总条数
				tableData:[],
				radio:"查看记录",
				orderId:"",
				recordList:[], // 记录列表
				recorPageIndex: 1, // 页码
				recorPageSize: 10, // 显示多少条数据
				recorPageCount: 0, // 总条数
			}
		},
		mounted() {
			// console.log(this.$route.query.orderID)
			this.orderId = this.$route.query.orderID;
			this.getBrowseList();
			this.getMembersList();
		},
		methods: {
			formatDate(value) {
				return moment(value).format('YYYY-MM-DD')
			},
			/** 获取详细名单数据 */
			async getBrowseList(){
				try{
					let param = {};
					param.pageIndex = this.pageIndex;
					param.pageSize = this.pageSize;
					param.orderId = this.orderId
					let res = await getBrowseList(param)
					console.log('获取详细名单数据:',res);
					this.pageCount = res.data.total;
					this.tableData = res.data.records;
				}catch(e){
					//TODO handle the exception
					console.log(e)
				}
			},
			
			/** 查看记录-选择分页 */
			handleSizeChange(e) {
				this.pageSize = e;
				this.pageIndex = 1;
				this.getBrowseList();
			},
			/** 查看记录-点击分页 */
			handleCurrentChange(e) {
				this.pageIndex = e;
				this.getBrowseList();
			},
			
			/** 报名记录-获取数据  */
			async getMembersList(){
				let param = {};
				param.pageIndex = this.recorPageIndex;
				param.pageSize = this.recorPageSize;
				param.orderId = this.orderId;
				let res = await getMembersList(param);
				this.recorPageCount = res.data.total;
				this.recordList = res.data.records;
			},
			/** 报名记录-选择分页 */
			handleRecordSizeChange(e){
				this.recorPageSize = e;
				this.recorPageIndex = 1;
				this.getMembersList();
			},
			/** 报名记录-点击分页 */
			handleRecordCurrentChange(e){
				this.recorPageIndex = e;
				this.getMembersList();
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
