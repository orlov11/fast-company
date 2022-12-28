import React from 'react'
import PropTypes from 'prop-types'
import './style.css'

const Loader = ({ loading }) => {
	return (
		<>
			{loading ? (
				<div className="container d-flex align-items-center justify-content-center">
					<h2 className="me-10">{loading} </h2>
					<div className="scaling-dots">
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
					</div>
				</div>
			) : (
				<div className="scaling-dots">
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>
			)}
		</>
	)
}
Loader.propTypes = {
	loading: PropTypes.string
}

export default Loader
