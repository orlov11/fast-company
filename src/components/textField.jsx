import React, { useState } from 'react'
import PropTypes from 'prop-types'

const TextField = ({ label, name, type, value, onChange, error }) => {
	const [showPassword, setShowPassword] = useState(false)
	const inputControl = () => {
		return 'form-control' + (error ? ' is-invalid' : '')
	}

	const togglgeShowPassword = () => {
		setShowPassword(prevState => !prevState)
	}
	return (
		<div className="mb-4">
			<label htmlFor={name}>{label}</label>{' '}
			<div className="input-group has-validation">
				<input
					autoComplete="true"
					id={name}
					type={showPassword ? 'text' : type}
					name={name}
					value={value}
					onChange={onChange}
					className={inputControl()}
				/>
				{type === 'password' && (
					<button className="btn btn-outline-secondary" type="button" onClick={togglgeShowPassword}>
						{showPassword ? <i className="bi bi-eye"></i> : <i className="bi bi-eye-slash"></i>}
					</button>
				)}
				{error && <div className="invalid-feedback">{error}</div>}
			</div>
		</div>
	)
}

TextField.defaultProps = {
	type: 'text'
}
TextField.propTypes = {
	label: PropTypes.string,
	type: PropTypes.string,
	name: PropTypes.string,
	value: PropTypes.string,
	onChange: PropTypes.func,
	error: PropTypes.string
}
export default TextField
