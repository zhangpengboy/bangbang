import request from '@/utils/request'
/**
 * 登录接口
 * @param {String} username 用户名
 * @param {String} password 密码  
 */
export function getLogin(params) {
	return request({
		url: `/api/user/public/v1.0/loginByPassword`,
		method: 'post',
		params
	})
}

export function getEcho() {
	return request({
		url: `/api/echo`
	})
}

export function getuserqueryPage(params) {
	return request({
		url: `/api/user/admin/common/v1.0/queryPage`,
		method: 'post',
		params
	})
}


/**
 * 获取企业需求单
 * @param {String} creator  用户ID/账号
 * @param {String} updator 跟进人ID/账号
 * @param {Number} pageIndex 当前页码数
 * @param {Number} pageSize 页面大小 
 */
export function getBriel(data) {
	return request({
		url: `/api/v1.0/admin/brief`,
		data
	})
}

/**
 * 更新需求单状态
 * @param {Number} id  当前列表ID
 * @param {Number} status 当前状态
 * @param {Number} contactStatus 设置联系状态
 */
export function UpdateBriel(data) {
	return request({
		url: `/api/v1.0/admin/brief/update`,
		method: 'post',
		data
	})
}


/*** 公共上传文件 */
 // uploadPublicFile(){
	 
 // }