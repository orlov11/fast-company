import React, { useState, useEffect } from 'react'
import { useHistory, useParams, Link } from 'react-router-dom'

import API from '../../../API'
import Qualitiess from '../../ui/quaities'

const UserPage = () => {
	const history = useHistory()
	const [user, setUser] = useState()
	useEffect(() => {
		API.users.getById(userId).then(date => setUser(date))
	}, [])
	useEffect(() => {}, [user])
	const { userId } = useParams()

	return (
		<>
			{user ? (
				<>
					<h1 className="m-2 mt-3">{user.name}</h1>
					<h2 className="m-2 mt-3">Проффессия: {user.profession.name}</h2>
					<Qualitiess qualities={user.qualities} />
					<h2 className="m-2 mt-3">
						CompletedMeetings: {user.completedMeetings}
					</h2>
					<h2 className="m-2 mt-3">Rate: {user.rate}</h2>
					<Link to={`/user/${userId}/edit`}>
						<button className="btn btn-dark m-2">Go ro edit</button>
					</Link>
				</>
			) : (
				'Loading...'
			)}
		</>
	)
}
export default UserPage
