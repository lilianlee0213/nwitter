import React from 'react';

const Nweet = ({nweetObj}) => {
	return (
		<div>
			<h4>{nweetObj.text}</h4>
			<button>Delete</button>
			<button>Edit</button>
		</div>
	);
};

export default Nweet;
