import React from 'react'

const Quaities = ({ color, name }) => {
	return <td className={'badge m-1 text-bg-' + color}>{name}</td>
}

export default Quaities
