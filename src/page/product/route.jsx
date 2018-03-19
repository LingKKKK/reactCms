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

//商品详情页面
import ProductDetail from 'page/product/index/detail.jsx';

//品类列表页面
import CategoryList from 'page/product/category/index.jsx';

//品类添加页面
import CategorySave from 'page/product/category/save.jsx';

class ProductRouter extends React.Component {
    render() {
        return (
            <Switch>
                <Route path="/product/index" component={ProductList}/>
                <Route path="/product/save/:pid?" component={ProductSave}/>
                <Route path="/product/detail/:pid" component={ProductDetail}/>
                <Route path="/product-category/index/:categoryId?" component={CategoryList}/>
                <Route path="/product-category/save" component={CategorySave}/>
                <Redirect exact from="/product" to="/product/index"/>
                <Redirect exact from="/product-category" to="/product-category/index"/>
            </Switch>
        );
    }
}
export default ProductRouter;