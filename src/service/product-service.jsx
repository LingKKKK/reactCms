import MUtil from 'util/mm.jsx';

const _mm = new MUtil();

class Product {
    /**
     * 获取商品列表
     * @param  {[type]} pageNum [description]
     * @return {[type]}         [description]
     */
    getProductList(param) {
        let url = '',
            data = {};
        if (param.listType === 'list') {
            url = '/manage/product/list.do';
            data.pageNum = param.pageNum;
        } else if (param.listType === 'search') {
            url = '/manage/product/search.do';
            data.pageNum = param.pageNum;
            data[param.searchType] = param.keyword;
        }
        return _mm.request({
            type: 'post',
            url: url,
            data: data
        })
    }
    /**
     * 变更商品销售状态
     * @param {[type]} param [description]
     */
    setProductStatus(param) {
        return _mm.request({
            type: 'post',
            url: '/manage/product/set_sale_status.do',
            data: param
        })
    }
    /**
     * 检查保存商品的表单数据
     * @param  {[type]} param [description]
     * @return {[type]}       [description]
     */
    checkProductParam(param) {
        let name = $.trim(param.name),
            subtitle = $.trim(param.subtitle),
            categoryId = param.categoryId,
            stock = param.stock,
            price = param.price;
        if (typeof name !== 'string' || name.length === 0) {
            return {
                status: false,
                msg: '商品名称不能为空!'
            }
        }
        if (typeof subtitle !== 'string' || subtitle.length === 0) {
            return {
                status: false,
                msg: '商品描述不能为空!'
            }
        }
        if (typeof categoryId !== 'number' || !(categoryId > 0)) {
            return {
                status: false,
                msg: '请选择商品品类!'
            }
        }
        if (typeof price !== 'number' || !(price >= 0)) {
            return {
                status: false,
                msg: '请输入正确的商品价格!'
            }
        }
        if (typeof stock !== 'number' || !(stock >= 0)) {
            return {
                status: false,
                msg: '请输入正确的库存数量!'
            }
        }
        return {
            status: true,
            msg: '验证通过!'
        }
    }
    /**
     * 保存商品
     * @param  {[type]} product [description]
     * @return {[type]}         [description]
     */
    saveProduct(product) {
        return _mm.request({
            type: 'post',
            url: '/manage/product/save.do',
            data: product
        })

    }
    /**
     * 品类相关
     */
    getCategoryList(parentCategoryId) {
        return _mm.request({
            type: 'post',
            url: '/manage/category/get_category.do',
            data: {
                categoryId: parentCategoryId || 0
            }
        })
    }
}

export default Product;