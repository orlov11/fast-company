import React from 'react'
import Booksmark from './bookmarks'
import Quaities from './quaities'
import PropTypes from 'prop-types'

const User = ({ users, onDelete, onBookmark }) => {
	return users.map((item, i) => (
		<tr key={item._id}>
			<th scope="row">{i + 1}</th>
			<td>{item.name}</td>
			{item.qualities.map(quali => (
				<Quaities {...quali} key={quali._id} />
			))}
			<td>{item.profession.name}</td>
			<td>{item.completedMeetings}</td>
			<td>{item.rate}/5</td>
			<td>
				<Booksmark status={item.status} id={item._id} onBookmark={onBookmark} />
			</td>
			<td>
				<button
					type="button"
					className="btn btn-danger"
					onClick={() => onDelete(item._id)}
				>
					Delete
				</button>
			</td>
		</tr>
	))
}
User.propTypes = {
	users: PropTypes.array.isRequired,
	onDelete: PropTypes.func.isRequired,
	onBookmark: PropTypes.func.isRequired
}

export default User
