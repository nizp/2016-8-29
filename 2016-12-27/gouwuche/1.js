var ul1 = document.getElementById('ul1');
var ul2 = document.getElementById('ul2');

	var index = localStorage.getItem('index');
	if(index){
		arr = JSON.parse(index);
		arr.forEach(function(e){
			fn1(e);
		});
	}else{
		arr = [];
	}


ul1.addEventListener('click',click);
function click(ev){
	if(ev.target.tagName === 'LI'){
		if(arr.indexOf(ev.target.innerHTML)==-1){
			arr.push(ev.target.innerHTML);
			localStorage.setItem('index',JSON.stringify(arr));
			fn1(ev.target.innerHTML);
		}
	}
}



window.addEventListener('storage',function(){
	var index = localStorage.getItem('index');
	if(index){
		ul2.innerHTML = '';
		arr = JSON.parse(index);
		arr.forEach(function(e){
			fn1(e);
		});
	}
});

function fn1(val){
	var li = document.createElement('li');
	li.innerHTML = val;
	ul2.appendChild(li);
}


