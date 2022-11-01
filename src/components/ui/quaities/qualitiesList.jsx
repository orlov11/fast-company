import React from 'react'
import Quaities from './quaities'
import PropTypes from 'prop-types'

const QualitiesList = ({ qualities }) => {
	return (
		<>
			{qualities.map(quali => (
				<Quaities {...quali} key={quali._id} />
			))}
		</>
	)
}
QualitiesList.propTypes = {
	qualities: PropTypes.array.isRequired
}

export default QualitiesList
