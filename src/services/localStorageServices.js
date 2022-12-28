const TOKEN_KEY = 'jwt-token'
const REFRESH_KEY = 'jwt-token-refresh'
const EXPIRES_TOKEN = 'jwt-token-expires'
const USERID_TOKEN = 'user-local-id'

export function setToken({ idToken, refreshToken, localId, expiresIn = 3600 }) {
	const expiresData = new Date().getTime() + expiresIn * 1000
	localStorage.setItem(TOKEN_KEY, idToken)
	localStorage.setItem(REFRESH_KEY, refreshToken)
	localStorage.setItem(EXPIRES_TOKEN, expiresData)
	localStorage.setItem(USERID_TOKEN, localId)
}

export function getAccsessToken() {
	return localStorage.getItem(TOKEN_KEY)
}
export function getRefreshToken() {
	return localStorage.getItem(REFRESH_KEY)
}
export function getExpiresData() {
	return localStorage.getItem(EXPIRES_TOKEN)
}
export function getUserId() {
	return localStorage.getItem(USERID_TOKEN)
}

export function deleteToken() {
	localStorage.removeItem(TOKEN_KEY)
	localStorage.removeItem(REFRESH_KEY)
	localStorage.removeItem(EXPIRES_TOKEN)
	localStorage.removeItem(USERID_TOKEN)
}

const localStorageServices = {
	setToken,
	getAccsessToken,
	getRefreshToken,
	getExpiresData,
	getUserId,
	deleteToken
}

export default localStorageServices
