import React from 'react'
import Select from 'react-select'
import PropTypes from 'prop-types'

const MultiSelectField = ({ option, name, onChange, label, value }) => {
	const optionsArray =
		!Array.isArray(option) && typeof options === 'object'
			? Object.values(option)
			: option
	const handleChange = value => {
		onChange({ name, value })
	}
	return (
		<div className="mb-4">
			<label htmlFor="inputState">{label}</label>
			<Select
				isMulti
				closeMenuOnSelect={false}
				className="basic-multi-select"
				classNamePrefix="select"
				value={value}
				name={name}
				options={optionsArray}
				onChange={handleChange}
			/>
		</div>
	)
}
MultiSelectField.propTypes = {
	option: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	name: PropTypes.string,
	onChange: PropTypes.func,
	label: PropTypes.string,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
}

export default MultiSelectField
