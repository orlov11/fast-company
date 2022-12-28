import React from 'react'
import Comments from '../common/comments'
import AddFormComments from './addFormComments'
import { useComments } from '../../hooks/useComments'
import { orderBy } from 'lodash'

const CommentPage = () => {
	const { createComment, comments } = useComments()

	const handleSubmit = data => {
		createComment(data)
	}
	const sortedComments = orderBy(comments, ['created_at'], ['desc'])
	return (
		<>
			<div className="card mb-2">
				<AddFormComments onSubmit={handleSubmit} />
			</div>
			{comments.length !== 0 && (
				<div className="card mb-3">
					<div className="card-body ">
						<h2>Comments</h2>
						<hr />
						{sortedComments.map(item => (
							<Comments
								userId={item.userId}
								pageId={item.pageId}
								dateComments={item.created_at}
								id={item._id}
								key={item._id}
								content={item.content}
							/>
						))}
					</div>
				</div>
			)}
		</>
	)
}

export default CommentPage
