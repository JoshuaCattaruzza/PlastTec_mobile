import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack'
import { Router, Route, Switch } from 'react-router-dom';
import NavBar from './common/navbar';
import Home from './components/home';
import OldTask from './components/oldtask';
import LogIn from './components/login';
import SignUp from './components/signup';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { history } from './helpers/history';
import { clearMessage } from './actions/message';

function App() {

	const { isLoggedIn } = useSelector((state) => state.auth);

	const dispatch = useDispatch();

	useEffect(() => {
		history.listen(() => {
			dispatch(clearMessage());
		});
	}, [dispatch]);

	return (
		<Router history={history}>

			<Container style={{width: "100%", paddingLeft: "0px", paddingRight: "0px"}} >
			<NavBar></NavBar>
				<Stack  >
					{!isLoggedIn ? (
						<>
							<Switch>
								<Route exact path="/login">
									<LogIn />
								</Route>
							</Switch>
							<Switch>
								<Route exact path="/signup">
									<SignUp />
								</Route>
							</Switch>
						</>
					) : (
						<>
							<Switch>
								<Route exact path="/home">
									<Home />
								</Route>
							</Switch>
							<Switch>
								<Route exact path="/oldtask">
									<OldTask />
								</Route>
							</Switch>
						</>
					)}
				</Stack>
			</Container>
		</Router>
	);
}

export default App;