var http=require('http');

var myexpress=function(){
	var app=function(req, res){
		res.statusCode=404;
		res.end();
	}
	app.stack=[];
	app.use = function(fun){app.stack.push(fun)};
	var server=http.createServer(app);
	app.listen=function(port, done){
		return server.listen(port, done);
	}
	return app;
}

module.exports=myexpress;