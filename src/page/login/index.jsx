import React from 'react';

import './index.scss';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }
    onUserNameChange(e) {
        console.log(e.target.value);
        this.setState({
            username: e.target.value
        });
    }
    onPassWordChange(e) {
        console.log(e.target.value);
        this.setState({
            password: e.target.value
        });
    }
    render() {
        return (
            <div className="col-md-4 col-md-offset-4">
				<div className="panel panel-default login-panel">
					<div className="panel-heading">欢迎登录 - HAPPY MMALL后台管理系统</div>
					<div className="panel-body">
						<form>
  							<div className="form-group">
    							<input type="text" className="form-control" placeholder="请输入用户名" onChange={(e) => {
                this.onUserNameChange(e)
            }}/>
  							</div>
  							<div className="form-group">
    							<input type="password" className="form-control" id="exampleInputPassword1" placeholder="请输入密码" onChange={(e) => {
                this.onPassWordChange(e)
            }}/>
  							</div>
  							<button type="submit" className="btn btn-primary btn-lg btn-block">登录</button>
						</form>
					</div>
            	</div>
			</div>
        );
    }
}

export default Login;