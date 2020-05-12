const {get,post} = require('../api/request')

module.exports ={
	handle : params => {
	  return get({
	    api: "/taskMsg/handle",
	    data: params
	  })
	},
	setSend : params => {
	  return get({
		api: "/taskMsg/setSend",
		data: params
	  })
	},
	list : params => {
	  return get({
		api: "/taskMsg/list",
		data: params
	  })
	}
}