import React, { useState, useEffect } from 'react'
import API from '../API'
import Pagination from './pagination'
import { paginate } from '../utils/paginate'
import ListGroup from './groupList'
import SearhStatus from './searchStatus'
import UserTabel from './userTable'
import _ from 'lodash'

const Users = () => {
	const pageSize = 4
	const [profession, setProfession] = useState()
	const [currentPage, setCurrentPage] = useState(1)
	const [selectedProf, setSelectedProf] = useState()
	const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' })
	const [user, setUsere] = useState()
	useEffect(() => {
		API.users.fetchAll().then(date => setUsere(date))
	}, [])
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
	const handlePageChange = pageIndex => {
		setCurrentPage(pageIndex)
	}
	const handleProfessionSelect = item => {
		setSelectedProf(item)
	}
	useEffect(() => {
		setCurrentPage(1)
	}, [selectedProf])

	useEffect(() => {
		API.professions.fetchAll().then(date => setProfession(date))
	}, [])

	if (user) {
		const filterUsers = selectedProf ? user.filter(user => _.isEqual(user.profession, selectedProf)) : user
		const count = filterUsers.length
		const sortedUsers = _.orderBy(filterUsers, [sortBy.path], [sortBy.order])
		const userCrop = paginate(sortedUsers, currentPage, pageSize)

		const clearFilter = params => {
			setSelectedProf()
		}

		const handelSort = item => {
			setSortBy(item)
		}

		return (
			<div className="d-flex ">
				{profession && (
					<div className="d-flex flex-column flex-shrink-0 p-3">
						<ListGroup selectedItem={selectedProf} items={profession} onProfessionSelect={handleProfessionSelect} />
						<button className="btn btn-secondary mt-2" onClick={clearFilter}>
							Очистить
						</button>
					</div>
				)}
				<div className="d-flex flex-column w-100 ">
					<SearhStatus length={count} />
					{count > 0 && (
						<UserTabel
							user={userCrop}
							onDelete={handleDelete}
							onBookmark={handleToggleonBookmark}
							onSort={handelSort}
							selectedSort={sortBy}
						/>
					)}
					<div className="d-flex justify-content-center">
						<Pagination itemCount={count} currentPage={currentPage} pageSize={pageSize} onPageChange={handlePageChange} />
					</div>
				</div>
			</div>
		)
	}
	return ' Loading...'
}

export default Users
