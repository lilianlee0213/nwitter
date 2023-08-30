import {authService, dbService} from 'fbase';
import {collection, getDocs, orderBy, query, where} from 'firebase/firestore';
import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

const Profile = ({userObj}) => {
	const redirectHome = useNavigate();
	const onLogOutClick = () => {
		authService.signOut();
		redirectHome('/');
	};
	const getMyNweets = async () => {
		const nweetsRef = collection(dbService, 'nweets');
		const q = query(
			nweetsRef,
			where('creatorId', '==', userObj.uid),
			orderBy('createdAt', 'desc')
		);
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((doc) => {
			// doc.data() is never undefined for query doc snapshots
			console.log(doc.id, ' => ', doc.data());
		});
	};
	useEffect(() => {
		getMyNweets();
	}, []);
	return (
		<>
			<button onClick={onLogOutClick}>Log Out</button>
		</>
	);
};

export default Profile;
