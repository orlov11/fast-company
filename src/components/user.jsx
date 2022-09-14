import React, { useState, Fragment } from 'react'
import API from '../API'

const User = () => {
	const [user, setUsere] = useState(API.users.fetchAll())

	const handleDelete = userId => {
		setUsere(user.filter(item => item._id !== userId))
	}

	const randerPhrase = () => {
		if (user.length < 10 && [2, 3, 4].indexOf(user.length % 10) !== -1) {
			return (
				<div className=" text-bg-primary w-25  p-2 m-2">
					{user.length} человека тусанет с тобой сеодня
				</div>
			)
		}
		if (user.length > 20 && [2, 3, 4].indexOf(user.length % 10) !== -1) {
			return (
				<div className=" text-bg-primary w-25  p-2 m-2">
					{user.length} человека тусанет с тобой сеодня
				</div>
			)
		}
		return (
			<div className=" text-bg-primary w-25 p-2 m-2">
				{user.length} человек тусанет с тобой сеодня
			</div>
		)
	}

	return (
		<>
			{user.length === 0 ? (
				<div className=" text-bg-danger w-25  p-2 m-2">
					Никто не тусанет с тобой сегодня
				</div>
			) : (
				randerPhrase()
			)}
			{user.length > 0 && (
				<table className="table">
					<thead>
						<tr>
							<th scope="col">#</th>
							<th scope="col">Имя</th>
							<th scope="col">Качество</th>
							<th scope="col">Профессия</th>
							<th scope="col">Встретился раз</th>
							<th scope="col">Оценка</th>
							<th />
						</tr>
					</thead>
					<tbody>
						{user.map((item, i) => (
							<tr key={i}>
								<th scope="row" key={i}>
									{i + 1}
								</th>
								<td key={item._id}>{item.name}</td>
								{item.qualities.map(quali => (
									<td
										key={quali._id}
										className={'badge m-1 text-bg-' + quali.color}
									>
										{quali.name}
									</td>
								))}
								<td key={item.profession._id}>{item.profession.name}</td>
								<td>{item.completedMeetings}</td>
								<td>{item.rate}/5</td>
								<td>
									<button
										type="button"
										className="btn btn-danger"
										onClick={() => handleDelete(item._id)}
									>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</>
	)
}

export default User
