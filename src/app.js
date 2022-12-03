import React from 'react'
import Users from './layouts/users'
import Main from './layouts/main'
import Login from './layouts/login'
import NavBar from './components/ui/navBar'
import UserPage from './components/page/userPage'
import EditUser from './components/ui/editUser'
import { Route, Switch } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { ProfessionProvider } from './hooks/usePrpfessino'
import { QualityProvider } from './hooks/useQuality'

function App() {
	return (
		<div>
			<NavBar />
			<QualityProvider>
				<ProfessionProvider>
					<Switch>
						<Route exact path="/" component={Main} />
						<Route path="/login/:type?" component={Login} />
						<Route path="/userPage" component={UserPage} />
						<Route path="/user/:userId?/edit" component={EditUser} />
						<Route path="/user/:userId?" component={Users} />
					</Switch>
				</ProfessionProvider>
			</QualityProvider>
			<ToastContainer />
		</div>
	)
}

export default App
