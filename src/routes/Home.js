import Nweet from 'components/Nweet';
import {dbService} from 'fbase';
import {addDoc, collection, doc, getDocs, onSnapshot} from 'firebase/firestore';
import React, {useEffect, useState} from 'react';

const Home = ({userObj}) => {
	const [nweet, setNweet] = useState('');
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
	const onSubmit = async (event) => {
		event.preventDefault();
		try {
			await addDoc(collection(dbService, 'nweets'), {
				text: nweet,
				createdAt: Date.now(),
				creatorId: userObj.uid,
			});
			setNweet('');
		} catch (e) {
			console.log(e);
		}
	};
	const onChange = (event) => {
		const {
			target: {value},
		} = event;
		setNweet(value);
	};
	return (
		<div>
			<form onSubmit={onSubmit}>
				<input
					type="text"
					placeholder="What's on your mind?"
					maxLength={120}
					onChange={onChange}
					value={nweet}
				/>
				<input type="submit" value="Nweet" />
			</form>
			<div>
				{nweets.map((nweet) => (
					<Nweet key={nweet.id} nweetObj={nweet} />
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
