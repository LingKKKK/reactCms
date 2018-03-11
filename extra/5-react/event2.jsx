import React from 'react';
import ReactDOM from 'react-dom';

class Component extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name:'zhengquan',
            age:18
        }
    }
    handleClick(){
        this.setState({
            age:this.state.age+1    
        });
    }
    onValueChange(e){
        this.setState({
            age:e.target.value
        })
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
                <button onClick={(e)=>{this.handleClick(e)}}>加一岁</button>
                <input type="text" onChange={(e)=>{this.onValueChange(e)}}/>
            </div>
        )
    }
}
ReactDOM.render(
    <Component/>,
    document.getElementById('app')
);