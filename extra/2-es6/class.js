/*
* @Author: zhengquan
* @Date:   2018-02-28 23:42:41
* @Last Modified by:   zhengquan
* @Last Modified time: 2018-03-10 23:11:45
*/

//class constructor

class Animal{
	constructor(){
		this.name = 'animal'
	}
	getName(){
		return this.name;
	}
}
let animal = new Animal();
console.log(animal.getName());

class Cat extends Animal{
	constructor(){
		super();
		this.name = 'cat'
	}
}
let cat = new Cat();
console.log(cat.getName());

//对象

var name = 'Rosen',
	age  = 18;

var obj = {
	name:name,
	age :age,
	getName:function(){
		return name;
	},
	getAge:function(){
		return age;
	}
}


let name = 'Rosen',
	age  = 18;

let obj = {
	name,
	age,
	getName(){
		return name;
	},
	getAge(){
		return age;
	}
}

Object.keys(obj);

Object.assign(obj);

