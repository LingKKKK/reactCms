/*
* @Author: zhengquan
* @Date:   2018-02-28 23:42:41
* @Last Modified by:   zhengquan
* @Last Modified time: 2018-02-28 23:45:06
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