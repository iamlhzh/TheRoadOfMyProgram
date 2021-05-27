import myConfig from './config.js'

/**
 * 通用微信小程序网络请求
 * 基于 Promise 对象实现更简单的 request 使用方式
 */

export default {
	config:myConfig.baseConfig,
	//拦截器
	interceptor: {
		request: (config) => {
	// let appToken=uni.getStorageSync('YUAN_GONGDAN_APP_TOKEN');
	// if(appToken){
	// 	config.header = Object.assign({},config.header, {'YUAN_GONGDAN_APP_TOKEN':appToken}) 
	// }
},
	response: (response => {
		console.log(response)
	let statusCode=response.statusCode;
	if(statusCode===undefined){
		console.log("服务器故障")
		}else{
			switch (statusCode) {
			      case 400:
			        console.log('不可抗力的未知的错误');
					// setTimeout(function () {
					//     uni.hideToast();
					// 	uni.reLaunch({
					// 		url: '/pages/login/login',
					// 		success: res => {},
					// 		fail: () => {}
					// 	});
					// }, 2000);
			        break;
			      case 401:
					// setTimeout(function () {
					//     uni.hideToast();
					// 	uni.reLaunch({
					// 		url: '/pages/login/login',
					// 		success: res => {},
					// 		fail: () => {}
					// 	});
					// }, 2000);
			        break;
			      case 403:
			        console.log('系统暂停使用');
					// setTimeout(function () {
					//     uni.hideToast();
					// 	uni.reLaunch({
					// 		url: '/pages/login/login',
					// 		success: res => {},
					// 		fail: () => {}
					// 	});
					// }, 2000);
			        break;
			      case 404:
			        console.log('请求错误,未找到该资源');
			        break;
			      case 405:
			        // setTimeout(function () {
			        //     uni.hideToast();
			        // 	uni.reLaunch({
			        // 		url: '/pages/login/login',
			        // 		success: res => {},
			        // 		fail: () => {}
			        // 	});
			        // }, 2000);
			        break;
			      case 408:
			        console.log('请求超时');
			        break;
			      case 500:
			        console.log('服务器端出错');
			        break;
			      case 501:
			        console.log('网络未实现');
			        break;
			      case 502:
			        console.log('网络错误');
			        break;
			      case 503:
			        console.log('服务不可用');
			        break;
			      case 504:
			        console.log('网络超时');
			        break;
			      case 505:
			        console.log('http版本不支持该请求');
			        break;
			      default:
			        console.log(`连接状态:${response.errMsg}`);
			    }
			}
	//判断返回状态 执行相应操作
	return response;
})
	},
	request(options) {
		if (!options) {
			options = {}
		}
		options.baseUrl = options.baseUrl || this.config.baseUrl
		options.dataType = options.dataType || this.config.dataType
		options.url = options.baseUrl + options.url
		options.data = options.data || {}
		options.method = options.method || this.config.method
		options.header = Object.assign({},this.config.header, options.header) 
		return new Promise((resolve, reject) => {
			let _config = null
			
			options.complete = (response) => {
				let statusCode = response.statusCode
				response.config = _config
				if (this.interceptor.response) {
					let newResponse = this.interceptor.response(response)
					if (newResponse) {
						response = newResponse
					}
				}
				// 统一的响应日志记录
				// _reslog(response)
				if (statusCode === 200) { //成功
					resolve(response.data);
				} else {
					reject(response)
				}
			}

			_config = Object.assign({}, this.config, options)
			_config.requestId = new Date().getTime()

			if (this.interceptor.request) {
				this.interceptor.request(_config)
			}
			wx.request(_config);
		});
	},
	
	upLoad(options) {
		if (!options) {
			options = {}
		}
		options.baseUrl = options.baseUrl || this.config.baseUrl
		options.dataType = options.dataType || this.config.dataType
		options.url = options.baseUrl + options.url
		options.data = options.data || {}
		options.method = options.method || this.config.method
		options.header = Object.assign({},this.config.header, options.header)
		return new Promise((resolve, reject) => {
			let _config = null
			options.complete = (response) => {
				let statusCode = response.statusCode
				response.config = _config
				if (this.interceptor.response) {
					let newResponse = this.interceptor.response(response)
					if (newResponse) {
						response = newResponse
					}
				}
				if (statusCode === 200) { //成功
					resolve(response.data);
				} else {
					reject(response)
				}
			}
			_config = Object.assign({}, this.config, options)
			_config.requestId = new Date().getTime()
			if (this.interceptor.request) {
				this.interceptor.request(_config)
			}
      wx.uploadFile(_config);
		});
	},
	get(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'GET'  
		return this.request(options)
	},
	post(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'POST'
		return this.request(options)
	},
	put(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'PUT'
		return this.request(options)
	},
	delete(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'DELETE'
		return this.request(options)
	},
	toUpLoadFile(url, data, file, options) {
		if (!options) {
			options = {}
		}
		//其实,这些都没啥用
		if(options.header){
				options.header = Object.assign({},options.header, {'Content-Type':'multipart/form-data'}) 
			}else{
				options.header ={'Content-Type':'multipart/form-data'};
			}
		options.url = url
		options.filePath=file
		options.data = data
		options.name='file'
		options.method = 'POST'
		return this.upLoad(options)
	}
}

