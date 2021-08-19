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

export function getuserqueryPage(params) {
  return request({
    url: `/api/user/admin/common/v1.0/queryPage`,
    method: 'post',
    params
  })
}

