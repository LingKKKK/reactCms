import React from 'react';

import './index.scss';

import MUtil from 'util/mm.jsx';

import User from 'service/user-service.jsx';

const _mm = new MUtil();
const _user = new User();

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            redirect: _mm.getUrlParam('redirect') || '/'
        }
    }
    componentWillMount() {
        document.title = '登录 - HAPPY MMALL'
    }
    /**
     * 输入框改变事件
     * @param  {[type]} e [description]
     * @return {[type]}   [description]
     */
    onInputChange(e) {
        let inputName = e.target.name,
            inputValue = e.target.value;
        this.setState({
            [inputName]: inputValue
        });
    }
    /**
     * 回车提交
     * @param  {[type]} e [description]
     * @return {[type]}   [description]
     */
    onInputKeyUp(e) {
        if (e.keyCode === 13) {
            this.onSubmit();
        }
    }
    /**
     * 提交表单事件
     * @param  {[type]} e [description]
     * @return {[type]}   [description]
     */
    onSubmit(e) {
        let param = {
                username: this.state.username,
                password: this.state.password
            },
            result = _user.checkLoginParam(param);
        if (result.status) {
            _user.login(param).then((res) => {
                _mm.setStorage('userInfo', res.data);
                this.props.history.push(this.state.redirect);
            }, (err) => {
                _mm.errTips(err.msg);
            });
        } else {
            _mm.errTips(result.msg);
        }
    }
    render() {
        let onKeyUpEvent = (e) => {
                this.onInputKeyUp(e);
            },
            inputChangeEvent = (e) => {
                this.onInputChange(e)
            },
            onSubmitEvent = (e) => {
                this.onSubmit(e)
            };
        return (
            <div className="col-md-4 col-md-offset-4">
                <div className="panel panel-default login-panel">
                    <div className="panel-heading">欢迎登录 - HAPPY MMALL后台管理系统</div>
                    <div className="panel-body">
                        <div>
                            <div className="form-group">
                                <input type="text" name="username" className="form-control" placeholder="请输入用户名" onKeyUp={onKeyUpEvent} onChange={inputChangeEvent}/>
                            </div>
                            <div className="form-group">
                                <input type="password" name="password" className="form-control" placeholder="请输入密码" onKeyUp={onKeyUpEvent} onChange={inputChangeEvent}/>
                            </div>
                            <button className="btn btn-primary btn-lg btn-block" onClick={onSubmitEvent}>登录</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;