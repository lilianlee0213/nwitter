import {dbService} from 'fbase';
import {addDoc, collection} from 'firebase/firestore';
import React, {useState} from 'react';

const Home = () => {
	const [nweet, setNweet] = useState('');
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
