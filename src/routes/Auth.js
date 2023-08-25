import React, {useState} from 'react';
import {authService} from 'fbase';
import {
	GithubAuthProvider,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signInWithPopup,
} from 'firebase/auth';

const Auth = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [newAccount, setNewAccount] = useState(true);
	const [error, setError] = useState('');
	const onChange = (event) => {
		const {
			target: {name, value},
		} = event;
		//change value of email and password when onChange
		//this will enable to write in input
		if (name === 'email') {
			setEmail(value);
		} else if (name === 'password') {
			setPassword(value);
		}
	};
	const onSubmit = async (event) => {
		event.preventDefault();
		let user;
		try {
			if (newAccount) {
				const userCredential = await createUserWithEmailAndPassword(
					authService,
					email,
					password
				);
				user = userCredential.user;
				// Account created
			} else {
				const userCredential = await signInWithEmailAndPassword(
					authService,
					email,
					password
				);
				user = userCredential.user;
				// User logged in
			}
			console.log('User:', user);
		} catch (error) {
			setError(error.message);
		}
	};
	const toggleAccount = () => setNewAccount((prev) => !prev);
	const onSocialClick = async (event) => {
		const {
			target: {name},
		} = event;
		let provider;
		if (name === 'google') {
			// Create Google provider
			provider = new GoogleAuthProvider();
		} else if (name === 'github') {
			// Create GitHub provider
			provider = new GithubAuthProvider();
		}
		try {
			const result = await signInWithPopup(authService, provider);
			const user = result.user;
			console.log(result);
			console.log('User:', user);
		} catch (error) {
			setError(error.message);
		}
	};
	return (
		<div>
			<form onSubmit={onSubmit}>
				<input
					type="text"
					name="email"
					placeholder="Email"
					required
					value={email}
					onChange={onChange}
				/>
				<input
					type="password"
					name="password"
					placeholder="Password"
					required
					value={password}
					onChange={onChange}
				/>
				<input
					type="submit"
					value={newAccount ? 'Create Account' : 'Sign in'}
				/>
				{error}
			</form>
			<span onClick={toggleAccount}>
				{newAccount ? 'Sign In' : 'Create Account'}
			</span>
			<div>
				<button name="google" onClick={onSocialClick}>
					Continue with Google
				</button>
				<button name="github" onClick={onSocialClick}>
					Continue with Github
				</button>
			</div>
		</div>
	);
};

export default Auth;
