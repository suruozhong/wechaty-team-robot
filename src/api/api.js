const {get,post} = require('../api/request')

module.exports ={
	handle : params => { //消息处理
	  return get({
	    api: "/taskMsg/handle",
	    data: params
	  })
	},
	setSend : params => { //将消息置为已发送
	  return get({
		api: "/taskMsg/setSend",
		data: params
	  })
	},
	list : params => { //未发送消息列表
	  return get({
		api: "/taskMsg/list",
		data: params
	  })
	}
}