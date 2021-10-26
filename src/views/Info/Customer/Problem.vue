<template>
	<div class="main">


		<div class="box flex ">
			<div class="problen-type ">
				<div class="problen-type-title bold">类型</div>
				<div class="problen-type-list ">
					<div class="problen-type-list-item flex fvertical " v-for="(item,index) in typeList" :key="index"
						@click="handleSwitch(item,index)">
						<div class="problen-type-list-item-conter flex fvertical "
							:class="index == current?'active':''">
							<img :src="item.imgUrl" />
							<span>{{item.name}}</span>
						</div>
						<i class="el-icon-edit-outline icon-size current" @click="handleEditType(item)"></i>
						<i class="el-icon-delete icon-size current" @click="handleDeleteType(item)"></i>
					</div>
				</div>
				<el-button type="primary" icon="el-icon-plus" class="problen-tables-add" @click="dialogVisible = true">
					添加类型</el-button>
			</div>
			<div class="problen-tables f1">
				<div class="problen-type-title bold">子问题</div>
				<el-button type="primary" icon="el-icon-plus" class="problen-tables-add" @click="isProblem = true">添加子问题
				</el-button>
				<el-table :data="tableData" border style="width: 100%">
					<el-table-column prop="title" label="标题">
					</el-table-column>
					<el-table-column label="操作">
						<template slot-scope="scope">
							<i class="el-icon-edit-outline icon-size current" @click="handleEditProblem(scope.row)"></i>
							<i class="el-icon-delete icon-size current" @click="handleDeteleProblem(scope.row)"></i>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</div>

		<!-- 添加类型 -->
		<el-dialog :title="editTypeData.id?'编辑':'添加'" :visible.sync="dialogVisible" width="800" :before-close="handleClose">
			<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px"
				class="demo-ruleForm">
				<el-form-item label="类型图片" prop="pass">
					<UploadsImg v-if="imgUrl" @handleLookImg="handleLookImg" @handleDeteleImg="handleDeteleImg"
						:imgUrl="imgUrl" />
					<Uploads v-else @handleAvatarSuccess="handleAvatarSuccess" />

				</el-form-item>
				<el-form-item label="类型名称" prop="name">
					<el-input type="text" v-model="ruleForm.name" maxlength="8" placeholder="请输入类型名称"
						></el-input>
				</el-form-item>
			</el-form>

			<span slot="footer" class="dialog-footer ">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="handleAddType">确 定</el-button>
			</span>
		</el-dialog>
		<!-- 添加类型end -->

		<!-- 添加子问题 -->
		<el-dialog :title="editData.id?'添加':'编辑'" :visible.sync="isProblem" width="800px" :before-close="handleCloseProblem">
			<el-form :model="problem" ref="problem" label-width="100px" class="demo-ruleForm">

				<el-form-item label="上级类型" prop="region">
					<el-select :disabled="editData.id" v-model="typeId" placeholder="请选择上级类型" style="width: 100%;">
						<!-- <el-option label="区域一" value="shanghai"></el-option>
						<el-option label="区域二" value="beijing"></el-option> -->
						<el-option :label="item.name" :value="item.id" v-for="(item,index) in typeList" :key="index">
						</el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="子问题名称" prop="name">
					<el-input v-model="title" placeholder="请输入子问题名称"></el-input>
				</el-form-item>
				<el-form-item label="子问题名称" prop="name">
					<Wangeditor @catchData="hadnleCatchData" ref="wangeditor" />

				</el-form-item>

			</el-form>

			<span slot="footer" class="dialog-footer ">
				<el-button @click="isProblem = false">取 消</el-button>
				<el-button type="primary" @click="handleProblemSbumit">确 定</el-button>
			</span>
		</el-dialog>
		<!-- 添加子问题end -->

		<!-- 查看图片 -->
		<!-- 查看图片end -->

	</div>
</template>

