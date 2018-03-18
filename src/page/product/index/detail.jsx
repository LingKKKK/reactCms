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

class ProductDetail extends React.Component {
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
                this.setState(res.data);
            }, (errMsg) => {
                _mm.errTips(errMsg);
            })
        }
    }
    render() {
        let imgPreview = this.state.subImages.length > 0 ? this.state.subImages.map((image, index) => {
            return (
                <div key={index} className="img-con" >
                        <img src={image.url}/>
                </div>
            )
        }) : <p>暂无图片</p>;
        return (
            <div id="page-wrapper">
                <PageTitle title="商品详情"/>
                <div className="form-horizontal">
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品名称</label>
                        <div className="col-md-5">
                            <p className="form-control-static">{this.state.name}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品描述</label>
                        <div className="col-md-5">
                            <p className="form-control-static">{this.state.subtitle}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">所属分类</label>
                        <CategorySelector disabled categoryId={this.state.categoryId} parentCategoryId={this.state.parentCategoryId} />
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品价格</label>
                        <div className="col-md-3">
                            <div className="input-group">
                                <input type="number" className="form-control" value={this.state.price} readOnly/>
                                <span className="input-group-addon">元</span>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品库存</label>
                        <div className="col-md-3">
                            <div className="input-group">
                                <input type="number" className="form-control" value={this.state.stock} readOnly/>
                                <span className="input-group-addon">件</span>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品图片</label>
                        <div className="col-md-10">
                            {imgPreview}
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品详情</label>
                        <div className="col-md-10" dangerouslySetInnerHTML={{
                __html: this.state.detail
            }}>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProductDetail;