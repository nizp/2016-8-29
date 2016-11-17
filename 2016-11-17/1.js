function Drag(id){
	var box = document.getElementById(id);
	box.onmousedown = fnDown;
	function(ev){
		var disX = ev.pageX - box.offsetLeft;
		var disY = ev.pageY - box.offsetTop;
	}
}
