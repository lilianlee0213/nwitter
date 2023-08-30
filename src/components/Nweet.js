import {faPencilAlt, faTrash} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {dbService, storageService} from 'fbase';
import {deleteDoc, doc, updateDoc} from 'firebase/firestore';
import {deleteObject, ref} from 'firebase/storage';
import React, {useState} from 'react';

const Nweet = ({nweetObj, isOwner}) => {
	const [editing, setEditing] = useState(false);
	const [newNweet, setNewNweet] = useState(nweetObj.text);
	const nweetDocRef = doc(dbService, `nweets/${nweetObj.id}`);
	const attachmentUrlRef = ref(storageService, nweetObj.attachmentUrl);
	const onDeleteClick = async () => {
		const ok = window.confirm('Are you sure you want to delete this nweet?');
		if (ok) {
			//delete nweet & attachment
			await deleteDoc(nweetDocRef);
			if (nweetObj.attachmentUrl) {
				await deleteObject(attachmentUrlRef);
			}
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
					<form onSubmit={editOnSubmit} className="container nweetEdit">
						<input
							type="text"
							placeholder="Edit your nweet"
							value={newNweet}
							required
							onChange={editOnChange}
							className="formInput"
						/>
						<input type="submit" value="Update Nweet" className="formBtn" />
					</form>
					<span onClick={toggleEditing} className="formBtn cancelBtn">
						Cancel
					</span>
				</>
			) : (
				<>
					<h4>{nweetObj.text}</h4>
					{nweetObj.attachmentUrl && (
						<img src={nweetObj.attachmentUrl} width={50} height={50} />
					)}
					{isOwner && (
						<div className="nweet__actions">
							<span onClick={onDeleteClick}>
								<FontAwesomeIcon icon={faTrash} />
							</span>
							<span onClick={toggleEditing}>
								<FontAwesomeIcon icon={faPencilAlt} />
							</span>
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default Nweet;
