import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useHistory, useParams, Link } from 'react-router-dom'

import API from '../../../API'
import Comments from '../../common/comments'
import SelectedField from '../../ui/form/selectedField'
import TextArea from '../../ui/form/textArea'
import Qualitiess from '../../ui/quaities'

const UserPage = () => {
	const renderCount = useRef(0)
	const history = useHistory()
	const [data, setData] = useState({
		userId: '',
		content: ''
	})
	const [user, setUser] = useState()
	const [userAll, setUserAll] = useState()
	const [userComments, setUserComments] = useState()

	useEffect(() => {
		API.users.getById(userId).then(date => setUser(date))
	}, [])
	useEffect(() => {
		renderCount.current++
		console.log(renderCount.current + ' рендеров')
	})

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
		API.comments.fetchCommentsForUser(userId).then(date => {
			const sort = date.slice(0)
			setUserComments(
				sort.sort(function (a, b) {
					return b.created_at - a.created_at
				})
			)
		})
	}, [])

	const { userId } = useParams()

	const handleChange = useCallback(target => {
		setData(prevState => ({ ...prevState, [target.name]: target.value }))
		console.log(data)
	}, [])
	const update = () => {
		API.comments.fetchCommentsForUser(userId).then(date => {
			const sort = date.slice(0)
			setUserComments(
				sort.sort(function (a, b) {
					return b.created_at - a.created_at
				})
			)
		})
	}

	const handleSubmit = e => {
		e.preventDefault()
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
			{user && userAll ? (
				<div className="container">
					<div className="row gutters-sm">
						<div className="col-md-4 mb-3">
							<div className="card mb-3">
								<div className="card-body">
									<button className="position-absolute top-0 end-0 btn btn-light btn-sm">
										<Link to={`/user/${userId}/edit`}>
											<i className="bi bi-gear"></i>
										</Link>
									</button>
									<div className="d-flex flex-column align-items-center text-center position-relative">
										<img
											src={`https://avatars.dicebear.com/api/avataaars/${(
												Math.random() + 1
											)
												.toString(36)
												.substring(7)}.svg`}
											className="rounded-circle shadow-1-strong me-3"
											alt="avatar"
											width="65"
											height="65"
										/>
										<div className="mt-3">
											<h4>{user.name}</h4>
											<p className="text-secondary mb-1">
												{user.profession.name}
											</p>
											<div className="text-muted">
												<i
													className="bi bi-caret-down-fill text-primary"
													role="button"></i>
												<i
													className="bi bi-caret-up text-secondary"
													role="button"></i>
												<span className="ms-2">{user.rate}</span>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="card mb-3">
								<div className="card-body d-flex flex-column justify-content-center text-center">
									<h5 className="card-title">
										<span>Qualities</span>
									</h5>
									<p className="card-text">
										<Qualitiess qualities={user.qualities} />
									</p>
								</div>
							</div>
							<div className="card mb-3">
								<div className="card-body d-flex flex-column justify-content-center text-center">
									<h5 className="card-title">
										<span>Completed meetings</span>
									</h5>

									<h1 className="display-1">
										{user.completedMeetings}
									</h1>
								</div>
							</div>
						</div>
						<div className="col-md-8">
							<div className="card mb-2">
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
													/>
												)}

												<TextArea
													value={data.content}
													onChange={handleChange}
													label="Сообщение"
													name="content"
												/>
												<button className="btn btn-primary">
													Опубликовать
												</button>
											</form>
										</div>
									</div>
								</div>
							</div>

							{userComments.length === 0 || (
								<div className="card mb-3">
									<div className="card-body ">
										<h2>Comments</h2>
										<hr />
										{userComments &&
											userComments.map(item => (
												<Comments
													userId={item.userId}
													dateComments={item.created_at}
													id={item._id}
													onClick={update}
													key={item._id}
													content={item.content}
												/>
											))}
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			) : (
				'Loading...'
			)}
		</>
	)
}
export default UserPage
