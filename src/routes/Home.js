import React from 'react';

const Home = () => {
	const onSubmit = (event) => {
		event.preventDefault();
	};
	const onChange = (event) => {};
	return (
		<div>
			<form onSubmit={onSubmit}>
				<input
					type="text"
					placeholder="What's on your mind?"
					maxLength={120}
					onChange={onChange}
				/>
				<input type="submit" value="Nweet" />
			</form>
		</div>
	);
};

export default Home;
