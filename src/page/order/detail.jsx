import React from 'react';

import PageTitle from 'component/page-title/index.jsx';
import TableList from 'component/table-list/index.jsx';
import MUtil from 'util/mm.jsx';
import Order from 'service/order-service.jsx';

import './detail.scss';

const _mm = new MUtil();
const _order = new Order();

class OrderDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orderNo: this.props.match.params.orderNo,
            orderInfo: {}
        }
    }
    componentDidMount() {
        this.loadOrder();
    }
    //加载商品详情
    loadOrder() {
        _order.getOrder(this.state.orderNo).then((res) => {
            this.setState({
                orderInfo: res.data
            });
        }, (errMsg) => {
            _mm.errTips(errMsg);
        })
    }
    onSendGoods() {
        _mm.comfirmDialog('是否确认该商品已经发货?', () => {
            _order.sendGoods(this.state.orderNo).then((res) => {
                _mm.successTips('发货成功!');
                this.loadOrder();
            }, (errMsg) => {
                _mm.errTips(errMsg);
            })
        });
    }
    render() {
        let receiverInfo = this.state.orderInfo.shippingVo || {},
            productList = this.state.orderInfo.orderItemVoList || [],
            tableHeads = [
                {
                    name: '商品图片',
                    width: '10%'
                },
                {
                    name: '商品信息',
                    width: '40%'
                }, {
                    name: '单价',
                    width: '15%'
                }, {
                    name: '数量',
                    width: '10%'
                }, {
                    name: '合计',
                    width: '15%'
                }],
            listBody = productList.map((product, index) => {
                return (
                    <tr key={index}>
                        <td>
                            <img className="p-img" src={`${this.state.orderInfo.imageHost}${product.productImage}`}
                    alt={product.productName}/>
                        </td>
                        <td>{product.productName}</td>
                        <td>{product.currentUnitPrice}元</td>
                        <td>{product.quantity}</td>
                        <td>{product.totalPrice}元</td>
                    </tr>
                );
            }),
            onSendGoods = (e) => {
                this.onSendGoods(e);
            },
            sendBtn = this.state.orderInfo.status === 20 ?
                <button className="btn btn-warning btn-sm btn-send-goods" onClick={onSendGoods}>立即发货</button>
                : null;
        return (
            <div id="page-wrapper">
                <PageTitle title="订单详情"/>
                <div className="form-horizontal">
                    <div className="form-group">
                        <label className="col-md-2 control-label">订单号</label>
                        <div className="col-md-5">
                            <p className="form-control-static">{this.state.orderInfo.orderNo}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">创建时间</label>
                        <div className="col-md-5">
                            <p className="form-control-static">{this.state.orderInfo.createTime}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">收件人</label>
                        <div className="col-md-5">
                            <p className="form-control-static">
                            {receiverInfo.receiverName},
                            {receiverInfo.receiverProvince} 
                            {receiverInfo.receiverCity} 
                            {receiverInfo.receiverAddress} 
                            {receiverInfo.rreceiverMobile || receiverInfo.receiverPhone}
                            </p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">订单状态</label>
                        <div className="col-md-5">
                            <p className="form-control-static">{this.state.orderInfo.statusDesc}
                                {sendBtn}
                            </p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">支付方式</label>
                        <div className="col-md-5">
                            <p className="form-control-static">{this.state.orderInfo.paymentTypeDesc}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">订单金额</label>
                        <div className="col-md-5">
                            <p className="form-control-static">{this.state.orderInfo.payment}元</p>
                        </div>
                    </div>
                     <div className="form-group">
                        <label className="col-md-2 control-label">订单金额</label>
                        <div className="col-md-10">
                            <TableList tableHeads={tableHeads}>
                                {listBody}
                            </TableList>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default OrderDetail;