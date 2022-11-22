import React, { useState, useEffect, useRef, useCallback } from 'react'
import Comments from '../common/comments'
import { useParams } from 'react-router-dom'
import API from '../../API'
import AddFormComments from './addFormComments'

const CommentPage = () => {
	const { userId } = useParams()
	const [userComments, setUserComments] = useState()

	useEffect(() => {
		API.comments.fetchCommentsForUser(userId).then(date => {
			const sort = date.slice(0)
			setUserComments(
				sort.sort(function (a, b) {
					return b.created_at - a.created_at
				})
			)
		})
	}, [])

	const update = () => {
		API.comments.fetchCommentsForUser(userId).then(date => {
			const sort = date.slice(0)
			setUserComments(
				sort.sort(function (a, b) {
					return b.created_at - a.created_at
				})
			)
		})
	}

	return (
		<>
			<div className="card mb-2"></div>

			{userComments && (
				<div className="card mb-3">
					<div className="card-body ">
						<AddFormComments update={update} />
						<hr />
						<h2>Comments</h2>
						{userComments &&
							userComments.map(item => (
								<Comments
									userId={item.userId}
									dateComments={item.created_at}
									id={item._id}
									key={item._id}
									content={item.content}
									update={update}
								/>
							))}
					</div>
				</div>
			)}
		</>
	)
}

export default CommentPage
