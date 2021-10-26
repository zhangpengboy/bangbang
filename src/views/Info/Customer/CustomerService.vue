<template>
	<div class="main custome">
		<div class="custome-top flex fbetween  fvertical">
			<span class="bold">客服信息</span>
			<el-button type="primary" v-if="!show" @click="handlesShowEdit">编辑</el-button>
		</div>
		<div class="custome-table">
			<div class="custome-table-item flex fvertical">
				<div class="custome-table-item-title">客服二维码</div>
				<div class="custome-table-item-conter f1" :class="!show?'active':''">

					<UploadsImg  v-if="imgUrl" @handleLookImg="handleLookImg" @handleDeteleImg="handleDeteleImg" :imgUrl="imgUrl" :show="show"  />

					<Uploads v-else :show="!show" @handleAvatarSuccess="handleAvatarSuccess" />

				</div>
			</div>

			<div class="custome-table-item flex fvertical">
				<div class="custome-table-item-title">客服微信</div>
				<div class="custome-table-item-conter f1" :class="!show?'active':''">
					<input type="" name="" id="" v-model="info.wechat" :disabled="!show" />
				</div>
			</div>

			<div class="custome-table-item flex fvertical">
				<div class="custome-table-item-title">客服热线</div>
				<div class="custome-table-item-conter f1" :class="!show?'active':''">
					<input type="" name="" id="" v-model="info.phone" :disabled="!show" />
				</div>
			</div>

			<div class="custome-table-item flex fvertical">
				<div class="custome-table-item-title">操作人</div>
				<div class="custome-table-item-conter f1" :class="!show?'active':''">
					<input type="" name="" id="" :disabled="true" v-model="info.updaterName" />
				</div>
			</div>

		</div>
		<div class="custome-btn flex fvertical fcenter" v-if="show">
			<el-button type="primary" @click="handleSumibt">保存</el-button>
			<el-button type="primary" plain @click="show = false">取消</el-button>
		</div>

		<el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
			<el-image :src="imgUrl">
			</el-image>
		</el-dialog>

	</div>
</template>

<script>
	import {
		getCustomerService,
		getEditCustomerService
	} from '../../../api/user.js'
	import Uploads from '../../../components/Upload/Pulibc.vue'
	import UploadsImg from '../../../components/UploadImg/UploadImg.vue'
	export default {
		data() {
			return {
				show: false,
				info: {},
				imgUrl: "",
				current: false,
				dialogVisible:false,
				editData:{}
			}
		},
		components: {
			Uploads,
			UploadsImg
		},
		watch:{
			show(val){
				if(!val){
					this.info = this.editData;
					this.imgUrl = this.editData.imgUrl
				}
			}
		},
		mounted() {
			this.getServiceInfo();
		},
		methods: {
			getCopyObj(copyObj){
				return JSON.parse(JSON.stringify(copyObj));
			},
			/** 关闭对话框 */
			handleClose(){
				this.dialogVisible = false
			},
			/** 显示编辑 */
			handlesShowEdit(){
				this.editData = this.getCopyObj(this.info);
				this.editData.imgUrl = this.getCopyObj(this.imgUrl);
				this.show = true;
			},
			/** 查看图片 */
			handleLookImg() {
				this.dialogVisible = true;
			},
			/** 删除图片 */
			handleDeteleImg() {
				this.imgUrl = '';
			},
			
			/** 获取客服信息 */
			async getServiceInfo() {
				let res = await getCustomerService();
				console.log('getServiceInfo::', res);
				this.info = res.data ? res.data : {},
					this.imgUrl = res.data.imgUrl ? res.data.imgUrl : ''
			},
			/** 图片上传成功 */
			handleAvatarSuccess(file) {
				this.imgUrl = file;
			},
			/** 保存客服信息 */
			async handleSumibt() {
				
				try {
					let param = this.info;
					param.imgUrl = this.imgUrl
					let res = await getEditCustomerService(param);
					this.$message.success('操作成功');
					this.show = false;
					this.getServiceInfo();
				} catch (e) {
					console.log('获取异常....')
					console.log(e)
					//TODO handle the exception
				}
			},

		}
	}
</script>

<style lang="scss" scoped>
	.custome {
		width: 800px;
	}

	

	.custome-top {
		height: 40px;
	}

	.custome-btn {
		margin-top: 20px;

		.el-button {
			width: 150px;
			margin-right: 20px;
		}
	}

	.custome-table {
		border: 1px solid #ccc;
		margin-top: 20px;

		.custome-table-item {
			background-color: #f1f1f1;
			border-bottom: 1px solid #ccc;

			&:nth-last-of-type(1) {
				border-bottom: none;
			}


			.custome-table-item-title {
				width: 120px;
				text-align: center;
			}

			.custome-table-item-conter {

				&.active {
					background-color: #f1f1f1;
				}

				background-color: #FFFFFF;
				border-left: 1px solid #ccc;


				.avatar {
					width: 60px;
					height: 60px;
					display: block;
				}

				img {
					width: 60px;
					height: 60px;
					// padding-left: 40;
					margin-left: 40px;
				}

				input {
					padding-left: 40px;
					padding: 15px;
					width: 100%;
					height: 100%;
					border: none;
					background: none;
					outline: none;

					&:focus {
						border: none !important;
					}
				}

			}
		}
	}
</style>
