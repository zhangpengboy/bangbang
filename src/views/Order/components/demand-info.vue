<template>
	<!-- 需求详情 -->
	<div class="demand-deltails">
		<div class="box-demand-title">需求单信息</div>
	
		<div class="demand-deltails-box">
	
			<div class="demand-deltails-box-item flex">
				<div class="demand-deltails-box-item-title">状态</div>
				<div class="demand-deltails-box-item-conter" v-if="info.status == 0">未发报价单</div>
				<div class="demand-deltails-box-item-conter" v-else-if="info.status == 1">已发报价单</div>
				<div class="demand-deltails-box-item-conter" v-else-if="info.status == 2">已取消</div>
				<div class="demand-deltails-box-item-conter" v-else-if="info.status == 3">已转至服务单</div>
	
			</div>
	
			<div class="demand-deltails-box-item flex">
				<div class="demand-deltails-box-item-title">姓名</div>
				<div class="demand-deltails-box-item-conter">{{info.createName }}</div>
			</div>
	
			<div class="demand-deltails-box-item flex">
				<div class="demand-deltails-box-item-title">联系方式</div>
				<div class="demand-deltails-box-item-conter">{{info.phone}}</div>
			</div>
			<div class="demand-deltails-box-item flex">
				<div class="demand-deltails-box-item-title">类型</div>
				<div class="demand-deltails-box-item-conter">{{info.type == 1 ?'工人推荐':'劳务分包'}}</div>
			</div>
	
			<div class="demand-deltails-box-item flex">
				<div class="demand-deltails-box-item-title">语音</div>
				<div class="demand-deltails-box-item-conter">
					<m-audio class="demand-deltails-box-item-mp3" :src="item.url" text="点这里播放"
						v-for="(item,index) in info.voices " :key="index">
					</m-audio>
				</div>
			</div>
	
			<div class="demand-deltails-box-item flex">
				<div class="demand-deltails-box-item-title">文字</div>
				<div class="demand-deltails-box-item-conter f1">
					{{info.content}}
				</div>
			</div>
			<div class="demand-deltails-box-item flex">
				<div class="demand-deltails-box-item-title">是否创建报价单</div>
				<div class="demand-deltails-box-item-conter">
					<span :class="info.orderId > 0?'':'color-error'">{{info.orderId >0?'已创建':'未创建'}}</span>
				</div>
			</div>
		</div>
	
	</div>
	<!-- 需求详情end -->
</template>

<script>
	export default{
		props:{
			info:{
				type:Object
			}
		}
	}

</script>

<style lang="scss">
	.demand-deltails-box {
		margin-top: 20px;
		border: 1px solid #E9E9E9;
	
		.demand-deltails-box-item {
			border-bottom: 1px solid #E9E9E9;
	
			&:nth-last-child(1) {
				border-bottom: none;
			}
	
			.demand-deltails-box-item-title {
				width: 160px;
				background-color: #f2f2f2;
				padding: 20px;
				text-align: right;
				font-size: 14px;
			}
	
			.demand-deltails-box-item-conter {
				padding: 20px;
				border-left: 1px solid #E9E9E9;
				font-size: 14px;
	
				.demand-deltails-box-item-mp3 {
					margin-right: 15px;
				}
			}
		}
	}
</style>
