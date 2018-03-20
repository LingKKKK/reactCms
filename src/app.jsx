import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';

//Home页面
import Home from 'page/home/index.jsx';
//Login页面
import Login from 'page/login/index.jsx';
//错误页面
import ErrorPage from 'page/error/index.jsx';
//用户列表页面
import UserList from 'page/user/index.jsx';
//商品分路由
import ProductRouter from 'page/product/route.jsx';
//订单列表页面
import OrderList from 'page/order/index.jsx';
//订单详情页面
import OrderDetail from 'page/order/detail.jsx';
//布局
import Layout from 'component/layout/index.jsx';
class App extends React.Component {
    render() {
        let layoutRouter = (
        <Layout>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/product" component={ProductRouter}/>
                <Route path="/product-category" component={ProductRouter}/>
                <Route path="/order/index" component={OrderList}/>
                 <Route path="/order/detail/:orderNo" component={OrderDetail}/>
                <Route path="/user/index" component={UserList}/>
                <Redirect exact from="/user" to="/user/index"/>
                <Redirect exact from="/order" to="/order/index"/>
                <Route component={ErrorPage}/>
            </Switch>
        </Layout>
        );
        return (
            <Router>
                <Switch>
                    <Route path="/login" component={Login}/>
                    <Route path="/" render={(props) => layoutRouter}/>
                </Switch>  
            </Router>
        );
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('app')
);