import axios from 'axios'
import {
	MessageBox,
	Message
} from 'element-ui'
import store from '@/store'
import {
	getToken
} from '@/utils/auth'
import uuid from 'node-uuid'
// create an axios instance
var that = this;
const service = axios.create({
	withCredentials: true, // send cookies when cross-domain requests
	// timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
	config => {
		// 在发送请求之前做的事
		if (store.getters.token) {
			// let each request carry token
			// ['X-Token'] 是一个自定义头部key
			// 请根据实际情况进行修改
			config.headers['X-Token'] = getToken()
		}
		config.headers['requestId'] = uuid.v4().replaceAll('-', '');
    // config.headers['content-type'] = 'application/x-www-form-urlencoded';
		return config
	},
	error => {
		// 请求出错的时候做的事
		console.log(error) // for debug
		return Promise.reject(error)
	}
)

// response interceptor
service.interceptors.response.use(
	/**
	 * 如果您想要获取http信息，如headers信息或status状态信息
	 * Please return  response => response
	 */

	/**
	 * 通过自定义代码确定请求状态
	 * 这里只是个例子
	 * 您还可以通过HTTP状态代码判断状态
	 */
	response => {
    // console.log(response)
		const res = response.data;
		console.log(res.code)
		if (res.code == 200) {
			return res;
		} else if (res.code == 401) {
			// this.$router.push(`/?redirect=${this.$route.fullPath}`)
      // this.$router.push('/')
     location.href = '/login'
			// store.dispatch('user/resetToken').then(() => {
			// 	location.reload()
			// })
		}else {
			  Message({
			    message: res.msg || 'Error',
			    type: 'error',
			    duration: 5 * 1000
			  })
			return Promise.reject(new Error(res.msg || 'Error'))
		}

		// 如果状态码不是20000，就会被判定为错误。
		// if(res.code == 200){
		// 	Message({
		// 	  message: res.msg,
		// 	  type: 'success',
		// 	  duration: 5 * 1000
		// 	})
		// }else{
		// 	 return res
		// }
		// if (res.code !== 200) {
		//   Message({
		//     message: res.message || 'Error',
		//     type: 'error',
		//     duration: 5 * 1000
		//   })

		//   // 50008: 非法令牌; 50012: 其他客户登录; 50014: 令牌失效;
		//   if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
		//     // to re-login
		//     MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
		//       confirmButtonText: 'Re-Login',
		//       cancelButtonText: 'Cancel',
		//       type: 'warning'
		//     }).then(() => {
		//       store.dispatch('user/resetToken').then(() => {
		//         location.reload()
		//       })
		//     })
		//   }
		//   return Promise.reject(new Error(res.message || 'Error'))
		// } else {
		//   return res
		// }
	},
	error => {
		console.log('err' + error) // for debug
		Message({
			message: error.message,
			type: 'error',
			duration: 5 * 1000
		})
		return Promise.reject(error)
	}
)

export default service
