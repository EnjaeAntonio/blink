import React from 'react';

function Message({ message, currentUser }) {
	const { text, uid, photoURL } = message;

	const messageClass = uid === (currentUser && currentUser.uid) ? 'received' : 'bg-dark-subtle';

	return (
		<>
			<article className={`p-1 mt-2 ${messageClass}`}>
				<div className="d-flex">
					<img className="message-img img-fluid rounded-circle" src={photoURL} />
					<div className="d-flex justify-content-end align-self-end">
						<h2 className="current-username">{currentUser.displayName}</h2>
					</div>
				</div>
					<p className="mb-0">{text}</p>
			</article>
		</>
	);
}

export default Message;
