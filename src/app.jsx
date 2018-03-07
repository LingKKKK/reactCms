import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router,Redirect,Switch,Route,Link} from 'react-router-dom'; 

//页面
import Home from 'page/home/index.jsx';

//布局
import PageLayout from 'page/layout/index.jsx';
class App extends React.Component{
  	render(){
  		return (
  			<Router>
  					<Switch>
  						<Route exact path="/" component={Home}/>
  						<Redirect from="*" to="/"/>
  					</Switch>
  			</Router>
  		)
  	}
}

ReactDOM.render(
	<App/>, 
	document.getElementById('app')
);

