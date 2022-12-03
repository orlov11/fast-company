import httpServices from './httpServices'

const professionEndPoint = 'profession/'

const professionServices = {
	get: async () => {
		const { data } = await httpServices.get(professionEndPoint)
		return data
	}
}

export default professionServices
