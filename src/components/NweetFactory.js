import React, {useState} from 'react';
import {dbService, storageService} from 'fbase';
import {addDoc, collection} from 'firebase/firestore';
import {ref, uploadString, getDownloadURL} from 'firebase/storage';
import {v4 as uuidv4} from 'uuid';

const NweetFactory = ({userObj}) => {
	const [nweet, setNweet] = useState('');
	const [attachment, setAttachment] = useState('');
	const onSubmit = async (event) => {
		event.preventDefault();
		let attachmentUrl = '';
		if (attachment) {
			const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
			await uploadString(attachmentRef, attachment, 'data_url');
			attachmentUrl = await getDownloadURL(attachmentRef);
		}
		const nweetObj = {
			text: nweet,
			createdAt: Date.now(),
			creatorId: userObj.uid,
			attachmentUrl,
		};
		await addDoc(collection(dbService, 'nweets'), nweetObj);
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
	);
};

export default NweetFactory;
