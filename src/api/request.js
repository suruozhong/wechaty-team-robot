const config = require('../constant/config')
// node-request请求模块包
const request = require("request")
//参数编码
const urlencode = require("urlencode")

exports.get = function(req){
	return createRequest(req);
}

const getUrl = (api, paras) => {

  paras = Object.assign({
	t: new Date().getTime()
  }, paras);

  //添加签名结果
  paras = Object.assign({}, paras);

  //拼接URL地址
  var url = config.host + api + "?"
  var arr = Object.keys(paras);
  for (var i in arr) {
	url = url + (arr[i] + "=" + urlencode(paras[arr[i]])) + "&";
  }

  //remove last '&'
  return url.substring(0, url.length - 1);
}

const createRequest = (req) => {
		var method;
		var url;
		var header = { "creator": config.creator};
		if(req.method == null){
			//"GET"
			url = getUrl(req.api, req.data);
			return new Promise((resolve, reject) => {
				request(url,function(error,response,body){
					if (!error && response.statusCode == 200) {
						if(!body){
							body="{}"
						}
						resolve(JSON.parse(body));// 请求成功的处理逻辑
					}else{
						reject(body);
					}
				});
			});	
		}else{
			//POST
			url = config.host + req.api;

			
		}
	}
