<template>
	<div>
		<iframe class="iframe-contenr" v-if="src" :src="src"></iframe>
		<el-button type="primary" @click="getLogin">登录</el-button>
		<el-button type="primary" @click="testLogout">退出登录</el-button>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				session: null,
				statsu:false,
				src:"http://192.9.200.45:8080/ChromeClient/#/Monitor/Locate"
				
			}
		},
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


				this.$nextTick(() => {
					window.session = new jSW.SWSession({
						server: 'http://192.9.200.45', // 如果是jSW.CallProtoType.OCX方式，这里需要填写具体的IP
						port: 9701,
						onopen: function(sess) {
							sess.swLogin({
								user: 'admin',
								password: '123456'
							});
						}
					});
					
					window.session.swAddCallBack('login', this.sessionCallback);
					this.src = 'http://192.9.200.45:8080/ChromeClient/#/Monitor/Locate'
					// this.session.swAddCallBack('logout', this.sessionCallback);
				})

			},
			sessionCallback(sender, event, json) {
				console.log('sender',sender);
				console.log('event',event);
				console.log('json',json)
				
			},
			testLogout() {
				if (window.session) {
					window.session.swDispose();
				}
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
