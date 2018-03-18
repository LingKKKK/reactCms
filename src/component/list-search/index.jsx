import React from 'react';

class ListSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchType: '',
            searchKeyword: ''
        }
    }
    onValueChange(e) {
        let name = e.target.name,
            value = e.target.value.trim();
        console.log(name, value);
        this.setState({
            [name]: value
        });
    }
    render() {
        let onValueChange = (e) => {
            this.onValueChange(e)
        }
        return (
            <div className="row search-wrap">
                <div className="col-md-12">
                    <div className="form-inline">
                        <div className="form-group">
                            <select className="form-control" name="searchType" onChange={onValueChange}>
                                <option value="productId">按商品ID查询</option>
                                <option value="productName">按商品名称查询</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control" name="searchKeyword" placeholder="关键词" onChange={onValueChange}/>
                        </div>
                        <button className="btn btn-primary">搜索</button>
                    </div>
                </div>
            </div>
        );
    }
}
export default ListSearch;