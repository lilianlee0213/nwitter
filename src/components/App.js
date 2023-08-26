import {useEffect, useState} from 'react';
import AppRouter from 'components/AppRouter';
import {authService} from 'fbase';
import {onAuthStateChanged} from 'firebase/auth';

function App() {
	const [init, setInit] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userObj, setUserObj] = useState(null);
	useEffect(() => {
		//happens when first rendered
		onAuthStateChanged(authService, (user) => {
			//check if user is loggedIn
			if (user) {
				setIsLoggedIn(true);
				setUserObj(user);
			} else {
				setIsLoggedIn(false);
			}
			setInit(true);
		});
	}, []);
	// console.log(authService.currentUser); --> null
	return (
		<>
			{init ? (
				<AppRouter isLoggedIn={isLoggedIn} userObj={userObj} />
			) : (
				'Initializing...'
			)}
		</>
	);
}

export default App;
