import httpServices from './httpServices'

const qualityEndPoint = 'quality/'

const qualityServices = {
	get: async () => {
		const { data } = await httpServices.get(qualityEndPoint)
		return data
	}
}

export default qualityServices
