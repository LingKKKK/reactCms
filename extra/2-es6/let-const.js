/*
 * @Author: zhengquan
 * @Date:   2018-02-25 11:33:02
 * @Last Modified by:   zhengquan
 * @Last Modified time: 2018-02-25 12:32:42
 */

/*
	let 可改 const不可改
 */
let r = 2;
r = 4;
console.log(r);

const pi = 3.1415926;
pi = 3;

/*
	let const不能重复声明
 */
var foo = 1;
var foo = 2;
console.log(foo);

let bar = 1;
let bar = 2;

console.log(bar)；

//块级作用域

if (true) {
    var test = 2;
}
console.log(test);

//error
if (true) {
    let test1 = 2;
}
console.log(test1);

//块级作用域2

let arr = [1, 2, 3, 4];
for (let i = 0; i < arr.length; i++) {
    arr[i]
}

//不存在变量提升

console.log(foo);
var foo = 1;

//error
console.log(foo1);
let foo1 = 1;