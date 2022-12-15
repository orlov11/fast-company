import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { toast } from 'react-toastify'
import userServices from '../services/userSerices'
import { setToken } from '../services/localStorageServices'

const httpAuth = axios.create()
const AuthContext = React.createContext()
export const useAuth = () => {
	return useContext(AuthContext)
}
const AuthProvider = ({ children }) => {
	const [currentUser, setUser] = useState({})
	const [error, setError] = useState(null)

	async function signUp({ email, password, ...rest }) {
		const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_KEY}`
		try {
			const { data } = await httpAuth.post(url, {
				email,
				password,
				returnSecureToken: true
			})
			setToken(data)
			await createUser({
				_id: data.localId,
				email,
				completedMeetings: 0,
				...rest
			})
		} catch (error) {
			errorCatcher(error)
			const { message, code } = error.response.data.error
			if (code === 400) {
				if (message === 'EMAIL_EXISTS') {
					const errorObject = {
						email: 'Такой Email уже зарегестрирован'
					}
					throw errorObject
				}
			}
		}
	}

	async function signIn({ email, password }) {
		const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_KEY}`

		try {
			const { data } = await httpAuth.post(url, {
				email,
				password,
				returnSecureToken: true
			})
			setToken(data)
		} catch (error) {
			const { message, code } = error.response.data.error
			if (code === 400) {
				if (message === 'EMAIL_NOT_FOUND') {
					const errorObject = {
						email: 'Указанный вами Email не связан ни с одним аккаунтом'
					}
					throw errorObject
				}
				if (message === 'INVALID_PASSWORD') {
					const errorObject = {
						password: 'Указанный вами пароль не верен'
					}
					throw errorObject
				}
			}
		}
	}
	async function createUser(data) {
		try {
			const { content } = userServices.create(data)
			setUser(content)
		} catch (error) {
			errorCatcher(error)
		}
	}
	function errorCatcher(error) {
		const { message } = error.response.data.error
		setError(message)
	}
	useEffect(() => {
		if (error !== null) {
			toast.error(error)
			setError(null)
		}
	}, [error])

	return (
		<AuthContext.Provider value={{ signUp, currentUser, signIn }}>
			{children}
		</AuthContext.Provider>
	)
}

AuthProvider.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node
	])
}

export default AuthProvider
