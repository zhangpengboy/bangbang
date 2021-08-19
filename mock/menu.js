const {
  asyncRoutes,
  editAsyncRoutes
}= require( '../Json/index.js')
const { deepClone } =require( './utils')

module.exports = [
  // user menu
  {
    url: '/vue-element-admin/user/menu',
    type: 'post',
    response: config => {
      const {
        token
      } = config.body
      // mock error
      if (!token) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.'
        }
      }

      if (token == 'admin-token') {
        return {
          code: 20000,
          data: deepClone([...asyncRoutes]),
        }
      }
      if (token == 'editor-token') {
        return {
          code: 20000,
          data: deepClone([...editAsyncRoutes]),
        }
      }
    }
  }
]
