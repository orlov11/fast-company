import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

const NavProfile = () => {
	const { currentUser } = useAuth()
	const [isOpen, setIsOpen] = useState(false)
	const toggleClass = () => {
		setIsOpen(prevState => !prevState)
	}
	return (
		<div className="dropdown" onClick={toggleClass}>
			<button className="btn dropdown-toggle d-flex align-items-center">
				<div className="me-2">{currentUser.name}</div>
				<img
					src={currentUser.image}
					alt="avatar user"
					height="40"
					className="img-responsive rounded-circle"
				/>
			</button>
			<div className={'w-100 dropdown-menu' + (isOpen ? ' show' : '')}>
				<Link className="dropdown-item" to={`/user/${currentUser._id}`}>
					{' '}
					Account
				</Link>
				<Link className="dropdown-item" to={'/logout'}>
					{' '}
					Log Out
				</Link>
			</div>
		</div>
	)
}

export default NavProfile
