import React from 'react'
import Booksmark from './bookmarks'
import Quaities from './quaities'

const User = ({ users, onDelete, onBookSmaark }) => {
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
				<Booksmark
					status={item.status}
					id={item._id}
					onBookSmaark={onBookSmaark}
				/>
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

export default User
