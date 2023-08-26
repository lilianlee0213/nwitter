import {dbService} from 'fbase';
import {addDoc, collection, getDocs} from 'firebase/firestore';
import React, {useEffect, useState} from 'react';

const Home = () => {
	const [nweet, setNweet] = useState('');
	const [nweets, setNweets] = useState([]);
	const getNweets = async () => {
		const dbNweets = await getDocs(collection(dbService, 'nweets'));
		dbNweets.forEach((doc) => {
			const nweetObj = {
				...doc.data(),
				id: doc.id,
			};
			setNweets((prev) => [[nweetObj, ...prev]]);
		});
	};
	useEffect(() => {
		getNweets();
	}, []);
	const onSubmit = async (event) => {
		event.preventDefault();
		try {
			await addDoc(collection(dbService, 'nweets'), {
				// nweet: nweet
				nweet,
				createdAt: Date.now(),
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
		</div>
	);
};

export default Home;
