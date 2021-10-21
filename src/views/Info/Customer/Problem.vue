<template>
	<div class="main">


		<div class="box flex ">
			<div class="problen-type ">
				<div class="problen-type-title bold">类型</div>
				<div class="problen-type-list flex fvertical">
					<div class="problen-type-list-item flex fvertical">
						<div class="problen-type-list-item-conter flex fvertical">
							<img src="" />
							<span>常见问题</span>
						</div>
						<i class="el-icon-edit-outline icon-size"></i>
						<i class="el-icon-delete icon-size"></i>
					</div>
				</div>
				<el-button type="primary" icon="el-icon-plus" class="problen-tables-add" @click="dialogVisible = true">
					添加类型</el-button>
			</div>
			<div class="problen-tables f1">
				<div class="problen-type-title bold">子问题</div>
				<el-button type="primary" icon="el-icon-plus" class="problen-tables-add" @click="isProblem = true">添加子问题</el-button>
				<el-table :data="tableData" border style="width: 100%">
					<el-table-column prop="date" label="标题">
					</el-table-column>
					<el-table-column label="操作">
						<template slot-scope="scope">
							<i class="el-icon-edit-outline icon-size"></i>
							<i class="el-icon-delete icon-size"></i>
						</template>
					</el-table-column>
				</el-table>

			</div>
		</div>

		<!-- 添加类型 -->
		<el-dialog title="提示" :visible.sync="dialogVisible" width="800" :before-close="handleClose">
			<el-form :model="ruleForm" status-icon ref="ruleForm" label-width="100px" class="demo-ruleForm">
				<el-form-item label="类型图片" prop="pass">
					<el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/"
						:show-file-list="false" >
						<img v-if="imageUrl" :src="imageUrl" class="avatar">
						<div v-else>
							<i class="el-icon-plus avatar-uploader-icon"></i>
						</div>
					</el-upload>

				</el-form-item>
				<el-form-item label="类型名称" prop="checkPass">
					<el-input type="text" v-model="ruleForm.checkPass" maxlength="8" placeholder="请输入类型名称"
						autocomplete="off"></el-input>
				</el-form-item>
			</el-form>

			<span slot="footer" class="dialog-footer ">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
			</span>
		</el-dialog>
		<!-- 添加类型end -->

		<!-- 添加子问题 -->
		<el-dialog title="提示" :visible.sync="isProblem" width="30%" :before-close="handleCloseProblem">
			
		</el-dialog>
		<!-- 添加子问题end -->
		
		<Wangeditor @catchData="hadnleCatchData" />

	</div>
</template>

<script>
	import Wangeditor from '../../../components/Wangeditor/Wangeditor.vue'
	export default {
		data() {
			return {
				isProblem: false,
				tableData: [{}],
				ruleForm: {},
				dialogVisible: false,
				catchData:"",
				imageUrl:"" // 图片路径
			}
		},
		components:{
			Wangeditor
		},
		methods: {
			/** 关闭类型 */
			handleClose() {
				this.dialogVisible = false;
			},
			/** 关闭子问题 */
			handleCloseProblem() {
				this.isProblem = false;
			},
			/** 回调方法 */
			hadnleCatchData(e){
				console.log(e)
			}
		}
	}
</script>

<style lang="scss">
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
	.problen-tables{
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

	.problen-type-list {
		.problen-type-list-item {

			.problen-type-list-item-conter {
				border: 1px solid #ccc;
				padding: 0 10px;
				margin-right: 15px;

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
