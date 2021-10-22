<template>
	<div class="main">
		<!-- 头部  -->
		<div class="top" id="top">
			<div class="top-title ">数据筛选</div>
			<div class="top-content flex fvertical fbetween">
				<div class="top-content-item flex fvertical">
					<div class="flex fvertical top-content-item-status">
						<span>输入查询：</span>
						<el-input class="top-content-item-input" v-model="keyword" @keyup.enter.native="handelSearch"
							placeholder="输入标题名称">
						</el-input>
					</div>
					<div class="flex fvertical top-content-item-status">
						<span>类型：</span>
						<el-select v-model="type_name" placeholder="选择类型">
							<el-option v-for="item in typeList" :key="item.value" :label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
					</div>

					<div class="flex fvertical top-content-item-status">
						<span>位置：</span>
						<el-select v-model="address_name" placeholder="选择位置">
							<el-option v-for="item in addressList" :key="item.value" :label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
					</div>

					<div class="flex fvertical top-content-item-status">
						<span>状态：</span>
						<el-select v-model="status_name" placeholder="选择状态">
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
		<!-- 头部end  -->

		<div class="box">
			<div class="box-top flex fbetween fvertical" id="boxTop">
				<div class="bold">数据列表</div>
				<el-button type="primary" @click="dialogVisible = true">新增</el-button>
			</div>

			<!-- 表格  -->
			<el-table :data="tableData" stripe style="width: 100%" border :height="clientHeight+'px'">

				<el-table-column prop="id" label="排序" width="50">
				</el-table-column>
				<el-table-column prop="createName" label="标题">
				</el-table-column>
				<el-table-column prop="phone" label="Banner图">
				</el-table-column>
				<el-table-column prop="phone" label="类型">
				</el-table-column>
				<el-table-column prop="phone" label="链接">
				</el-table-column>
				<el-table-column prop="phone" label="位置">
				</el-table-column>
				<el-table-column prop="updateName" label="操作人">
				</el-table-column>
				<el-table-column label="操作时间" width="120">
					<template slot-scope="scope">
						<!-- <p>{{scope.row.updateTime}}</p> -->
						<span>{{formatDate(scope.row.updateTime)}}</span>
					</template>
				</el-table-column>
				<el-table-column label="状态" width="100">
				</el-table-column>
				<el-table-column label="操作" width="220">
				</el-table-column>
			</el-table>
			<!-- 表格end -->

			<!-- 分页  -->
			<div class="flex fcenter page">
				<el-pagination class="page" id="page" background @size-change="handleSizeChange"
					@current-change="handleCurrentChange" :current-page="pageIndex" :page-sizes="[10, 20, 30, 40]"
					:page-size="pageSize" layout="total, prev, pager, next,sizes, jumper" :total="pageCount">
				</el-pagination>
			</div>
			<!-- 分页end -->

		</div>


		<el-dialog title="提示" :visible.sync="dialogVisible" width="600px" :before-close="handleClose">


			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				<el-form-item label="banner图片" prop="name">
					<el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/"
						:show-file-list="false">
						<img v-if="imageUrl" :src="imageUrl" class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</el-form-item>
				<el-form-item label="标题" prop="region">
					<el-input type="texrt" placeholder="请输入banner标题" maxlength="15"></el-input>
				</el-form-item>
				<el-form-item label="类型" prop="region">
					<el-select v-model="ruleForm.region" placeholder="请选择活动区域">
						<el-option label="区域一" value="shanghai"></el-option>
						<el-option label="区域二" value="beijing"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="链接" prop="region">
					<el-input type="texrt" placeholder="请输入跳转链接"></el-input>
				</el-form-item>
				<el-form-item label="位置" prop="region">
					<el-select v-model="ruleForm.region" placeholder="请选择活动区域">
						<el-option label="区域一" value="shanghai"></el-option>
						<el-option label="区域二" value="beijing"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="排序" prop="region">
					<el-input type="texrt" placeholder="请输入数值，数值越大，排序越前"></el-input>
				</el-form-item>


			</el-form>

			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
			</span>
		</el-dialog>



	</div>
</template>
<script>
	export default {
		data() {
			return {
				pageIndex: 1,
				pageSize: 10,
				pageCount: 0,
				keyword: "", // 搜索
				typeList: [], // 类型列表
				type_name: "", // 选中类型
				address_name: "", // 位置名称
				addressList: [], // 位置列表
				status_name: "", // 选中状态
				statusList: [],
				dialogVisible: false,
				ruleForm: {},
				rules: {},
				imageUrl: "",
				tableData: []
			}
		},
		methods: {
			/** 取消对话框 */
			handleClose() {},
			/** 搜索 */
			handelSearch() {},
			/** 重置 */
			handleReset() {

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
		}


	}
</script>
<style>
	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}

	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}

	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 80px;
		height: 80px;
		line-height: 80px;
		text-align: center;
	}

	.avatar {
		width: 80px;
		height: 80px;
		display: block;
	}
</style>
