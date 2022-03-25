<template>
	<view >
		<!-- <view class="title">请在下面输入签名：</view> -->
		<canvas class="mycanvas" canvas-id="mycanvas" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend"></canvas>
		<view class="footer">
			<view class="left" @click="finish">保存到相册</view>
			<view class="right" @click="clear">清除</view>
		</view>
	</view>
</template>

<script>
	var x = 20;
	var y =20;
	export default{
		data(){
			return {
				ctx:'',         //绘图图像
				points:[]       //路径点集合 
			}
		},
		onLoad() {
			this.ctx = uni.createCanvasContext("mycanvas",this);   //创建绘图对象
			
			//设置画笔样式
			this.ctx.lineWidth = 4;
			this.ctx.lineCap = "round"
			this.ctx.lineJoin = "round"
		},
		methods:{
			//触摸开始，获取到起点
			touchstart:function(e){
				let startX = e.changedTouches[0].x;
				let startY = e.changedTouches[0].y;
				let startPoint = {X:startX,Y:startY};
				this.points.push(startPoint);
				//每次触摸开始，开启新的路径
				this.ctx.beginPath();
			},
			
			//触摸移动，获取到路径点
			touchmove:function(e){
				let moveX = e.changedTouches[0].x;
				let moveY = e.changedTouches[0].y;
				let movePoint = {X:moveX,Y:moveY};
				this.points.push(movePoint);       //存点
				let len = this.points.length;
				if(len>=2){
					this.draw();                   //绘制路径
				}
				
			},
			
			// 触摸结束，将未绘制的点清空防止对后续路径产生干扰
			touchend:function(){                   
				this.points=[];
			},
			
			/* ***********************************************
			#   绘制笔迹
			#	1.为保证笔迹实时显示，必须在移动的同时绘制笔迹
			#	2.为保证笔迹连续，每次从路径集合中区两个点作为起点（moveTo）和终点(lineTo)
			#	3.将上一次的终点作为下一次绘制的起点（即清除第一个点）
			************************************************ */
			draw: function() {
				let point1 = this.points[0]
				let point2 = this.points[1]
				this.points.shift()
				this.ctx.moveTo(point1.X, point1.Y)
				this.ctx.lineTo(point2.X, point2.Y)
				this.ctx.stroke()
				this.ctx.draw(true)
			},
			
			//清空画布
			clear:function(){
				let that = this;
				uni.getSystemInfo({
					success: function(res) {
						let canvasw = res.windowWidth;
						let canvash = res.windowHeight;
						that.ctx.clearRect(0, 0, canvasw, canvash);
						that.ctx.draw(true);
					},
				})
			},
			
			//完成绘画并保存到本地
			finish:function(){
				uni.canvasToTempFilePath({
				  canvasId: 'mycanvas',
				  success: function(res) {
					  console.log(res)
				    let path = res.tempFilePath;
					uni.saveImageToPhotosAlbum({
						filePath:path,
					})
				  } 
				})
			}
		},
	}
</script>

<style>
	.title{
		height:50upx;
		line-height: 50upx;
		font-size: 16px;
	}
	.mycanvas{
		width: 100%;
		height: calc(100vh - 200upx);
		background-color: #ECECEC;
	}
	.footer{
		font-size: 16px;
		height: 150upx;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}
	.left,.right{
		line-height: 100upx;
		height: 100upx;
		width: 250upx;
		text-align: center;
		font-weight: bold;
		color: white;
		border-radius: 5upx;
	}
	.left{
		background: #007AFF;
	}
	.right{
		background:orange;
	}
</style>

