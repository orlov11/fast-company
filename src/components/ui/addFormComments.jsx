import React, { useState } from 'react'
import TextArea from './form/textArea'

import { validator } from '../../utils/validator'
import PropTypes from 'prop-types'

const AddFormComments = ({ onSubmit }) => {
	const [data, setData] = useState({
		content: ''
	})
	const [errors, setErrors] = useState({})
	const validatorCofig = {
		content: {
			isRequired: { messege: 'Поле сообщение обязательно для заполнения' }
		}
	}
	const handleChange = target => {
		setData(prevState => ({ ...prevState, [target.name]: target.value }))
	}
	const validate = () => {
		const errors = validator(data, validatorCofig)
		setErrors(errors)
		return Object.keys(errors).length === 0
	}
	const handleSubmit = e => {
		e.preventDefault()
		if (!validate()) return false
		onSubmit(data)
		setData({
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
							<TextArea
								value={data.content}
								onChange={handleChange}
								label="Сообщение"
								name="content"
								error={errors.content}
							/>
							<button className="btn btn-primary">Опубликовать</button>
						</form>
					</div>
				</div>
			</div>
		</>
	)
}

AddFormComments.propTypes = {
	onSubmit: PropTypes.func
}

export default AddFormComments
