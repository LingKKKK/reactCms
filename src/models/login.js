import { routerRedux } from 'dva/router';
import { fakeAccountLogin } from '../services/api';
import { setAuthority } from '../utils/authority';
import { reloadAuthorized } from '../utils/Authorized';

export default {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      console.log('点击登录按钮，进行登录判断');
      const response = yield call(fakeAccountLogin, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      // Login successfully
      if (response.status === 'ok') {
        reloadAuthorized();
        yield put(routerRedux.push('/'));
        console.log('登录成功， 跳往首页');
      }
    },
    *logout(_, { put, select }) {
      try {
        console.log('退出登录');
        // get location pathname
        const urlParams = new URL(window.location.href);
        const pathname = yield select(state => state.routing.location.pathname);
        // 记录退出登录时候所在的地址
        // add the parameters in the url
        urlParams.searchParams.set('redirect', pathname);
        console.log('给URL重定向添加新的地址', pathname);
        window.history.replaceState(null, 'login', urlParams.href);
        // 这是html5新增的规则，可以记录并修改回退地址
      } finally {
        console.log('恢复游客身份， 跳转到登录页面');
        yield put({
          type: 'changeLoginStatus',
          payload: {
            status: false,
            currentAuthority: 'guest',
          },
        });
        reloadAuthorized();
        yield put(routerRedux.push('/user/login'));
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};
