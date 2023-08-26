import Nweet from 'components/Nweet';
import {dbService, storageService} from 'fbase';
import {addDoc, collection, onSnapshot} from 'firebase/firestore';
import {ref, uploadString, getDownloadURL} from 'firebase/storage';
import {v4 as uuidv4} from 'uuid';
import React, {useEffect, useState} from 'react';

const Home = ({userObj}) => {
	const [nweet, setNweet] = useState('');
	const [nweets, setNweets] = useState([]);
	const [attachment, setAttachment] = useState();
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
		// Create a child reference
		const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
		// Upload the attachment using the uploadString function
		await uploadString(attachmentRef, attachment, 'data_url');
		// Get the download URL of the uploaded attachment
		const attachmentUrl = await getDownloadURL(attachmentRef);
		// Construct the nweet object with relevant information
		const nweetObj = {
			text: nweet,
			createdAt: Date.now(),
			creatorId: userObj.uid,
			attachmentUrl,
		};
		// Add the nweet object to the Firestore collection
		await addDoc(collection(dbService, 'nweets'), nweetObj);
		// Clear the input fields after successful submission
		setNweet('');
		setAttachment('');
	};
	const onChange = (event) => {
		const {
			target: {value},
		} = event;
		setNweet(value);
	};
	const onFileChange = (event) => {
		const {
			target: {files},
		} = event;
		const nweetFile = files[0];
		const reader = new FileReader();
		reader.onloadend = (fininshedEvent) => {
			const {
				currentTarget: {result},
			} = fininshedEvent;
			setAttachment(result);
		};
		reader.readAsDataURL(nweetFile);
	};
	const onClearAttachmentClick = () => {
		setAttachment(null);
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
				<input type="file" accept="image/*" onChange={onFileChange} />
				<input type="submit" value="Nweet" />
				{attachment && (
					<div>
						<img src={attachment} width={50} height={50} alt="attachment" />
						<button onClick={onClearAttachmentClick}>Clear Photo</button>
					</div>
				)}
			</form>
			<div>
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
