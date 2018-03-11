import React from 'react';
import ReactDOM from 'react-dom';

class Component extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name:'zhengquan'
        }
    }
    render(){
        setTimeout(()=>{
            this.setState({
                name:'zhengquan test'
            });
        },2000);
       return <h1>i am {this.state.name}</h1>
    }
}
ReactDOM.render(
    <Component/>
    ,
    document.getElementById('app')
);