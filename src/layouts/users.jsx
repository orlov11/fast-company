import React from 'react'
import { useParams } from 'react-router-dom'
import EditUserPage from '../components/ui/editUser'
import UserPage from '../components/page/userPage'
import UserListPage from '../components/page/userListPage'
import UserProvider from '../hooks/useUsers'

const Users = () => {
	const params = useParams()
	const { userId, edit } = params
	return (
		<>
			<UserProvider>
				{userId ? (
					edit ? (
						<EditUserPage />
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
