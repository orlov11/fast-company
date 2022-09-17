import React from 'react'

const Booksmark = ({ status, id, onBookSmaark }) => {
	return (
		<button onClick={() => onBookSmaark(id)}>
			{status ? (
				<i className="bi bi-bookmark-star-fill"></i>
			) : (
				<i className="bi bi-bookmark-star"></i>
			)}
		</button>
	)
}

export default Booksmark