<script>
	import Wangeditor from '../../../components/Wangeditor/Wangeditor.vue'
	import Uploads from '../../../components/Upload/Pulibc.vue'
	import UploadsImg from '../../../components/UploadImg/UploadImg.vue'
	import {
		getQuestionType,
		getAddQuestionType,
		getEditQuestionType,
		getDeteleQuestionType,
		getQuestion,
		getAddQuestion,
		getEditQuestion,
		getDeteleQuestion
	} from '../../../api/user.js'
	export default {
		data() {
			return {
				typeList: [],
				isProblem: false,
				tableData: [],
				ruleForm: {
					name:""
				},
				dialogVisible: false,
				catchData: "",
				problem: {},
				current: 0,
				imgUrl: "", // 图片
				title:"",
				rules: {
					name: {
						required: true,
						message: '请输入类型名称',
						trigger: 'blur'
					},
				},
				typeId: null,
				editTypeData:{},
				editData:{}
			}
		},
		components: {
			Wangeditor,
			Uploads,
			UploadsImg
		},
		mounted() {
			this.getQuestionType();
		},
		watch: {
			dialogVisible(val) {
				if (!val) {
					this.getCloseTypeData();
					this.editTypeData = {};
				}
			},
			isProblem(val) {
				if(val){
					if(this.editData.id){
						setTimeout(()=>{
							this.$refs.wangeditor.setInfo(this.editData.content);
						},100)
					}
				}
				else {
					this.title = '';
					this.$refs.wangeditor.setInfo('');
					this.editData = {};
				}
			}
		},
		methods: {
			/** 点击编辑子问题 */
			handleEditProblem(e){
				this.$nextTick(()=>{})
				this.editData = JSON.parse(JSON.stringify(e));
				this.isProblem = true;
				this.title = e.title;
			},
			/**  删除子问题 */
			async getDeteleQuestion(id){
				try{
					let res = await getDeteleQuestion({id});
					this.$message.success('操作成功');
					this.getQuestion(this.typeId)
				}catch(e){
					//TODO handle the exception
					console.log(e)
				}
			},
			/** 点击删除子问题 */
			handleDeteleProblem(row){
				console.log(row)
				this.$confirm('是否确定删除该类型?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.getDeteleQuestion(row.id)
				}).catch(() => {})
			},
			/** 删除类型 */
			async getDeteleQuestionType(id) {
				let res = await getDeteleQuestionType({
					id
				});
				this.$message.success('操作成功');
				this.getQuestionType();
				this.current = 0;
			},
			/** 删除类型 */
			handleDeleteType(e) {
				this.$confirm('是否确定删除该类型?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.getDeteleQuestionType(e.id)
				}).catch(() => {});
			},
			/** 编辑类型 */
			handleEditType(e) {
				console.log(e)
				this.editTypeData = JSON.parse(JSON.stringify(e));
				this.imgUrl = e.imgUrl;
				this.ruleForm = this.editTypeData;
				this.dialogVisible = true;
				this.$forceUpdate()
				
			},
			/** 类型切换 */
			handleSwitch(item, index) {
				this.current = index;
				this.typeId = item.id;
				this.getQuestion(this.typeId)
				
			},
			/** 清空类型数据 */
			getCloseTypeData() {
				this.imgUrl = '';
				this.ruleForm = {};
			},
			/** 获取子问题列表 */
			async getQuestion(typeId) {
				let res = await getQuestion(typeId);
				console.log('获取子问题列表', res);
				this.tableData = res.data;
			},
			/** 添加类型 */
			async handleAddType() {
				this.$refs.ruleForm.validate((valid) => {
					if (valid) {
						this.getAddQuestionType();
					}
				})
			},
			/** 编辑类型 */
			
			/** 添加类型 */
			async getAddQuestionType() {
				try{
					let param = {};
					param.imgUrl = this.imgUrl;
					param.name = this.ruleForm.name;
					
					if(this.editTypeData.id){
						console.log('进入编辑')
						console.log(this.editTypeData)
						param.id = this.editTypeData.id;
						let res =  await getEditQuestionType(param)
					}else{
						let res = await getAddQuestionType(param);
					}
					console.log(param)
					this.$message.success('操作成功')
					this.getQuestionType();
					this.getCloseTypeData();
					this.dialogVisible = false;
				}catch(e){
					//TODO handle the exception
				}
			},
			/** 图片上传成功 */
			handleAvatarSuccess(file) {
				this.imgUrl = file;
			},
			/** 删除图片 */
			handleDeteleImg() {
				this.imgUrl = ''
			},
			/** 查看图片 */
			handleLookImg() {

			},
			/** 获取类型问题 */
			async getQuestionType() {
				let res = await getQuestionType();
				this.typeList = res.data;
				if (this.typeList.length > 0) {
					this.getQuestion(this.typeList[0].id)
					this.typeId = this.typeList[0].id;
					this.current = 0
				}
			},
			/** 添加子问题 */
			 handleProblemSbumit() {
				this.$nextTick(async()=>{
					let param = {};
					param.typeId = this.typeId;
					param.title = this.title;
					param.content = this.$refs.wangeditor.getInfo();
					// console.log(param);
					if(this.editData.id){
						param.id = this.editData.id;
						await getEditQuestion(param);
					}else{
						await getAddQuestion(param);
					}
					
					this.$message.success('操作成功');
					this.getQuestion(this.typeId);
					this.isProblem = false;
				})
			},
			/** 关闭类型 */
			handleClose() {
				this.dialogVisible = false;
			},
			/** 关闭子问题 */
			handleCloseProblem() {
				this.isProblem = false;
			},
			/** 回调方法 */
			hadnleCatchData(e) {
				console.log(e)
			}
		}
	}
</script>

<style lang="scss">
	.current {
		cursor: pointer;
	}

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

	.proble-radio {}

	.problen-tables {
		width: 100%;
	}

	.problen-tables-add {
		margin: 20px 0;
	}

	.problen-type-title {
		padding-bottom: 10px;
	}

	.icon-size {
		width: 30px;
		text-align: center;
		font-size: 22px;
	}

	.problen-type {
		width: 300px;
	}

	.problen-type-list {
		.problen-type-list-item {


			.problen-type-list-item-conter {
				&.active {
					border: 1px solid #0079FE;
				}

				border: 1px solid #ccc;
				// padding: 0 10px;
				width: 200px;
				margin-right: 15px;
				margin-bottom: 10px;
				padding: 5px;

				img {
					width: 40px;
					height: 40px;
				}

				span {
					padding-left: 10px;
				}
			}
		}
	}

	.problen-tables {
		border-left: 1px solid #CCCCCC;
		height: 75vh;
		margin-left: 20px;
		padding-left: 30px;
	}
</style>
