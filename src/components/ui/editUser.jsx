import React, { useState, useEffect } from 'react'
import TextField from './form/textField'
import API from '../../API'
import SelectedField from './form/selectedField'
import RadioField from './form/radioField'
import MultiSelectField from './form/multeSelectField'
import { useParams, useHistory } from 'react-router-dom'

const EditUser = () => {
	const history = useHistory()
	const [user, setUser] = useState()
	const [data, setData] = useState({
		name: '',
		email: '',
		sex: '',
		qualities: '',
		profession: ''
	})
	const [profession, setProfession] = useState()
	const [qualities, setQualities] = useState([])

	const { userId } = useParams()
	useEffect(() => {
		API.users.getById(userId).then(date => setUser(date))
	}, [])
	useEffect(() => {
		user &&
			setData(prevState => ({
				...prevState,
				name: user.name,
				email: user.email,
				sex: user.sex,
				qualities: Object.keys(user.qualities).map(optionName => ({
					label: user.qualities[optionName].name,
					value: user.qualities[optionName]._id,
					color: user.qualities[optionName].color
				})),
				profession: user.profession._id
			}))
	}, [user])
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

	const handleSubmit = e => {
		e.preventDefault()
		const { profession, qualities } = data
		API.users.update(userId, {
			...data,
			profession: getProfessionById(profession),
			qualities: getQualities(qualities)
		})
		history.push(`/user/${userId}`)
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
		<>
			{user ? (
				<>
					<div className="container mt-5">
						<div className="row">
							<div className="col-md-6 offset-md-3 shadow p-4">
								<form onSubmit={handleSubmit}>
									<TextField
										label="Name"
										name="name"
										target
										value={data.name}
										onChange={handleChange}
									/>
									<TextField
										label="Email"
										name="email"
										value={data.email}
										onChange={handleChange}
									/>
									<SelectedField
										label="Profession"
										value={data.profession}
										name="profession"
										onChange={handleChange}
										option={profession}
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
										value={data.qualities}
										name="qualities"
										onChange={handleChange}
										label="Choose your qualities"
									/>

									<button className="btn btn-dark w-100 mx-auto">
										Обновить
									</button>
								</form>
							</div>
						</div>
					</div>
				</>
			) : (
				'  Loading'
			)}
		</>
	)
}

export default EditUser
