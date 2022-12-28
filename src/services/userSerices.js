import httpServices from './httpServices'
import localStorageServices from './localStorageServices'

const userEndPointa = 'user/'

const userServices = {
	get: async () => {
		const { data } = await httpServices.get(userEndPointa)
		return data
	},
	create: async payload => {
		const { data } = await httpServices.put(
			userEndPointa + payload._id,
			payload
		)
		return data
	},
	getCurrentUser: async () => {
		const { data } = await httpServices.get(
			userEndPointa + localStorageServices.getUserId()
		)
		return data
	},
	update: async payload => {
		const { data } = await httpServices.put(
			userEndPointa + payload._id,
			payload
		)
		console.log(data)
		return data
	}
}

export default userServices
