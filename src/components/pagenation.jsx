import React from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'

const Pagenation = ({ itemCount, pageSize, onPageChange, currentPage }) => {
	const pageCount = Math.ceil(itemCount / pageSize)
	if (pageCount === 1) return null
	const pages = _.range(1, pageCount + 1)
	return (
		<>
			<nav>
				<ul className="pagination">
					{pages.map(page => (
						<li
							className={'page-item' + (page === currentPage ? ' active' : '')}
							onClick={() => onPageChange(page)}
							key={'page_' + page}
						>
							<button className="page-link">{page}</button>
						</li>
					))}
				</ul>
			</nav>
		</>
	)
}
Pagenation.propTypes = {
	itemCount: PropTypes.number.isRequired,
	pageSize: PropTypes.number.isRequired,
	onPageChange: PropTypes.func.isRequired,
	currentPage: PropTypes.number.isRequired
}

export default Pagenation
