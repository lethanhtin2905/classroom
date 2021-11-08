import './App.css';
import React, { useState } from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";

// Material UI Core
import CssBaseline from '@material-ui/core/CssBaseline';

// Components
import Header from '../Header/Header';
import DashBoard from '../../Components/DashBoard/DashBoard';
import LogIn from '../../Components/Login/Login';
import SignUp from '../../Components/SignUp/SignUp';
import Loading from '../Loading';
import Redirecting from '../../Components/Redirecting';

function App() {
	const [isLoading, setIsLoading] = useState(false);
	return (
		<React.Fragment>
			<CssBaseline />
			<Loading loading={isLoading} />
			<Router>
				<Switch>
					<Route path="/logIn">
						<LogIn setIsLoading={setIsLoading} />
					</Route>
					<Route path="/signUp">
						<SignUp setIsLoading={setIsLoading} />
					</Route>
					<Route path="/dashboard">
						{/* Header */}
						<Header />
						{/* End Header */}
						<DashBoard setIsLoading={setIsLoading} />
					</Route>
					<Route path="/">
						<Redirect to="/dashboard" />
					</Route>
					<Route path="/redirect/:authType/:ID">
						<Redirecting />
					</Route>
				</Switch>
			</Router>
		</React.Fragment>
	);
}

export default App;
