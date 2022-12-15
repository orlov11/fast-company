import React from 'react'
import useMockData from '../utils/mockData'

const Main = () => {
	const { error, initialaze, progress, status } = useMockData()
	const handleClick = () => {
		console.log('click')
		initialaze()
	}
	return (
		<div className="container mt-5">
			<h1>Main Page</h1>
			<h3>Иницализция данных в FaieBase</h3>
			<ul>
				<li>Status: {status}</li>
				<li>Progress: {progress}%</li>
				{error && <li>Error: {error}</li>}
			</ul>
			<button className="btn btn-dark" onClick={handleClick}>
				Инициализировать
			</button>
		</div>
	)
}

export default Main
