import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
/*
  //当设置 true 的时候该路由不会在侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
  hidden: true // (默认 false)

  //当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
  redirect: 'noRedirect'

  //当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
  //只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
  //若你想不管路由下面的 children 声明的个数都显示你的根路由
  //你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
  alwaysShow: true

  name: 'router-name' //设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
  meta: {
    roles: ['admin', 'editor'] //设置该路由进入的权限，支持多个权限叠加
    title: 'title' //设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name' //设置该路由的图标
    noCache: true //如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
    breadcrumb: false // 如果设置为false，则不会在breadcrumb面包屑中显示
  }

 */
/* Layout */
import Layout from '@/layout'

/* 公共路由 */
export const constantRoutes = [
	// 刷新页面
	{
		path: '/redirect',
		component: Layout,
		hidden: true,
		children: [{
			path: '/redirect/:path(.*)',
			component: () => import('@/views/Redirect/index')
		}]
	},
	// 首页 控制台
	{
		path: '/dashboard',
		component: Layout,
		redirect: '/dashboard',
		children: [{
			path: 'dashboard',
			component: () => import('@/views/dashboard/index'),
			name: 'Dashboard',
			hidden: true,
			meta: {
				title: '控制台',
				icon: 'dashboard',
				affix: true
			}
		}]
	},

	// 登录
	{
		path: '/',
		component: () => import('@/views/Login/index'),
		hidden: true
	},
	// 更改权限刷新页面
	{
		path: '/auth-redirect',
		component: () => import('@/views/Login/auth-redirect'),
		hidden: true
	},
	{
		path: '/404',
		component: () => import('@/views/Error/404'),
		hidden: true
	},
	{
		path: '/401',
		component: () => import('@/views/Error/404'),
		hidden: true
	}, {
		path: '/user',
		component: Layout,
		name: 'Banner',
		meta: {
			title: '用户管理',
			isshow: true
		},
		children: [{
			path: 'index',
			component: () => import('@/views/User/List/List'),
			name: 'UserIndex',
			meta: {
				title: '用户列表'
			}
		}, {
			path: 'userdetail',
			component: () => import('@/views/User/List/detail'),
			name: 'UserDetail',
			meta: {
				title: '用户详情',
				activeMenu: '/user/List/List'
			},
			hidden: true
		}, {
			path: 'workrtDetail',
			component: () => import('@/views/User/Worker/workrtDetail'),
			name: 'workrtDetail',
			meta: {
				title: '工人详情',
				activeMenu: '/user/Worker/WorkerList'
			},
			hidden: true
		}, {
			path: 'access-statistics',
			component: () => import('@/views/User/accessStatistics/accessStatistics'),
			name: 'accessStatistics',
			meta: {
				title: '访问统计'
			}
		}, {
			path: 'realName',
			component: () => import('@/views/User/RealName/RealName'),
			name: 'RealName',
			meta: {
				title: '实名认证'
			}
		}, {
			path: 'realNameDetail',
			component: () => import('@/views/User/RealName/realNameDetail'),
			name: 'realNameDetail',
      hidden: true,
			meta: {
				title: '实名详情'
			}
		},{
			path: 'enterpriseList',
			component: () => import('@/views/User/Enterprise/EnterpriseList'),
			name: 'enterpriseList',
			meta: {
				title: '企业列表'
			}
		}, {
			path: 'enterprisedetails',
			component: () => import('@/views/User/Enterprise/EnterpriseDetails'),
			name: 'enterprisedetails',
			hidden: true,
			meta: {
				title: '企业详情',
				affix: false
			}
		}, {
			path: 'partnerList',
			component: () => import('@/views/User/Worker/PartnerList'),
			name: 'WorkerList',
			meta: {
				title: '合伙人列表'
			},
		}, {
			path: 'partnerListDetails',
			component: () => import('@/views/User/Worker/PartnerListDetails'),
			name: 'partnerListDetails',
			hidden: true, // 不在侧边栏显示
			meta: {
				title: '合伙人详情',
			},
		}, {
			path: 'workerList',
			component: () => import('@/views/User/Worker/WorkerList'),
			name: 'WorkerList',
			meta: {
				title: '工人列表'

			}
		}, {
			path: 'enterprise',
			component: () => import('@/views/User/Worker/VerifyEnterprise'),
			name: 'enterprise',
			meta: {
				title: '企业认证审核'
			}
		}, {
			path: 'member',
			component: () => import('@/views/User/Worker/AttestationEnterprise'),
			name: 'member',
			meta: {
				title: '企业认证审核'
			}
		}, {
			path: 'attestationWorker',
			component: () => import('@/views/User/Worker/AttestationWorker'),
			name: 'attestationWorker',
			meta: {
				title: '认证工人审核'
			}
		}, {
			path: 'upgrade',
			component: () => import('@/views/User/Worker/VerifyUpgrade'),
			name: 'upgrade',
			meta: {
				title: '升级审核'
			}
		}, {
			path: 'return',
			component: () => import('@/views/User/Worker/PartnerRecord'),
			name: 'return',
			meta: {
				title: '合伙人审核记录'
			}
		}
    ]
	},
	{
		path: '/order',
		component: Layout,
		name: 'order',
		meta: {
			title: '订单管理',
			isshow: true
		},
		children: [{
			path: 'demand',
			component: () => import('@/views/Order/Demand/Demand'),
			name: 'OrderDemand',
			meta: {
				title: '需求单'
			}
		}, {
			path: 'demand-details',
			component: () => import('@/views/Order/Demand/DemandDetails'),
			name: 'OrderDemandDetails',
			hidden: true,
			meta: {
				title: '需求单详情',
				affix: false
			}
		}, {
			path: 'service',
			component: () => import('@/views/Order/Service/Service'),
			name: 'VipProduct',
			meta: {
				title: '服务单'
			}
		}, {
			path: 'examine',
			component: () => import('@/views/Order/Service/Examine'),
			name: 'OrderExamine',
			meta: {
				title: '取消报名审核'
			}
		}, {
			path: 'service-details',
			component: () => import('@/views/Order/Service/ServiceDetails'),
			name: 'OrderServiceDetails',
			hidden: true,
			meta: {
				title: '服务单详情',
				affix: false
			}
		}, {
			path: 'security',
			component: () => import('@/views/Order/Demand/Security'),
			name: 'OrderSecurity',
			hidden: true,
			meta: {
				title: '安全帽',
			}
		}, {
			path: 'member-details',
			component: () => import('@/views/Order/Service/MemberDetails'),
			name: 'OrderMemberDetails',
			hidden: true,
			meta: {
				title: '详细报名数据'
			}
		}, {
			path: 'member-details',
			component: () => import('@/views/Order/Service/MemberDetails'),
			name: 'OrderMemberDetails',
			hidden: true,
			meta: {
				title: '详细报名数据'
			}
		}]
	},
	{
		path: '/workerManagement',
		component: Layout,
		name: 'workerManagement',
		meta: {
			title: '工人管理系统'

		},
		children: [{
				path: 'workeredit',
				component: () => import('@/views/workerManagement/workManage/workerList'),
        redirect: 'noRedirect',
				meta: {
					title: '工人管理'
				},
        children:[
          {
            path: 'workerList',
            component: () => import('@/views/workerManagement/workManage/workerList'),
            name: 'workerList',
            meta: {
              title: '工人列表'
            }
          },{
            path: 'signInList',
            component: () => import('@/views/workerManagement/workManage/signInList'),
            name: 'signInList',
            meta: {
              title: '签到列表'
            }
          },{
          	path: 'userWorkEaluation',
          	component: () => import('@/views/workerManagement/workManage/userWorkEaluation'),
          	name: 'userWorkEaluation',
          	meta: {
          		title: '用工评价'
          	}
          }
        ]
			}


		]
	},
	{
		path: '/content',
		component: Layout,
		name: 'content',
		meta: {
			title: '内容管理',
			isshow: true
		},
		children: [{
			path: 'banner',
			component: () => import('@/views/Content/Banner'),
			name: 'banner',
			meta: {
				title: 'Banner列表'

			}
		}, {
			path: 'hotActive',
			component: () => import('@/views/Content/HotActive'),
			name: 'HotActive',
			meta: {
				title: '热门活动'

			}
		}, {
			path: 'about',
			component: () => import('@/views/Content/About'),
			name: 'About',
			meta: {
				title: '关于我们'
			}
		}]
	}, {
		path: '/info',
		component: Layout,
		name: 'info',
		meta: {
			title: '消息管理',
			isshow: true
		},
		children: [{
			path: 'system',
			component: () => import('@/views/Info/System/System'),
			name: 'System',
			meta: {
				title: '系统消息'
			}
		}, {
			path: 'shortMessage',
			component: () => import('@/views/Info/ShortMessage/ShortMessage'),
			name: 'Role',
			meta: {
				title: '短信模板'
			}
		}, {
			path: 'customerService',
			component: () => import('@/views/Info/Customer/CustomerService'),
			name: 'Role',
			meta: {
				title: '客服信息'

			}
		}, {
			path: 'problem',
			component: () => import('@/views/Info/Customer/Problem'),
			name: 'Role',
			meta: {
				title: '常见问题设置'
			}
		}]
	}, {
		path: '/finance',
		component: Layout,
		name: 'finance',
		meta: {
			title: '财务管理',
			isshow: true
		},
		children: [{
			path: 'withdrawal',
			component: () => import('@/views/Finance/Withdrawal'),
			name: 'Withdrawal',
			meta: {
				title: '提现审核'
			}
		}, {
			path: 'invoice',
			component: () => import('@/views/Finance/Invoice'),
			name: 'Invoice',
			meta: {
				title: '开票申请'
			}
		}, {
			path: 'recharge',
			component: () => import('@/views/Finance/Recharge'),
			name: 'Recharge',
			meta: {
				title: '充值审核'
			}
		}]
	}, {
		path: '/system',
		component: Layout,
		name: 'system',
		meta: {
			title: '系统设置',
			isshow: true
		},
		children: [{
			path: 'index',
			component: () => import('@/views/System/AccountList'),
			name: 'PowerIndex',
			meta: {
				title: '账号列表'
			}
		}, {
			path: 'vip',
			component: () => import('@/views/System/Role'),
			name: 'Role',
			meta: {
				title: '角色管理'
			}
		}, {
			path: 'typeWork',
			component: () => import('@/views/System/typeWork'),
			name: 'typeWork',
			meta: {
				title: '工种设置'
			}
		}, {
			path: 'attendance',
			component: () => import('@/views/System/attendance'),
			name: 'attendance',
			meta: {
				title: '考勤范围设置'
			}
		}, {
			path: 'selfIntroduce',
			component: () => import('@/views/System/selfIntroduce'),
			name: 'selfIntroduce',
			meta: {
				title: '自我介绍模板设置'
			}
		}, {
			path: 'collection',
			component: () => import('@/views/System/collection'),
			name: 'collection',
			meta: {
				title: '收款信息设置'
			}
		}]
	}
]

