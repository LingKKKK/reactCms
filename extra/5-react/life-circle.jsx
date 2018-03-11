import React from 'react';
import ReactDOM from 'react-dom';

class Component extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data:'Old State'
        }
        console.log('constructor');
    }
    //组件将要加载
    componentWillMount(){
        console.log('componentWillMount');
    }
    //组件加载完成
    componentDidMount(){
        console.log('componentDidMount');
    }
    //将要接收父组件传来的props
    componentWillReceiveProps(){
        console.log('componentWillReceiveProps');
    }
    //子组件是不是应该更新
    shouldComponentUpdate(){
        console.log('shouldComponentUpdate');
        return true;
    }
    //组件将要更新
    componentWillUpdate(){
        console.log('componentWillUpdate');
    }
    handleClick(){
        console.log('update data');
        this.setState({
            data:'New State'
        });
    }
    render(){
        console.log('render');
        return (
            <div>
                <h1>State:{this.state.data}</h1>
                <h1>Props:{this.props.data}</h1>
                <button onClick={(e)=>{this.handleClick(e)}}>更新组件</button>
            </div>
        )
    }
}

class App extends React.Component{
     constructor(props){
        super(props);
        this.state = {
            data:'Old Props'
        }
        console.log('constructor');
    }
    onPropsChange(){
        this.setState({
            data:'New Props'
        });
    }
    render(){
        console.log('render');
        return (
            <div>
                <Component data={this.state.data}/>
                <button onClick={(e)=>{this.onPropsChange(e)}}>改变props</button>
            </div>
        )
    }
}
ReactDOM.render(
    <App/>,
    document.getElementById('app')
);