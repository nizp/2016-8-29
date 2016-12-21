//url,data,callback,succ,fn
function jsonp(json){
	//https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=妙味&cb=fn1
	var oS = document.createElement('script');
	var head = document.getElementsByTagName('head')[0];
	/*
		保证每一次请求数据的接收函数名不重复 
	*/
	var fnName = 'jquery_'+new Date().getTime()+Math.random();
	
	var settings = {
		//请求地址
		url:json.url || '',
		//拼接url的参数
		data:json.data || {},
		//后端需要拼接的回调
		callback:json.callback||'callback',
		//成功之后的函数-> 是在调用jsonp的外面使用
		succ:json.succ || function(){},
		fail:json.fail || function(){},
		//挂在全局的函数名如果有固定的就走固定的，如果没有固定的那么随机
		fnName:json.fnName || fnName.replace('.','')
	};
	
	//拼接
	var arr = [];
	for(var attr in settings.data){
		arr.push(attr+'='+settings.data[attr]);
	}
	//wd=妙味&json=123
	settings.data = arr.join('&');
	
	
	//把接收函数挂在全局,要做fn不能是死的
	
	/*
		function fn1(str){
			alert(str) //123456
			succ(str)//123456
		}
		
		window[settings.fnName] = function(str){
			alert(str) //123456   
			succ(str)//123456
		}
		
		创建script标签就等同于调用fn1(123456)
		
	*/
	
	window[settings.fnName] = function(json){
		console.log(json);
		//head.removeChild(oS);
		settings.succ(json);
	}
	//给src
	oS.src = settings.url + '?' + settings.data + '&'+settings.callback+'='+settings.fnName;
	
	//console.log(settings.url + '?' + settings.data + '&'+settings.callback+'='+settings.fnName)
	
	//插入
	head.appendChild(oS);
}