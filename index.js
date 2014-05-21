var http=require('http');

var myexpress=function(){
	var app=function(req, res){
		app.handle(req, res);
	}
	app.stack=[];

	app.handle = function (req, res){
		var index=0;
		
		var next = function(error){
			
			var middleware=app.stack[index++];
			if (!middleware) {
				if (error){
				res.statusCode=500;
				res.end();
				
			}
				res.statusCode=404;
				res.end('404 - Not Found');
				return;
			}
			try{
				if (middleware.length <4){
					middleware(req, res, next);
				}
				if(error){
					if (middleware.length==4){
						middleware(error, req, res, next);
					}
					else{
						next(error);
					}
				}
				else{
					next();
				}
			}catch(error){
				next(error);
			}
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