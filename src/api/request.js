const config = require('./constant/config')
export default {
	get : req => {
	  //default is get
	  return createRequest(req);
	},

	post : req => {
	  return createRequest(Object.assign({ method: 'POST' }, req));
	}
	
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
	url = url + (arr[i] + "=" + paras[arr[i]]) + "&";
  }

  //remove last '&'
  return url.substring(0, url.length - 1);
}
// req{
// 	  api,
// 	  paras,
// 	  method,
// 	  header,
// 	  data,
// 	}
const createRequest = (req) => {
		var method;
		var url;
		var header = { "creator": config.creator,  "accessToken" : store.state.accessToken};
		if(req.method == null){
			method = "GET"
			url = getUrl(req.api, req.paras);
		}else{
			method = req.method
			url = config.host + req.api;
			header = Object.assign({'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},header)
		}
		if(req.header){
			header = Object.assign({}, header, req.header)
		}
	  var realRequest = {
		url: url,
		method: (req.method == null ? 'GET' : req.method),
		header: header,
		data: req.paras,
	  }

	  const p = new Promise((resolve, reject) => {
		uni.request(Object.assign({
		  success: function (res) {
			// 请求成功
			if (res.data.success) {
			  resolve(res.data);
			} else {
			  reject(res.data);
			}
		  },
		  error: function (e) {
			reject({
			  code: 99,
			  message: '网络错误'
			});
		  }
		}, realRequest))
	  });

	  return {
		send: () => p
	  }
	}
