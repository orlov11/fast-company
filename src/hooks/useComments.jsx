import React, { useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'
import { useAuth } from './useAuth'
import { nanoid } from 'nanoid'
import commentsSerices from '../services/commentsSerices'

const CommentsContext = React.createContext()
export const useComments = () => {
	return useContext(CommentsContext)
}

export const CommentsProvider = ({ children }) => {
	const [comments, setComments] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const { userId } = useParams()
	const { currentUser } = useAuth()

	function errorCatcher(error) {
		const { message } = error.response.data
		setError(message)
	}

	useEffect(() => {
		getComments()
	}, [userId])
	async function getComments() {
		try {
			const { content } = await commentsSerices.getComment(userId)
			setComments(content)
		} catch (error) {
			errorCatcher(error)
		} finally {
			setLoading(false)
		}
	}

	async function createComment(data) {
		const comment = {
			...data,
			_id: nanoid(),
			pageId: userId,
			created_at: Date.now(),
			userId: currentUser._id
		}
		try {
			const { content } = await commentsSerices.createComment(comment)
			setComments(prevState => [...prevState, comment])
		} catch (error) {
			errorCatcher(error)
		}
	}
	async function removeComment(id) {
		try {
			const { content } = await commentsSerices.removeComment(id)
			if (content === null) {
				setComments(prevState => prevState.filter(c => c._id !== id))
			}
		} catch (error) {
			console.log(error)
			errorCatcher(error)
		}
	}
	useEffect(() => {
		if (error !== null) {
			toast.error(error)
			setError(null)
		}
	}, [error])

	return (
		<CommentsContext.Provider
			value={{
				comments,
				loading,
				getComments,
				createComment,
				removeComment
			}}>
			{children}
		</CommentsContext.Provider>
	)
}

CommentsProvider.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node
	])
}
