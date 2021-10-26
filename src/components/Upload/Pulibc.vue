<template>
	<el-upload :disabled="show" v-loading="loading" class="avatar-uploader" action="/api/commons/file/admin/v1/upload/public" :data='{"watermarkSkip":true}'
		:show-file-list="false" name="multipartFile" :on-progress="handleProgress" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
		<i class="el-icon-plus avatar-uploader-icon"></i>
	</el-upload>
</template>

<script>
	export default {
		props:{
			show:{
				type:Boolean
			}
		},
		
		data(){
			return{
				loading:false
			}
		},

		methods: {
			beforeAvatarUpload(file) {
				const isJPG = file.type === 'image/jpeg' || 'image/png';
				const isLt2M = file.size / 1024 / 1024 < 2;
				if (!isJPG) {
					this.$message.error('上传图片只能是 JPG或者png 格式!');
				}
				if (!isLt2M) {
					this.$message.error('上传头片大小不能超过 2MB!');
				}
				return isJPG && isLt2M;
			},
			/** 上传中 */
			handleProgress(){
				this.loading = true;
			},
			handleAvatarSuccess(res, file) {
				console.log(file);
				this.loading = false;
				if(file.response.code != 200){
					return this.$message.error('上传失败')
				}
				this.$emit('handleAvatarSuccess',file.response.data)
				// this.imageUrl = URL.createObjectURL(file.raw);
			},
		}
	}
</script>

<style>
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
</style>
