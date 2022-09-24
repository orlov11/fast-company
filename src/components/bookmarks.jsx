import React from 'react'
import PropTypes from 'prop-types'

const Bookmark = ({ status, id, onBookmark }) => {
	return (
		<button onClick={() => onBookmark(id)}>
			{status ? (
				<i className="bi bi-bookmark-star-fill"></i>
			) : (
				<i className="bi bi-bookmark-star"></i>
			)}
		</button>
	)
}

Bookmark.propTypes = {
	status: PropTypes.bool,
	id: PropTypes.string.isRequired,
	onBookmark: PropTypes.func.isRequired
}

export default Bookmark