/* 权限路由 */
export const asyncRoutes = [{
		path: '/user',
		component: Layout,
		name: 'Banner',
		meta: {
			title: '用户管理',
			isshow: true
		},
		children: [{
			path: 'index',
			component: () => import('@/views/User/List/List'),
			name: 'UserIndex',
			meta: {
				title: '用户列表'
			},
		}, {
			path: 'access-statistics',
			component: () => import('@/views/User/accessStatistics/accessStatistics'),
			name: 'accessStatistics',
			meta: {
				title: '访问统计'
			}
		}, {
			path: 'realName',
			component: () => import('@/views/User/RealName/RealName'),
			name: 'RealName',
			meta: {
				title: '实名认证'
			}
		},  {
			path: 'realNameDetail',
			component: () => import('@/views/User/RealName/realNameDetail'),
			name: 'realNameDetail',
      hidden: true,
			meta: {
				title: '实名详情'
			}
		},{
			path: 'enterpriseList',
			component: () => import('@/views/User/Enterprise/EnterpriseList'),
			name: 'enterpriseList',
			meta: {
				title: '企业列表'
			},
			children: [{
				path: 'enterprisedetails',
				component: () => import('@/views/User/Enterprise/EnterpriseDetails'),
				name: 'enterprisedetails',
				hidden: true,
				meta: {
					title: '企业详情'
				}
			}]
		}, {
			path: 'workerList',
			component: () => import('@/views/User/Worker/WorkerList'),
			name: 'WorkerList',
			meta: {
				title: '工人列表'

			}
		},{
			path: 'enterprise',
			component: () => import('@/views/User/Worker/VerifyEnterprise'),
			name: 'enterprise',
			meta: {
				title: '企业认证审核'
			}
		}, {
			path: 'partnerList',
			component: () => import('@/views/User/Worker/PartnerList'),
			name: 'WorkerList',
			meta: {
				title: '合伙人列表'
			},
		}, {
			path: 'partnerListDetails',
			component: () => import('@/views/User/Worker/PartnerListDetails'),
			name: 'partnerListDetails',
			hidden: true, // 不在侧边栏显示
			meta: {
				title: '合伙人详情',
			},
		}, {
			path: 'member',
			component: () => import('@/views/User/Worker/AttestationEnterprise'),
			name: 'member',
			meta: {
				title: '企业认证审核'
			}
		}, {
			path: 'attestationWorker',
			component: () => import('@/views/User/Worker/AttestationWorker'),
			name: 'attestationWorker',
			meta: {
				title: '认证工人审核'
			}
		}, {
			path: 'upgrade',
			component: () => import('@/views/User/Worker/VerifyUpgrade'),
			name: 'upgrade',
			meta: {
				title: '升级审核'
			}
		}, {
			path: 'return',
			component: () => import('@/views/User/Worker/PartnerRecord'),
			name: 'return',
			meta: {
				title: '合伙人审核记录'
			}
		}]
	},
	{
		path: '/order',
		component: Layout,
		name: 'order',
		meta: {
			title: '订单管理',
			isshow: true
		},
		children: [{
			path: 'demand',
			component: () => import('@/views/Order/Demand/Demand'),
			name: 'OrderDemand',
			meta: {
				title: '需求单'
			},
			children: [{
				path: 'demand-details',
				component: () => import('@/views/Order/Demand/DemandDetails'),
				name: 'OrderDemandDetails',
				hidden: true,
				meta: {
					title: '需求单详情'
				}
			}]
		}, {
			path: 'service',
			component: () => import('@/views/Order/Service/Service'),
			name: 'VipProduct',
			meta: {
				title: '服务单'
			}
		}, {
			path: 'examine',
			component: () => import('@/views/Order/Service/Examine'),
			name: 'OrderExamine',
			meta: {
				title: '取消报名审核'
			}
		}]
	},
	{
		path: '/workerManagement',
		component: Layout,
		name: 'workerManagement',
		meta: {
			title: '工人管理系统'
		},
    noComponent: true,
		children: [{
				path: 'workeredit',
				component: () => import('@/views/workerManagement/workManage/workerList'),
		    redirect: 'noRedirect',
				meta: {
					title: '工人管理'
				},
		    children:[
		      {
		        path: 'workerList',
		        component: () => import('@/views/workerManagement/workManage/workerList'),
		        name: 'workerList',
		        meta: {
		          title: '工人列表'
		        }
		      },{
		        path: 'signInList',
		        component: () => import('@/views/workerManagement/workManage/signInList'),
		        name: 'signInList',
		        meta: {
		          title: '签到列表'
		        }
		      },{
		      	path: 'userWorkEaluation',
		      	component: () => import('@/views/workerManagement/workManage/userWorkEaluation'),
		      	name: 'userWorkEaluation',
		      	meta: {
		      		title: '用工评价'
		      	}
		      }
		    ]
			}


		]
	},
	{
		path: '/content',
		component: Layout,
		name: 'content',
		meta: {
			title: '内容管理',
			isshow: true
		},
		children: [{
			path: 'banner',
			component: () => import('@/views/Content/Banner'),
			name: 'banner',
			meta: {
				title: 'Banner列表'

			}
		}, {
			path: 'hotActive',
			component: () => import('@/views/Content/HotActive'),
			name: 'HotActive',
			meta: {
				title: '热门活动'

			}
		}, {
			path: 'about',
			component: () => import('@/views/Content/About'),
			name: 'About',
			meta: {
				title: '关于我们'
			}
		}]
	}, {
		path: '/info',
		component: Layout,
		name: 'info',
		meta: {
			title: '消息管理',
			isshow: true
		},
		children: [{
			path: 'system',
			component: () => import('@/views/Info/System/System'),
			name: 'System',
			meta: {
				title: '系统消息'
			}
		}, {
			path: 'shortMessage',
			component: () => import('@/views/Info/ShortMessage/ShortMessage'),
			name: 'Role',
			meta: {
				title: '短信模板'
			}
		}, {
			path: 'customerService',
			component: () => import('@/views/Info/Customer/CustomerService'),
			name: 'Role',
			meta: {
				title: '客服信息'

			}
		}, {
			path: 'problem',
			component: () => import('@/views/Info/Customer/Problem'),
			name: 'Role',
			meta: {
				title: '常见问题设置'
			}
		}]
	}, {
		path: '/finance',
		component: Layout,
		name: 'finance',
		meta: {
			title: '财务管理',
			isshow: true
		},
		children: [{
			path: 'withdrawal',
			component: () => import('@/views/Finance/Withdrawal'),
			name: 'Withdrawal',
			meta: {
				title: '提现审核'
			}
		}, {
			path: 'invoice',
			component: () => import('@/views/Finance/Invoice'),
			name: 'Invoice',
			meta: {
				title: '开票申请'
			}
		}, {
			path: 'recharge',
			component: () => import('@/views/Finance/Recharge'),
			name: 'Recharge',
			meta: {
				title: '充值审核'
			}
		}]
	}, {
		path: '/system',
		component: Layout,
		name: 'system',
		meta: {
			title: '系统设置',
			isshow: true
		},
		children: [{
			path: 'index',
			component: () => import('@/views/System/AccountList'),
			name: 'PowerIndex',
			meta: {
				title: '账号列表'
			}
		}, {
			path: 'vip',
			component: () => import('@/views/System/Role'),
			name: 'Role',
			meta: {
				title: '角色管理'
			}
		}, {
			path: 'typeWork',
			component: () => import('@/views/System/typeWork'),
			name: 'typeWork',
			meta: {
				title: '工种设置'
			}
		}, {
			path: 'attendance',
			component: () => import('@/views/System/attendance'),
			name: 'attendance',
			meta: {
				title: '考勤范围设置'
			}
		}, {
			path: 'selfIntroduce',
			component: () => import('@/views/System/selfIntroduce'),
			name: 'selfIntroduce',
			meta: {
				title: '自我介绍模板设置'
			}
		}, {
			path: 'collection',
			component: () => import('@/views/System/collection'),
			name: 'collection',
			meta: {
				title: '收款信息设置'
			}
		}]
	}
	// {
	//   name: '404页面',
	//   path: '*',
	//   redirect: '/dashboard',
	//   hidden: true
	// }
]

const createRouter = () =>
	new Router({
		// mode: 'history', // require service support
		// scrollBehavior含义
		// https://www.jianshu.com/p/c805b74e1f14
		// https://router.vuejs.org/zh/guide/advanced/scroll-behavior.html
		// 回到顶部
		scrollBehavior: () => ({
			y: 0
		}),
		routes: constantRoutes
	})

const router = createRouter()

// 重设路由 https://blog.csdn.net/suolong914/article/details/89432563
export function resetRouter() {
	const newRouter = createRouter()
	router.matcher = newRouter.matcher
}

export default router
