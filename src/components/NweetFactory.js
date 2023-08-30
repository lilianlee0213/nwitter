import React, {useState} from 'react';
import {dbService, storageService} from 'fbase';
import {addDoc, collection} from 'firebase/firestore';
import {ref, uploadString, getDownloadURL} from 'firebase/storage';
import {v4 as uuidv4} from 'uuid';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus, faTimes} from '@fortawesome/free-solid-svg-icons';

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
		<form onSubmit={onSubmit} className="factoryForm">
			<div className="factoryInput__container">
				<input
					className="factoryInput__input"
					value={nweet}
					onChange={onChange}
					type="text"
					placeholder="What's on your mind?"
					maxLength={120}
				/>
				<input type="submit" value="&rarr;" className="factoryInput__arrow" />
			</div>
			<label htmlFor="attach-file" className="factoryInput__label">
				<span>Add photos</span>
				<FontAwesomeIcon icon={faPlus} />
			</label>
			<input
				id="attach-file"
				type="file"
				accept="image/*"
				onChange={onFileChange}
				style={{
					opacity: 0,
				}}
			/>
			{attachment && (
				<div className="factoryForm__attachment">
					<img
						src={attachment}
						style={{
							backgroundImage: attachment,
						}}
					/>
					<div className="factoryForm__clear" onClick={onClearAttachmentClick}>
						<span>Remove</span>
						<FontAwesomeIcon icon={faTimes} />
					</div>
				</div>
			)}
		</form>
	);
};

export default NweetFactory;
