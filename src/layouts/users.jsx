import React, { useState, useEffect } from 'react'
import API from '../API'
import Pagination from '../components/pagination'
import TextField from '../components/textField'
import { paginate } from '../utils/paginate'
import ListGroup from '../components/groupList'
import SearhStatus from '../components/searchStatus'
import UserTabel from '../components/userTable'
import UserPage from '../components/userPage'
import { useParams } from 'react-router-dom'

import _ from 'lodash'

const Users = () => {
	const { userId } = useParams()
	const pageSize = 4
	const [search, setSearch] = useState('')
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
		setSearch('')
	}
	const handleSearch = ({ target }) => {
		setSearch(target.value)
		setSelectedProf()
	}
	useEffect(() => {
		setCurrentPage(1)
	}, [selectedProf])

	useEffect(() => {
		API.professions.fetchAll().then(date => setProfession(date))
	}, [])

	const filterUser = () => {
		if (selectedProf) {
			return user.filter(user => _.isEqual(user.profession, selectedProf))
		} else if (search) {
			return user.filter(user => user.name.split(' ').join('').toLowerCase().includes(search.toLowerCase()))
		} else {
			return user
		}
	}

	if (user) {
		const filterUsers = filterUser()
		const count = filterUsers.length
		const sortedUsers = _.orderBy(filterUsers, [sortBy.path], [sortBy.order])
		const userCrop = paginate(sortedUsers, currentPage, pageSize)

		const clearFilter = () => {
			setSelectedProf()
		}

		const handelSort = item => {
			setSortBy(item)
		}

		return (
			<>
				{userId ? (
					<UserPage />
				) : (
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
							<TextField label="Search" name="search" value={search} onChange={handleSearch} />

							{count > 0 && (
								<UserTabel user={userCrop} onDelete={handleDelete} onBookmark={handleToggleonBookmark} onSort={handelSort} selectedSort={sortBy} />
							)}
							<div className="d-flex justify-content-center">
								<Pagination itemCount={count} currentPage={currentPage} pageSize={pageSize} onPageChange={handlePageChange} />
							</div>
						</div>
					</div>
				)}
			</>
		)
	}
	return ' Loading...'
}

export default Users
