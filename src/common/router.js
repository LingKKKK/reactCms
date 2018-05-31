import { createElement } from 'react';
import dynamic from 'dva/dynamic';
import pathToRegexp from 'path-to-regexp';
import { getMenuData } from './menu';

let routerDataCache;

const modelNotExisted = (app, model) =>
  // eslint-disable-next-line
  !app._models.some(({ namespace }) => {
    return namespace === model.substring(model.lastIndexOf('/') + 1);
  });

// wrapper of dynamic => 异步渲染 对dva中dynamic函数的再次封装
const dynamicWrapper = (app, models, component) => {
  // app是全局dva实例，models是一个带有相关dva Model的Array，component是为该路由记录对应的实际组件
  // () => require('module')
  // transformed by babel-plugin-dynamic-import-node-sync
  if (component.toString().indexOf('.then(') < 0) {
    models.forEach(model => {
      if (modelNotExisted(app, model)) {
        // eslint-disable-next-line
        app.model(require(`../models/${model}`).default);
      }
    });
    return props => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app);
      }
      return createElement(component().default, {
        ...props,
        routerData: routerDataCache,
      });
    };
  }
  // () => import('module')
  return dynamic({
    app,
    models: () =>
      // 使用时直接填写model文件名即可，目录在这里自动匹配
      models.filter(model => modelNotExisted(app, model)).map(m => import(`../models/${m}.js`)),
    // add routerData prop
    component: () => {
      if (!routerDataCache) {
        // 路由级别组件注入routerData
        routerDataCache = getRouterData(app);
      }
      return component().then(raw => {
        const Component = raw.default || raw;
        /**
         * createElement api用来创建element元素，JSX相当于createElement函数的语法糖。
         * createElement方法接收的第一个参数还可以是组件类型。
         * 通过createElement实现增强组件。
         *  function Box({name, age}) {
         *      return <div>{name}{age}</div>
         *  }
         *  function HBox(props) {
         *      * 下面的代码等价于 return <Box {...props} age={20} />
         *      return React.createElement(Box,{...props, age:20})
         *  }
         *  <HBox name="lee" />
         */

        /*
        * 两种实现方案：
         */
        return props =>
          createElement(Component, {
            ...props,
            routerData: routerDataCache,
          });
        /*
        * return (props) => <Component {...props} routerData={routerDataCache}/>
         */
      });
    },
  });
};

function getFlatMenuData(menus) {
  let keys = {};
  menus.forEach(item => {
    if (item.children) {
      keys[item.path] = { ...item };
      keys = { ...keys, ...getFlatMenuData(item.children) };
    } else {
      keys[item.path] = { ...item };
    }
  });
  return keys;
}

