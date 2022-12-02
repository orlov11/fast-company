import React, { useState, useEffect } from 'react'
import Comments from '../common/comments'
import { useParams } from 'react-router-dom'
import API from '../../API'
import AddFormComments from './addFormComments'

const CommentPage = () => {
	const { userId } = useParams()
	const [userComments, setUserComments] = useState()

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

	return (
		<>
			<div className="card mb-2">
				<AddFormComments update={update} />
			</div>

			{userComments && (
				<div className="card mb-3">
					<div className="card-body ">
						<h2>Comments</h2>
						<hr />
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
