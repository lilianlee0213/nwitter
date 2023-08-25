import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from '../routes/Home';
import Auth from '../routes/Auth';
import Navigation from './Navigation';
const AppRouter = ({isLoggedIn}) => {
	return (
		<BrowserRouter>
			{isLoggedIn && <Navigation />}
			<Routes>
				{isLoggedIn ? (
					<Route exact path="/" element={<Home />} />
				) : (
					<Route exact path="/" element={<Auth />} />
				)}
			</Routes>
		</BrowserRouter>
	);
};

export default AppRouter;
