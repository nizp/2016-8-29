(function(w){
	window.box = $('#box');
	window.num = 1;
	console.log(box);
	$('#btn').click(function(){
		var val = $('#Text').val();
		if(w.location.hash.split('=')[1] === '1'){
			createLi(0,val);	
		}
		w.location.hash = 'num=1';
	});
	
	w.onhashchange = function(){
		console.log(111111)
		var val = $('#Text').val();
		num = w.location.hash.split('=')[1];
		createLi(8*(num-1),val);
	}
})(window);
