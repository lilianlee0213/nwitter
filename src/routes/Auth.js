import React, {useState} from 'react';
import {authService} from 'fbase';
import {
	GithubAuthProvider,
	GoogleAuthProvider,
	signInWithPopup,
} from 'firebase/auth';
import AuthForm from 'components/AuthForm';

const Auth = () => {
	const [error, setError] = useState('');
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
			<AuthForm error={error} setError={setError} />
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
