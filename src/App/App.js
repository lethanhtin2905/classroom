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
import Header from '../Components/Layouts/Header/Header';
import DashBoard from '../../Components/DashBoard/DashBoard';
import LogIn from '../../Components/Login/Login';
import SignUp from '../Components/Pages/SignUp/SignUp';
import ClassDetail from '../../Components/ClassDetail/ClassDetail';
import GradeStructure from '../../Components/GradeStructure/GradeStructure'

function App() {
	const [isLoading, setIsLoading] = useState(false);
	return (
		<React.Fragment>
			<CssBaseline />
			{/* <Loading loading={isLoading} /> */}
			<Router>
				<Switch>
					<Route path="/logIn">
						<LogIn setIsLoading={setIsLoading} />
					</Route>
					<Route path="/signUp">
						<SignUp setIsLoading={setIsLoading} />
					</Route>
					<Route path="/dashboard">
						<Header />
						<DashBoard setIsLoading={setIsLoading} />
					</Route>
					<Route path="/:id/grade-structure">
						<Header />
						<GradeStructure setIsLoading={setIsLoading}/>
					</Route>
					<Route path="/:id">
						<Header />
						<ClassDetail setIsLoading={setIsLoading}/>
					</Route>
					<Route path="/">
						<Redirect to="/dashboard" />
					</Route>
					<Route path="/:id/invited">
						<Redirect to="/:id" />
					</Route>
					
				</Switch>
			</Router>
		</React.Fragment>
	);
}

export default App;
