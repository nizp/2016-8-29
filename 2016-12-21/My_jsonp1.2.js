//url,data,callback,succ,fn

/*
	当没有网络的情况下，会创建script标签，因为没有回调，就不会删除script标签，
	在一段时间范围内如果还没有数据返回，给用户一个友情提示
*/
var timer = null;
function jsonp(json){
	//https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=妙味&cb=fn1
	var oS = document.createElement('script');
	oS.className = 'os';
	var head = document.getElementsByTagName('head')[0];
	var onOff = true;
	
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
	
	
	/*
		 data = {
		 	a:1,
		 	b:2
		 }
		
		data['cb'] = fn1
		
		data = {
		 	a:1,
		 	b:2,
		 	cb:fn1
		 }
		
		 
	*/
	settings.data[settings.callback] = settings.fnName;

	//拼接
	var arr = [];
	for(var attr in settings.data){
		arr.push(attr+'='+settings.data[attr]);
	}
	//wd=妙味&json=123
	settings.data = arr.join('&');

	
	//把接收函数挂在全局,要做fn不能是死的
	
	window[settings.fnName] = function(json){
		//console.log(json);
		var oss = head.getElementsByClassName('os');
		oss = Array.from(oss);
		onOff = false;
		if(oss.length > 1){
			for(var i=0;i<oss.length;i++){
				head.removeChild(oss[i]);
			}
		}else{
			head.removeChild(oS);
		}
		//head.removeChild(oS);
		settings.succ(json);
	}
	//给src
	oS.src = settings.url + '?' + settings.data;
	clearInterval(timer);
	timer = setTimeout(function(){
		if(onOff){
			settings.fail('请检查网络');
		}
	},3000);
	
//	(function(obj){
//		setTimeout(function(){
//			if(obj.parentNode){
//				head.removeChild(obj);
//			}
//		},3000);
//	})(oS);
	//插入
	head.appendChild(oS);
}