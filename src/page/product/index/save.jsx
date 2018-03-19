import React from 'react';

import PageTitle from 'component/page-title/index.jsx';
import CategorySelector from './category-selector.jsx';
import FileUploader from 'component/file-uploader/index.jsx';
import RichEditor from 'component/rich-editor/index.jsx';
import MUtil from 'util/mm.jsx';
import Product from 'service/product-service.jsx';

import './save.scss';

const _mm = new MUtil();
const _product = new Product();

class ProductSave extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.pid,
            name: '',
            subtitle: '',
            categoryId: 0,
            parentCategoryId: 0,
            subImages: [],
            price: '',
            stock: '',
            detail: '',
            status: 1
        }
    }
    componentDidMount() {
        this.loadProduct();
    }
    //加载商品详情
    loadProduct() {
        if (this.state.id) {
            _product.getProduct(this.state.id).then((res) => {
                let images = res.data.subImages.split(',');
                res.data.subImages = images.map((imgUri) => {
                    return {
                        uri: imgUri,
                        url: res.data.imageHost + imgUri
                    }
                });
                res.data.defaultDetail = res.data.detail;
                this.setState(res.data);
            }, (errMsg) => {
                _mm.errTips(errMsg);
            })
        }
    }
    //品类变化事件
    onCategoryChange(categoryId, parentCategoryId) {
        this.setState({
            categoryId: categoryId,
            parentCategoryId: parentCategoryId
        })
    }
    //上传图片成功
    uploadOnSuccess(res) {
        let subImages = this.state.subImages;
        subImages.push(res);
        this.setState({
            subImages: subImages
        });
    }
    //上传图片失败
    uploadOnError(errMsg) {
        _mm.errorTips(errMsg);
    }
    //富文本改变事件
    onRichEditorChange(value) {
        this.setState({
            detail: value
        })

    }
    //普通字段变化事件
    onValueChange(e) {
        let name = e.target.name,
            newValue = e.target.value;
        this.setState({
            [name]: newValue
        })
    }
    //删除图片
    onImageDelete(index) {
        let subImages = this.state.subImages;
        subImages.splice(index, 1);
        this.setState({
            subImages: subImages
        });
    }
    getSubImagesString() {
        return this.state.subImages.map((image) => image.uri).join(',');
    }
    //提交事件
    onSubmit(e) {
        let param = {
                name: this.state.name,
                subtitle: this.state.subtitle,
                categoryId: parseInt(this.state.categoryId),
                subImages: this.getSubImagesString(),
                detail: this.state.detail,
                price: parseFloat(this.state.price),
                stock: parseInt(this.state.stock),
                status: this.state.status,
            },
            result = _product.checkProductParam(param);
        param.id = this.state.id ? this.state.id : null;
        if (result.status) {
            _product.saveProduct(param).then((res) => {
                _mm.successTips(res.data);
                this.props.history.push('/product/index');
            }, (errMsg) => {
                _mm.errTips(errMsg)
            })
        } else {
            _mm.errTips(result.msg);
        }
    }
    onKeyUpSubmit(e) {
        if (e.keycode === 13) {
            this.onSubmit();
        }
    }
    render() {
        let onCategoryChange = (categoryId, parentCategoryId) => {
                this.onCategoryChange(categoryId, parentCategoryId);
            },
            onSuccess = (res) => {
                this.uploadOnSuccess(res);
            },
            onError = (err) => {
                this.uploadOnError(res);
            },
            onRichEditorChange = (value) => {
                this.onRichEditorChange(value);
            },
            onValueChange = (e) => {
                this.onValueChange(e);
            },
            onSubmit = (e) => {
                this.onSubmit(e);
            },
            onImageDelete = (index) => {
                this.onImageDelete(index);
            };
        return (
            <div id="page-wrapper">
                <PageTitle title={this.state.id ? "编辑商品" : "添加商品"}/>
                <div className="form-horizontal">
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品名称</label>
                        <div className="col-md-5">
                            <input type="text" className="form-control" placeholder="请输入商品名称" name="name" onChange={onValueChange} value={this.state.name}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品描述</label>
                        <div className="col-md-5">
                            <input type="text" className="form-control" placeholder="请输入商品描述" name="subtitle" onChange={onValueChange} value={this.state.subtitle}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">所属分类</label>
                        <CategorySelector categoryId={this.state.categoryId} parentCategoryId={this.state.parentCategoryId} onCategoryChange={onCategoryChange}/>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品价格</label>
                        <div className="col-md-3">
                            <div className="input-group">
                                <input type="number" className="form-control" placeholder="价格" name="price" onChange={onValueChange} value={this.state.price}/>
                                <span className="input-group-addon">元</span>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品库存</label>
                        <div className="col-md-3">
                            <div className="input-group">
                                <input type="number" className="form-control" placeholder="库存" name="stock" onChange={onValueChange} value={this.state.stock}/>
                                <span className="input-group-addon">件</span>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品图片</label>
                        <div className="col-md-10">
                            <FileUploader images={this.state.subImages} onDelete={onImageDelete} onSuccess={onSuccess} onError={onError}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品详情</label>
                        <div className="col-md-10">
                            <RichEditor defaultDetail={this.state.defaultDetail} detail={this.state.detail} onValueChange={onRichEditorChange}/>
                        </div>
                    </div>
                   
                    <div className="form-group">
                        <div className="col-md-offset-2 col-md-5">
                            <button className="btn btn-primary" onClick={onSubmit}>提交</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProductSave;