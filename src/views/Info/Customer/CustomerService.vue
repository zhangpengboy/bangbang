<template>
	<div class="main custome">
		<div class="custome-top flex fbetween  fvertical">
			<span class="bold">客服信息</span>
			<el-button type="primary" v-if="!show" @click="show = true">编辑</el-button>
		</div>
		<div class="custome-table">
			<div class="custome-table-item flex fvertical">
				<div class="custome-table-item-title">客服二维码</div>
				<div class="custome-table-item-conter f1" :class="!show?'active':''">
					<!-- <img src="" alt=""> -->

					<el-upload :disabled="!show" class="avatar-uploader"
						action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false"
						:on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
						<img v-if="imageUrl" :src="imageUrl" class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>

				</div>
			</div>

			<div class="custome-table-item flex fvertical">
				<div class="custome-table-item-title">客服微信</div>
				<div class="custome-table-item-conter f1" :class="!show?'active':''">
					<input type="" name="" id="" value="SiTuKaiYang93" :disabled="!show" />
				</div>
			</div>

			<div class="custome-table-item flex fvertical">
				<div class="custome-table-item-title">客服热线</div>
				<div class="custome-table-item-conter f1" :class="!show?'active':''">
					<input type="" name="" id="" value="17665451752" :disabled="!show" />
				</div>
			</div>

			<div class="custome-table-item flex fvertical">
				<div class="custome-table-item-title">操作人</div>
				<div class="custome-table-item-conter f1" :class="!show?'active':''">
					<input type="" name="" id="" value="客服A" :disabled="!show" />
				</div>
			</div>

		</div>
		<div class="custome-btn flex fvertical fcenter" v-if="show">
			<el-button type="primary">保存</el-button>
			<el-button type="primary" plain @click="show = false">取消</el-button>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				imageUrl: ""
			}
		},
		methods: {
			handleAvatarSuccess(res, file) {
				this.imageUrl = URL.createObjectURL(file.raw);
			},
			beforeAvatarUpload(file) {
				const isJPG = file.type === 'image/jpeg' || 'image/png';
				const isLt2M = file.size / 1024 / 1024 < 2;

				if (!isJPG) {
					this.$message.error('上传头像图片只能是 JPG或者png 格式!');
				}
				if (!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isJPG && isLt2M;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.custome {
		width: 800px;
	}
	.custome-top{
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

				.avatar-uploader {
					padding: 10px 0 10px 20px;

					.el-upload {
						border: 1px dashed #d9d9d9;
						border-radius: 6px;
						cursor: pointer;
						position: relative;
						overflow: hidden;
					}
				}

				.avatar-uploader .el-upload:hover {
					border-color: #409EFF;
				}

				.avatar-uploader-icon {
					font-size: 28px;
					color: #8c939d;
					width: 60px;
					height: 60px;
					line-height: 60px;
					text-align: center;
					border: 1px dashed #d9d9d9;
					border-radius: 6px;
				}

				.avatar {
					width: 60px;
					height: 60px;
					display: block;
				}

				img {
					width: 60px;
					height: 60px;
					background-color: #0000FF;
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
