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
 // 用户列表
export function getuserqueryPage(params) {
  return request({
    url: `/api/user/admin/common/v1.0/queryPage`,
    method: 'get',
    params
  })
}
// 企业查询分页
export function qiYeQueryPage(params) {
  return request({
    url: `/api/user/admin/enterprise/v1.0/queryPage`,
    method: 'get',
    params
  })
}
// 工人查询分页
export function gongRenQueryPage(params) {
  return request({
    url: `/api/user/admin/worker/v1.0/queryPage`,
    method: 'get',
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
export function getBriel(params) {
	return request({
		url: `/api/bill/v1.0/admin/brief`,
		params
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
		url: `/api/bill/v1.0/admin/brief/update`,
		method: 'post',
		data
	})
}
/**
 * 添加订单
 * @param {type} data 
 */
export function AddOrder(data) {
	return request({
		url: `/api/bill/v1.0/admin/order`,
		// url: `/api/v1.0/admin/order`,
		method: 'post',
		data
	})
}

/**
 * 查看需求单详情
 */
export function getBriefDetail(id){
	return request({
		// url: `/api/v1.0/admin/brief/detail`,
		url: `/api/bill/v1.0/admin/brief/detail`,
		params:{
			id
		}
	})
}

/**
 * 查看服务单详情
 */
export function getOrderDetail(id){
	return request({
		// url: `/api/v1.0/admin/brief/detail`,
		url: `/api/bill/v1.0/admin/order/detail`,
		params:{
			id
		}
	})
}

/**
 * 充值审核列表
 * @param {String} keywords 搜索内容
 * @param {Number} status 充值状态 
 * @param {Number} pageIndex 当前页码数
 * @param {Number} pageSize 页面大小
 */
export function getBriefPay(params){
	return request({
		// url: `/api/v1.0/admin/brief/detail`,
		url: `/api/bill/v1.0/admin/brief/pay`,
		params
	})
}

/**
 * 修改充值状态
 * @param {Number} id 要修改的字段
 * @param {String} reason 拒绝理由 
 * @param {Number} status 状态 0->等待到账,1->到账成功，2->拒绝
 */
export function getUpdateStatus(data){
	return request({
		url: `/api/bill/v1.0/admin/brief/pay/updateStatus`,
		method: 'post',
		data
	})
}

/**
 * 修改充值金额
 * @param {Number} id 要修改的字段
 * @param {String} fee 修改金额 
 */
export function getUpdateFee(data){
	return request({
		url: `/api/bill/v1.0/admin/brief/pay/updateFee`,
		method: 'post',
		data
	})
}


// /v1.0/admin/brief/detail

/*** 公共上传文件 */
 // uploadPublicFile(){

 // }
// export function getuserqueryPage(data) {
//   return request({
//     url: `/api/user/admin/common/v1.0/queryPage`,
//     method: 'post',
//     data
//   })
// }
// 修改用户状态:0.解冻,1.冻结---用户
export function updateUserStatus(params) {
  return request({
    url: `/api/user/admin/common/v1.0/updateUserStatus`,
    method: 'post',
    params
  })
}
// 修改用户状态:0.解冻,1.冻结---企业
export function qiyeupdateUserStatus(params) {
  return request({
    url: `/api/user/admin/enterprise/v1.0/updateUserStatus`,
    method: 'post',
    params
  })
}
// 修改用户状态:0.解冻,1.冻结---工人
export function gongrenupdateUserStatus(params) {
  return request({
    url: `/api/user/admin/worker/v1.0/updateUserStatus`,
    method: 'post',
    params
  })
}
// 身份证OCR并上传
export function uploadIdCard(data) {
  return request({
    url: `/api/commons/file/admin/v1/upload/idCard`,
    method: 'post',
    data
  })
}
// 查询单条数据(具体的数据结构看对应的企业/工人管理里面的详情接口) ---用户
export function queryById(params) {
  return request({
    url: `/api/user/admin/common/v1.0/queryById`,
    method: 'get',
    params
  })
}
// 查询单条数据(具体的数据结构看对应的企业/工人管理里面的详情接口) ---企业
export function enterQueryById(params) {
  return request({
    url: `/api/user/admin/enterprise/v1.0/queryById`,
    method: 'get',
    params
  })
}
// 查询单条数据(具体的数据结构看对应的企业/工人管理里面的详情接口) ---工人
export function gongrenQueryById(params) {
  return request({
    url: `/api/user/admin/worker/v1.0/queryById`,
    method: 'get',
    params
  })
}
// 修改工人端个人信息--用户
export function updateInfo(data) {
  return request({
    url: `/api/user/admin/common/v1.0/worker/update/info`,
    method: 'post',
    data
  })
}
// 修改工人端个人信息--工人
export function gongrenupdateInfo(data) {
  return request({
    url: `/api/user/admin/worker/v1.0/worker/update/info`,
    method: 'post',
    data
  })
}
// 替用户实名认证---用户
export function realNameAuth(data) {
  return request({
    url: `/api/user/admin/common/v1.0/realNameAuth`,
    method: 'post',
    data
  })
}
// 替用户实名认证---企业
export function qiYeRealNameAuth(data) {
  return request({
    url: `/api/user/admin/enterprise/v1.0/realNameAuth`,
    method: 'post',
    data
  })
}
// 替用户实名认证---工人
export function gongRenRealNameAuth(data) {
  return request({
    url: `/api/user/admin/worker/v1.0/realNameAuth`,
    method: 'post',
    data
  })
}
// 修改工人名片 --用户
export function bizCard(data) {
  return request({
    url: `/api/user/admin/common/v1.0/worker/update/bizCard`,
    method: 'post',
    data
  })
}

// 修改企业端个人信息(企业名片也是这个接口)--用户
export function userupdateInfo(data) {
  return request({
    url: `/api/user/admin/common/v1.0/enterprise/update/info`,
    method: 'post',
    data
  })
}
// 修改企业端个人信息(企业名片也是这个接口)--企业
export function qiYeupdateInfo(data) {
  return request({
    url: `/api/user/admin/enterprise/v1.0/enterprise/update/info`,
    method: 'post',
    data
  })
}

// 企业认证直接通过--用户
export function qiYeApply(data) {
  return request({
    url: `/api/user/admin/common/v1.0/enterprise/cert/apply`,
    method: 'post',
    data
  })
}
// 企业认证直接通过--企业
export function enterQiYeApply(data) {
  return request({
    url: `/api/user/admin/enterprise/v1.0/enterprise/cert/apply`,
    method: 'post',
    data
  })
}
// 导出当前查询条件下的所有数据,最多1w条--用户
export function exportCsvUser(params) {
  return request({
    url: `/api/user/admin/common/v1.0/exportCsv`,
    method: 'get',
    params,
    responseType: 'blob'
  })
}
// 导出当前查询条件下的所有数据,最多1w条--企业
export function exportCsvQiye(params) {
  return request({
    url: `/api/user/admin/enterprise/v1.0/exportCsv`,
    method: 'get',
    params,
    responseType: 'blob'
  })
}
// 导出当前查询条件下的所有数据,最多1w条--工人
export function exportCsvGongren(params) {
  return request({
    url: `/api/user/admin/worker/v1.0/exportCsv`,
    method: 'get',
    params,
    responseType: 'blob'
  })
}

// 工种、考勤、自我介绍、收款信息开始-----------------

// 工种查询分类
export function gettypeWorkClass(params) {
  return request({
    url: `/api/commons/admin/commonsLabel/v1.0/page`,
    method: 'get',
    params
  })
}
// 工种新增
export function insertOneTw(data) {
  return request({
    url: `/api/commons/admin/commonsLabel/v1.0/insertOne`,
    method: 'post',
    data
  })
}

// 工种or分类-修改
export function updateOneTw(data) {
  return request({
    url: `/api/commons/admin/commonsLabel/v1.0/updateOne`,
    method: 'post',
    data
  })
}
// 工种删除
export function removeOneTw(params) {
  return request({
    url: `/api/commons/admin/commonsLabel/v1.0/remove`,
    method: 'post',
    params
  })
}

// 考勤查询分类
export function getAttendanceClass(params) {
  return request({
    url: `/api/commons/admin/commonsAttendanceRange/v1.0/page`,
    method: 'get',
    params
  })
}
// 考勤新增
export function insertOneAttendance(data) {
  return request({
    url: `/api/commons/admin/commonsAttendanceRange/v1.0/insertOne`,
    method: 'post',
    data
  })
}
// 考勤修改
export function updateOneAttendance(data) {
  return request({
    url: `/api/commons/admin/commonsAttendanceRange/v1.0/updateOne`,
    method: 'post',
    data
  })
}
// 考勤删除
export function removeAttendance(params) {
  return request({
    url: `/api/commons/admin/commonsAttendanceRange/v1.0/remove`,
    method: 'post',
    params
  })
}
// 考勤修改状态
export function updateStatusAttendance(data) {
  return request({
    url: `/api/commons/admin/commonsAttendanceRange/v1.0/updateStatus`,
    method: 'post',
    data
  })
}

// 自我介绍模板查询分类
export function getSelfIntroduceClass(params) {
  return request({
    url: `/api/commons/admin/selfIntroTemplate/v1.0/page`,
    method: 'get',
    params
  })
}
// 自我介绍模板修改状态
export function updateStatusSelfIntroduce(data) {
  return request({
    url: `/api/commons/admin/selfIntroTemplate/v1.0/updateStatus`,
    method: 'post',
    data
  })
}
// 自我介绍模板新增
export function insertOneSelfIntroduce(data) {
  return request({
    url: `/api/commons/admin/selfIntroTemplate/v1.0/insertOne`,
    method: 'post',
    data
  })
}
// 自我介绍模板编辑
export function updateOneSelfIntroduce(data) {
  return request({
    url: `/api/commons/admin/selfIntroTemplate/v1.0/updateOne`,
    method: 'post',
    data
  })
}
// 自我介绍模板删除
export function removeSelfIntroduce(params) {
  return request({
    url: `/api/commons/admin/selfIntroTemplate/v1.0/remove`,
    method: 'post',
    params
  })
}

// 收款信息查询分类
export function getCollectionClass(params) {
  return request({
    url: `/api/commons/admin/commonsCollectionInformation/v1.0/page`,
    method: 'get',
    params
  })
}
// 收款信息修改状态
export function updateStatusCollection(data) {
  return request({
    url: `/api/commons/admin/commonsCollectionInformation/v1.0/updateStatus`,
    method: 'post',
    data
  })
}
// 收款信息新增
export function insertOneCollection(data) {
  return request({
    url: `/api/commons/admin/commonsCollectionInformation/v1.0/insertOne`,
    method: 'post',
    data
  })
}
// 收款信息编辑
export function updateOneCollection(data) {
  return request({
    url: `/api/commons/admin/commonsCollectionInformation/v1.0/updateOne`,
    method: 'post',
    data
  })
}
// 收款信息删除
export function removeCollection(params) {
  return request({
    url: `/api/commons/admin/commonsCollectionInformation/v1.0/remove`,
    method: 'post',
    params
  })
}

// 企业服务单列表
export function getOrderlist(params) {
  return request({
    url: `/api/bill/v1.0/admin/order/list`,
    method: 'get',
    params
  })
}
// 企业服务单列表详情
export function getOrderdetail(params) {
  return request({
    url: `/api/bill/v1.0/admin/order/detail`,
    method: 'get',
    params
  })
}


// 工种、考勤、自我介绍、收款信息结束--------------------
