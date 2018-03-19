import React from 'react';
import { Link } from 'react-router-dom';

import PageTitle from 'component/page-title/index.jsx';
import TableList from 'component/table-list/index.jsx';

import MUtil from 'util/mm.jsx';
import Product from 'service/product-service.jsx';

const _mm = new MUtil();
const _product = new Product();

class CategoryList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            parentCategoryId: this.props.match.params.categoryId || 0
        }
    }
    componentDidMount() {
        this.loadCategoryList();
    }
    componentDidUpdate(prevProps, prevState) {
        let oldPath = prevProps.location.pathname,
            newPath = this.props.location.pathname,
            newId = this.props.match.params.categoryId || 0;
        if (oldPath !== newPath) {
            this.setState({
                parentCategoryId: newId
            }, () => {
                this.loadCategoryList();
            })
        }
    }
    //加载品类列表
    loadCategoryList() {
        let parentCategoryId = this.state.parentCategoryId;
        _product.getCategoryList(parentCategoryId).then((res) => {
            this.setState({
                list: res.data
            });
        }, (err) => {
            this.setState({
                list: []
            })
            _mm.errTips(err);
        });
    }
    //更新品类名字
    onUpdateCategoryName(categoryId, categoryName) {
        _mm.promptDialog("请输入新的品类名称", categoryName, (param) => {
            if (param.value) {
                _product.updateCategoryName({
                    categoryId: categoryId,
                    categoryName: param.value
                }).then((res) => {
                    _mm.successTips(res.data);
                    this.loadCategoryList();
                }, (errMsg) => {
                    _mm.errTips(errMsg);
                });
            }
        });
    }
    render() {
        let list = this.state.list,
            parentCategoryId = this.state.parentCategoryId,
            onUpdateCategoryName = (e) => {
                let categoryId = e.target.getAttribute('data-id'),
                    categoryName = e.target.getAttribute('data-name');
                this.onUpdateCategoryName(categoryId, categoryName);
            },
            listBody = list.map((category, index) => {
                return (
                    <tr key={index}>
                        <td>{category.id}</td>
                        <td>{category.name}</td>
                        <td>
                            <span className="btn btn-sm btn-info opera" data-id={category.id} data-name={category.name} onClick={onUpdateCategoryName}>修改品类名称</span>
                            {
                    category.parentId === 0 ? <Link to={`/product-category/index/${category.id}`} className="btn btn-sm btn-info opera">查看下属子品类</Link> : null
                    }
                        </td>
                    </tr>
                );
            });
        return (
            <div id="page-wrapper">
                <PageTitle title="品类列表">
                    <div className="page-header-right">
                        <Link to="/product-category/save" className="btn btn-primary">
                            <i className="fa fa-plus"/>
                            <span>添加品类</span>
                        </Link>
                    </div>
                </PageTitle>
                <div className="row">
                    <div className="col-md-12">
                        <p>当前的父品类为 : {parentCategoryId}</p>
                    </div>
                </div>
                <TableList tableHeads={['品类ID', '品类名称', '操作']}>
                    {listBody}
                </TableList>
            </div>
        );
    }
}

export default CategoryList;