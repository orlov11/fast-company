import React from 'react'
import { useHistory, useParams, Link } from 'react-router-dom'
import UserCard from '../../ui/userCard'
import QualitiesCard from '../../ui/qualitiesCard'
import MeetingsCard from '../../ui/meetingsCard'
import CommentPage from '../../ui/CommentPage'
import Loader from '../../common/Loader'
import { useUsers } from '../../../hooks/useUsers'
import { CommentsProvider } from '../../../hooks/useComments'

const UserPage = () => {
	const history = useHistory()
	const { getUserbyId } = useUsers()
	const { userId } = useParams()
	const user = getUserbyId(userId)

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
							<CommentsProvider>
								<CommentPage />
							</CommentsProvider>
						</div>
					</div>
				</div>
			) : (
				<Loader loading="Loading" />
			)}
		</>
	)
}
export default UserPage
