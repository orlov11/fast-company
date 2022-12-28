import React, { useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import userServices from '../services/userSerices'
import { toast } from 'react-toastify'
import Loader from '../components/common/Loader'

const UserContext = React.createContext()
export const useUsers = () => {
	return useContext(UserContext)
}

const UserProvider = ({ children }) => {
	const [user, setUser] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	useEffect(() => {
		getUser()
	}, [])
	useEffect(() => {
		if (error !== null) {
			toast.error(error)
			setError(null)
		}
	}, [error])
	async function getUser() {
		try {
			const { content } = await userServices.get()
			setUser(content)
			setLoading(false)
		} catch (error) {
			errorCatcher(error)
		}
	}
	function errorCatcher(error) {
		const { message } = error.response.data
		setError(message)
	}

	function getUserbyId(userId) {
		return user.find(u => u._id === userId)
	}

	return (
		<UserContext.Provider value={{ user, getUserbyId }}>
			{!loading ? children : <Loader />}
		</UserContext.Provider>
	)
}

UserProvider.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node
	])
}

export default UserProvider
