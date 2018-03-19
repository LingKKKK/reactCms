import React from 'react';
import { Link } from 'react-router-dom';

import PageTitle from 'component/page-title/index.jsx';

import MUtil from 'util/mm.jsx';
import Product from 'service/product-service.jsx';

const _mm = new MUtil();
const _product = new Product();

class CategorySave extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            parentId: 0,
            categoryName: ''
        }
    }
    componentDidMount() {
        this.loadCategoryList();
    }
    //加载品类列表,显示父品类列表
    loadCategoryList() {
        _product.getCategoryList().then((res) => {
            this.setState({
                list: res.data
            });
        }, (err) => {
            _mm.errTips(err);
        });
    }
    onValueChange(e) {
        let name = e.target.name,
            value = e.target.value;
        this.setState({
            [name]: value
        })
    }
    onSubmit() {
        let param = {
                parentId: this.state.parentId,
                categoryName: this.state.categoryName
            },
            result = _product.checkCategory(param);
        if (result.status) {
            _product.saveCategory(param).then((res) => {
                _mm.successTips(res.data);
                this.props.history.push('/product-category/index');
            }, (errMsg) => {
                _mm.errTips(errMsg);
            });
        } else {
            _mm.errTips(result.msg);
        }

    }
    onKeyUp(e) {}
    render() {
        let list = this.state.list,
            parentCategoryId = this.state.parentCategoryId,
            categoryOptions = list.map((category, index) => {
                return <option key={index} value={category.id}>根品类/{category.name}</option>
            }),
            onKeyUpEvent = (e) => {
                this.onKeyUp(e);
            },
            onValueChange = (e) => {
                this.onValueChange(e)
            },
            onSubmit = (e) => {
                this.onSubmit(e)
            };
        return (
            <div id="page-wrapper">
                <PageTitle title="添加品类"></PageTitle>
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-horizontal">
                            <div className="form-group">
                                <label className="col-md-2 control-label">所属品类</label>
                                <div className="col-md-5">
                                    <select  className="form-control" name="parentId" onChange={onValueChange}>
                                        <option value="0">根品类</option>
                                        {categoryOptions}
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-md-2 control-label">品类名称</label>
                                <div className="col-md-5">
                                    <input type="text" className="form-control" name="categoryName" placeholder="请输入新的品类名" onKeyUp={onKeyUpEvent} onChange={onValueChange}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-sm-offset-2 col-sm-10">
                                    <button className="btn btn-primary" onClick={onSubmit}>提交</button>
                                </div>
                            </div>
                    </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CategorySave;