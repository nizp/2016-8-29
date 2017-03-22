function Drag(id){
	var box = document.getElementById(id);
	box.onmousedown = fnDown;
	function fnDown(e){
		var disX = e.pageX - box.offsetLeft;
		var disY = e.pageY - box.offsetTop;
	}
	function move(e){
		box.style.left = e.pageX - disX + 'px';
		box.style.top = e.pageY - disY + 'px';
	}
}
