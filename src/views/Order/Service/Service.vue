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
			<el-table :data="tableData" stripe style="width: 100%" header-align='center' align='center' border>
			 	<el-table-column
				type="index"
				width="50">
				</el-table-column>
				<el-table-column prop="briefId" label="ID" width="200">
				</el-table-column>
				<el-table-column prop="title" label="项目名称">
				</el-table-column>
				<el-table-column prop="matchNum" label="已匹配人数">
				</el-table-column>
				<el-table-column prop="totalNum" label="总人数">
				</el-table-column>
				<el-table-column prop="hadPay" label="已付金额">
				</el-table-column>
				<el-table-column prop="totalFee" label="总金额">
				</el-table-column>
				<el-table-column prop="address" label="需求单">
					 <template slot-scope="scope">
					<div style="color: #409EFF;text-align: center;">查看详情</div>
					</template>
				</el-table-column>
				<el-table-column prop="reviewStatus" label="查看工人信息">
					<template slot-scope="scope">
					<el-switch
					v-model="scope.row.reviewStatus "
					active-color="#13ce66"
					inactive-color="#ff4949"
					active-value="1"
    				inactive-value="0">
					</el-switch>
					</template>
				</el-table-column>
				<el-table-column  label="状态">
					<template slot-scope="scope">
						<p v-if="scope.row.status == 1">未报名</p>
						<p v-if="scope.row.status == 2">报名中</p>
						<p v-if="scope.row.status == 3">进行中</p>
						<p v-if="scope.row.status == 4">已结束</p>
						<p v-if="scope.row.status == 5">已关闭</p>
					</template>
				</el-table-column>
				<el-table-column prop="updateName" label="操作人">
				</el-table-column>
				<el-table-column  label="操作时间">
					<template slot-scope="scope">
						{{formatDate(scope.row.updateTime)}}
					</template>
				</el-table-column>
				<el-table-column label="操作" width="220">
					<template slot-scope="scope">
						<el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
						<el-button type="text" size="small" @click='goRecruit(scope.row)'>去招工</el-button>
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
import {
  	getOrderlist,
} from '../../../api/user.js'
import moment from 'moment'
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
				tableData:[{}], // 表格列表
				loading:""
			}
		},
		created() {
			this.getorder()
		},
		methods: {
			formatDate(value) {
			        return moment(value).format('YYYY-MM-DD')
			},
			/** 选择分页 */
			handleSizeChange(e) {
				this.PageSize = e;
				this.PageIndex = 1;
				this.getorder()
			},
			/** 点击分页 */
			handleCurrentChange(e) {
				this.PageIndex = e;
				this.getorder()
			},
			/** 查看 */
			handleClick(row){
				this.$router.push({
					path:'/order/service-details',
					query:{
					id:row.id
					}
					})
			},
			// 订单列表接口
			getorder(){
				this.loading = true
				getOrderlist({current:this.PageIndex,size:this.PageSize }).then(res => {
					this.tableData = res.data.records
					this.PageCount = res.data.total
					this.loading = false;
				})
			},
			// 去招工
			goRecruit(row){
				console.log(row)
			  this.$confirm('是否开启服务单至工人端招工', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
				}).then(() => {
				this.$message({
					type: 'success',
					message: '状态修改成功!'
				});
				})
      
    
			},
			getUpdateReviewStatus(){}
		}
	}
</script>

<style>
</style>
