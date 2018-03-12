import React from 'react';

import './theme.css';

class Layout extends React.Component{
	render(){
		return(
			<div id="wrapper">
				{this.props.children}
			</div>
		);
	}
}
export default Layout;