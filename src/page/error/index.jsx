import React from 'react';
import { Link } from 'react-router-dom';

import './index.scss';

class ErrorPage extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div id="page-wrapper">
				<div className="row exception-box">
					<div className="col-md-6 exception-img">
					</div>
					<div className="col-md-6 desc-block">
						<div className="exception-number">
						404
						</div>
						<div className="exception-desc">
						抱歉,你访问的页面不存在
						</div>
						<Link className="btn btn-info" to="/">返回首页</Link>
					</div>
				</div>
			</div>
        );
    }
}

export default ErrorPage;