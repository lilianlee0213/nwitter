import {useState} from 'react';
import AppRouter from 'components/AppRouter';
import {authService} from 'fbase';

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
	console.log(authService.currentUser); //null
	return <AppRouter isLoggedIn={isLoggedIn} />;
}

export default App;
