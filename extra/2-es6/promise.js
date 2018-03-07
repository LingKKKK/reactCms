/*
* @Author: zhengquan
* @Date:   2018-02-28 23:29:20
* @Last Modified by:   zhengquan
* @Last Modified time: 2018-02-28 23:41:59
*/
//promise结构
new Promise((resolve,reject) =>{
	//异步函数
	$.ajax({
		url:'http://happymmall.com/user/get_user_info.do',
		type:'post',
		success(res){
			resolve(res);
		},
		error(err){
			reject(err);
		}
	})
}).then((res)=>{
	console.log('resolve',res);
},(err)=>{
	console.log('reject',err);
});

//链式promise
//原来的写法
$.ajax({
		url:'http://happymmall.com/user/get_user_info.do',
		type:'post',
		success(res){
			$.ajax({
				url:'http://happymmall.com/cart/get_product_count.do',
				type:'post',
				success(res){
					resolve(res);
				},
				error(err){
					reject(err);
				}
			});
		},
		error(err){
			reject(err);
		}
});

let promiseFn1 =new Promise((resolve,reject) =>{
	//异步函数
	$.ajax({
		url:'http://happymmall.com/user/get_user_info.do',
		type:'post',
		success(res){
			resolve(res);
		},
		error(err){
			reject(err);
		}
	})
});

let promiseFn2 = new Promise((resolve,reject) =>{
	//异步函数
	$.ajax({
				url:'http://happymmall.com/cart/get_cart_product_count.do',
				type:'post',
				success(res){
					resolve(res);
				},
				error(err){
					reject(err);
				}
			});
});

promiseFn1.then(() =>{
	console.log('promiseFn1 success');
	return promiseFn2;
}).then(()=>{
	console.log('promiseFn2 success');
});

