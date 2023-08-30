import Nweet from 'components/Nweet';
import {dbService} from 'fbase';
import {collection, onSnapshot} from 'firebase/firestore';
import React, {useEffect, useState} from 'react';
import NweetFactory from 'components/NweetFactory';

const Home = ({userObj}) => {
	const [nweets, setNweets] = useState([]);
	useEffect(() => {
		//#02 another way (to get as in real time)
		//be listening any operation(CRUD) on database --REAL TIME
		onSnapshot(collection(dbService, 'nweets'), (snapshot) => {
			const nweetArray = snapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));
			setNweets(nweetArray);
		});
	}, []);

	return (
		<div className="container main-containerx">
			<NweetFactory userObj={userObj} />
			<div style={{marginTop: 30}}>
				{nweets.map((nweet) => (
					<Nweet
						key={nweet.id}
						nweetObj={nweet}
						isOwner={nweet.creatorId === userObj.uid}
					/>
				))}
			</div>
		</div>
	);
};

export default Home;

//#01 one way to get collection data to ad set it as an array of nweets
// const getNweets = async () => {
// 	const dbNweets = await getDocs(collection(dbService, 'nweets'));
// 	dbNweets.forEach((doc) => {
// 		const nweetObj = {
// 			id: doc.id,
// 			...doc.data(),
// 		};
// 		setNweets((prev) => [nweetObj, ...prev]);
// 	});
// };
// useEffect(() => {
// 	getNweets();
// });
