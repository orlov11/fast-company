import React from 'react'
import PropTypes from 'prop-types'

const SelectedField = ({
	label,
	value,
	onChange,
	defeaultOption,
	option,
	error,
	name
}) => {
	const inputControl = () => {
		return 'form-control' + (error ? ' is-invalid' : '')
	}
	const handleChange = ({ target }) => {
		onChange({ name: target.name, value: target.value })
	}
	const optionsArray =
		!Array.isArray(option) && typeof options === 'object'
			? Object.values(option)
			: option

	return (
		<div className="mb-4">
			<label htmlFor={name}>{label}</label>
			<select
				id={name}
				name={name}
				value={typeof value === 'object' ? value.value : value}
				onChange={handleChange}
				className={inputControl()}>
				<option disabled value="">
					{defeaultOption}
				</option>
				{optionsArray &&
					optionsArray.map(option => (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					))}
			</select>
			{error && <div className="invalid-feedback">{error}</div>}
		</div>
	)
}

SelectedField.propTypes = {
	label: PropTypes.string,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
	onChange: PropTypes.func,
	defeaultOption: PropTypes.string,
	option: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	error: PropTypes.string,
	name: PropTypes.string
}

export default SelectedField
