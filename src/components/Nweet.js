import React from 'react';

const Nweet = ({nweetObj, isOwner}) => {
	return (
		<div>
			<h4>{nweetObj.text}</h4>
			{isOwner && (
				<>
					<button>Delete</button>
					<button>Edit</button>
				</>
			)}
		</div>
	);
};

export default Nweet;
