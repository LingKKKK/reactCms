import { isUrl } from '../utils/utils';

// 菜单的基本格式
const menuData = [
  {
    name: '导航大标题一',
    icon: 'apple',
    path: 'dashboard',
    hideInMenu: true,
    children: [
      {
        name: '分析页',
        path: 'analysis',
      },
      {
        name: '监控页',
        path: 'monitor',
      },
      {
        name: '工作台',
        path: 'workplace',
        // hideInBreadcrumb: true,
        // hideInMenu: true,
      },
    ],
  },
  {
    name: '导航大标题二',
    icon: 'form',
    path: 'form',
    hideInMenu: true,
    children: [
      {
        name: '基础表单',
        path: 'basic-form',
      },
      {
        name: '分步表单',
        path: 'step-form',
      },
      {
        name: '高级表单',
        authority: 'admin',
        path: 'advanced-form',
      },
    ],
  },
  {
    name: '导航大标题三',
    icon: 'table',
    path: 'list',
    hideInMenu: true,
    children: [
      {
        name: '查询表格',
        path: 'table-list',
      },
      {
        name: '标准列表',
        path: 'basic-list',
      },
      {
        name: '卡片列表',
        path: 'card-list',
      },
      {
        name: '搜索列表',
        path: 'search',
        children: [
          {
            name: '搜索列表（文章）',
            path: 'articles',
          },
          {
            name: '搜索列表（项目）',
            path: 'projects',
          },
          {
            name: '搜索列表（应用）',
            path: 'applications',
          },
        ],
      },
    ],
  },
  {
    name: '详情页',
    icon: 'profile',
    path: 'profile',
    hideInMenu: true,
    children: [
      {
        name: '基础详情页',
        path: 'basic',
      },
      {
        name: '高级详情页',
        path: 'advanced',
        authority: 'admin',
      },
    ],
  },
  {
    name: '结果页',
    icon: 'ie',
    path: 'result',
    hideInMenu: true,
    children: [
      {
        name: '成功',
        path: 'success',
      },
      {
        name: '失败',
        path: 'fail',
      },
    ],
  },
  {
    name: '异常页',
    icon: 'warning',
    path: 'exception',
    hideInMenu: true,
    children: [
      {
        name: '403',
        path: '403',
      },
      {
        name: '404',
        path: '404',
      },
      {
        name: '500',
        path: '500',
      },
      {
        name: '触发异常',
        path: 'trigger',
        hideInMenu: true,
      },
    ],
  },
  {
    name: '账户',
    icon: 'user',
    path: 'user',
    authority: 'admin',
    hideInMenu: true,
    children: [
      {
        name: '登录',
        path: 'login',
      },
      {
        name: '注册',
        path: 'register',
      },
      {
        name: '注册结果',
        path: 'register-result',
      },
    ],
  },
  {
    name: '测试页面1',
    icon: 'ie',
    path: 'a',
    children: [
      {
        name: '测试',
        path: '222',
      },
    ],
  },
  {
    name: '测试页面2',
    icon: 'apple',
    path: 'b',
  },
];

function formatter(data, parentPath = '/', parentAuthority) {
  // 递归生成完整的path路径
  // 将写入的导航 转换成 路由的格式
  return data.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      // 这里面 ... 是展开操作符 将item所有的情况都展开赋值
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

// 生成的菜单配置对象如下：
// {
//     icon:"dashboard",    //图标
//     name:"dashboard",    //名称
//     path:"/dashboard",   //路径
//     children:[           //子集菜单集合
//         {name: "分析页", path: "/dashboard/analysis"},
//         {name: "监控页", path: "/dashboard/monitor"},
//         {name: "工作台", path: "/dashboard/workplace"}
//     ]
// }

export const getMenuData = () => formatter(menuData);