export const getRouterData = app => {
  /*
  * 这里面 routerConfig 相对于 menuData 更容易操作，拓展性更好
   */
  const routerConfig = {
    /*
    *   初始的应该对应着登录注册界面
    *   如果是登录状态，就跳转到主页
    */
    '/': {
      component: dynamicWrapper(app, ['user', 'login'], () => import('../layouts/BasicLayout')),
    },
    '/a/222': {
      component: dynamicWrapper(app, [], () => import('../routes/Test/222')),
    },
    '/b': {
      component: dynamicWrapper(app, [], () => import('../routes/Test/b')),
    },
    '/dashboard/analysis': {
      component: dynamicWrapper(app, ['chart'], () => import('../routes/Dashboard/Analysis')),
    },
    '/dashboard/monitor': {
      component: dynamicWrapper(app, ['monitor'], () => import('../routes/Dashboard/Monitor')),
    },
    '/dashboard/workplace': {
      component: dynamicWrapper(app, ['project', 'activities', 'chart'], () =>
        import('../routes/Dashboard/Workplace')
      ),
      hideInBreadcrumb: true,
      name: '工作台',
      authority: 'admin',
    },
    '/form/basic-form': {
      component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/BasicForm')),
    },
    '/form/step-form': {
      component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/StepForm')),
    },
    '/form/step-form/info': {
      name: '分步表单（填写转账信息）',
      component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/StepForm/Step1')),
    },
    '/form/step-form/confirm': {
      name: '分步表单（确认转账信息）',
      component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/StepForm/Step2')),
    },
    '/form/step-form/result': {
      name: '分步表单（完成）',
      component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/StepForm/Step3')),
    },
    '/form/advanced-form': {
      component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/AdvancedForm')),
    },
    '/list/table-list': {
      component: dynamicWrapper(app, ['rule'], () => import('../routes/List/TableList')),
    },
    '/list/basic-list': {
      component: dynamicWrapper(app, ['list'], () => import('../routes/List/BasicList')),
    },
    '/list/card-list': {
      component: dynamicWrapper(app, ['list'], () => import('../routes/List/CardList')),
    },
    '/list/search': {
      component: dynamicWrapper(app, ['list'], () => import('../routes/List/List')),
    },
    '/list/search/projects': {
      component: dynamicWrapper(app, ['list'], () => import('../routes/List/Projects')),
    },
    '/list/search/applications': {
      component: dynamicWrapper(app, ['list'], () => import('../routes/List/Applications')),
    },
    '/list/search/articles': {
      component: dynamicWrapper(app, ['list'], () => import('../routes/List/Articles')),
    },
    '/profile/basic': {
      component: dynamicWrapper(app, ['profile'], () => import('../routes/Profile/BasicProfile')),
    },
    '/profile/advanced': {
      component: dynamicWrapper(app, ['profile'], () =>
        import('../routes/Profile/AdvancedProfile')
      ),
    },
    '/result/success': {
      component: dynamicWrapper(app, [], () => import('../routes/Result/Success')),
    },
    '/result/fail': {
      component: dynamicWrapper(app, [], () => import('../routes/Result/Error')),
    },
    '/exception/403': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/403')),
    },
    '/exception/404': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/404')),
    },
    '/exception/500': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/500')),
    },
    // '/exception/trigger': {
    //   component: dynamicWrapper(app, ['error'], () =>
    //     import('../routes/Exception/triggerException')
    //   ),
    // },
    '/user': {
      component: dynamicWrapper(app, [], () => import('../layouts/UserLayout')),
    },
    '/user/login': {
      component: dynamicWrapper(app, ['login'], () => import('../routes/User/Login')),
    },
    // '/user/register': {
    //   component: dynamicWrapper(app, ['register'], () => import('../routes/User/Register')),
    // },
    // '/user/register-result': {
    //   component: dynamicWrapper(app, [], () => import('../routes/User/RegisterResult')),
    // },

    /*
    * '/user/:id': {
    *   component: dynamicWrapper(app, [], () => import('../routes/User/SomeComponent')),
    * },
     */
  };
  /*  拿到菜单配置数组  Get name from ./menu.js or just set it in the router data.  */
  const menuData = getFlatMenuData(getMenuData());
  /*
  * Route configuration data
  * eg. {name,authority ...routerConfig }
   */
  const routerData = {};
  /*  循环routerConfig匹配menuData  */
  Object.keys(routerConfig).forEach(path => {
    /*
    *  Regular match item name
    *  eg.  router /user/:id === /user/chen
    * 支持带参数的路由配置，案例如下:
    * 菜单中的path设置为/user/1,路由中的path设置为/user/:id
    * 如果直接使用 === 则判断结果为两者不匹配。
    * 需要借助path-to-regexp这个库来完成判断。
     */
    const pathRegexp = pathToRegexp(path);
    const menuKey = Object.keys(menuData).find(key => pathRegexp.test(`${key}`));
    let menuItem = {};

    if (menuKey) {
      /* 如果 menuKey 不为空 */
      menuItem = menuData[menuKey];
      /* 拿到菜单配置 menuItem */
    }

    /* menuData与routerConfig合并。用户新增的界面不在左侧菜单有入口的话直接 */
    /* 在routerConfig中配置即可。下面的语句不管能不能再menu中匹配到都会执行的 */
    let router = routerConfig[path];
    /*
    * 权限和name配置以 router.js 为准
    *  If you need to configure complex parameter routing,
    *  eg . /list/:type/user/info/:id
     */
    router = {
      ...router,
      name: router.name || menuItem.name,
      authority: router.authority || menuItem.authority,
      hideInBreadcrumb: router.hideInBreadcrumb || menuItem.hideInBreadcrumb,
    };
    routerData[path] = router;
  });

  console.log('合并之后的路由配置对象'); /* 合并之后的路由配置对象 */
  return routerData;
};
