import React from 'react'
import PropTypes from 'prop-types'

const TextArea = ({ value, onChange, name, label, error }) => {
	const handleChange = ({ target }) => {
		onChange({ name: target.name, value: target.value })
	}
	const getInputClasses = () => {
		return 'form-control' + (error ? ' is-invalid' : '')
	}
	return (
		<div className="mb-4">
			<label htmlFor="exampleFormControlTextarea1" className="form-label">
				{label}
			</label>
			<div className="input-group has-validation">
				<textarea
					className={getInputClasses()}
					value={value}
					id="exampleFormControlTextarea1"
					onChange={handleChange}
					name={name}
					rows="3"></textarea>
				{error && <div className="invalid-feedback ">{error}</div>}
			</div>
		</div>
	)
}
TextArea.propTypes = {
	value: PropTypes.string,
	label: PropTypes.string,
	onChange: PropTypes.func,
	name: PropTypes.string,
	error: PropTypes.string
}

export default TextArea
