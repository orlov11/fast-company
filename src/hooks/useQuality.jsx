import React, { useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import qualityServices from '../services/qualitysService'

const QualityContext = React.createContext()
export const useQuality = () => {
	return useContext(QualityContext)
}

export const QualityProvider = ({ children }) => {
	const [qualitys, setQualitys] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	useEffect(() => {
		getQualitysList()
	}, [])

	useEffect(() => {
		if (error !== null) {
			toast.error(error)
			setError(null)
		}
	}, [error])

	function getQualitys(id) {
		return qualitys.find(p => p._id === id)
	}

	async function getQualitysList() {
		try {
			const { content } = await qualityServices.get()
			setQualitys(content)
			setLoading(false)
		} catch (error) {
			errorCatcher(error)
		}
	}

	function errorCatcher(error) {
		const { message } = error.response.data
		setError(message)
	}

	return (
		<QualityContext.Provider value={{ qualitys, loading, getQualitys }}>
			{children}
		</QualityContext.Provider>
	)
}

QualityProvider.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node
	])
}
