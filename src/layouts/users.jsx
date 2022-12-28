import React from 'react'
import { Redirect, useParams } from 'react-router-dom'
import EditUserPage from '../components/ui/editUser'
import UserPage from '../components/page/userPage'
import UserListPage from '../components/page/userListPage'
import UserProvider from '../hooks/useUsers'
import { useAuth } from '../hooks/useAuth'

const Users = () => {
	const params = useParams()
	const { currentUser } = useAuth()
	const id = currentUser._id
	const { userId, edit } = params
	return (
		<>
			<UserProvider>
				{userId ? (
					edit ? (
						id === userId ? (
							<EditUserPage />
						) : (
							<Redirect
								from={'/user/:userId?/:edit?'}
								to={`/user/${id}/:edit?`}
							/>
						)
					) : (
						<UserPage userId={userId} />
					)
				) : (
					<UserListPage />
				)}
			</UserProvider>
		</>
	)
}

export default Users
