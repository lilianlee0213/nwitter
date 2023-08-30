import {useEffect, useState} from 'react';
import AppRouter from 'components/AppRouter';
import {authService} from 'fbase';
import {onAuthStateChanged, updateCurrentUser} from 'firebase/auth';

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
	const refreshUser = async () => {
		await updateCurrentUser(authService, authService.currentUser);
		setUserObj(authService.currentUser);
	};
	return (
		<>
			{init ? (
				<AppRouter
					isLoggedIn={isLoggedIn}
					userObj={userObj}
					refreshUser={refreshUser}
				/>
			) : (
				'Initializing...'
			)}
		</>
	);
}

export default App;
