import {authService} from 'fbase';
import React from 'react';
import {useNavigate} from 'react-router-dom';

const Profile = () => {
	const redirectHome = useNavigate();
	const onLogOutClick = () => {
		authService.signOut();
		redirectHome('/');
	};
	return (
		<>
			<button onClick={onLogOutClick}>Log Out</button>
		</>
	);
};

export default Profile;
