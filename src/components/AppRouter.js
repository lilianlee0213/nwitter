import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Navigation from './Navigation';
import Home from '../routes/Home';
import Profile from 'routes/Profile';
import Auth from '../routes/Auth';
const AppRouter = ({isLoggedIn, userObj, refreshUser}) => {
	return (
		<BrowserRouter>
			{isLoggedIn && <Navigation userObj={userObj} />}
			<Routes>
				{isLoggedIn ? (
					<>
						<Route exact path="/" element={<Home userObj={userObj} />} />
						<Route
							exact
							path="/profile"
							element={<Profile userObj={userObj} refreshUser={refreshUser} />}
						/>
					</>
				) : (
					<Route exact path="/" element={<Auth />} />
				)}
			</Routes>
		</BrowserRouter>
	);
};

export default AppRouter;
