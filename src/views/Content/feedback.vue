<template>
	<div class="main" v-loading="loading">
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
			<el-table :data="tableData" stripe style="width: 100%" border>

				<el-table-column prop="sorted" label="排序" width="50">
				</el-table-column>
				<el-table-column prop="id" label="用户Id">
				</el-table-column>
				<el-table-column prop="creatorName" label="姓名">
				</el-table-column>
				<el-table-column prop="phone" label="手机号">
				</el-table-column>
				<el-table-column prop="type" label="类型">
				</el-table-column>
                <el-table-column prop="content" label="建议内容">
				</el-table-column>
				<el-table-column label="图片">
					<template slot-scope="scope">
						<img :src="scope.row.urlList" style="width: 80px;height: 80px;">
					</template>
				</el-table-column>
                
				<el-table-column prop="scene" label="位置" width="100">
				</el-table-column>
				<el-table-column prop="createTime" label="反馈时间" width="120">
					<template slot-scope="scope">
						<span>{{formatDate(scope.row.createTime)}}</span>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="220">
					<template slot-scope="scope">
						<el-button type="text" @click="handleEdit(scope.row)">查看详情</el-button>
					</template>
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
				<el-form-item label="展示图片" prop="name">
					<UploadImg v-if="imgUrl" :imgUrl="imgUrl" @handleDeteleImg="handleDeteleImg" />
					<Uploads v-else @handleAvatarSuccess="handleAvatarSuccess" />
				</el-form-item>
				<el-form-item label="标题" prop="region">
					<el-input type="texrt" v-model="ruleForm.title" placeholder="请输入banner标题" maxlength="15"></el-input>
				</el-form-item>
				<el-form-item label="小标题" prop="region">
					<el-input type="texrt" placeholder="请输入小标题" v-model="ruleForm.subTitle" maxlength="15"></el-input>
				</el-form-item>
				<el-form-item label="链接" prop="region">
					<el-input type="texrt" v-model="ruleForm.link" placeholder="请输入跳转链接"></el-input>
				</el-form-item>

				<el-form-item label="排序" prop="region">
					<el-input type="texrt" v-model="ruleForm.sorted" placeholder="请输入数值，数值越大，排序越前"></el-input>
				</el-form-item>


			</el-form>

			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="handleSumbit">确 定</el-button>
			</span>
		</el-dialog>


	</div>
</template>
<script>
	import {
		getFeedback,
	} from '../../api/user.js'
	import moment from 'moment'
	import Uploads from '../../components/Upload/Pulibc.vue'
	import UploadImg from '../../components/UploadImg/UploadImg.vue'
	export default {
		data() {
			return {
				keyword: "",
				status_name: "",
				statusList: [],
				tableData: [],
				pageIndex: 1,
				pageSize: 10,
				pageCount: 0,
				dialogVisible: false,
				ruleForm: {
					id: null,
					title: "", // 标题
					imgUrl: "", // url图片
					subTitle: "", // 小标题
					link: "", // 链接
					sorted: "" // 排序
				},
				rules: {},
				imgUrl:"",
				editData:{},
				loading:false,
			}
		},
		mounted() {
			this.getRecommend();
		},
		components: {
			UploadImg,
			Uploads
		},
		watch: {
			dialogVisible(val) {
				if (!val) {
					this.ruleForm = {
						id: null,
						title: "", // 标题
						imgUrl: "", // url图片
						subTitle: "", // 小标题
						link: "", // 链接
						sorted: "" // 排序
					}
					this.imgUrl = ''
				}
			}
		},
		methods: {
			/** 删除图片*/
			handleDeteleImg(){
				this.imgUrl = '';
				this.ruleForm.imgUrl = '';
			},
			/** 图片编辑 */
			handleEdit(row) {
				this.editData = JSON.parse(JSON.stringify(row));
				this.dialogVisible = true;
				this.ruleForm = this.editData;
				this.imgUrl = row.imgUrl
			},
			/** 图片上传成功 */
			handleAvatarSuccess(img){
				this.imgUrl = img;
				this.ruleForm.imgUrl = img;
			},
			/** 删除精彩推荐 */
			async getDetelRecommend(id) {
				let res = await getDetelRecommend({
					id
				});
				this.$message.success('操作成功');
				if (this.tableData.length == 1 && this.pageIndex > 1) {
					this.pageIndex -= 1;
				}
				this.getRecommend();
			},
			/** 删除精彩推荐 */
			handleDetele(row) {
				this.$confirm('是否删除精彩推荐', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let res = this.getDetelRecommend(row.id)
				}).catch(() => {});
			},
			/** 获取修改精彩推荐状态 */
			async getEditRecommend(row) {
				let param = {};
				param.id = row.id;
				param.status = row.status ? 0 : 1;
				let res = await getEditRecommend(param);
				this.$message.success('操作成功');
				this.getRecommend();
			},
			/** 修改精彩推荐状态 */
			handleStatus(row) {
				let title = row.status ? '是否停用精彩推荐' : '是否启用精彩推荐'
				this.$confirm(title, '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let res = this.getEditRecommend(row)
				}).catch(() => {});
			},
			/*** 保存对话框 */
			async handleSumbit() {
				try{
					if(this.ruleForm.id){
						await getEditRecommend(this.ruleForm);
					}else{
						await getAddRecommend(this.ruleForm);
					}
					this.$message.success('操作成功');
					this.getRecommend();
					this.dialogVisible = false;
				}catch(e){
					//TODO handle the exception
				}
				
			},
			formatDateTime(value) {
				return value ? moment(value).format('YYYY-MM-DD HH:mm:ss') : '';
			},
			formatDate(value) {
				return value ? moment(value).format('YYYY-MM-DD') : '';
			},
			/** 获取列表数据 */
			async getRecommend() {
				this.loading = true;
				let param = {}
				param.pageNum = this.pageIndex;
				param.pageSize = this.pageSize;
				param.status = this.status_name;
				param.keyword = this.keyword;
				let res = await getFeedback(param);
				console.log('获取列表', res)
				this.pageCount = res.data.total;
				this.tableData = res.data.list;
				this.loading = false;
			},
			/** 取消对话框 */
			handleClose() {
				this.dialogVisible = false;
			},
			/** 搜索 */
			handelSearch() {
				this.getRecommend();
			},
			/** 重置 */
			handleReset() {
				this.pageIndex = 1;
				this.status_name = '';
				this.keyword = this.keyword;
				this.getRecommend();
			},
			/** 选择分页 */
			handleSizeChange(e) {
				this.pageSize = e;
				this.pageIndex = 1;
				this.getRecommend();
			},
			/** 点击分页 */
			handleCurrentChange(e) {
				this.pageIndex = e;
				this.getRecommend();
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
