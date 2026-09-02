export const TEXTS = {
  appTitle: '后台管理系统',
  menu: {
    userManagement: '用户管理',
  },
  user: {
    pageTitle: '用户管理',
    searchPlaceholder: '按姓名/邮箱搜索',
    search: '搜索',
    reset: '重置',
    create: '新增',
    edit: '编辑',
    delete: '删除',
    actions: '操作',
    cancel: '取消',
    confirm: '确定',
    empty: '暂无数据',
    form: {
      name: '姓名',
      email: '邮箱',
    },
    columns: {
      id: 'ID',
      createdAt: '创建时间',
    },
    validation: {
      nameRequired: '请输入姓名',
      emailRequired: '请输入邮箱',
      emailInvalid: '邮箱格式不正确',
      deleteConfirm: '确认删除该用户吗？',
      warning: '提示',
      created: '新增成功',
      updated: '更新成功',
      deleted: '删除成功',
    },
  },
  common: {
    loading: '加载中...',
  },
} as const;
