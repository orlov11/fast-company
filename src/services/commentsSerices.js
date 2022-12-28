import httpServices from './httpServices'

const commentEndPoint = 'comment/'

const commentsSerices = {
	createComment: async payload => {
		const { data } = await httpServices.put(
			commentEndPoint + payload._id,
			payload
		)
		return data
	},
	getComment: async pageId => {
		const { data } = await httpServices.get(commentEndPoint, {
			params: {
				orderBy: '"pageId"',
				equalTo: `"${pageId}"`
			}
		})
		return data
	},
	removeComment: async commntId => {
		const { data } = await httpServices.delete(commentEndPoint + commntId)
		console.log(data)
		return data
	}
}

export default commentsSerices
