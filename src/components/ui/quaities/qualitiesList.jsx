import React from 'react'
import Quaities from './quaities'
import PropTypes from 'prop-types'
import { useQuality } from '../../../hooks/useQuality'

const QualitiesList = ({ qualities }) => {
	const { loading, getQualities } = useQuality()
	const quali = qualities.map(item => {
		return getQualities(item)
	})
	if (!loading) {
		return (
			<>
				{quali.map(quali => (
					<Quaities {...quali} key={quali._id} />
				))}
			</>
		)
	} else {
		return 'Loading...'
	}
}
QualitiesList.propTypes = {
	qualities: PropTypes.array.isRequired
}

export default QualitiesList
