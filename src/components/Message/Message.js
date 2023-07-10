import React from 'react';
import './Message.css'
function Message({ message, currentUser, props }) {
	const { text, uid, photoURL } = message;

	const messageClass = uid === (currentUser && currentUser.uid) ? 'sent text-white' : 'bg-dark text-white received';

	return (
		<>
			<article className={`my-2 ${[messageClass]}`}>
				<div className="d-flex">
					<img className="m-2 message-img rounded-circle" src={photoURL} />
					<div className="m-1 d-flex justify-content-end align-self-end">
						<h2 className="current-username">{currentUser.displayName}</h2>
					</div>
				</div>
				<p className="user-text p-2">{text}</p>
			</article>
		</>
	);
}

export default Message;
