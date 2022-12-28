import React, { useContext, useEffect, useState } from 'react'
import PropTypes, { func } from 'prop-types'
import axios from 'axios'
import { toast } from 'react-toastify'
import userServices from '../services/userSerices'
import localStorageServices, {
	setToken
} from '../services/localStorageServices'
import Loader from '../components/common/Loader'
import { useHistory } from 'react-router-dom'

export const httpAuth = axios.create({
	baseURL: 'https://identitytoolkit.googleapis.com/v1/',
	params: { key: process.env.REACT_APP_FIREBASE_KEY }
})
const AuthContext = React.createContext()

export const useAuth = () => {
	return useContext(AuthContext)
}
const AuthProvider = ({ children }) => {
	const [currentUser, setUser] = useState()
	const [error, setError] = useState(null)
	const [isLoading, setIsLoading] = useState(true)
	const history = useHistory()
	function randomIint(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min)
	}
	async function signUp({ email, password, ...rest }) {
		const url = `accounts:signUp`
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
				completedMeetings: randomIint(0, 200),
				rate: randomIint(0, 5),
				image: `https://avatars.dicebear.com/api/avataaars/${(
					Math.random() + 1
				)
					.toString(36)
					.substring(7)}.svg`,
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
		const url = `accounts:signInWithPassword`

		try {
			const { data } = await httpAuth.post(url, {
				email,
				password,
				returnSecureToken: true
			})
			setToken(data)
			await getUserData()
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
			const { content } = await userServices.create(data)
			setUser(content)
		} catch (error) {
			errorCatcher(error)
		}
	}
	async function updateUser(data) {
		try {
			const { content } = await userServices.update({
				...currentUser,
				...data
			})
		} catch (error) {
			errorCatcher(error)
		}
	}

	function errorCatcher(error) {
		const { message } = error.response.data.error
		setError(message)
	}
	async function getUserData() {
		try {
			const { content } = await userServices.getCurrentUser()
			setUser(content)
		} catch (error) {
			errorCatcher(error)
		} finally {
			setIsLoading(false)
		}
	}

	function logOut() {
		localStorageServices.deleteToken()
		setUser(null)
		history.push('/')
	}

	useEffect(() => {
		if (localStorageServices.getAccsessToken()) {
			getUserData()
		} else {
			setIsLoading(false)
		}
	}, [])
	useEffect(() => {
		if (error !== null) {
			toast.error(error)
			setError(null)
		}
	}, [error])

	return (
		<AuthContext.Provider
			value={{ signUp, currentUser, signIn, logOut, updateUser }}>
			{!isLoading ? children : <Loader loading="Loading" />}
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
