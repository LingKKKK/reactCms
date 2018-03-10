import React from 'react';
import ReactDOM from 'react-dom';

import './index.scss';
let style ={
}
let name = 'zhengquan';
let names = ['alian','zhenghui','zhengquan','erfeng'];
let flag = false;
let jsx = <div className="jsx" style={style}> 
          {/*变量的用法*/}
          <p>i am {name}</p>
          {/*条件判断*/}
           {
             flag? <p>i am {name}</p>: <p>i am not {name}</p>
           }
          {/*循环*/}
          {
            names.map((name,index)=> <p key={index}>i am {name}</p>)
          }
          </div>;
ReactDOM.render(
    jsx,
    document.getElementById('app')
);