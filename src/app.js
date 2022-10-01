import React, { useState } from 'react'
import Users from './components/usersTabel'
import API from './API'

function App() {
	const [user, setUsere] = useState(API.users.fetchAll())

	const handleDelete = userId => {
		setUsere(user.filter(item => item._id !== userId))
	}

	const handleToggleonBookmark = id => {
		setUsere(
			user.map(item => {
				if (item._id === id) {
					item.status = !item.status
				}
				return item
			})
		)
	}
	return (
		<div>
			<Users
				users={user}
				length={user.length}
				onDelete={handleDelete}
				onBookmark={handleToggleonBookmark}
			/>
		</div>
	)
}

export default App
