var p2re=require('path-to-regexp');
module.exports=function(path,fun, option){
	 path = path.charAt(path.length - 1) == "/" ? path.substr(0, path.length - 1) : path;
	this.handle=fun;

	this.match=function(req_path){
		var names=[];
		re=p2re(path, names, {end:option});
		paths=re.exec(decodeURIComponent(req_path));
		if(paths){
			return {path : paths[0],params:{a:paths[1],b:paths[2],}}
		}
		else{
			return undefined;
		}
	}
	return;

}