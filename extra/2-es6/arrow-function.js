/*
 * @Author: zhengquan
 * @Date:   2018-02-25 12:33:22
 * @Last Modified by:   zhengquan
 * @Last Modified time: 2018-02-25 12:46:45
 */

//箭头函数
let value = 2;
let double = x => 2 * x;
let threeble = x => {
    return 3 * x;
}

console.log('double', double(value));
console.log('threeble', threeble(value));


//没有独立作用域

var obj = {
    commonFn: function() {
        console.log(this);
    },
    arrowFn: () => {
        console.log(this);
    }
}
obj.commonFn();//this 指向obj
obj.arrowFn();//this 指向obj所在作用域 window

//不能用做构造函数

let Animal = function(){

}
let animal = new Animal();

let Animal =()=>{

}
let animal = new Animal();

//没有prototype

let commonFn = function(){};
let arrowFn = () =>{};

console.log(commonFn.prototype);
console.log(arrowFn.prototype);