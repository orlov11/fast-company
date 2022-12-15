import httpServices from './httpServices'

const qualityEndPoint = 'quality/'

const qualitiesService = {
	get: async () => {
		const { data } = await httpServices.get(qualityEndPoint)
		return data
	}
}

export default qualitiesService
