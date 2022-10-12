import React from 'react'
import PropTypes from 'prop-types'

const Quaities = ({ color, name }) => {
	return <span className={'badge m-1 text-bg-' + color}>{name}</span>
}

Quaities.propTypes = {
	color: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired
}

export default Quaities
