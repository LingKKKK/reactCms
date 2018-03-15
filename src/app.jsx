import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';

//Home页面
import Home from 'page/home/index.jsx';
//Login页面
import Login from 'page/login/index.jsx';

//布局
import Layout from 'component/layout/index.jsx';
class App extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/login" component={Login}/>
                    <Route exact path="/" render={(props) => (
                <Layout>
                            <Switch>
                                <Route exact path="/" component={Home}/>
                                <Route path="/" component={Home}/>
                                <Route path="/product" component={Home}/>
                                <Route path="/product.category" component={Home}/>
                                </Switch>
                        </Layout>
            )}/>
                </Switch>  
            </Router>
        );
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('app')
);