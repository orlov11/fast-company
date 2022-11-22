import React, { useState, useEffect, useRef, useCallback } from 'react'
import TextArea from './form/textArea'
import { SelectedField } from './form'
import API from '../../API'
import { useParams, Link } from 'react-router-dom'

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
	const handleChange = useCallback(target => {
		setData(prevState => ({ ...prevState, [target.name]: target.value }))
		console.log(data)
	}, [])
	const validatorCofig = {
		content: {
			isRequired: { messege: 'Поле сообщение обязательно для заполнения' }
		},
		userId: {
			isRequired: { messege: 'Выберите кто оставляет комментарий' }
		}
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
	return (
		<>
			<div className="card-body">
				<div>
					<h2>New comment</h2>
					<div className="mb-4">
						<form onSubmit={handleSubmit}>
							{userAll && (
								<SelectedField
									label="User Name"
									value={data.userId}
									onChange={handleChange}
									name="userId"
									defeaultOption="Choose user"
									option={userAll}
									error={errors.userId}
								/>
							)}

							<TextArea
								value={data.content}
								onChange={handleChange}
								label="Сообщение"
								name="content"
								error={errors.content}
							/>
							<button disabled={!isValid} className="btn btn-primary">
								Опубликовать
							</button>
						</form>
					</div>
				</div>
			</div>
		</>
	)
}

AddFormComments.propTypes = {
	update: PropTypes.func
}

export default AddFormComments
