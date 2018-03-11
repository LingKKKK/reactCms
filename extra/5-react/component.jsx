import React from 'react';
import ReactDOM from 'react-dom';

function Component(){
    return <h1>i am zhengquan</h1>
}

class ES6Component extends React.Component{
    render(){
       return <h1>es6 i am zhengquan</h1>
    }
}
ReactDOM.render(
    <div>
        <Component/>
        <ES6Component/>
    </div>,
    document.getElementById('app')
);