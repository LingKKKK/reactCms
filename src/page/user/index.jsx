import React from 'react';
import { Link } from 'react-router-dom';

import PageTitle from 'component/page-title/index.jsx';
import Pagination from 'component/pagination/index.jsx';
import TableList from 'component/table-list/index.jsx';
import Moment from 'moment';

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
            total: 0
        }
    }
    componentDidMount() {
        this.loadUserList();
    }
    loadUserList() {
        let pageNum = this.state.pageNum;
        _user.getUserList(pageNum).then((res) => {
            this.setState(res.data);
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
            });
        return (
            <div id="page-wrapper">
                <PageTitle title="用户列表"></PageTitle>
                <TableList tableHeads={['用户ID', '用户名', '邮箱', '电话', '注册时间']}>
                    {listBody}
                </TableList>
                <Pagination current={pageNum} total={total} onChange={(pageNum) => this.onPageNumChange(pageNum)}/>
            </div>
        );
    }
}

export default UserList;