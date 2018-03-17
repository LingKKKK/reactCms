import React from 'react';

import RcPagination from 'rc-pagination';

import 'rc-pagination/dist/rc-pagination.min.css';

class Pagination extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <RcPagination {...this.props} hideOnSinglePage showQuickJumper/>
        );
    }
}
export default Pagination;