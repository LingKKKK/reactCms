import React from 'react';
import { Link } from 'react-router-dom';

import PageTitle from 'component/page-title/index.jsx';
import Pagination from 'component/pagination/index.jsx';
import Moment from 'moment';

import './index.scss';

import MUtil from 'util/mm.jsx';
import User from 'service/user-service.jsx';
const _mm = new MUtil();
const _user = new User();


class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            pageNum: 1,
            total: 0,
            firstLoading: true
        }
    }
    componentDidMount() {
        this.loadUserList();
    }
    loadUserList() {
        let pageNum = this.state.pageNum;
        _user.getUserList(pageNum).then((res) => {
            this.setState(res.data, () => {
                this.setState({
                    firstLoading: false
                })
            });
        }, (err) => {
            this.setState({
                list: []
            })
            _mm.errTips(err);
        });
    }
    onPageNumChange(pageNum) {
        this.setState({
            pageNum: pageNum
        }, () => {
            this.loadUserList();
        })
    }
    render() {
        let list = this.state.list,
            firstLoading = this.state.firstLoading,
            pageNum = this.state.pageNum,
            total = this.state.total,
            listBody = list.map((user, index) => {
                return (
                    <tr key={index}>
									<td>{user.id}</td>
									<td>{user.username}</td>
									<td>{user.email}</td>
									<td>{user.phone}</td>
									<td>{Moment(user.createTime).format('YYYY-MM-DD HH:mm:ss')}</td>
								</tr>
                );
            }),
            listError = (
            <tr>
				<td colSpan="5" className="text-center">{firstLoading ? "正在拼命加载数据..." : "没有找到相应的结果～"}</td>
			</tr>
            ),
            tableBody = list.length > 0 ? listBody : listError;
        return (
            <div id="page-wrapper">
            	<PageTitle title="用户列表"></PageTitle>
				<div className="row">
					<div className="col-md-12">
						<table className="table table-striped table-bordered">
							<thead>
								<tr>
									<td>ID</td>
									<td>用户名</td>
									<td>邮箱</td>
									<td>电话</td>
									<td>注册时间</td>
								</tr>
							</thead>
							<tbody>
								{tableBody}
							</tbody>
						</table>
					</div>
				</div>
				<Pagination current={pageNum} total={total} onChange={(pageNum) => this.onPageNumChange(pageNum)}/>
			</div>
        );
    }
}

export default UserList;