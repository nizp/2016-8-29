function h(){
	var html = `
		<h2><%=title%>:<%=total%></h2>
		<ul id="ul">
			<%subjects.forEach(function(e,i){%>
				<li>
					<img src="<%=e.images.medium%>" alt="" />
					<p><%=e.title%></p>
					<p>
						<%for(var i=0;i<e.genres.length;i++){%>
							<span><%=e.genres[i]%></span>
						<%}%>
					</p>
				</li>
			<%})%>
		</ul>
		<div id="page">
			<%for(var i=1;i<=len;i++){%>
				<%if(i == num){%>
					<a href="#num=<%=i%>" class="active"><%=i%></a>
				<%}else{%>
					<a href="#num=<%=i%>"><%=i%></a>
				<%}%>
			<%}%>
		</div>`
	return html;
}


