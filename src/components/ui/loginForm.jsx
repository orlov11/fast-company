import React, { useState, useEffect } from 'react'
import TextField from './form/textField'
import { validator } from '../../utils/validator'

const LoginForm = () => {
	const [data, setData] = useState({ email: '', password: '' })
	const [errors, setErrors] = useState({})
	const handleChange = ({ target }) => {
		setData(prevState => ({ ...prevState, [target.name]: target.value }))
		console.log(data)
	}

	const validatorCofig = {
		email: {
			isRequired: { messege: 'Поле Email обязательно для заполнения' },
			isEmail: { messege: 'Email введен некорректно' }
		},
		password: {
			isRequired: { messege: 'Поле Password обязательно для заполнения' },
			isPassword: {
				messege: 'Пароль должен содержать хотя бы одну заглвную букву'
			},
			isFigure: { messege: 'Пароль должен содержать хотя бы одну цифру' },
			isLength: { messege: 'Пароль должен быть длиннее 8-ми символов', value: 8 }
		}
	}

	useEffect(() => {
		validate()
	}, [data])

	const validate = () => {
		const errors = validator(data, validatorCofig)

		setErrors(errors)
		return Object.keys(errors).length === 0
	}
	const isValid = Object.keys(errors).length === 0

	const handleSubmit = e => {
		e.preventDefault()
		if (!validate()) return false
		console.log(data)
	}

	return (
		<div className="container mt-5">
			<div className="row">
				<div className="col-md-6 offset-md-3 shadow p-4">
					{' '}
					<form onSubmit={handleSubmit}>
						<TextField
							label="Email"
							name="email"
							value={data.email}
							onChange={handleChange}
							error={errors.email}
						/>
						<TextField
							label="Password"
							type="password"
							name="password"
							target
							value={data.password}
							onChange={handleChange}
							error={errors.password}
						/>

						<button className="btn btn-dark w-100 mx-auto" disabled={!isValid}>
							Login
						</button>
					</form>
				</div>
			</div>
		</div>
	)
}

export default LoginForm
