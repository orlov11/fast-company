import React from 'react'

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

export default Bookmark
