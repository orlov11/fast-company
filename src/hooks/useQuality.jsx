import React, { useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import qualitiesService from '../services/qualitiesService'

const QualityContext = React.createContext()
export const useQuality = () => {
	return useContext(QualityContext)
}

export const QualityProvider = ({ children }) => {
	const [qualities, setQualities] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	useEffect(() => {
		getQualitiesList()
	}, [])

	function getQualities(id) {
		return qualities.find(p => p._id === id)
	}

	async function getQualitiesList() {
		try {
			const { content } = await qualitiesService.get()
			setQualities(content)
		} catch (error) {
			errorCatcher(error)
		} finally {
			setLoading(false)
		}
	}

	function errorCatcher(error) {
		const { message } = error.response.data
		setError(message)
	}
	useEffect(() => {
		if (error !== null) {
			toast.error(error)
			setError(null)
		}
	}, [error])

	return (
		<QualityContext.Provider value={{ qualities, loading, getQualities }}>
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
