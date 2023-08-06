import React, { useState, useRef, useEffect } from 'react';
import Message from '../../components/Message/Message';
import Button from '../../components/Button/Button';
import './ChatRoom.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faEllipsisV, faPhone, faBars, faPaperclip, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import Header from '../../components/Header/Header';
import InputField from '../../components/InputField/InputField';
import containsBadWord from '../../utils/wordfilter';
function ChatRoom({ firebase, firestore, useCollectionData, currentUser, auth }) {
    const messageRef = firestore.collection('messages');
    const query = messageRef.orderBy('createdAt');

    const [messages] = useCollectionData(query, { idField: 'id' });
    const [formValue, setFormValue] = useState('');
    const [nullFormValue, setNullFormValue] = useState('');
    const dummy = useRef(null);

    async function sendMessage(e) {
        e.preventDefault();
        if (formValue.trim() === '') {
            setNullFormValue('Message is empty!');
            return;
        }

        if (containsBadWord(formValue)) {
            setNullFormValue('Message contains a bad word!');
            return;
        }

        const { uid, photoURL, displayName } = auth.currentUser;
        await messageRef.add({
            text: formValue,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid,
            photoURL,
            displayName,
        });

        setNullFormValue('');
        setFormValue('');
    }

    const showMessages = messages?.map((msg) => <Message message={msg} key={msg.id} currentUser={currentUser} messageClass="text-black" />);

    useEffect(() => {
        if (dummy.current) {
            dummy.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    return (
        <>
            <div className="d-flex flex-column justify-content-center align-items-center ">
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
                                    {showMessages}
                                    <div ref={dummy}></div>
                                </div>
                                <form className="d-flex gap-1 p-2 align-items-center pt-1" onSubmit={sendMessage}>
                                    <FontAwesomeIcon icon={faPaperclip} className="d-flex justify-content-center align-items-center px-2" />

                                    <InputField
                                        inputType="text"
                                        inputPlaceholder={nullFormValue ? nullFormValue : 'Write a message...'}
                                        value={formValue}
                                        handleOnChange={setFormValue}
                                        inputStyle="w-100"
                                        inputWrapperStyle=""
                                        inputTypeStyle="msg-input text-black"
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
            </div>
        </>
    );
}

export default ChatRoom;
