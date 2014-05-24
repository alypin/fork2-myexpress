var http=require('http');
var Layer=require('./lib/layer');
var myexpress=function(){
	var app=function(req, res, out){
		app.handle(req, res, out);
	}
	app.stack=[];

	app.handle = function (req, res,out){
		var index=0;
		
		var next = function(error){
			
			var middleware=app.stack[index++];
			if (!middleware) {

				if(out){
					return out(error);
				}


				if (error){
				res.statusCode=500;
				res.end();
				
			}
				res.statusCode=404;
				res.end('404 - Not Found');
				return;
			}
			try{
				if (middleware.handle.length <4){
					if(middleware.match(req.url)){
							middleware.handle(req, res, next);
						}
						else{
							next();
						}
				}
				if(error){
					if (middleware.handle.length==4){
						if(middleware.match(req.url)){
							middleware.handle(error, req, res, next);
						}
						else{
							next(error);
						}
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

	app.use = function(path, fun){
		var layer;
		if(typeof path!== 'function'){
			layer=new Layer(path, fun);
		}
		else{
			layer=new Layer("/",fun);
		}
		app.stack.push(layer);
		return app;
	}
	
	var server=http.createServer(app);
	app.listen=function(port, done){
		return server.listen(port, done);

	}

	

	return app;
}

module.exports=myexpress;