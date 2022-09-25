import React, { useState } from 'react'
import User from './user'
import Pagination from './pagination'
import { paginate } from '../utils/paginate'
import PropTypes from 'prop-types'

const Users = ({ users, onDelete, onBookmark, length }) => {
	const pageSize = 4
	const [currentPage, setCurrentPage] = useState(1)
	const handlePageChange = pageIndex => {
		setCurrentPage(pageIndex)
	}
	const userCrop = paginate(users, currentPage, pageSize)

	return (
		length > 0 && (
			<>
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
						</tr>
					</thead>
					<tbody>
						<User users={userCrop} onDelete={onDelete} onBookmark={onBookmark} />
					</tbody>
				</table>

				<Pagination
					itemCount={length}
					currentPage={currentPage}
					pageSize={pageSize}
					onPageChange={handlePageChange}
				/>
			</>
		)
	)
}

Users.propTypes = {
	users: PropTypes.array.isRequired,
	onDelete: PropTypes.func.isRequired,
	onBookmark: PropTypes.func.isRequired,
	length: PropTypes.number.isRequired
}

export default Users
