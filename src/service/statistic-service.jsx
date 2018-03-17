import MUtil from 'util/mm.jsx';

const _mm = new MUtil();

class Statistic {
    /**
     * 登录
     * @param  {[type]} param [description]
     * @return {[type]}       [description]
     */
    getHomeCount() {
        return _mm.request({
            url: '/manage/statistic/base_count.do'
        })
    }
}

export default Statistic;