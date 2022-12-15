import axios from 'axios'
import { toast } from 'react-toastify'
import configFile from '../config.json'

const http = axios.create({
	baseURL: configFile.apiEndPoint
})

http.interceptors.request.use(
	function (config) {
		if (configFile.isFairBase) {
			const containSlash = /\/$/gi.test(config.url)
			config.url =
				(containSlash ? config.url.slice(0, -1) : config.url) + '.json'
		}

		return config
	},
	function (error) {
		return Promise.reject(error)
	}
)
function transformData(data) {
	return data
		? Object.keys(data).map(key => ({
				...data[key]
		  }))
		: []
}

http.interceptors.response.use(
	res => {
		if (configFile.isFairBase) {
			res.data = { content: transformData(res.data) }
		}

		return res
	},
	function (error) {
		const expectedError =
			error.response &&
			error.response.status >= 400 &&
			error.response.status < 500
		if (!expectedError) {
			toast.error('Unexpected Error')
		}
		return Promise.reject(error)
	}
)

const httpServices = {
	get: http.get,
	post: http.post,
	put: http.put,
	delete: http.delete
}
export default httpServices
