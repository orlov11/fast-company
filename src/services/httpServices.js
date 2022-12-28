import axios from 'axios'
import { toast } from 'react-toastify'
import configFile from '../config.json'
import { httpAuth } from '../hooks/useAuth'
import localStorageServices from './localStorageServices'

const http = axios.create({
	baseURL: configFile.apiEndPoint
})

http.interceptors.request.use(
	async function (config) {
		if (configFile.isFairBase) {
			const containSlash = /\/$/gi.test(config.url)
			config.url =
				(containSlash ? config.url.slice(0, -1) : config.url) + '.json'
			const expiresData = localStorageServices.getExpiresData()
			const refreshToken = localStorageServices.getRefreshToken()
			if (refreshToken && expiresData < Date.now()) {
				const { data } = await httpAuth.post('token', {
					grant_type: 'refresh_token',
					refresh_token: refreshToken
				})
				localStorageServices.setToken({
					idToken: data.id_token,
					refreshToken: data.refresh_token,
					localId: data.user_id,
					expiresIn: data.expires_in
				})
			}
		}
		const accessToken = localStorageServices.getAccsessToken()
		if (accessToken) {
			config.params = { ...config.params, auth: accessToken }
		}
		return config
	},
	function (error) {
		return Promise.reject(error)
	}
)
function transformData(data) {
	return data && !data._id
		? Object.keys(data).map(key => ({
				...data[key]
		  }))
		: data
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
