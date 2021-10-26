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
						<el-select v-model="type_name" placeholder="全部" clearable>
							<el-option v-for="item in typeList" :key="item.value" :label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
					</div>

					<div class="flex fvertical top-content-item-status" clearable>
						<span>位置：</span>
						<el-select v-model="address_name" placeholder="全部">
							<el-option v-for="item in addressList" :key="item.value" :label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
					</div>

					<div class="flex fvertical top-content-item-status" clearable>
						<span>状态：</span>
						<el-select v-model="status_name" placeholder="全部">
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

				<el-table-column prop="sorted" label="排序" width="100">
				</el-table-column>
				<el-table-column prop="title" label="标题">
				</el-table-column>
				<el-table-column label="Banner图">
					<template slot-scope="scope">
						<img :src="scope.row.imgUrl " style="width: 100px;height: 100px;">
					</template>
				</el-table-column>
				<el-table-column label="类型">
					<template slot-scope="scope">
						<p v-if="scope.row.type  == 1">无跳转</p>
						<p v-if="scope.row.type  == 2">外部链接</p>
					</template>
				</el-table-column>
				<el-table-column prop="link" label="链接">
				</el-table-column>
				<el-table-column label="位置">
					<template slot-scope="scope">
						<p v-if="scope.row.scene  == 1">工人端</p>
						<p v-if="scope.row.scene  == 2">企业端-首页</p>
						<p v-if="scope.row.scene  == 3">企业端-我的</p>
					</template>
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
					<template slot-scope="scope">
						<p v-if="scope.row.status == 0" style="color: red;">停用</p>
						<p v-if="scope.row.status == 1">启用</p>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="220">
					<template slot-scope="scope">
						<el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
						<el-button type="text" @click="handleStatus(scope.row)">{{scope.row.status?'停用':'启用'}}
						</el-button>
						<el-button type="text" @click="handleDetele(scope.row)">删除</el-button>
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


		<el-dialog :title="editData.id?'编辑':'添加'" :visible.sync="dialogVisible" width="600px" :before-close="handleClose">


			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				<el-form-item label="banner图片" prop="name">
					<UploadImg v-if="ruleForm.imgUrl" :imgUrl="ruleForm.imgUrl" />
					<Uploads v-else @handleAvatarSuccess="handleAvatarSuccess" />
				</el-form-item>
				<el-form-item label="标题" prop="region">
					<el-input type="text" v-model="ruleForm.title" placeholder="请输入banner标题" maxlength="15"></el-input>
				</el-form-item>
				<el-form-item label="类型" prop="region">
					<el-select v-model="ruleForm.type" placeholder="请选择类型" style="width: 100%;">
						<el-option :label="item.label" :value="item.value" v-for="(item,index) in typeList"
							:key="index"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="链接" prop="region">
					<el-input type="texrt" v-model="ruleForm.link" placeholder="请输入跳转链接"></el-input>
				</el-form-item>
				<el-form-item label="位置" prop="region">
					<el-select v-model="ruleForm.scene" placeholder="请选择位置" style="width: 100%;">
						<el-option :label="item.label" :value="item.value" v-for="(item,index) in addressList"
							:key="index"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="排序" prop="region">
					<el-input type="texrt" v-model="ruleForm.sorted" placeholder="请输入数值，数值越大，排序越前"></el-input>
				</el-form-item>


			</el-form>

			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="handleSumibt">确 定</el-button>
			</span>
		</el-dialog>



	</div>
