import { element } from 'prop-types'
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import API from '../../API'
import { useAuth } from '../../hooks/useAuth'
import { useProfession } from '../../hooks/usePrpfessino'
import { useQuality } from '../../hooks/useQuality'

import FormComponent, {
	TextField,
	SelectedField,
	MultiSelectField,
	RadioField
} from './form'

const EditUserPage = () => {
	const history = useHistory()
	const { currentUser, updateUser } = useAuth()
	const user = currentUser
	const [data, setData] = useState({
		name: '',
		email: '',
		sex: '',
		qualities: '',
		profession: ''
	})
	const { profession } = useProfession()
	const { qualities, getQualities: getQualitiesById, loading } = useQuality()
	const { userId } = useParams()

	useEffect(() => {
		!loading &&
			setData(prevState => ({
				...prevState,
				name: user.name,
				email: user.email,
				sex: user.sex,
				qualities: user.qualities.map(item => ({
					value: item,
					label: getQualitiesById(item).name,
					color: getQualitiesById(item).color
				})),
				profession: user.profession
			}))
	}, [qualities])

	const handleChange = target => {
		setData(prevState => ({ ...prevState, [target.name]: target.value }))
	}

	const professionsList = profession.map(professionName => ({
		label: professionName.name,
		value: professionName._id
	}))
	const qualitiesList = qualities.map(item => ({
		label: item.name,
		value: item._id,
		color: item.color
	}))

	const handleSubmit = e => {
		e.preventDefault()
		const { profession, qualities } = data
		const newData = {
			_id: userId,
			...data,
			profession: getProfessionById(profession),
			qualities: getQualities(qualities)
		}
		console.log(userId, {
			...data,
			profession: getProfessionById(profession),
			qualities: getQualities(qualities)
		})
		updateUser(newData)
		history.push(`/user/${userId}`)
	}
	const getProfessionById = id => {
		let prof
		profession.map(item => {
			if (item._id === id) {
				prof = item._id
			}
			return null
		})
		return prof
	}

	const getQualities = element => {
		const qualitiesArray = []
		element.map(item2 =>
			qualities.map(item => {
				if (item._id === item2.value) {
					return qualitiesArray.push(item2.value)
				}
				return null
			})
		)

		return qualitiesArray
	}

	return (
		<>
			{!loading && (
				<div className="container mt-5">
					<button
						className="btn btn-primary"
						onClick={() => {
							history.push(`/user/${userId}`)
						}}>
						Назад
					</button>
					<div className="row">
						<div className="col-md-6 offset-md-3 shadow p-4">
							<form onSubmit={handleSubmit}>
								<TextField
									label="Name"
									name="name"
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
									option={professionsList}
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
			)}
		</>
	)
}

export default EditUserPage
