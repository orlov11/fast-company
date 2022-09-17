import React from 'react'
import User from './user'

const Users = ({ users, onDelete, onBookSmaark, length }) => {
	return (
		length > 0 && (
			<table className="table">
				<thead>
					<tr>
						<th scope="col">#</th>
						<th scope="col">Имя</th>
						<th scope="col">Качество</th>
						<th scope="col">Профессия</th>
						<th scope="col">Встретился раз</th>
						<th scope="col">Оценка</th>
						<th scope="col">Избранное</th>
						{/* <th /> */}
					</tr>
				</thead>
				<tbody>
					<User users={users} onDelete={onDelete} onBookSmaark={onBookSmaark} />
				</tbody>
			</table>
		)
	)
}
export default Users
