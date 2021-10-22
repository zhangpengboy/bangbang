import request from '@/utils/request'

export function getProjectList(params) {
	return request({
		url: `/api/project/admin/project/v1.0.2/page`,
		method: 'GET',
		params
	})
}