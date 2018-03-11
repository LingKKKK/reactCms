/*
* @Author: zhengquan
* @Date:   2018-03-11 11:09:27
* @Last Modified by:   zhengquan
* @Last Modified time: 2018-03-11 11:09:27
*/
import React from 'react';
import ReactDOM from 'react-dom';

class Component extends React.Component{
    constructor(props){
        super(props);
        // this.state = {
        //     name:'zhengquan'
        // }
    }
    render(){
        // setTimeout(()=>{
        //     this.setState({
        //         name:'zhengquan test'
        //     });
        // },2000);
       return <h1>i am {this.props.name}</h1>
    }
}
ReactDOM.render(
    <Component name="zhengquan 1234"/>
    ,
    document.getElementById('app')
);