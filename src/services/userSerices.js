import httpServices from './httpServices'

const userEndPointa = 'user/'

const userServices = {
	get: async () => {
		const { data } = await httpServices.get(userEndPointa)
		return data
	}
}

export default userServices
