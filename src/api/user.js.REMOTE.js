import request from '@/utils/request'

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
export function getuserqueryPage(data) {
  return request({
    url: `/api/user/admin/common/v1.0/queryPage`,
    method: 'post',
    data
  })
}
// 企业查询分页
export function qiYeQueryPage(data) {
  return request({
    url: `/api/user/admin/enterprise/v1.0/queryPage`,
    method: 'post',
    data
  })
}
// 工人查询分页
export function gongRenQueryPage(data) {
  return request({
    url: `/api/user/admin/worker/v1.0/queryPage`,
    method: 'post',
    data
  })
}
// 修改用户状态:0.解冻,1.冻结
export function updateUserStatus(params) {
  return request({
    url: `/api/user/admin/common/v1.0/updateUserStatus`,
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
// 修改工人端个人信息
export function updateInfo(data) {
  return request({
    url: `/api/user/admin/common/v1.0/worker/update/info`,
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
// 修改工人名片
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
