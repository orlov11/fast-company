import httpServices from './httpServices'

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
	}
}

export default userServices
