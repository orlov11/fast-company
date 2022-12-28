import React, { useState, useEffect } from 'react'
import Pagination from '../../common/pagination'
import { paginate } from '../../../utils/paginate'
import TextField from '../../ui/form/textField'
import ListGroup from '../../common/groupList'
import SearhStatus from '../../ui/searchStatus'
import UserTabel from '../../ui/userTable'
import { useParams } from 'react-router-dom'
import UserPage from '../userPage/userPage'
import _ from 'lodash'
import { useUsers } from '../../../hooks/useUsers'
import Loader from '../../common/Loader'
import { useProfession } from '../../../hooks/usePrpfessino'
import { useAuth } from '../../../hooks/useAuth'

const UserListPage = () => {
	const { userId } = useParams()
	const { currentUser } = useAuth()
	const [search, setSearch] = useState('')
	const { profession, loading: professionLoadaing } = useProfession()
	const [currentPage, setCurrentPage] = useState(1)
	const [selectedProf, setSelectedProf] = useState()
	const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' })
	const pageSize = 4
	const { user } = useUsers()

	const handleDelete = userId => {
		// setUsere(user.filter(item => item._id !== userId))
		console.log(userId)
	}

	const handleToggleonBookmark = id => {
		// setUsere(
		// 	user.map(item => {
		// 		if (item._id === id) {
		// 			item.status = !item.status
		// 		}
		// 		return item
		// 	})
		// )
		console.log(id)
	}
	const handlePageChange = pageIndex => {
		setCurrentPage(pageIndex)
	}
	const handleProfessionSelect = item => {
		setSelectedProf(item)
		setSearch('')
	}
	const handleSearch = target => {
		setSearch(target.value)
		setSelectedProf()
	}
	useEffect(() => {
		setCurrentPage(1)
	}, [selectedProf])

	const filterUser = () => {
		if (selectedProf) {
			return user.filter(user => _.isEqual(user.profession, selectedProf))
		} else if (search) {
			return user.filter(user =>
				user.name
					.split(' ')
					.join('')
					.toLowerCase()
					.includes(search.toLowerCase())
			)
		} else {
			return user
		}
	}

	if (user) {
		const filterUsers = filterUser().filter(u => u._id !== currentUser._id)
		const count = filterUsers.length
		const sortedUsers = _.orderBy(filterUsers, [sortBy.path], [sortBy.order])
		const userCrop = paginate(sortedUsers, currentPage, pageSize)

		const clearFilter = () => {
			setSelectedProf()
			setSearch('')
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
						{profession && !professionLoadaing && (
							<div className="d-flex flex-column flex-shrink-0 p-3">
								<ListGroup
									selectedItem={selectedProf}
									items={profession}
									onProfessionSelect={handleProfessionSelect}
								/>
								<button
									className="btn btn-secondary mt-2"
									onClick={clearFilter}>
									Очистить
								</button>
							</div>
						)}
						<div className="d-flex flex-column w-100 ">
							<SearhStatus length={count} />
							<TextField
								label="Search"
								name="search"
								value={search}
								onChange={handleSearch}
							/>

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
								<Pagination
									itemCount={count}
									currentPage={currentPage}
									pageSize={pageSize}
									onPageChange={handlePageChange}
								/>
							</div>
						</div>
					</div>
				)}
			</>
		)
	}
	return <Loader loading="Loading" />
}

export default UserListPage
