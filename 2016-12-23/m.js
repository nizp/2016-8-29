function createLi(start,val){
	$.ajax({
		url:'https://api.douban.com//v2/movie/search?callback=?',
		data:{
			q:val,
			start:start,
			count:8
		},
		dataType:'jsonp',
		success:function(data){
			data.len = Math.ceil(data.total/data.count);
			data.len = data.len>10?10:data.len;
			data.num = num;
			console.log(data);
			
			$('#temp').html(h());
			var html = template('temp',data);
			box.html(html);
		}
	});
};


