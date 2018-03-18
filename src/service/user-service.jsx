
import MUtil from 'util/mm.jsx';

const _mm = new MUtil();

class User {
    /**
     * 登录
     * @param  {[type]} param [description]
     * @return {[type]}       [description]
     */
    login(param) {
        return _mm.request({
            type: 'post',
            url: '/manage/user/login.do',
            data: param
        })
    }
    /**
     * 检查登录接口的数据是否合法
     * @return {[type]} [description]
     */
    checkLoginParam(param) {
        let username = $.trim(param.username),
            password = $.trim(param.password);
        if (typeof username !== 'string' || username.length === 0) {
            return {
                status: false,
                msg: '用户名不能为空!'
            }
        }
        if (typeof password !== 'string' || password.length === 0) {
            return {
                status: false,
                msg: '密码不能为空!'
            }
        }
        return {
            status: true,
            msg: '验证通过!'
        }
    }
    /**
     * 登出
     * @return {[type]} [description]
     */
    logout() {
        return _mm.request({
            type: 'post',
            url: '/user/logout.do'
        })
    }
    /**
     * 获取用户列表数据
     * @param  {[type]} pageNum [description]
     * @return {[type]}         [description]
     */
    getUserList(pageNum) {
        return _mm.request({
            type: 'post',
            url: '/manage/user/list.do',
            data: {
                pageNum: pageNum
            }
        })
    }

}

export default User;