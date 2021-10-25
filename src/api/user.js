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
 * @param {Number} type   劳务派遣 -> 1 劳务分包 -> 2
 * @param {String} address 地区
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
export function getBriefDetail(id) {
	return request({
		// url: `/api/v1.0/admin/brief/detail`,
		url: `/api/bill/v1.0/admin/brief/detail`,
		params: {
			id
		}
	})
}

/**
 * 查看服务单详情
 * @param {Number} id 服务单id
 */
export function getOrderDetail(id) {
	return request({
		// url: `/api/v1.0/admin/brief/detail`,
		url: `/api/bill/v1.0/admin/order/detail`,
		params: {
			id
		}
	})
}

/**
 * 充值审核列表
 * @param {String} keywords 搜索内容
 * @param {Number} status 充值状态
 * @param {Number} orderId 服务单id 不传查询全部
 * @param {Number} pageIndex 当前页码数
 * @param {Number} pageSize 页面大小
 */
export function getBriefPay(params) {
	return request({
		// url: `/api/v1.0/admin/brief/detail`,
		url: `/api/bill/v1.0/admin/brief/pay`,
		params
	})
}

/**
 * 开票列表
 * @param {String} keywords 搜索内容
 * @param {Number} status 状态
 * @param {Number} pageIndex 当前页码数
 * @param {Number} pageSize 页面大小
 */
export function getInvoice(params) {
	return request({
		url: `/api/bill/v1.0/admin/brief/invoice`,
		params
	})
}
/**
 * 发票状态修改
 */
export function postInvoiceStatus(data) {
	return request({
		url: `/api/bill/v1.0/admin/brief/invoice/update`,
		method: 'post',
		data
	})
}
/**
 * 发票详情
 */
export function getInvoiceDetail(params) {
	return request({
		url: `/api/bill/v1.0/admin/brief/invoice/detail`,
		params
	})
}
/**
 * 修改充值状态
 * @param {Number} id 要修改的字段
 * @param {String} reason 拒绝理由
 * @param {Number} status 状态 0->等待到账,1->到账成功，2->拒绝
 */
