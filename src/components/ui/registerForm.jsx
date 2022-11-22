import React, { useState, useEffect } from 'react'
import { validator } from '../../utils/validator'
import API from '../../API'
import RadioField from './form/radioField'
import MultiSelectField from './form/multeSelectField'
import CheckBoxField from './form/checkBoxField'
import FormComponent, { TextField, SelectedField } from './form'

const RegisterForm = () => {
	const [data, setData] = useState({
		email: '',
		password: '',
		professions: '',
		sex: 'male',
		qualities: [],
		licence: false
	})
	const [errors, setErrors] = useState({})
	const [profession, setProfession] = useState()
	const [qualities, setQualities] = useState([])
	const handleChange = target => {
		setData(prevState => ({ ...prevState, [target.name]: target.value }))
	}

	useEffect(() => {
		API.professions.fetchAll().then(data => {
			const professionsList = Object.keys(data).map(professionName => ({
				label: data[professionName].name,
				value: data[professionName]._id
			}))
			setProfession(professionsList)
		})
		API.qualities.fetchAll().then(data => {
			const qualitiesList = Object.keys(data).map(optionName => ({
				label: data[optionName].name,
				value: data[optionName]._id,
				color: data[optionName].color
			}))
			setQualities(qualitiesList)
		})
	}, [])

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
			isLength: {
				messege: 'Пароль должен быть длиннее 8-ми символов',
				value: 8
			}
		},
		professions: {
			isRequired: { messege: 'Выберите вашу  проффессию' }
		},
		licence: {
			isRequired: {
				messege: 'Необходимо принять лицензионное соглашение'
			}
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
		const { professions, qualities } = data
		console.log({
			...data,
			professions: getProfessionById(professions),
			qualities: getQualities(qualities)
		})
	}

	const getProfessionById = id => {
		for (const prof of profession) {
			if (prof.value === id) {
				return { _id: prof.value, name: prof.label }
			}
		}
	}
	const getQualities = elements => {
		const qualitiesArray = []
		for (const elem of elements) {
			for (const quality in qualities) {
				if (elem.value === qualities[quality].value) {
					qualitiesArray.push({
						_id: qualities[quality].value,
						name: qualities[quality].label,
						color: qualities[quality].color
					})
				}
			}
		}
		return qualitiesArray
	}
	return (
		<FormComponent onSubmit={handleSubmit}>
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
			<SelectedField
				label="Profession"
				value={data.professions}
				onChange={handleChange}
				name="professions"
				defeaultOption="Choose you profession"
				option={profession}
				error={errors.professions}
			/>
			<RadioField
				option={[
					{ name: 'Male', value: 'male' },
					{ name: 'Female', value: 'female' },
					{ name: 'Other', value: 'other' }
				]}
				name="sex"
				value={data.sex}
				onChange={handleChange}
				label="Choose your gender"
			/>
			<MultiSelectField
				option={qualities}
				name="qualities"
				onChange={handleChange}
				label="Choose your qualities"
			/>
			<CheckBoxField
				value={data.licence}
				name="licence"
				error={errors.licence}
				onChange={handleChange}>
				Я согласен с <a>лицензионным соглашением</a>
			</CheckBoxField>

			<button className="btn btn-dark w-100 mx-auto" disabled={!isValid}>
				Find company!
			</button>
		</FormComponent>
	)
}

export default RegisterForm
