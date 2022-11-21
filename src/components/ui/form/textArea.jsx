import React from 'react'
import PropTypes from 'prop-types'

const TextArea = ({ value, onChange, name, label }) => {
	const handleChange = ({ target }) => {
		onChange({ name: target.name, value: target.value })
		console.log({ name: target.name, value: target.value })
	}
	return (
		<div className="mb-4">
			<label htmlFor="exampleFormControlTextarea1" className="form-label">
				{label}
			</label>

			<textarea
				className="form-control"
				value={value}
				id="exampleFormControlTextarea1"
				onChange={handleChange}
				name={name}
				rows="3"></textarea>
		</div>
	)
}
TextArea.propTypes = {
	value: PropTypes.string,
	label: PropTypes.string,
	onChange: PropTypes.func,
	name: PropTypes.string
}

export default TextArea
