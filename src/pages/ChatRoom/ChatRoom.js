import React, { useState, useRef, useEffect } from 'react';
import Message from '../../components/Message/Message';
import Button from '../../components/Button/Button';
import './ChatRoom.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faMagnifyingGlass,
	faEllipsisV,
	faPhone,
	faBars,
	faPaperclip,
	faPaperPlane,
} from '@fortawesome/free-solid-svg-icons';
import Header from '../../components/Header/Header';
function ChatRoom({ firebase, firestore, useCollectionData, currentUser, auth }) {
	const messageRef = firestore.collection('messages');
	const query = messageRef.orderBy('createdAt');

	const [messages] = useCollectionData(query, { idField: 'id' });
	const [formValue, setFormValue] = useState('');
	const [nullFormValue, setNullFormValue] = useState('');

	const dummy = useRef(null);

	const handleChange = (e) => {
		setFormValue(e.target.value);
	};

	const sendMessage = async (e) => {
		e.preventDefault();
		if (formValue.trim() === '') {
			setNullFormValue('Message is empty!');
			return;
		}

		const { uid, photoURL } = auth.currentUser;
		await messageRef.add({
			text: formValue,
			createdAt: firebase.firestore.FieldValue.serverTimestamp(),
			uid,
			photoURL,
		});

		setNullFormValue('');
		setFormValue('');
	};

	useEffect(() => {
		if (dummy.current) {
			dummy.current.scrollIntoView({ behavior: 'smooth' });
		}
	}, [messages]);
	return (
		<>
			<Header currentUser={currentUser} auth={auth} />
			<section className="chatroom-container">
				<section className="container message-container d-flex justify-content-center align-items-center">
					<div className="container-fluid message-card">
						<nav className="d-flex py-2 container-fluid border-bottom bg-light-subtle">
							<ul className="mb-0 p-0 w-75 ">
								<li className="nav-item">
									<FontAwesomeIcon icon={faBars} />
								</li>
							</ul>
							<ul className="mb-0 p-0 w-25 d-flex justify-content-end ">
								<li className="nav-item">
									<FontAwesomeIcon icon={faMagnifyingGlass} />
								</li>
								<li className="nav-item mx-2">
									<FontAwesomeIcon icon={faPhone} />
								</li>
								<li className="nav-item">
									<FontAwesomeIcon icon={faEllipsisV} />
								</li>
							</ul>
						</nav>
						<div className="chat-room">
							<div className="messages container-fluid">
		
								{messages &&
									messages.map((msg) => (
										<Message
											message={msg}
											key={msg.id}
											currentUser={currentUser}
											messageClass="text-black"
										/>
									))}
								<div ref={dummy}></div>
							</div>
							<form className="d-flex align-items-center pt-1" onSubmit={sendMessage}>
								<FontAwesomeIcon
									icon={faPaperclip}
									className="d-flex justify-content-center align-items-center px-2"
								/>

								<input
									type="text"
									placeholder={nullFormValue ? nullFormValue : 'Write a message...'}
									value={formValue}
									onChange={handleChange}
									className="text-white mx-2"
								/>
								<div className="flex-grow-1"></div>
								{formValue.trim() === '' ? (
									<Button
										buttonStyles="btn-outline-primary "
										buttonText={
											<>
												<FontAwesomeIcon icon={faPaperPlane} />
											</>
										}
									/>
								) : (
									<Button
										buttonStyles="btn-primary"
										buttonText={
											<>
												<FontAwesomeIcon icon={faPaperPlane} />
											</>
										}
									/>
								)}
							</form>
						</div>
					</div>
				</section>
			</section>
		</>
	);
}

export default ChatRoom;
