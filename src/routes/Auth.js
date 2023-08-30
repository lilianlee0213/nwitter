import React, {useState} from 'react';
import {authService} from 'fbase';
import {
	GithubAuthProvider,
	GoogleAuthProvider,
	signInWithPopup,
} from 'firebase/auth';
import AuthForm from 'components/AuthForm';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
	faGithub,
	faGoogle,
	faTwitter,
} from '@fortawesome/free-brands-svg-icons';

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
			await signInWithPopup(authService, provider);
		} catch (error) {
			setError(error.message);
		}
	};
	return (
		<div className="authContainer">
			<FontAwesomeIcon
				icon={faTwitter}
				color={'#05aaff'}
				size="3x"
				style={{marginBottom: 30}}
			/>
			<AuthForm error={error} setError={setError} />
			<div className="authBtns">
				<button name="google" onClick={onSocialClick} className="authBtn">
					Continue with Google
					<FontAwesomeIcon icon={faGoogle} />
				</button>
				<button name="github" onClick={onSocialClick} className="authBtn">
					Continue with Github
					<FontAwesomeIcon icon={faGithub} />
				</button>
			</div>
		</div>
	);
};

export default Auth;
