/*
* @Author: zhengquan
* @Date:   2018-03-17 12:23:41
* @Last Modified by:   zhengquan
* @Last Modified time: 2018-03-17 12:23:41
*/
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

//商品列表页面
import ProductList from 'page/product/index/index.jsx';

//添加商品页面
import ProductSave from 'page/product/index/save.jsx';

class ProductRouter extends React.Component {
    render() {
        return (
            <Switch>
                <Route path="/product/index" component={ProductList}/>
                <Route path="/product/save" component={ProductSave}/>
                <Redirect exact from="/product" to="/product/index"/>
                <Route path="/product.category" component={ProductList}/>
            </Switch>
        );
    }
}
export default ProductRouter;