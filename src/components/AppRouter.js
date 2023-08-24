import React, {useState} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from '../routes/Home';
import Auth from '../routes/Auth';
const AppRouter = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	return (
		<BrowserRouter>
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
