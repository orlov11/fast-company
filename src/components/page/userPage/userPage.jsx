import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useHistory, useParams, Link } from 'react-router-dom'
import API from '../../../API'
import UserCard from '../../ui/userCard'
import QualitiesCard from '../../ui/qualitiesCard'
import MeetingsCard from '../../ui/meetingsCard'
import CommentPage from '../../ui/CommentPage'

const UserPage = () => {
	const history = useHistory()
	const [user, setUser] = useState()

	useEffect(() => {
		API.users.getById(userId).then(date => setUser(date))
	}, [])

	const { userId } = useParams()

	return (
		<>
			{user ? (
				<div className="container">
					<div className="row gutters-sm">
						<div className="col-md-4 mb-3">
							<UserCard user={user} />
							<QualitiesCard data={user.qualities} />
							<MeetingsCard value={user.completedMeetings} />
						</div>
						<div className="col-md-8">
							<CommentPage />
						</div>
					</div>
				</div>
			) : (
				'Loading...'
			)}
		</>
	)
}
export default UserPage
