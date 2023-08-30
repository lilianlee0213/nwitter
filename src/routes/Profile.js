import {authService, dbService} from 'fbase';
import {updateProfile} from 'firebase/auth';
import {collection, getDocs, orderBy, query, where} from 'firebase/firestore';
import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

const Profile = ({userObj, refreshUser}) => {
	const redirectHome = useNavigate();
	const [newDisplayName, setDisplayName] = useState(userObj.displayName);
	const onLogOutClick = () => {
		authService.signOut();
		redirectHome('/');
	};
	// const getMyNweets = async () => {
	// 	const nweetsRef = collection(dbService, 'nweets');
	// 	const q = query(
	// 		nweetsRef,
	// 		where('creatorId', '==', userObj.uid),
	// 		orderBy('createdAt', 'desc')
	// 	);
	// 	const querySnapshot = await getDocs(q);
	// 	querySnapshot.forEach((doc) => {
	// 		// doc.data() is never undefined for query doc snapshots
	// 		console.log(doc.id, ' => ', doc.data());
	// 	});
	// };
	// useEffect(() => {
	// 	getMyNweets();
	// }, []);
	const onChange = (event) => {
		const {
			target: {value},
		} = event;
		setDisplayName(value);
	};
	const onSubmit = async (event) => {
		event.preventDefault();
		if (userObj.displayName !== newDisplayName) {
			//update profile
			await updateProfile(userObj, {displayName: newDisplayName});
			refreshUser();
		}
	};
	return (
		<div className="container">
			<form onSubmit={onSubmit} className="profileForm">
				<input
					onChange={onChange}
					type="text"
					autoFocus
					placeholder="Display name"
					value={newDisplayName}
					className="formInput"
				/>
				<input
					type="submit"
					value="Update Profile"
					className="formBtn"
					style={{
						marginTop: 10,
					}}
				/>
			</form>
			<span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
				Log Out
			</span>
		</div>
	);
};

export default Profile;