</template>
<script>
	import {
		getBanner,
		getSingleBanner,
		getAddBanner,
		getEditBanner,
		getUpdateStatusBanner,
		getDeteleBanner
	} from '../../api/user.js'
	import moment from 'moment'
	import Uploads from '../../components/Upload/Pulibc.vue'
	import UploadImg from '../../components/UploadImg/UploadImg.vue'
	export default {
		data() {
			return {
				pageIndex: 1,
				pageSize: 10,
				pageCount: 0,
				keyword: "", // 搜索
				typeList: [{
						label: '无跳转',
						value: 1
					}, {
						label: '外部链接',
						value: 2
					},

				], // 类型列表
				type_name: "", // 选中类型
				address_name: "", // 位置名称
				addressList: [{
					label: '工人端',
					value: 1
				}, {
					label: '企业端-首页',
					value: 2
				}, {
					label: '企业端-我的',
					value: 3
				}], // 位置列表
				status_name: "", // 选中状态
				statusList: [{
					label: '停用',
					value: 0
				}, {
					label: '启用',
					value: 1
				}],
				dialogVisible: false,
				ruleForm: {
					id: null,
					imgUrl: "",
					link: "",
					scene: "",
					sorted: "",
					title: "",
					type: ""
				},
				rules: {},
				imageUrl: "",
				tableData: [],
				editData:{}
			}
		},
		components: {
			Uploads,
			UploadImg
		},
		mounted() {
			this.getBanner()
		},
		watch: {
			dialogVisible(val) {
				if (!val) {
					this.ruleForm = {
						id: null,
						imgUrl: "",
						link: "",
						scene: "",
						sorted: "",
						title: "",
						type: ""
					}
				}
			}
		},
		methods: {
			/** 图片编辑 */
			handleEdit(row) {
				this.editData = JSON.parse(JSON.stringify(row));
				this.dialogVisible = true;
				this.ruleForm = this.editData;
			},
			/** 删除轮播图 */
			async getDeteleBanner(id) {
				let res = await getDeteleBanner({
					id
				});
				this.$message.success('操作成功');
				if (this.tableData.length == 1 && this.pageIndex > 1) {
					this.pageIndex -= 1;
				}
				this.getBanner();
			},
			/** 删除轮播图 */
			handleDetele(row) {
				this.$confirm('是否删除Banner', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let res = this.getDeteleBanner(row.id)
				}).catch(() => {});
			},
			/** 获取修改轮播图状态方法*/
			async getUpdateStatusBanner(row) {
				let param = {};
				param.id = row.id;
				param.status = row.status ? 0 : 1;
				let res = await getUpdateStatusBanner(param);
				this.$message.success('操作成功');
				this.getBanner();
			},
			/** 修改轮播图状态 */
			handleStatus(row) {
				let title = row.status ? '是否停用Banner' : '是否启用Banner'
				this.$confirm(title, '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let res = this.getUpdateStatusBanner(row)
				}).catch(() => {});
			},
			/** 添加轮播图 */
			async getAddBanner() {
				try {
					if (this.ruleForm.id) {
						await getEditBanner(this.ruleForm);
					} else {
						await getAddBanner(this.ruleForm);
					}
					this.$message.success('操作成功');
					this.dialogVisible = false;
					this.getBanner();
				} catch (e) {
					//TODO handle the exception
				}
			},
			/** 添加轮播图 */
			handleSumibt() {
				this.getAddBanner();
			},
			/** 图片上传成功 */
			handleAvatarSuccess(imgUrl) {
				this.ruleForm.imgUrl = imgUrl;
			},
			formatDateTime(value) {
				return value ? moment(value).format('YYYY-MM-DD HH:mm:ss') : '';
			},
			formatDate(value) {
				return value ? moment(value).format('YYYY-MM-DD') : '';
			},
			/** 获取轮播图列表 */
			async getBanner() {
				let param = {};
				param.pageNum = this.pageIndex;
				param.pageSize = this.pageSize;
				param.status = this.status_name;
				param.keyword = this.keyword;
				param.type = this.type_name;
				param.scene = this.address_name;
				let res = await getBanner(param);
				console.log(res)
				this.pageCount = res.data.total;
				this.tableData = res.data.list;
			},
			/** 取消对话框 */
			handleClose() {
				this.dialogVisible = false;
			},
			/** 搜索 */
			handelSearch() {
				this.getBanner();
			},
			/** 重置 */
			handleReset() {
				this.status_name = '';
				this.keyword = '';
				this.type_name = '';
				this.address_name = '';
				this.getBanner();
			},
			/** 选择分页 */
			handleSizeChange(e) {
				this.pageSize = e;
				this.pageIndex = 1;
				this.getBanner();
			},
			/** 点击分页 */
			handleCurrentChange(e) {
				this.pageIndex = e;
				this.getBanner();
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
