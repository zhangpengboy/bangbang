<template>
	<div>
		<!-- <iframe class="iframe-contenr" src="http://192.9.200.45:8080/"></iframe> -->
		<el-button type="primary" @click="getLogin">登录</el-button>
	</div>
</template>

<script>
	export default {
		mounted() {
			this.getInit();
		},
		methods: {
			getInit() {
				if (!document.getElementById('qiniuJs')) { //避免多次引入
					const script = document.createElement('script');
					script.type = 'text/javascript';
					script.src = 'http://192.9.200.45:8080/js/jsw.js';
					script.id = 'qiniuJs';
					document.body.appendChild(script);

				}
			},
			getLogin() {
				jSW.swInit({
					url: "http://192.9.200.45:8080", // bv_nginx.exe服务器地址
					calltype: jSW.CallProtoType
					.AUTO, // AUTO: IE优先使用OCX, 如果希望IE仍然使用HTTP通信, 请使用jSW.CallProtoType.HTTP
				});
				
				
				this.$nextTick(()=>{
					let session = null
					session = new jSW.SWSession({
						server: 'http://192.9.200.45', // 如果是jSW.CallProtoType.OCX方式，这里需要填写具体的IP
						port: 9701,
						onopen: function(sess) {
							sess.swLogin({
								user: 'admin',
								password: '123456'
							});
						}
					});
					session.swAddCallBack('login', this.sessionCallback);
				})

			},
			sessionCallback(sender, event, json) {
				console.log(sender);
				console.log(event);
				console.log(json)
			}
		}
	}
</script>

<style>
	.iframe-contenr {
		width: 100%;
		height: 100vh;
	}
</style>
