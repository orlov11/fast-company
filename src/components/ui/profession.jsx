import React from 'react'
import PropTypes from 'prop-types'
import { useProfession } from '../../hooks/usePrpfessino'

const Profession = ({ id }) => {
	const { loading, getProfession } = useProfession()
	const prof = getProfession(id)

	if (!loading) {
		return <p>{prof.name}</p>
	} else {
		return 'Loading'
	}
}
Profession.propTypes = {
	id: PropTypes.string
}

export default Profession
