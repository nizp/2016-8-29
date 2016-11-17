function Drag(id){
	function move(ev){
		box.style.left = ev.pageX - disX + 'px';
		box.style.top = ev.pageY - disY + 'px';
	}
}
