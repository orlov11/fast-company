import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import API from '../API'

const UserPage = () => {
	const history = useHistory()
	const [user, setUser] = useState()
	useEffect(() => {
		API.users.getById(userId).then(date => setUser(date))
	}, [])
	const { userId } = useParams()

	const handelReturn = params => {
		history.push('/user')
	}

	return (
		<>
			{user ? (
				<>
					<h1 className="m-2 mt-3">{user.name}</h1>
					<h2 className="m-2 mt-3">Проффессия: {user.profession.name}</h2>
					{user.qualities.map(item => (
						<h2 className={`badge m-2 mt-3 text-bg-${item.color}`} key={item._id}>
							{item.name}
						</h2>
					))}
					<h2 className="m-2 mt-3">CompletedMeetings: {user.completedMeetings}</h2>
					<h2 className="m-2 mt-3">Rate: {user.rate}</h2>
					<button className="btn btn-dark m-2" onClick={handelReturn}>
						Все пользователи
					</button>
				</>
			) : (
				'Loading...'
			)}
		</>
	)
}
export default UserPage
