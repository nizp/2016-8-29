function Drag(id){
	var box = document.getElementById(id);
	box.onmousedown = fnDown;
	function fnDown(ev){
		var disX = ev.pageX - box.offsetLeft;
		var disY = ev.pageY - box.offsetTop;
	}
	function move(ev){
		box.style.left = ev.pageX - disX + 'px';
		box.style.top = ev.pageY - disY + 'px';
	}
}
