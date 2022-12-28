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
import AuthProvider from './hooks/useAuth'

import 'react-toastify/dist/ReactToastify.css'
import ProtectedRoute from './components/common/protectecRoute'
import LogOut from './layouts/logOut'

function App() {
	return (
		<div>
			<AuthProvider>
				<NavBar />
				<QualityProvider>
					<ProfessionProvider>
						<Switch>
							<Route exact path="/" component={Main} />
							<Route path="/login/:type?" component={Login} />
							<ProtectedRoute
								path="/user/:userId?/:edit?"
								component={Users}
							/>
							<Route path="/logout" component={LogOut} />
						</Switch>
					</ProfessionProvider>
				</QualityProvider>
			</AuthProvider>
			<ToastContainer />
		</div>
	)
}

export default App
