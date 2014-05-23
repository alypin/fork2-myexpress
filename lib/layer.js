module.exports=function(path,fun){
	this.handle=fun;

	this.match=function(req_path){
		if(path===req_path || path===req_path.substr(0,path.length)){
			return {"path":path};
		}
		else{
			return undefined;
		}
	}
	return;

}