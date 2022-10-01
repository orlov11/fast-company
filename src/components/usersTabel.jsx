import React, { useState, useEffect } from 'react'
import User from './user'
import API from '../API'
import Pagination from './pagination'
import { paginate } from '../utils/paginate'
import PropTypes from 'prop-types'
import ListGroup from './groupList'
import SearhStatus from './searchStatus'

const Users = ({ users, onDelete, onBookmark, length }) => {
	const pageSize = 4
	const [profession, setProfession] = useState()
	const [currentPage, setCurrentPage] = useState(1)
	const [selectedProf, setSelectedProf] = useState()
	const handlePageChange = pageIndex => {
		setCurrentPage(pageIndex)
	}
	const handleProfessionSelect = item => {
		setSelectedProf(item)
	}
	useEffect(() => {
		setCurrentPage(1)
	}, [selectedProf])
	const filterUsers = selectedProf ? users.filter(user => user.profession === selectedProf) : users
	const count = filterUsers.length
	const userCrop = paginate(filterUsers, currentPage, pageSize)

	useEffect(() => {
		API.professions.fetchAll().then(date => setProfession(date))
	}, [])
	const clearFilter = params => {
		setSelectedProf()
	}
	return (
		<div className="d-flex ">
			{profession && (
				<div className="d-flex flex-column flex-shrink-0 p-3">
					<ListGroup
						selectedItem={selectedProf}
						items={profession}
						onProfessionSelect={handleProfessionSelect}
					/>
					<button className="btn btn-secondary mt-2" onClick={clearFilter}>
						Очистить
					</button>
				</div>
			)}
			<div className="d-flex flex-column w-100 ">
				<SearhStatus length={count} />
				{count > 0 && (
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
				)}
				<div className="d-flex justify-content-center">
					<Pagination
						itemCount={count}
						currentPage={currentPage}
						pageSize={pageSize}
						onPageChange={handlePageChange}
					/>
				</div>
			</div>
		</div>
	)
}

Users.propTypes = {
	users: PropTypes.array.isRequired,
	onDelete: PropTypes.func.isRequired,
	onBookmark: PropTypes.func.isRequired,
	length: PropTypes.number.isRequired
}

export default Users
