import React from 'react';

class ListSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchType: 'productId',
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
    onSearch() {
        this.props.onSearch(this.state.searchType, this.state.searchKeyword)
    }
    onSearchKeyUp(e) {
        if (e.target.keyCode === 13) {
            this.onSearch();
        }
    }
    render() {
        let onValueChange = (e) => {
                this.onValueChange(e)
            },
            onSearch = (e) => {
                this.onSearch()
            },
            onSearchKeyUp = (e) => {
                this.onSearchKeyUp(e)
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
                            <input type="text" className="form-control" name="searchKeyword" placeholder="关键词" onKeyUp={onSearchKeyUp} onChange={onValueChange}/>
                        </div>
                        <button className="btn btn-primary" onClick={onSearch}>搜索</button>
                    </div>
                </div>
            </div>
        );
    }
}
export default ListSearch;