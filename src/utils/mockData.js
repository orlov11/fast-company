import { useState, useEffect } from 'react'
import professions from '../MockData//professions.json'
import qualities from '../MockData/qualities.json'
import user from '../MockData/users.json'
import httpServices from '../services/httpServices'

const useMockData = () => {
	const statusConst = {
		idel: 'Not Started',
		pending: 'in Process',
		successed: 'Ready',
		error: 'Error occured'
	}
	const [error, setError] = useState(null)
	const [status, setStatus] = useState(statusConst.idel)
	const [progress, setProgress] = useState(0)
	const [count, setCount] = useState(0)
	const summaryCount = professions.length + qualities.length + user.length
	const incrimentCount = () => {
		setCount(prevState => prevState + 1)
	}
	const updateProgress = params => {
		if (count !== 0 && status === statusConst.idel) {
			console.log(statusConst.pending)
			setStatus(statusConst.pending)
		}
		const newProgress = Math.floor((count / summaryCount) * 100)
		if (progress < newProgress) {
			setProgress(() => newProgress)
		}
		if (newProgress === 100) {
			console.log(statusConst.successed)
			setStatus(statusConst.successed)
		}
	}
	useEffect(() => {
		updateProgress()
	}, [count])
	function initialaze() {
		try {
			professions.map(async item => {
				incrimentCount()
				return await httpServices.put('profession/' + item._id, item)
			})
			qualities.map(async item => {
				incrimentCount()
				return await httpServices.put('quality/' + item._id, item)
			})
			user.map(async item => {
				incrimentCount()
				return await httpServices.put('user/' + item._id, item)
			})
		} catch (error) {
			setError(error)
		}
	}
	return { error, initialaze, progress, status }
}

export default useMockData
