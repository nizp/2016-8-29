var ul1 = document.getElementById('ul1');
var ul2 = document.getElementById('ul2');
var obj = null;

	
	all();

	ul1.addEventListener('click',click);
	function click(ev){
		if(ev.target.tagName === 'LI'){
			if(!obj[ev.target.innerHTML]){
				obj[ev.target.innerHTML] = 1;
				fn1(ev.target.innerHTML,1);
			}else{
				obj[ev.target.innerHTML]++;
				var strong = document.getElementsByTagName('strong');
				for(var i=0;i<strong.length;i++){
					if(strong[i].innerHTML === ev.target.innerHTML){
						var num = strong[i].nextElementSibling.innerHTML;
						strong[i].nextElementSibling.innerHTML = ++num;
					}
				}
			}
			localStorage.setItem('index',JSON.stringify(obj));
		}
	}


	window.addEventListener('storage',function(){
		all();
	});

	
	function all(){
		var index = localStorage.getItem('index');
		if(index){
			ul2.innerHTML = '';
			obj = JSON.parse(index);
			for(var attr in obj){
				fn1(attr,obj[attr])
			}
		}else{
			obj = {};
		}
	}
	
	function fn1(val,num){
		var li = document.createElement('li');
		li.innerHTML = '<strong>'+val+'</strong>,共有:<span>'+num+'</span>次';
		ul2.appendChild(li);
	}


