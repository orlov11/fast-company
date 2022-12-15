const TOKEN_KEY = 'jwt-token'
const REFRESH_KEY = 'jwt-token-refresh'
const EXPIRES_TOKEN = 'jwt-token-expires'

export function setToken({ idToken, refreshToken, expiresIn = 3600 }) {
	const expiresData = new Date().getTime() + expiresIn * 1000
	localStorage.setItem(TOKEN_KEY, idToken)
	localStorage.setItem(REFRESH_KEY, refreshToken)
	localStorage.setItem(EXPIRES_TOKEN, expiresData)
}

export function getAccsessToken() {
	localStorage.getItem(TOKEN_KEY)
}
export function getRefreshToken() {
	localStorage.getItem(REFRESH_KEY)
}
export function getExpiresToken() {
	localStorage.getItem(EXPIRES_TOKEN)
}

const localStorageServices = {
	setToken
}

export default localStorageServices
