const state = {
  app: {

  },
  /* 表格公共配置 */
  table: {
    height: null, //表格高度
    maxHeight: 650,
    layout: 'total, sizes, prev, pager, next, jumper', //分页控件
    pageSizes: [10, 50, 100, 200], //分页数据
    limit: 10, //每页条数
    emptyText:'暂无相关数据', //无数据时显示
    size:'medium', //表格大小
  }
}

export default {
  state
}
