import MUtil from 'util/mm.jsx';

const _mm = new MUtil();

class Order {
    /**
     * 获取商品列表
     * @param  {[type]} pageNum [description]
     * @return {[type]}         [description]
     */
    getOrderList(param) {
        let url = '',
            data = {};
        if (param.listType === 'list') {
            url = '/manage/order/list.do';
            data.pageNum = param.pageNum;
        } else if (param.listType === 'search') {
            url = '/manage/order/search.do';
            data.pageNum = param.pageNum;
            data[param.searchType] = param.keyword;
        }
        return _mm.request({
            type: 'post',
            url: url,
            data: data
        })
    }

}

export default Order;