(function($){
	
	function Upload(){
		this.settings = {
			fileInpit:null,
			url:'',
			btn:null,
			viewBox:null
		}
		this.arr = [];//用来存选中的数据的
	}
	
	$.extend(Upload.prototype,{
		init:function(opt){
			var _this = this;
			$.extend(this.settings,opt);
			
			//选择图片
			if(this.settings.fileInpit){
				this.settings.fileInpit.change(function(){
					_this.arr.push(this.files[0]);
					console.log(this.files[0]);
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
			$.each(this.arr,function(i,e){
				var ajax = new XMLHttpRequest();
				ajax.open('post',_this.settings.url);
				var fr = new FormData();
				fr.append('file',e);
				ajax.send(fr);
			});
		}
		
		
		
	});
	
	
	$.extend({
		upload:function(opt){
			var u = new Upload();
			u.init(opt);
		}
	});
})(jQuery);
