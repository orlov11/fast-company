import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import LoginForm from '../components/ui/loginForm'
import RegisterForm from '../components/ui/registerForm'

const Login = () => {
	const { type } = useParams()
	const [formType, setFormType] = useState(
		type === 'reginster' ? type : 'login'
	)

	const toggleFormType = () => {
		setFormType(prevState =>
			prevState === 'reginster' ? 'login' : 'reginster'
		)
	}

	return (
		<div className="container mt-5">
			<div className="row">
				<div className="col-md-6 offset-md-3 shadow p-4">
					{formType === 'login' ? (
						<>
							<h3 className="mb-4">Login</h3>
							<LoginForm />

							<p className="mt-2">
								Dont have account?{' '}
								<a role="button" onClick={toggleFormType}>
									Sign Up
								</a>
							</p>
						</>
					) : (
						<>
							<h3 className="mb-4">Register</h3>
							<RegisterForm />
							<p className="mt-2">
								Already have account?{' '}
								<a role="button" onClick={toggleFormType}>
									Sign In
								</a>
							</p>
						</>
					)}
				</div>
			</div>
		</div>
	)
}

export default Login
