import React from 'react';
import ReactDOM from 'react-dom';

class Component extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name:'zhengquan',
            age:18
        }
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(){
        this.setState({
            age:this.state.age+1    
        });
    }
    render(){
        // setTimeout(()=>{
        //     this.setState({
        //         name:'zhengquan test'
        //     });
        // },2000);
        return (
            <div>
                <h1>i am {this.state.name}</h1>
                <p>i am {this.state.age} years old!</p>
                <button onClick={this.handleClick}>加一岁</button>
            </div>
        )
    }
}
ReactDOM.render(
    <Component/>,
    document.getElementById('app')
);