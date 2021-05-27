import localUrl from './config-use.js'
/**
 * 测试与正式环境配置request请求基本信息
 */
//baseUrl地址
let url_config =localUrl.url_config;
let baseConfig = {
	baseUrl: url_config,
	header: {
		'Accept': 'application/json',
		'Content-Type': 'application/json',
	},
	data: {},
	method: "GET",
	dataType: "json",
	/* 如设为json，会对返回的数据做一次 JSON.parse */
	responseType: "text",
	success() {},
	fail() {},
	complete() {}
}


export default {
	baseConfig
}