var http=require('http');

var myexpress=function(){
	var app=function(req, res){
		app.handle(req, res);
	}
	app.stack=[];

	app.handle = function (req, res){
		var index=0;
		
		var next = function(){
			var middleware=app.stack[index++];
			if (!middleware) {
				res.statusCode=404;
				res.end('404 - Not Found');
				return;
			}
			middleware(req, res, next);
		}

		next();

	}

	app.use = function(fun){
		
		app.stack.push(fun);

	}


	

	var server=http.createServer(app);
	app.listen=function(port, done){
		return server.listen(port, done);
	}
	return app;
}

module.exports=myexpress;