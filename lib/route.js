module.exports=function(){
	var route= function(req, res, next){
		if(req.method==verb.toUpperCase()){
			handler(req, res, next);
		}
		else{
			res.statusCode=404;
			res.end();
		}
	}
	route.stack=[];
	route.use=function(verb,handler){
		route.stack.push({verb:verb, handler:handler});
	}

	return route;
}