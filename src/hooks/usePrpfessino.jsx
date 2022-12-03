import React, { useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import professionServices from '../services/poffesionService'

const ProfessionContext = React.createContext()
export const useProfession = () => {
	return useContext(ProfessionContext)
}

export const ProfessionProvider = ({ children }) => {
	const [profession, setProfession] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	useEffect(() => {
		getProfessionList()
	}, [])

	useEffect(() => {
		if (error !== null) {
			toast.error(error)
			setError(null)
		}
	}, [error])

	function getProfession(id) {
		return profession.find(p => p._id === id)
	}

	async function getProfessionList() {
		try {
			const { content } = await professionServices.get()
			setProfession(content)
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
		<ProfessionContext.Provider
			value={{ profession, loading, getProfession }}>
			{children}
		</ProfessionContext.Provider>
	)
}

ProfessionProvider.propTypes = {
	children: PropTypes.oneOfType(
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node
	)
}
