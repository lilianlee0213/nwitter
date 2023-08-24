import React, {useState} from 'react';
import {authService} from 'fbase';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
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
				{error}
				<input
					type="password"
					name="password"
					placeholder="Password"
					required
					value={password}
					onChange={onChange}
				/>
				<input type="submit" value={newAccount ? 'Create Account' : 'Log in'} />
			</form>
			<div>
				<button>Continue with Google</button>
				<button>Continue with Github</button>
			</div>
		</div>
	);
};

export default Auth;
