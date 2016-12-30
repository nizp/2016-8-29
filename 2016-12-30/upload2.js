(function($){
	
	function Upload(){
		this.settings = {
			fileInpit:null,
			url:'',
			btn:null,
			viewBox:null,
			viewFn:function(){}, //外面渲染数据用的
			
		}
		this.obj = {};//用来存选中的数据的
	}
	
	$.extend(Upload.prototype,{
		init:function(opt){
			var _this = this;
			$.extend(this.settings,opt);
			
			//选择图片
			if(this.settings.fileInpit){
				this.settings.fileInpit.change(function(){
//					_this.arr.push(this.files[0]);
					_this.addData(this.files[0]);
					//_this.fileReader(_this.obj)
					_this.settings.viewFn(_this.obj);
					//console.log(this.files[0]);
				});
			}
			
			//上传
			
			if(this.settings.btn){
				this.settings.btn.click(function(){
					_this.upDown();
				//	alert(1)
				});
			}
		},
		upDown:function(){
			var _this = this;
			$.each(this.obj,function(i,e){
				var ajax = new XMLHttpRequest();
				ajax.open('post',_this.settings.url);
				var fr = new FormData();
				fr.append('file',e);
				ajax.send(fr);
			});
		},
		//转二进制数据的
		fileReader:function(data,callback){
			var data1 = [];
			
			//[1,2,3,4] -> 1,2,3
			//1,2,3,4    -> 1,2,3,4
			//  4 - > ul
			/*
				{
					'':data,
				}
				obj.name
				
				一个一个来
				只要修改了，渲染修改的东西
			*/
			
			$.each(data,function(key,value){
				var f = new FileReader();
				f.onload = function(ev){
					//console.log(ev);
					data1.push(ev.target.result);
//					if(当数据被转换完成时){
//						callback(data);
//					}
					
				}
				f.readAsDataURL(value);
			});
			
			
			console.log(data)
		},
		addData:function(data){
			/*
				this.arr = [1,2,3,4] 4
				{
					data.name
					img/meu.png:data,
					img/meu2.png:data
				}
					
			*/
			
			//把不重名的数据，存入this.obj中
			if(data.name && !this.obj[data.name]){
				this.obj[data.name] = data;
				
			}
			console.log(this.obj);
		}
		
		
		
	});
	
	
	$.extend({
		upload:function(opt){
			var u = new Upload();
			u.init(opt);
			return u;
		}
	});
})(jQuery);
