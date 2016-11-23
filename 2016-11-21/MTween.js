var Tween = {
	linear: function (t, b, c, d){
		return c*t/d + b;
	},
	easeIn: function(t, b, c, d){
		return c*(t/=d)*t + b;
	},
	easeOut: function(t, b, c, d){
		return -c *(t/=d)*(t-2) + b;
	},
	easeBoth: function(t, b, c, d){
		if ((t/=d/2) < 1) {
			return c/2*t*t + b;
		}
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInStrong: function(t, b, c, d){
		return c*(t/=d)*t*t*t + b;
	},
	easeOutStrong: function(t, b, c, d){
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeBothStrong: function(t, b, c, d){
		if ((t/=d/2) < 1) {
			return c/2*t*t*t*t + b;
		}
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	elasticIn: function(t, b, c, d, a, p){
		if (t === 0) { 
			return b; 
		}
		if ( (t /= d) == 1 ) {
			return b+c; 
		}
		if (!p) {
			p=d*0.3; 
		}
		if (!a || a < Math.abs(c)) {
			a = c; 
			var s = p/4;
		} else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	elasticOut: function(t, b, c, d, a, p){
		if (t === 0) {
			return b;
		}
		if ( (t /= d) == 1 ) {
			return b+c;
		}
		if (!p) {
			p=d*0.3;
		}
		if (!a || a < Math.abs(c)) {
			a = c;
			var s = p / 4;
		} else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},    
	elasticBoth: function(t, b, c, d, a, p){
		if (t === 0) {
			return b;
		}
		if ( (t /= d/2) == 2 ) {
			return b+c;
		}
		if (!p) {
			p = d*(0.3*1.5);
		}
		if ( !a || a < Math.abs(c) ) {
			a = c; 
			var s = p/4;
		}
		else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		if (t < 1) {
			return - 0.5*(a*Math.pow(2,10*(t-=1)) * 
					Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		}
		return a*Math.pow(2,-10*(t-=1)) * 
				Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
	},
	backIn: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
		   s = 1.70158;
		}
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	backOut: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
			s = 2.70158;  //回缩的距离
		}
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	}, 
	backBoth: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
			s = 1.70158; 
		}
		if ((t /= d/2 ) < 1) {
			return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		}
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	bounceIn: function(t, b, c, d){
		return c - Tween['bounceOut'](d-t, 0, c, d) + b;
	},       
	bounceOut: function(t, b, c, d){
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
		}
		return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
	},      
	bounceBoth: function(t, b, c, d){
		if (t < d/2) {
			return Tween['bounceIn'](t*2, 0, c, d) * 0.5 + b;
		}
		return Tween['bounceOut'](t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
	}
};
/* 当css的参数个数小于3，获取否则 设置 */
function css(el,attr,val) {//属性操作
	if(arguments.length < 3) {//判断一下传入的参数个数，三个以下，就为读取操作
		var val  = 0;//
		if(el.currentStyle) {//浏览器中如果支持currentStyle
			val = el.currentStyle[attr];//val值通过currentStyle获取
		} else {//否则
			val = getComputedStyle(el)[attr];//val值通过getComputedStyle获取
		}
		if(attr == "opacity") {//其中如果获取的是透明度的值
			val*=100;//因为小数计算会出现错误，所以要放大100倍
		}
		return parseFloat(val);//把该元素的样式获取到的值，转为数字返回。
	}
	//判断一下传入的参数个数，大于等于三个，就为写入操作
	if(attr == "opacity") {//如设置的样式是透明度
		el.style.opacity = val/100;//传入的值是扩大100倍的数，所以要缩小100倍
		el.style.filter = "alpha(opacity = "+val+")";//考虑到透明度的兼容性，
	} else {
		el.style[attr] = val + "px";//如果不是透明度，就采取这样的设置样式方式。
	}
}
//eg:target={"height":400,"widht":400};
//多属性同时运动【给最后一个函数名：回调函数，】
function muchTween(el,target,time,type,callBack) {//秒臀动画函数，传入五个参数：添加效果的元素、要设置的样式、目标位置、所用时间、动画类型
	var t = 0;//执行第几次
	var b ={};// css(el,attr);//初始值 
	var c ={};// target - b; //差值
	var d = time/20; //执行次数
	clearInterval(el.timer);//关闭定时器
	for(var s in target){
		b[s]=css(el,s);//el是元素，s是b的属性，就是所要更改的样式：attr
		c[s]=target[s]-b[s];//差值
	}
	el.timer = setInterval(function(){//开启定时器，并用元素的自定义timer属性记录定时器编号。
		t++; //下一次
		//alert(t);
		if(t > d) { //如果执行的次数大于总次数
			clearInterval(el.timer); //就关闭定时器
			callBack&&callBack();
		} else {//如果在总次数之内
			for(var s in target){
			var val = Tween[type](t,b[s],c[s],d);//记录本次的位置获取到的值，就是该元素所设置的某个样式的值
//			alert(val);

			css(el,s,val);//设置写入属性
			}
		}
	},20);
}
//单属性运动
function oneTween(el,attr,target,time,type){
	var t=0,b=css(el,attr),c=target-b,d=time/20;
	clearInterval(el.timer);
	el.timer=setInterval(function(){
		t++;
		if(t>d){
			clearInterval(timer);
		}else{
			var val=Tween[type](t,b,c,d);
			css(el,attr,val);
		}
		
	},20)
	
}
function toShake(el,attr,second,callBack){
			if(el.timer){//判断间隔定时器是否打开
			return;//某元素的定时器存在，即非0，则退出，不执行摇晃的函数。
		}
		var arr=[];
		var b=css(el,attr);
		var nub=0;//用nub座位数组的下标，找到数组中的每一个
		for(var i=second-1;i>=0;i--){
			i%2?arr.push(i):arr.push(-i);//给数组添加值，这里是偏移的距离
		}
//				console.log(arr);//查看数组中的值
	el.timer=setInterval(function(){
		if(nub>=second){
			clearInterval(el.timer);
			callBack&&callBack();
		}else{
			var val=b+arr[nub];//获取一下样式的值
			css(el,attr,val);//设置元素样式
			nub++;//为了获取数组中的下一个数
		}
	},50);
	}
	function toShake1(obj,times,dir,callBack){//对象，执行次数，抖动方向
		var juli=[];//存放位移
		var num=0;
		var timer=0;
		for(var i=times;i>=0;i--){
			juli.push(i,-i);//获取到所位移有
		}
		//console.log(juli);//位移
		obj.timer=setInterval(function(){//间隔20秒做一次偏移
			if(num<juli.length){//所偏移值的范围内
				obj.style.transform="translate"+dir+"("+juli[num]+"px)";//动画偏移
				num++;//偏移值取下一个
			}	else{
				clearInterval(timer);
				if(typeof callBack=='function'){
					setTimeout(function(){
						callBack();
					},20)
				}
			}
		},20);
	}