export function getUpdateStatus(data) {
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
export function getUpdateFee(data) {
	return request({
		url: `/api/bill/v1.0/admin/brief/pay/updateFee`,
		method: 'post',
		data
	})
}

/*** 企业端修改工人查看状态 */
export function getUpdateReviewStatus(data) {
	return request({
		url: `/api/bill/v1.0/admin/order/updateReviewStatus`,
		method: 'post',
		data
	})
}

/**
 *  修改服务单状态
 * @param {Number} id 当前列表ID
 * @param {Number} status  ->未招工，2->报名中,3->进行中，4->已结束,5->已关闭
 * */
export function getServiceUpdateStatus(data) {
	return request({
		url: `/api/bill/v1.0/admin/order/updateStatus`,
		method: 'post',
		data
	})
}

/**
 * 成员名单列表
 * @param {String} teamTypeId 模板id
 * */
export function getMembers(params) {
	return request({
		url: `/api/bill/v1.0/admin/brief/enroll/members`,
		params
	})
}
/**
 * 任务奖励列表
 * 
 * */
export function getReward(params) {
	return request({
		url: `/api/bill/v1.0/admin/brief/order/reward`,
		params
	})
}

/**
 * 任务奖励列表 -- 提交数据
 * 
 * */
export function postReward(data) {
	return request({
		url: `/api/bill/v1.0/admin/brief/order/reward`,
		method: 'post',
		data
	})
}
/**
 * 任务奖励列表 -- 历史数据
 * 
 * */
export function getRewardlog(params) {
	return request({
		url: `/api/bill/v1.0/admin/brief/order/reward/log`,
		params
	})
}

/**
 * 详细报名数据
 * @param {String} orderId  订单id
 * */
export function getMembersList(params) {
	return request({
		url: `/api/bill/v1.0/admin/brief/enroll/memberList`,
		params
	})
}

/**
 * 浏览记录
 * @param {String} orderId  订单id
 * */
export function getBrowseList(params) {
	return request({
		url: `/api/bill/v1.0/admin/brief/enroll/browseList`,
		params
	})
}


/**
 * 取消-成员报名
 * @param {Number} id 用户id
 * @param {Number} status 用户状态
 * */
export function getMembersEnrollCancel(data) {
	return request({
		url: `/api/bill/v1.0/admin/brief/enroll/cancel`,
		method: 'post',
		data
	})
}

/**
 * 订单工种(成员)列表
 * @param {String} orderId  订单id
 * @param {String} teamTypeName 工种名称
 * @param {String} teamTypeTag 工种标签
 * @param {Number} status 招工状态
 */
export function getOrderTeamType(params) {
	return request({
		url: `/api/bill//v1.0/admin/order/orderTeamType`,
		params
	})
}

/**
 * 修改服务单
 * @param {Object}
 * */
export function getUpdateOrder(data) {
	return request({
		url: `/api/bill/v1.0/admin/order/update`,
		method: 'post',
		data
	})
}

/**
 * 获取取消报名审核列表
 * @param {String} keywords 搜索内容
 * @param {Number} status 状态
 * @param {Number} pageIndex 当前页码数
 * @param {Number} pageSize 页面大小
 * */
export function getExamieList(params) {
	return request({
		url: `/api/bill/v1.0/admin/brief/cancel`,
		params
	})
}

/**
 * 修改取消报名审核状态
 * @param {Number} id 当前列表ID
 * @param {Number} status 状态 1 是通过  2是拒绝
 * */
export function getUpdateExamieList(data) {
	return request({
		url: `/api/bill/v1.0/admin/brief/cancel`,
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
// 身份证OCR并上传--阿里
export function uploadIdCardByAli(data) {
	return request({
		url: `/api/commons/file/admin/v1/upload/idCardByAli`,
		method: 'post',
		data
	})
}
// 通过文件uri获取私有文件,uri为文件目录+文件名+后缀,以临时url的形式下载文件,一小时有效
export function getPreSignFile(params) {
	return request({
		url: `/api/commons/file/admin/v1/getPreSignFile`,
		method: 'get',
		params
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
// 修改工人名片 --工人
export function workerBizCard(data) {
	return request({
		url: `/api/user/admin/worker/v1.0/worker/update/bizCard`,
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
/** 查询所有工种 */
export function gettypeWorkAllClass() {
	return request({
		url: `/api/commons/admin/commonsLabel/v1.0/queryAllChild`,
	})
}

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

// 查询工种所有
export function getgongzhong(params) {
	return request({
		url: `/api/commons/worker/commonsLabel/v1.0/page`,
		method: 'get',
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

// 查询自我介绍
export function getbiref(params) {
	return request({
		url: `/api/commons/worker/selfIntroTemplate/v1.0/page`,
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


// 添加工作名片---用户
export function workCardAdd(data) {
	return request({
		url: `/api/user/admin/common/v1.0/workCard/label/add`,
		method: 'post',
		data
	})
}
// 添加工作名片---工人
export function workCardAddGongRen(data) {
	return request({
		url: `/api/user/admin/worker/v1.0/workCard/label/add`,
		method: 'post',
		data
	})
}
// 删除工作名片---用户
export function workCardRemove(data) {
	return request({
		url: `/api/user/admin/common/v1.0/workCard/label/remove`,
		method: 'post',
		data
	})
}
// 删除工作名片---工人
export function workCardRemoveGongRen(data) {
	return request({
		url: `/api/user/admin/worker/v1.0/workCard/label/remove`,
		method: 'post',
		data
	})
}
// 上传文件到公共bucket
export function uploadpublic(data) {
	return request({
		url: `/api/commons/file/admin/v1/upload/public`,
		method: 'post',
		data
	})
}

// 访问统计列表
export function visitList(params) {
	return request({
		url: `/api/user/admin/userLoginLog/v1.0/page`,
		method: 'get',
		params
	})
}
// 导出访问统计列表
export function visitListexportCsv(params) {
	return request({
		url: `/api/user/admin/userLoginLog/v1.0/exportCsv`,
		method: 'get',
		params,
		responseType: 'blob'
	})
}
// 访问统计列表折线图
export function visitListcount(params) {
	return request({
		url: `/api/user/admin/userLoginLog/v1.0/count`,
		method: 'get',
		params
	})
}
// 根据需求单总数和服务单总数查找企业信息
export function getByOrderAndBrief(params) {
	return request({
		url: `/api/bill/v1.0/admin/brief/getByOrderAndBrief`,
		method: 'get',
		params
	})
}
/**
 * 合伙人列表
 * @param {Number} pageNum 页码
 * @param {Number} pageSize  页面大小
 * @param {Number} status 账号状态（0：正常 1:冻结；；不传该参数查全部状态）
 * @param {String} keyword  搜索关键字（用户ID/账号）
 * @param {String} provinceName 地省名称
 * @param {String} provinceCode 地省编码
 * @param {String} areaCode 地区编码
 * @param {String} cityCode 地市编码
 * @param {String} cityName 地市名称
 */
export function getPartnerList(params) {
	return request({
		url: `/api/marketing/admin/marketing/partner/v1.0.1/page`,
		params
	})
}

/**
 * 合伙人导出
 * @param {Number} pageNum 页码
 * @param {Number} pageSize  页面大小
 * @param {Number} status 账号状态（0：正常 1:冻结；；不传该参数查全部状态）
 * @param {String} keyword  搜索关键字（用户ID/账号）
 * @param {String} provinceName 地省名称
 * @param {String} provinceCode 地省编码
 * @param {String} areaCode 地区编码
 * @param {String} cityCode 地市编码
 * @param {String} cityName 地市名称
 */
export function getPartnerExport(params) {
	return request({
		url: `/api/marketing/admin/marketing/partner/v1.0.1/export`,
		params,
		responseType: 'blob'
	})
}

/**
 * 合伙人详情
 * @param {Number} userId  当前用户ID
 */
export function getPartnerDetails(userId) {
	return request({
		url: `/api/marketing/admin/marketing/partner/v1.0.1/get/${userId}`,
	})
}

/**
 * 修改合伙人状态
 * @param {Number} id 当前列表id
 * @param {Number} status 状态
 * @param {String} reason 理由
 *  */
export function getPartnerUpdateStatus(data) {
	return request({
		url: `/api/marketing/admin/marketing/partner/v1.0.1/updateStatus`,
		method: 'post',
		data
	})
}


/**
 * 合伙人-账单详情（已获得收入，未结算收入）
 * @param {Number} pageNum 页码
 * @param {Number} pageSize  页面大小
 * @param {Number} status 收益状态（0：已获得收入 1：未结算收入；；不传该参数查全部状态）
 * @param {String} keyword  搜索关键字（用户ID/账号）
 * @param {Number} type 收益类型（0：完成认证奖励 1：施工费用分佣；；不传该参数查全部类型）
 * @param {Number} userId 用户ID 
 *  */
export function getIncomeDetail(params) {
	return request({
		url: `/api/marketing/admin/marketing/partner/incomeDetail/v1.0.1/page`,
		params
	})
}

// 实名认证申请列表
export function userRealNameApplyPage(params) {
	return request({
		url: `/api/user/admin/userRealNameApply/v1.0/page`,
		method: 'get',
		params
	})
}
// 实名认证申请导出
export function userRealNameApplyexportCsv(params) {
	return request({
		url: `/api/user/admin/userRealNameApply/v1.0/exportCsv`,
		method: 'get',
		params,
		responseType: 'blob'
	})
}
// 实名认证申请修改状态
export function userRealNameApplyupdateStatus(data) {
	return request({
		url: `/api/user/admin/userRealNameApply/v1.0/updateStatus`,
		method: 'post',
		data
	})
}
// 实名认证申请详情
export function userRealNameApplyone(params) {
	return request({
		url: `/api/user/admin/userRealNameApply/v1.0/one`,
		method: 'get',
		params
	})
}
// 用户会员升级-审计审核-列表
export function userUpgradeApplyPage(params) {
	return request({
		url: `/api/user/admin/userUpgradeApply/v1.0/page`,
		method: 'get',
		params
	})
}
// 用户会员升级-审计审核-审核
export function userUpgradeApplyupdateStatus(data) {
	return request({
		url: `/api/user/admin/userUpgradeApply/v1.0/updateStatus`,
		method: 'post',
		data
	})
}

// 用户会员申请表-认证工人审核-列表
export function userMemberApplyPage(params) {
	return request({
		url: `/api/user/admin/userMemberApply/v1.0.1/page`,
		method: 'get',
		params
	})
}
// 用户会员申请表-认证工人审核-导出
export function userMemberApplyexportCsv(params) {
	return request({
		url: `/api/user/admin/userMemberApply/v1.0.1/exportCsv`,
		method: 'get',
		params,
		responseType: 'blob'
	})
}
// 用户会员申请表-认证工人审核-审核
export function userMemberApplyupdateStatus(data) {
	return request({
		url: `/api/user/admin/userMemberApply/v1.0.1/updateStatus`,
		method: 'post',
		data
	})
}
// 系统设置-获取奖励设置信息接口
export function awardSettingGet(params) {
	return request({
		url: `/api/marketing/admin/marketing/setting/v1.0.2/get`,
		method: 'get',
		params
	})
}
// 获取省市区
export function getregion(params) {
	return request({
		url: `/api/commons/common/region/v1.0.1/`,
		method: 'get',
		params
	})
}
// 系统设置-邀请奖励设置信息接口
export function awardSettingupdateOne(data) {
	return request({
		url: `/api/marketing/admin/marketing/setting/v1.0.2/update`,
		method: 'post',
		data
	})
}
/**
 * 合伙人-账单详情-导出（已获得收入，未结算收入）
 * @param {Number} pageNum 页码
 * @param {Number} pageSize  页面大小
 * @param {Number} status 收益状态（0：已获得收入 1：未结算收入；；不传该参数查全部状态）
 * @param {String} keyword  搜索关键字（用户ID/账号）
 * @param {Number} type 收益类型（0：完成认证奖励 1：施工费用分佣；；不传该参数查全部类型）
 * @param {Number} userId 用户ID 
 *  */
export function getIncomeDetailExport(params) {
	return request({
		url: `/api/marketing/admin/marketing/partner/incomeDetail/v1.0.1/export`,
		params,
		method: 'get',
		responseType: 'blob'
	})
}

/**
 * 合伙人-数据统计团队
 * @param {Number} userId  用户ID
 *  */
export function getInvitationTeam(userId) {
	return request({
		url: `/api/marketing/admin/marketing/partner/invitation/v1.0.1/statistics/${userId}`
	})
}


/**
 * 合伙人-数据统计收益
 * @param {Number} userId  用户ID
 *  */
export function getInvitationIncome(userId) {
	return request({
		url: `/api/marketing/admin/marketing/partner/Income/v1.0.1/statistics/${userId}`
	})
}

/**
 * 合伙人-提现记录
 * @param {Number} pageNum 页码
 * @param {Number} pageSize  页面大小
 * @param {Number} userId 合伙人ID
 * @param {String} keyword  搜索关键字（订单ID）
 * @param {Number} status 收益状态（0：审核中 1：已驳回 2：已转账；；不传该参数查全部状态）
 *   */
export function getRecordList(params) {
	return request({
		url: `/api/marketing/admin/marketing/partner/withdraw/v1.0.1/page`,
		params
	})
}

/**
 * 合伙人-导出提现记录
 * @param {Number} pageNum 页码
 * @param {Number} pageSize  页面大小
 * @param {Number} userId 合伙人ID
 * @param {String} keyword  搜索关键字（订单ID）
 * @param {Number} status 收益状态（0：审核中 1：已驳回 2：已转账；；不传该参数查全部状态）
 *   */
export function getRecordExport(params) {
	return request({
		url: `/api/marketing/admin/marketing/partner/withdraw/v1.0.1/export`,
		params,
		responseType: 'blob'
	})
}

/**
 * 邀请注册列表
 * @param {Number} authStatus 认证状态 0：未认证 1：已认证
 * @param {String} keyword 搜索关键字
 * @param {Number} pageNum 页码
 * @param {Number} pageSize  页面大小
 * @param {Number} userId 合伙人ID
 * */
export function getInviteList(params) {
	return request({
		url: `/api/marketing/admin/marketing/partner/invitation/v1.0.1/page`,
		params
	})
}

/**
 * 工作分享列表
 * @param {Number} workStatus 认证状态 1：工作中 2：已完成
 * @param {String} keyword 搜索关键字
 * @param {Number} pageNum 页码
 * @param {Number} pageSize  页面大小
 * @param {Number} userId 合伙人ID
 * */
export function getTaskList(params) {
	return request({
		url: `/api/marketing/admin/marketing/partner/jobShare/v1.0.1/page`,
		params
	})
}

/**
 * 工作分享列表-导出
 * @param {Number} workStatus 认证状态 1：工作中 2：已完成
 * @param {String} keyword 搜索关键字
 * @param {Number} pageNum 页码
 * @param {Number} pageSize  页面大小
 * @param {Number} userId 合伙人ID
 * */
export function getTaskExport(params) {
	return request({
		url: `/api/marketing/admin/marketing/partner/jobShare/v1.0.1/export`,
		params
	})
}

/**
 * 查询单个工种信息
 * @param {String} teamTypeId 工种ID
 *  */
export function getTeamType(teamTypeId) {
	return request({
		url: `/api/bill/v1.0/admin/teamType/detail`,
		params: {
			teamTypeId
		}
	})
}

/** 
 * 合伙人审核列表 
 * @param {String} keyword 搜索关键字
 * @param {Number} pageNum 页码
 * @param {Number} pageSize  页面大小
 * @param {Number} status 状态
 * */
export function getApplyRecord(params) {
	return request({
		url: `/api/marketing/admin/marketing/partner/apply/v1.0.1/page`,
		params
	})
}


/**
 * 合伙人审核导出 
 * @param {String} keyword 搜索关键字
 * @param {Number} pageNum 页码
 * @param {Number} pageSize  页面大小
 * @param {Number} status 状态
 * */
export function getExportApplyRecord(params) {
	return request({
		url: `/api/marketing/admin/marketing/partner/apply/v1.0.1/export`,
		params
	})
}

/** 
 * 分享列表
 * @param {String} keyword1 接单人输入查询 (模糊搜索用户ID/接单人/手机号码）
 * @param {String} keyword2 合伙人输入查询 (模糊搜索分享合伙人/合伙人手机号码)
 * @param {Number} pageNum 页码
 * @param {Number} pageSize  页面大小
 * @param {Number} conditionStatus 奖励的前提条件状态 （0：未达标 1：达标）
 * @param {Number} type 类型（0：一次性 1：周期） 
 * */
export function getShartList(params) {
	return request({
		url: `/api/marketing/admin/marketing/partner/jobShare/v1.0.1/page`,
		params
	})
}


/** 
 * 分享列表
 * @param {String} id 当前列表主键id
 * @param {Number} conditionStatus 奖励的前提条件状态 （0：未达标 1：达标） 
 * */
export function getSbumitShart(params) {
	return request({
		url: `/api/marketing/admin/marketing/partner/jobShare/v1.0.1/updateConditionStatus`,
		method: 'post',
		params
	})
}


/** 合伙人提现
 * @param {String} keyword  keyword 搜索关键字
 * @param {Number} pageNum 页码
 * @param {Number} pageSize  页面大小
 * @param {Number} status 收益状态（0：审核中 1：已驳回 2：已转账；；不传该参数查全部状态） 
 * */
export function getPartnerCash(params) {
	return request({
		url: `/api/marketing/admin/marketing/partner/withdraw/v1.0.1/page`,
		params
	})
}

/** 修改合伙人提现
 * @param {String} reason  已驳回状态的理由
 * @param {Number} id  主键id
 * @param {Number} status  状态（0：审核中, 1：已驳回, 2：已到账）
 * */
export function getPartnerCashUpdateStatus(data) {
	return request({
		url: `/api/marketing/admin/marketing/partner/withdraw/v1.0.1/updateStatus`,
		method: 'post',
		data
	})
}

/**
 * 查询合伙人分润核对列表接口
 * @param {String} keyword  keyword 搜索关键字
 * @param {Number} pageNum 页码
 * @param {Number} pageSize  页面大小
 * @param {String} createTimeBegin 创建开始时间戳 
 * @param {String} createTimeEnd 创建截止时间戳
 * @param {Number} status 核对状态（0:已核对 1:未核对） 
 * */
export function getPartnerRebate(data) {
	return request({
		url: `/api/marketing/admin/marketing/partner/v1.0.2/rebate/audit/page`,
		method: 'post',
		data
	})
}

/**
 * 导出合伙人分润核对列表接口
 * @param {String} keyword  keyword 搜索关键字
 * @param {Number} pageNum 页码
 * @param {Number} pageSize  页面大小
 * @param {String} createTimeBegin 创建开始时间戳 
 * @param {String} createTimeEnd 创建截止时间戳 
 * @param {Number} status 核对状态（0:已核对 1:未核对） 
 * */
export function getPartnerRebateExport(data) {
	return request({
		url: `/api/marketing/admin/marketing/partner/v1.0.2/rebate/audit/export`,
		method: 'post',
		data,
		responseType: 'blob'
	})
}

/**
 * 查询合伙人分润核对明细列表接口
 * @param {String} keyword  keyword 搜索关键字
 * @param {Number} pageNum 页码
 * @param {Number} pageSize  页面大小
 * @param {String} createTimeBegin 创建开始时间戳 
 * @param {String} createTimeEnd 创建截止时间戳 
 * @param {Number} status 核对状态（0:已核对 1:未核对）
 * @param {Number} userId 合伙人用户Id 
 * */
export function getPartnerRebateDetails(data) {
	return request({
		url: `/api/marketing/admin/marketing/partner/v1.0.2/rebate/audit/detail/page`,
		method: 'post',
		data
	})
}

/**
 * 导出合伙人分润核对列表明细接口
 * @param {String} keyword  keyword 搜索关键字
 * @param {Number} pageNum 页码
 * @param {Number} pageSize  页面大小
 * @param {String} createTimeBegin 创建开始时间戳 
 * @param {String} createTimeEnd 创建截止时间戳 
 * @param {Number} status 核对状态（0:已核对 1:未核对）
 * @param {Number} userId 合伙人用户Id 
 * */
export function getPartnerRebateDetailsExport(data) {
	return request({
		url: `/api/marketing/admin/marketing/partner/v1.0.2/rebate/audit/detail/export`,
		method: 'post',
		data,
		responseType: 'blob'
	})
}

/**
 * 合伙人续期接口
 * @param {String} id  当前列表ID 
 * @param {Number} reason 禁用/续期 理由
 * @param {Number} status  申请状态 0:正常 1: 禁用
 * */
export function getPartnerRenew(data) {
	return request({
		url: `/api/marketing/admin/marketing/partner/v1.0.2/renew`,
		method: 'post',
		data
	})
}

/**
 * 合伙人分润核对接口
 * @param {String} []  数组ID 
 * */
export function getPartnerRebateAudit(data) {
	return request({
		url: `/api/marketing/admin/marketing/partner/v1.0.2/rebate/audit`,
		method: 'post',
		data,

	})
}

/** 
 * 获取积分明细
 * @param {Number} pageNum 页码
 * @param {Number} pageSize  页面大小
 * @param {Number} userId 合伙人用户Id  
 *  */
export function getIntegralList(params) {
	return request({
		url: `/api/marketing/admin/partner/integral/detail/v1.0.2/page`,
		params
	})
}

/** 
 * 获取单位设置
 * @param {Number} pageNum 页码
 * @param {Number} pageSize  页面大小
 * @param {Number} 状态（0：停用 1：启用）  
 *  */
export function getUnitList(params) {
	return request({
		url: `/api/commons/admin/unit/v1.0.2/page`,
		params
	})
}


/**
 * 添加单位设置
 * @param {String} unit  单位名称
 *  */
export function getUnitAdd(data) {
	return request({
		url: `/api/commons/admin/unit/v1.0.2/insert`,
		method: 'post',
		data,
	})
}

/**
 * 修改单位设置
 * @param {String} unit  单位名称
 * @param {Number} id 当前订单ID  
 *  */
export function getUnitUpdate(data) {
	return request({
		url: `/api/commons/admin/unit/v1.0.2/page`,
		method: 'post',
		data,
	})
}


/**
 * 修改单位设置（启用/停用）
 * @param {Number} status  状态（0.停用, 1.启用）
 * @param {Number} id 当前订单ID  
 *  */
export function getUnitUpdateStatus(data) {
	return request({
		url: `/api/commons/admin/unit/v1.0.2/updateStatus`,
		method: 'post',
		data,
	})
}


/**
 * 删除单位设置
 * @param {Number} id 当前订单ID  
 *  */
export function getUnitDelete(data) {
	return request({
		url: `/api/commons/admin/unit/v1.0.2/page`,
		method: 'post',
		data,
	})
}

