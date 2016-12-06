function FormChecked(id){
		this.wrap = document.getElementById(id);
		this.form = document.getElementById('form');
		this.inputs = this.wrap.getElementsByTagName('input');
		this.re = {
			"qq":/^[1-9]\d{4,10}$/,
			"email":/^[a-zA-Z](\w|\-){5,15}@[1-9a-zA-Z]{2,6}\.(com|cn|com.cn)$/,
			"birthDay":/^\d{2,4}\D+([1-9]|(0[1-9])|10|11|12)\D+\d{1,2}\D?$/,
			"phone":/1[34578]\d{9}/
		}
		this.num = 0;//为了计算有几个是验证成功的
	}
	
	//初始化
	FormChecked.prototype.init = function(callback){//给外面提供的接口方便继续扩充规则
		//这个callback只返回布尔值。
		this.cb = callback; //让所有的方法都能拿到cb（callback）
		
		//加事件，调函数
		var _this = this;
		//点击注册
		this.form.addEventListener('submit',function(ev){
			_this.clickFn(ev);
		});
		
		//事件委托做的		
		this.form.addEventListener('input',function(ev){
			_this.formRe(ev.target);
		});
	}
	
	//点击注册按钮验证多个输入框
	FormChecked.prototype.clickFn = function(ev){
		var num = 0; //计算有自定义属性个数
		this.num = 0;//验证几个是成功的。
		for(var i=0;i<this.inputs.length;i++){
			var re = this.inputs[i].getAttribute('_name'); 
			//有的自定义属性的时候才进if
			if(re){
				num++;//
				//验证
				this.formRe(this.inputs[i]);
			};
		};
		//console.log(num);
		//验证成功的个数，等不等于需要验证的input个数
		if(this.num != num){
			//只要不等，就不让跳转
			ev.preventDefault();
		}
	}
	//写一个验证成功或者失败
	FormChecked.prototype.formRe = function(that){
		//第一关
		if(this.re[that.getAttribute('_name')].test(that.value)){
			/*
				如果传了并且回调函数内的验证失败了 
			*/
			//第二关
			if(this.cb && !this.cb(that)){
				that.style.borderColor = 'red';
			}else{
				//如果没传或者传了并且验证成功就成功了
				that.style.borderColor = 'green';
				this.num++;
			}
//			console.log(this.num)
		}else{
			that.style.borderColor = 'red';
			//this.num--;
		}
	}
	
	/*
		第一个需求：
			点击按钮的时候有几个没有被验证就显示边框为红色，否则边框为绿色
	*/
	
	
	var f = new FormChecked('wrap');
	f.init(function(that){
		switch(that.getAttribute('_name')){
			case 'birthDay':
				var re = /^(\d+)\D+(\d+)\D+(\d{1,2})\D?$/;
				var arr = that.value.replace(re,function($0,$1,$2,$3){
					return $1+'-'+$2+'-'+$3
				}).split('-');
				
				/*
					1.用户输入的时间有没有比现在还大 
					2.输入的 2016/11/60
					587037326778   /88/8/8
					586972800000
					var oldDate = +new Date(arr[0],arr[1]-1,arr[2])
				*/
				var oldDate = new Date();
				oldDate.setFullYear(arr[0],arr[1]-1,arr[2]);
				var newDate = new Date();
				if(newDate.getTime() < oldDate.getTime()){
					return false;
				}else{
					var y = oldDate.getFullYear();
					var m = oldDate.getMonth()+1;
					var d = oldDate.getDate();
			
					if(y == arr[0] && m == arr[1] && d == arr[2]){
						return true;
					}else{
						return false;
					}
				}
				//console.log(oldDate)
			break;
			default:
				return true;
			break;
		}
	});