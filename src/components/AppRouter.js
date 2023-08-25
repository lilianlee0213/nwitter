import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Navigation from './Navigation';
import Home from '../routes/Home';
import Profile from 'routes/Profile';
import Auth from '../routes/Auth';
const AppRouter = ({isLoggedIn}) => {
	return (
		<BrowserRouter>
			{isLoggedIn && <Navigation />}
			<Routes>
				{isLoggedIn ? (
					<>
						<Route exact path="/" element={<Home />} />
						<Route exact path="/profile" element={<Profile />} />
					</>
				) : (
					<Route exact path="/" element={<Auth />} />
				)}
			</Routes>
		</BrowserRouter>
	);
};

export default AppRouter;
