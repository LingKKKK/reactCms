/*
* @Author: zhengquan
* @Date:   2018-02-28 23:14:47
* @Last Modified by:   zhengquan
* @Last Modified time: 2018-02-28 23:28:49
*/

//基本用法
let str = `
<div>
	<h1 class="title">123</h1>
</div>
`;
document.querySelector('body').innerHTML = str;

//嵌套变量的用法
let name = 'ZhengQuan';
let str = `
<div>
	<h1 class="title">${name}</h1>
</div>
`;
document.querySelector('body').innerHTML = str;

//嵌套函数的用法
let getName = ()=>{
	return 'Shenchu';
}
let str = `
<div>
	<h1 class="title">${getName()}</h1>
</div>
`;
document.querySelector('body').innerHTML = str;

//循环嵌套
let names = ['Rosen','Geely','Jimin'];
let str = `
<ul>
	${
		names.map(name => `<li>Hi,I am ${name}</li>`).join('')
	}
</ul>
`;
document.querySelector('body').innerHTML = str;

