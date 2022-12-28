import React from 'react'
import PropTypes from 'prop-types'
import Bookmark from '../common/bookmarks'
import Table from '../common/table'
import Quaities from './quaities'
import Profession from './profession'

const UserTable = ({ user, onBookmark, onSort, selectedSort }) => {
	const columns = {
		name: { path: 'name', name: 'Имя' },
		qualities: {
			name: 'Качества',
			component: user => <Quaities qualities={user.qualities} />
		},
		profession: {
			name: 'Проффесия',
			component: user => <Profession id={user.profession} />
		},
		completedMeetings: { path: 'completedMeetings', name: 'Встретился раз' },
		rate: { path: 'rate', name: 'Рейтинг' },
		bookmark: {
			path: 'bookmark',
			name: 'Избранное',
			component: user => (
				<Bookmark
					status={user.status}
					id={user._id}
					onBookmark={onBookmark}
				/>
			)
		}
	}

	return <Table {...{ onSort, selectedSort, columns, data: user }} />
}
UserTable.propTypes = {
	user: PropTypes.array.isRequired,
	onBookmark: PropTypes.func.isRequired,
	onSort: PropTypes.func.isRequired,
	selectedSort: PropTypes.object.isRequired
}

export default UserTable
