import swal from 'sweetalert2';

class MUtil {
    /**
     * 请求接口的封装(包含promise和各个状态的处理)
     * @param  {[type]} param [description]
     * @return {[type]}       [description]
     */
    request(param) {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: param.type || 'get',
                url: param.url || '',
                dataType: param.dataType || 'json',
                data: param.data || null,
                success: (res) => {
                    if (0 === res.status) {
                        //数据请求成功
                        typeof resolve === 'function' && resolve(res);
                    } else if (10 === res.status) {
                        //强制登录
                        this.doLogin();
                    } else {
                        //错误处理
                        typeof reject === 'function' && reject(res);
                    }
                },
                error: (err) => {
                    typeof reject === 'function' && reject(err.statusText);
                }
            });
        });
    }
    /**
     * 跳转登录页
     * @return {[type]} [description]
     */
    doLogin() {
        window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname);
    }
    /**
     * 获取Url参数
     * @return {[type]} [description]
     */
    getUrlParam(name) {
        let queryString = window.location.search.split('?')[1] || '',
            reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
            result = queryString.match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    }
    /**
     * 成功提示
     * @return {[type]} [description]
     */
    successTips(successMsg) {
        swal({
            title: successMsg,
            type: 'success',
            showConfirmButton: false,
            timer: 1500
        })
    }
    /**
     * 错误提示
     * @return {[type]} [description]
     */
    errTips(errMsg) {
        swal({
            title: errMsg,
            type: 'error',
            showConfirmButton: false,
            timer: 1500
        })
    }
    /**
     * 输入框
     * @param  {[type]} text [description]
     * @return {[type]}      [description]
     */
    promptDialog(text, name, callBack) {
        swal({
            title: text,
            input: 'text',
            inputValue: name,
            showCancelButton: true,
            confirmButtonText: '确认',
            cancelButtonText: '取消'
        }).then((value) => {
            callBack(value);
        });
    }
    /**
     * 确认框
     * @param  {[type]} text [description]
     * @return {[type]}      [description]
     */
    comfirmDialog(text, callBack) {
        swal({
            title: text,
            type: 'info',
            showCancelButton: true,
            confirmButtonText: '确认',
            cancelButtonText: '取消'
        }).then((result) => {
            if (result.value) {
                callBack();
            }
        })
    }
    /**
     * localStorage 保存方法
     */
    setStorage(name, data) {
        let dataType = typeof data;
        if (dataType === 'object') {
            //json对象
            window.localStorage.setItem(name, JSON.stringify(data));
        } else if (['number', 'string', 'boolean'].indexof(dataType) >= 0) {
            //基本类型
            window.localStorage.setItem(name, data);
        } else {
            errTips('该类型不能用于本地存储');
        }
    }
    /**
     * localStorage 取出方法
     * @return {[type]} [description]
     */
    getStorage(name) {
        let data = window.localStorage.getItem(name);
        if (data) {
            return JSON.parse(data);
        } else {
            return '';
        }
    }
    /**
     * localStorage 清除方法
     * @return {[type]} [description]
     */
    removeStorage(name) {
        window.localStorage.removeItem(name);
    }

}

export default MUtil;