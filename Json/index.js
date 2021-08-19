module.exports = {
  asyncRoutes: [{
      path: '/banner',
      component: 'layout',
      name: 'Banner',
      meta: {
        title: '轮播数据管理',
        icon: 'dashboard'
      },
      children: [{
        path: 'index',
        component: 'banner/index',
        name: 'BannerIndex',
        meta: {
          title: '轮播图',
          icon: 'dashboard'

        }
      }, {
        path: 'fictitious',
        component: 'banner/fictitious',
        name: 'Fictitious',
        meta: {
          title: '虚拟数据',
          icon: 'dashboard'

        }
      }]
    }, {
      path: '/member',
      component: 'layout',
      name: 'Member',
      meta: {
        title: '会员管理',
        icon: 'dashboard'
      },
      children: [{
        path: 'index',
        component: 'member/index',
        name: 'MemberIndex',
        meta: {
          title: '普通会员',
          icon: 'dashboard'

        }
      }, {
        path: 'vip',
        component: 'member/vip',
        name: 'VipMember',
        meta: {
          title: 'VIP会员',
          icon: 'dashboard'
        }
      }]
    }, {
      path: '/order',
      component: 'layout',
      name: 'Order',
      meta: {
        title: '订单管理',
        icon: 'dashboard'
      },
      children: [{
        path: 'index',
        component: 'order/index',
        name: 'OrderIndex',
        meta: {
          title: '订单数据',
          icon: 'dashboard'

        }
      }]
    },
    {
      path: '/channel',
      component: 'layout',
      name: 'Channel',
      meta: {
        title: '渠道管理',
        icon: 'dashboard'
      },
      children: [{
        path: 'index',
        component: 'channel/index',
        name: 'ChannelIndex',
        meta: {
          title: '渠道信息',
          icon: 'dashboard'

        }
      }]
    },
    {
      path: '/product',
      component: 'layout',
      name: 'Product',
      meta: {
        title: '产品管理',
        icon: 'dashboard'
      },
      children: [{
        path: 'index',
        component: 'product/index',
        name: 'ProductIndex',
        meta: {
          title: '普通产品',
          icon: 'dashboard'

        }
      }, {
        path: 'vip',
        component: 'product/vip',
        name: 'VipProduct',
        meta: {
          title: 'VIP产品',
          icon: 'dashboard'
        }
      }]
    },
    {
      path: '/system',
      component: 'layout',
      name: 'System',
      meta: {
        title: '系统管理',
        icon: 'dashboard'
      },
      children: [{
        path: 'index',
        component: 'system/index',
        name: 'systemIndex',
        meta: {
          title: '站点设置',
          icon: 'dashboard'

        }
      }, {
        path: 'message',
        component: 'system/message',
        name: 'Message',
        meta: {
          title: '短信设置',
          icon: 'dashboard'

        }
      }]
    }, {
      path: '/power',
      component: 'layout',
      name: 'Power',
      meta: {
        title: '权限管理',
        icon: 'dashboard'
      },
      children: [{
        path: 'index',
        component: 'power/index',
        name: 'PowerIndex',
        meta: {
          title: '权限设置',
          icon: 'dashboard'

        }
      }, {
        path: 'role',
        component: 'power/role',
        name: 'Role',
        meta: {
          title: '角色管理',
          icon: 'dashboard'

        }
      }]
    },{
        name: '404页面',
        path: '*',
        redirect: '/404',
        hidden: true,
    }
  ],
  editAsyncRoutes: [{
      path: '/banner',
      component: 'layout',
      name: 'Banner',
      meta: {
        title: '轮播数据管理',
        icon: 'dashboard'
      },
      children: [{
        path: 'index',
        component: 'banner/index',
        name: 'BannerIndex',
        meta: {
          title: '轮播图',
          icon: 'dashboard'

        }
      }, {
        path: 'fictitious',
        component: 'banner/fictitious',
        name: 'Fictitious',
        meta: {
          title: '虚拟数据',
          icon: 'dashboard'

        }
      }]
    }, {
      path: '/member',
      component: 'layout',
      name: 'Member',
      meta: {
        title: '会员管理',
        icon: 'dashboard'
      },
      children: [{
        path: 'index',
        component: 'member/index',
        name: 'MemberIndex',
        meta: {
          title: '普通会员',
          icon: 'dashboard'

        }
      }, {
        path: 'vip',
        component: 'member/vip',
        name: 'VipMember',
        meta: {
          title: 'VIP会员',
          icon: 'dashboard'
        }
      }]
    }, {
      path: '/order',
      component: 'layout',
      name: 'Order',
      meta: {
        title: '订单管理',
        icon: 'dashboard'
      },
      children: [{
        path: 'index',
        component: 'order/index',
        name: 'OrderIndex',
        meta: {
          title: '订单数据',
          icon: 'dashboard'

        }
      }]
    },
    {
      path: '/channel',
      component: 'layout',
      name: 'Channel',
      meta: {
        title: '渠道管理',
        icon: 'dashboard'
      },
      children: [{
        path: 'index',
        component: 'channel/index',
        name: 'ChannelIndex',
        meta: {
          title: '渠道信息',
          icon: 'dashboard'

        }
      }]
    },
    {
      path: '/product',
      component: 'layout',
      name: 'Product',
      meta: {
        title: '产品管理',
        icon: 'dashboard'
      },
      children: [{
        path: 'index',
        component: 'product/index',
        name: 'ProductIndex',
        meta: {
          title: '普通产品',
          icon: 'dashboard'

        }
      }, {
        path: 'vip',
        component: 'product/vip',
        name: 'VipProduct',
        meta: {
          title: 'VIP产品',
          icon: 'dashboard'
        }
      }]
    },{
        name: '404页面',
        path: '*',
        redirect: '/404',
        hidden: true,
    }
  ]
}
