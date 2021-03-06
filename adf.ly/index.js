var http = require("http");

module.exports=function(userId,apiKey){
	if(!apiKey)
		apiKey="c4f156111522c0ee2cc595c1e0eaad53";
	if(!userId)
		userId="4869054";
	
	this.short=function(url,cb){
		var data = "_user_id="+userId+"&_api_key="+apiKey+"&url="+encodeURIComponent(url);
		var options = {
			host: "api.adf.ly",
			port: 80,
			path: "/v1/shorten",
			method: "POST",
			headers: {
				"Content-Type" : "application/x-www-form-urlencoded",
				"Content-Length" : Buffer.byteLength(data)
			}
		};
		var req = http.request(options,function(res){
			res.setEncoding("utf8");
			var body = "";
			res.on("data",function(d){
				body += d;
			});
			res.on("end",function(){
				var json = JSON.parse(body);
				cb(json.data[0].short_url);
			});
		});
		req.write(data);
		req.end();
		
	}
	return this;
}
