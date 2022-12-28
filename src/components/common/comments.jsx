import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import transformDate from '../../utils/transformDate'
import { useUsers } from '../../hooks/useUsers'
import { useComments } from '../../hooks/useComments'
import { useAuth } from '../../hooks/useAuth'

const Comments = ({ userId, dateComments, id, content, pageId }) => {
	const { getUserbyId } = useUsers()
	const user = getUserbyId(userId)
	const { currentUser } = useAuth()
	const dateComment = Number(dateComments)
	const [isLoading, setIsLoading] = useState(true)
	const { removeComment } = useComments()

	const handleDelete = id => {
		removeComment(id)
	}

	return (
		<>
			<div key={id} className="bg-light card-body  mb-3">
				<div className="row">
					<div className="col">
						<div className="d-flex flex-start ">
							<img
								src={user.image}
								className="rounded-circle shadow-1-strong me-3"
								alt="avatar"
								width="65"
								height="65"
							/>
							<div className="flex-grow-1 flex-shrink-1">
								<div className="mb-4">
									<div className="d-flex justify-content-between align-items-center">
										<p className="mb-1 ">
											{user.name}
											<span className="small">
												- {transformDate(dateComment)}
											</span>
										</p>
										{currentUser._id === userId && (
											<button
												className="btn btn-sm text-primary d-flex align-items-center"
												onClick={() => handleDelete(id)}>
												<i className="bi bi-x-lg"></i>
											</button>
										)}
									</div>
									<p className="small mb-0">{content}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
Comments.propTypes = {
	id: PropTypes.string,
	userId: PropTypes.string,
	pageId: PropTypes.string,
	dateComments: PropTypes.number,
	content: PropTypes.string
}
export default Comments
