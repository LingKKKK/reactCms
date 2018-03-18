import React from 'react';

class TableList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFirstLoading: true
        }
    }
    componentWillReceiveProps() {
        this.setState({
            isFirstLoading: false
        })
    }
    render() {
        let tableHeader = this.props.tableHeads.map((tableHead, index) => {
                if (typeof tableHead === 'object') {
                    return (<th key={index} width={tableHead.width}>{tableHead.name}</th>)
                } else if (typeof tableHead === 'string') {
                    return (<th key={index}>{tableHead}</th>)
                }
            }),
            listBody = this.props.children,
            listError = (
            <tr>
				<td colSpan={this.props.tableHeads.length} className="text-center">{this.state.isFirstLoading ? "正在拼命加载数据..." : "没有找到相应的结果～"}</td>
			</tr>
            ),
            tableBody = listBody.length > 0 ? listBody : listError;
        return (
            <div className="row">
				<div className="col-md-12">
					<table className="table table-striped table-bordered">
						<thead>
							<tr>
								{tableHeader}
							</tr>
						</thead>
						<tbody>
								{tableBody}
						</tbody>
					</table>
				</div>
			</div>
        );
    }
}
export default TableList;