import React from 'react'
import PropTypes from 'prop-types'
import Bookmark from './bookmarks'
import QualitiesList from './qualitiesList'
import Table from './table'

const UserTable = ({ user, onDelete, onBookmark, onSort, selectedSort }) => {
	const columns = {
		name: { path: 'name', name: 'Имя' },
		qualities: { name: 'Качества', component: user => <QualitiesList qualities={user.qualities} /> },
		profession: {
			path: 'profession.name',
			name: 'Проффесия'
		},
		completedMeetings: { path: 'completedMeetings', name: 'Встретился раз' },
		rate: { path: 'rate', name: 'Рейтинг' },
		bookmark: {
			path: 'bookmark',
			name: 'Избранное',
			component: user => <Bookmark status={user.status} id={user._id} onBookmark={onBookmark} />
		},
		delete: {
			component: user => (
				<button type="button" className="btn btn-danger" onClick={() => onDelete(user._id)}>
					Delete
				</button>
			)
		}
	}

	return <Table {...{ onSort, selectedSort, columns, data: user }} />
}
UserTable.propTypes = {
	user: PropTypes.array.isRequired,
	onDelete: PropTypes.func.isRequired,
	onBookmark: PropTypes.func.isRequired,
	onSort: PropTypes.func.isRequired,
	selectedSort: PropTypes.object.isRequired
}

export default UserTable
