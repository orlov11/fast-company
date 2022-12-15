import React, { useState, useEffect } from 'react'
import { validator } from '../../utils/validator'
import RadioField from './form/radioField'
import MultiSelectField from './form/multeSelectField'
import CheckBoxField from './form/checkBoxField'
import FormComponent, { TextField, SelectedField } from './form'
import { useQuality } from '../../hooks/useQuality'
import { useProfession } from '../../hooks/usePrpfessino'
import { useAuth } from '../../hooks/useAuth'
import { useHistory } from 'react-router-dom'

const RegisterForm = () => {
	const history = useHistory()
	const [data, setData] = useState({
		email: '',
		password: '',
		profession: '',
		sex: 'male',
		qualities: [],
		licence: false
	})
	const [errors, setErrors] = useState({})
	const { signUp } = useAuth()
	const { profession } = useProfession()
	const { qualities } = useQuality()
	const professionsList = profession.map(item => ({
		label: item.name,
		value: item._id
	}))
	const qualitiesList = qualities.map(item => ({
		label: item.name,
		value: item._id
	}))

	const handleChange = target => {
		setData(prevState => ({ ...prevState, [target.name]: target.value }))
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
			isLength: {
				messege: 'Пароль должен быть длиннее 8-ми символов',
				value: 8
			}
		},
		profession: {
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

	const handleSubmit = async e => {
		e.preventDefault()
		if (!validate()) return false
		const { profession, qualities } = data
		const newData = { ...data, qualities: data.qualities.map(q => q.value) }
		try {
			await signUp(newData)
			history.push('/')
		} catch (error) {
			setErrors(error)
		}
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
			<SelectedField
				label="Profession"
				value={data.profession}
				onChange={handleChange}
				name="profession"
				defeaultOption="Choose you profession"
				option={professionsList}
				error={errors.profession}
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
				option={qualitiesList}
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
		</form>
	)
}

export default RegisterForm
