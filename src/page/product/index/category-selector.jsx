import React from 'react';

import './category-selector.scss';

import MUtil from 'util/mm.jsx';
import Product from 'service/product-service.jsx';

const _mm = new MUtil();
const _product = new Product();

class CategorySelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstCategoryList: [],
            firstCategoryId: 0,
            secondCategoryList: [],
            secondCategoryId: 0
        }
    }
    //完成挂载事件
    componentDidMount() {
        this.loadFirstCategory();
    }
    componentWillReceiveProps(nextProps) {
        let categoryIdChanged = this.props.categoryId !== nextProps.categoryId,
            parentCategoryIdChanged = this.props.parentCategoryId !== nextProps.parentCategoryId;
        if (!categoryIdChanged && !parentCategoryIdChanged) {
            return;
        }
        if (nextProps.parentCategoryId === 0) {
            this.setState({
                firstCategoryId: nextProps.categoryId,
                secondCategoryId: 0
            });
        } else {
            this.setState({
                firstCategoryId: nextProps.parentCategoryId,
                secondCategoryId: nextProps.categoryId
            }, () => {
                parentCategoryIdChanged && this.loadSecondCategory();
            });
        }
    }
    //加载一级分类
    loadFirstCategory() {
        _product.getCategoryList().then((res) => {
            this.setState({
                firstCategoryList: res.data
            })
        }, (err) => {
            _mm.errTips(err.msg);
        });
    }
    //加载二级分类
    loadSecondCategory() {
        _product.getCategoryList(this.state.firstCategoryId).then((res) => {
            this.setState({
                secondCategoryList: res.data
            })
        }, (err) => {
            _mm.errTips(err.msg);
        });
    }
    //一级分类改变事件
    onFirstCategoryChange(e) {
        let newValue = e.target.value;
        this.setState({
            firstCategoryId: newValue,
            secondCategoryId: 0,
            secondCategoryList: []
        }, () => {
            this.loadSecondCategory();
            this.onPropsCategoryChange();
        });
    }
    //二级分类改变事件
    onSecondCategoryChange(e) {
        let newValue = e.target.value;
        this.setState({
            secondCategoryId: newValue
        }, () => {
            this.onPropsCategoryChange();
        });
    }
    //传给父组件选中结果
    onPropsCategoryChange() {
        let categoryChangable = typeof this.props.onCategoryChange === 'function';
        if (this.state.secondCategoryId) {
            categoryChangable && this.props.onCategoryChange(this.state.secondCategoryId, this.state.firstCategoryId);
        } else {
            categoryChangable && this.props.onCategoryChange(this.state.firstCategoryId, 0);
        }
    }
    render() {
        let firstCategoryList = this.state.firstCategoryList.map((category, index) => {
                return (
                    <option key={index} value={category.id}>{category.name}</option>
                )
            }),
            secondCategoryList = this.state.secondCategoryList.map((category, index) => {
                return (
                    <option key={index} value={category.id}>{category.name}</option>
                )
            }),
            onFirstCategoryChange = (e) => {
                this.onFirstCategoryChange(e);
            },
            onSecondCategoryChange = (e) => {
                this.onSecondCategoryChange(e);
        }
        return (
            <div className="col-md-10">
                <select className="form-control cate-select" onChange={onFirstCategoryChange} value={this.state.firstCategoryId} disabled={this.props.disabled}>
                    <option value="">请选择一级分类</option>
                    {firstCategoryList}
                </select>
            {this.state.secondCategoryList.length > 0 ?
                <select className="form-control cate-select" onChange={onSecondCategoryChange} value={this.state.secondCategoryId} disabled={this.props.disabled}>
                    <option value="">请选择二级分类</option>
                    {secondCategoryList}
                </select> : null
            }
            </div>
        );
    }
}
export default CategorySelector;