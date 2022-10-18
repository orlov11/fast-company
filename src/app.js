import React from 'react'
import Users from './components/users'
import Main from './components/main'
import Login from './components/login'
import NavBar from './components/navBar'
import UserPage from './components/userPage'
import { Route, Switch } from 'react-router-dom'

function App() {
	return (
		<div>
			<NavBar />
			<Switch>
				<Route exact path="/" component={Main} />
				<Route path="/login" component={Login} />
				<Route path="/userPage" component={UserPage} />
				<Route path="/user/:userId?" component={Users} />
			</Switch>
		</div>
	)
}

export default App
