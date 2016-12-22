/*
	{
		parent:(必传，选择器),
		pageAll:number (总页数),
		num:number(当前的选中页数),
		len:number(一页显示几个页码),
		indexFn:function(num){} (回调，返回点击的是哪个页码)
	}
*/

function pagesFn(json){
		var s = {
			pageAll:json.pageAll || 5,
			num:json.num || 1,
			len:json.len || 5,
			indexFn:json.indexFn || function(){}
		}
		/*
			通过显示的页码的个数，如果是奇数取中间的，如果是偶数中间+1的 
		*/
		var box = document.querySelector(json.parent);
		s.xx = Math.floor(s.len/2)+1;  
		
		box.innerHTML = '';
		/*
			总数小于等于一组的长度
		*/
		
		if(s.pageAll <= s.len){
			
			for(var i=1;i<=s.pageAll;i++){
				var a = document.createElement('a');
				a.href = 'javascript:;';
				a.innerHTML = i;
				if(i == s.num){
					a.className = 'active';
				}
				box.appendChild(a);
			}
		}else{
			for(var i=1;i<=s.len;i++){
				var a = document.createElement('a');
				a.href = 'javascript:;';
				
				if(s.num > s.xx){
					if(s.num <= s.pageAll-s.xx+1){//s.num<=s.pageAll-s.xx
						if((i+s.num-s.xx) === s.num*1){
							a.className = 'active';
						}
						a.innerHTML = i+s.num-s.xx;
					}else{
						if((s.pageAll+i-s.len) === s.num*1){
							a.className = 'active';
						}
						a.innerHTML = (s.pageAll+i-s.len);
					}
				}else{
					a.innerHTML = i;
					if(i == s.num){
						a.className = 'active';
					}
				}
				box.appendChild(a);
			}
		}
		
		box.onclick = function(ev){
			if(ev.target.tagName === 'A'){
				var val = ev.target.innerHTML;
				
				s.indexFn(val);
				
				pagesFn({
					pageAll:s.pageAll,
					num:(val*1),
					len:s.len,
					parent:json.parent,
					indexFn:json.indexFn
				});

				console.log(val)
			}
		}

	}