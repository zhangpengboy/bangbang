<template>
	<div class="custome-table-item-conter-img" @mouseover="handleMouseoverImg" @mouseout="handleMouseoutImg">
		<el-image :src="imgUrl">
		</el-image>
		<div class="custome-table-item-conter-img-mask flex fvertical fcenter" v-show="current">
			<i class="el-icon-zoom-in" @click="handleLookImg()"></i>
			<i class="el-icon-delete" v-if="show" @click="handleDeteleImg()"></i>
		</div>

		
	</div>
</template>

<script>
	export default {
		props: {
			imgUrl: {
				type: String
			},
			show: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				current: false,
				dialogVisible:false,
			}
		},
		methods: {
			// 鼠标经过
			handleMouseoverImg() {
				this.current = true;
			},
			// 鼠标移出
			handleMouseoutImg() {
				this.current = false;
			},
			/** 查看图片 */
			handleLookImg() {
				this.$emit('handleLookImg')
				// this.dialogVisible = true
			},
			/** 删除图片 */
			handleDeteleImg() {
				this.$emit('handleDeteleImg')
			}
		}
	}
</script>

<style>
	.custome-table-item-conter-img-mask {
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.3);
		position: absolute;
		top: 0;
	}

	.custome-table-item-conter-img-mask i {
		font-size: 18px;
		color: #fff;
		cursor: pointer;
		margin-right: 5px;
	}

	.custome-table-item-conter-img {
		width: 60px;
		height: 60px;
		margin-left: 40px;
		position: relative;
	}

	.custome-table-item-conter-img img {
		width: 100%;
		height: 100%;
	}
</style>
