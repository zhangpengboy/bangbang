import request from '@/utils/request'

export function getProjectList(params) {
	return request({
		url: `/api/project/admin/project/v1.0.2/page`,
		method: 'GET',
		params
	})
}

export function getProjectOne(params) {
	return request({
		url: `/api/project/admin/project/v1.0.2/one`,
		method: 'GET',
		params
	})
}

export function getProjectCsv(params) {
	return request({
		url: `/api/project/admin/project/v1.0.2/exportCsv`,
		method: 'GET',
		params
	})
}

export function getTeamList(params) {
	return request({
		url: `/api/project/admin/projectTeam/v1.0.2/page`,
		method: 'GET',
		params
	})
}

export function getProjectExitList(params) {
	return request({
		url: `/api/project/admin/projectExitApply/v1.0.2/page`,
		method: 'GET',
		params
	})
}

export function getProjectExitCsv(params) {
	return request({
		url: `/api/project/admin/projectExitApply/v1.0.2/exportCsv`,
		method: 'GET',
		params
	})
}

export function postUpdateStatus(data) {
	return request({
		url: `/api/project/admin/projectExitApply/v1.0.2/updateStatus`, 
		method: 'POST',
		data
	})
}

export function getOvertimeList(params) {
	return request({
		url: `/api/project/admin/projectOvertime/v1.0.2/page`,
		method: 'GET',
		params
	})
}

export function getOvertimeXls(params) {
	return request({
		url: `/api/project/admin/projectOvertime/v1.0.2/exportXls`,
		method: 'GET',
		params
	})
}

export function getTeamTypeCsv(params) {
	return request({
		url: `/api/project/admin/projectTeamType/v1.0.2/exportCsv`,
		method: 'GET',
		params
	})
}

export function getTeamTypeList(params) {
	return request({
		url: `/api/project/admin/projectTeamType/v1.0.2/page`,
		method: 'GET',
		params
	})
}

export function getworkerList(params) {
	return request({
		url: `/api/user/admin/workerManage/v1.0/queryPage`,
		method: 'GET',
		params
	})
}

export function getworkerById(params) {
	return request({
		url: `/api/user/admin/workerManage/v1.0/queryById`,
		method: 'GET',
		params
	})
}


export function getprojectDailyLog(params) {
	return request({
		url: `/api/project/admin/projectDailyLog/v1.0.2/page`,
		method: 'GET',
		params
	})
}

export function getprojectAttendanceLog(params) {
	return request({
		url: `/api/project/admin/projectAttendanceLog/v1.0.2/page`,
		method: 'GET',
		params
	})
}