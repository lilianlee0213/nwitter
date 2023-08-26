import {dbService} from 'fbase';
import {deleteDoc, doc, updateDoc} from 'firebase/firestore';
import React, {useState} from 'react';

const Nweet = ({nweetObj, isOwner}) => {
	const [editing, setEditing] = useState(false);
	const [newNweet, setNewNweet] = useState(nweetObj.text);
	const nweetDocRef = doc(dbService, `nweets/${nweetObj.id}`);
	const onDeleteClick = async () => {
		const ok = window.confirm('Are you sure you want to delete this nweet?');
		if (ok) {
			//delete nweet
			await deleteDoc(nweetDocRef);
		}
	};
	const toggleEditing = () => {
		setEditing((prev) => !prev);
	};
	const editOnChange = (event) => {
		const {
			target: {value},
		} = event;
		setNewNweet(value);
	};
	const editOnSubmit = async (event) => {
		event.preventDefault();
		//update nweet
		await updateDoc(nweetDocRef, {text: newNweet});
		setEditing(false);
	};
	return (
		<div>
			{editing ? (
				<>
					<form onSubmit={editOnSubmit}>
						<input
							type="text"
							placeholder="Edit your nweet"
							value={newNweet}
							required
							onChange={editOnChange}
						/>
						<input type="submit" value="Update Nweet" />
					</form>
					<button onClick={toggleEditing}>Cancel</button>
				</>
			) : (
				<>
					<h4>{nweetObj.text}</h4>
					{nweetObj.attachmentUrl && (
						<img src={nweetObj.attachmentUrl} width={50} height={50} />
					)}
					{isOwner && (
						<>
							<button onClick={onDeleteClick}>Delete</button>
							<button onClick={toggleEditing}>Edit</button>
						</>
					)}
				</>
			)}
		</div>
	);
};

export default Nweet;
