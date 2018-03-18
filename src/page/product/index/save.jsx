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
        console.log(value);
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
    onImageDelete(e) {
        let index = parseInt(e.target.getAttribute('index')),
            subImages = this.state.subImages;
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
            imgPreview = this.state.subImages.length > 0 ? this.state.subImages.map((image, index) => {
                return (
                    <div key={index} className="img-con" >
                        <img src={image.url}/>
                        <i className="fa fa-close" index={index} onClick={(e) => this.onImageDelete(e)}></i>
                    </div>
                )
            }) : null;
        return (
            <div id="page-wrapper">
                <PageTitle title="添加商品"/>
                <div className="form-horizontal">
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品名称</label>
                        <div className="col-md-5">
                            <input type="text" className="form-control" placeholder="请输入商品名称" name="name" onChange={onValueChange}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品描述</label>
                        <div className="col-md-5">
                            <input type="text" className="form-control" placeholder="请输入商品描述" name="subtitle" onChange={onValueChange}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">所属分类</label>
                        <CategorySelector onCategoryChange={onCategoryChange}/>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品价格</label>
                        <div className="col-md-3">
                            <div className="input-group">
                                <input type="number" className="form-control" placeholder="价格" name="price" onChange={onValueChange}/>
                                <span className="input-group-addon">元</span>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品库存</label>
                        <div className="col-md-3">
                            <div className="input-group">
                                <input type="number" className="form-control" placeholder="库存" name="stock" onChange={onValueChange}/>
                                <span className="input-group-addon">件</span>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品图片</label>
                        <div className="col-md-10">
                            {imgPreview}
                            <FileUploader onSuccess={onSuccess} onError={onError}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品详情</label>
                        <div className="col-md-10">
                            <RichEditor onValueChange={onRichEditorChange}/>
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