import React, { useState, useEffect } from 'react'
import TextArea from './form/textArea'
import { SelectedField } from './form'
import API from '../../API'
import { useParams } from 'react-router-dom'
import { validator } from '../../utils/validator'
import PropTypes from 'prop-types'

const AddFormComments = ({ update }) => {
	const [data, setData] = useState({
		userId: '',
		content: ''
	})
	const { userId } = useParams()
	const [userAll, setUserAll] = useState()
	const [errors, setErrors] = useState({})
	const validatorCofig = {
		content: {
			isRequired: { messege: 'Поле сообщение обязательно для заполнения' }
		},
		userId: {
			isRequired: { messege: 'Выберите кто оставляет комментарий' }
		}
	}
	const handleChange = target => {
		setData(prevState => ({ ...prevState, [target.name]: target.value }))
	}
	const validate = () => {
		const errors = validator(data, validatorCofig)
		console.log(errors)

		setErrors(errors)
		return Object.keys(errors).length === 0
	}
	const handleSubmit = e => {
		e.preventDefault()
		if (!validate()) return false
		API.comments.add({
			...data,
			pageId: userId
		})
		update()
		setData({
			userId: '',
			content: ''
		})
	}

	useEffect(() => {
		API.users.fetchAll().then(data => {
			const userList = Object.keys(data).map(userId => ({
				label: data[userId].name,
				value: data[userId]._id
			}))
			setUserAll(userList)
		})
	}, [])

	return (
		<>
			{userAll && (
				<div className="card-body">
					<div>
						<h2>New comment</h2>
						<div className="mb-4">
							<form onSubmit={handleSubmit}>
								<SelectedField
									label="User Name"
									value={data.userId}
									onChange={handleChange}
									name="userId"
									defeaultOption="Choose user"
									option={userAll}
									error={errors.userId}
								/>

								<TextArea
									value={data.content}
									onChange={handleChange}
									label="Сообщение"
									name="content"
									error={errors.content}
								/>
								<button className="btn btn-primary">
									Опубликовать
								</button>
							</form>
						</div>
					</div>
				</div>
			)}
		</>
	)
}

AddFormComments.propTypes = {
	update: PropTypes.func
}

export default AddFormComments
