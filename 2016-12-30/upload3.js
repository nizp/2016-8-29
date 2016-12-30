(function($){
	
	function Upload(){
		
//		配置参数
//		{
//			fileInpit:选择图片的file标签,
//			url:上传时候的url,
//			btn:点击提交那个按钮,
//			viewBox:显示被选择的列表,
//			drag:拖拽的框,
//			viewFn:添加图片之后的回调函数，
//			onLoading:图片上传的时候进度函数,
//			clear:清楚的函数
//		}
		
		this.settings = {
			fileInpit:null,
			url:'',
			btn:null,
			viewBox:null,
			viewFn:function(){}, //外面渲染数据用的
			onLoading:null,
			clear:null,
			drag:null
		}
		this.obj = {length:0};//用来存选中的数据的
		this.num = 0;
	}
	
	$.extend(Upload.prototype,{
		//初始化
		init:function(opt){
			var _this = this;
			//有配置走配置，没配置走默认
			$.extend(this.settings,opt);
			//选择图片
			if(this.settings.fileInpit){
				//当选择图片触发onchange事件
				this.settings.fileInpit.change(function(){
					//将选择的图片放到对象中存起来
					_this.addData(this.files[0]);
				});
			}
			
			//上传
			//如果有提交按钮
			if(this.settings.btn){
				//绑定点击事件
				this.settings.btn.click(function(){
					_this.upDown();
				//	alert(1)
				});
			}
			
			//拖动
			//console.log(this.settings.drag)
			//如果有拖动的选区
			if(this.settings.drag){
				/*
					如果不把 dragover给阻止掉，那么在抬起的时候不会触发drop（抬起）
				*/
				this.settings.drag.on('dragover',function(){
					return false;
				});
				/*
					拖拽抬起事件
						ev.originalEvent.dataTransfer可以找到拖入到选区中的文件
				*/
				this.settings.drag.on('drop',function(ev){
					/*
						有可能拖动多张图片 ，循环每个文件，添加
					*/
					
					$.each(ev.originalEvent.dataTransfer.files,function(i,e){
						_this.addData(e);
					});
					
//					if(ev.originalEvent.dataTransfer.files.length){
//						
//					}
					//为了拖拽抬起的时候文件不会被浏览器解析
					return false;
				});
			}
			
		},
		//上传
		upDown:function(){
			var _this = this;
			//记录上传的进度
			this.num = 0;
			//console.log(arr)
			
			/*
				发送请求，并且将二进制数据传给后端 
			*/
			$.each(this.obj,function(i,e){
				var ajax = new XMLHttpRequest();
				ajax.open('post',_this.settings.url);
				var fr = new FormData();
				fr.append('file',e);
				ajax.send(fr);
				ajax.onload = function(){
//					console.log(111)
//					console.log(_this.num,_this.obj.length)
					/*
						进度 
					*/
					if(_this.num < _this.obj.length){
						_this.num++;
						//每次传出进度
						//_this.loading(_this.num);
						_this.settings.onLoading(_this.num);
					}
				}
			});
		},
		//转一个二进制数据的
		fileReader:function(data,callback){
			var f = new FileReader();
			f.onload = function(ev){
				callback(ev.target.result);
			}
			f.readAsDataURL(data);
		},
		//添加数据
		addData:function(data){
			//把不重名的数据，存入this.obj中
			console.log(this.obj.length)
			if(data && !this.obj[data.name]){
				this.obj[data.name] = data;
				this.obj.length++;
				this.settings.viewFn(data);
			}
			//console.log(data.size);
		},
		//删除数据
		removeData:function(name){
			delete this.obj[name];
			this.obj.length--;
			//console.log(this.obj)
		},
//		loading:function(num){
//			this.settings.onLoading(num);
//		},
		
		//重置数据
		deleteDate:function(){
			var _this = this;
			$.each(this.obj,function(i,e){
				if(i !== 'length'){
					delete _this.obj[i];
				}else{
					_this.obj.length = 0;
				}
			});
			this.num = 0;
		}
	});
	
	//创建upload插件方法
	$.extend({
		upload:function(opt){
			var u = new Upload();
			u.init(opt);
			return u;
		}
	});
	
})(jQuery);
