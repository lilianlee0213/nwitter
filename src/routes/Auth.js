import React, {useState} from 'react';

const Auth = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	return (
		<div>
			<form action="">
				<input type="text" placeholder="Email" required value={email} />
				<input
					type="password"
					placeholder="Passwrod"
					required
					value={password}
				/>
				<input type="submit" value="Login" />
			</form>
			<div>
				<button>Continue with Google</button>
				<button>Continue with Github</button>
			</div>
		</div>
	);
};

export default Auth;
