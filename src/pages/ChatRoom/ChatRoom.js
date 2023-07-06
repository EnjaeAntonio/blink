import React, { useState } from 'react';
import Message from '../../components/Message/Message';
import SignOut from '../../components/SignOut/SignOut';

function ChatRoom({ firebase, firestore, useCollectionData, currentUser, auth }) {
	const messageRef = firestore.collection('messages');
	const query = messageRef.orderBy('createdAt').limit(25);

	const [messages] = useCollectionData(query, { idField: 'id' });
	const [formValue, setFormValue] = useState('');

	const sendMessage = async (e) => {
		e.preventDefault();

		const { uid, photoURL } = auth.currentUser;
		await messageRef.add({
			text: formValue,
			createdAt: firebase.firestore.FieldValue.serverTimestamp(),
			uid,
			photoURL,
		});

    setFormValue('');
	};
	return (
		<>
			<section>
				{messages &&
					messages.map((msg) => <Message message={msg} key={msg.id} currentUser={currentUser} />)}

				<form onSubmit={sendMessage}>
					<input value={formValue} onChange={(e) => setFormValue(e.target.value)} />
					<button type="submit">Send</button>
				</form>
				<SignOut
					currentUser={currentUser}
					buttonText="Sign out"
					handleOnClick={() => auth.signOut()}
				/>
			</section>
		</>
	);
}

export default ChatRoom;
