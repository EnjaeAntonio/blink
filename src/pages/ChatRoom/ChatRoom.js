import React, { useState, useRef, useEffect } from 'react';
import Message from '../../components/Message/Message';
import Button from '../../components/Button/Button';
import './ChatRoom.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket, faBars, faPaperclip, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import Header from '../../components/Header/Header';
import InputField from '../../components/InputField/InputField';
import { getStorage, ref, uploadBytes, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ToastContainer, toast } from 'react-toastify';

function ChatRoom({ firebase, firestore, useCollectionData, currentUser, auth }) {
    const messageRef = firestore.collection('messages');
    const query = messageRef.orderBy('createdAt');
    const [image, setImage] = useState(null);
    const [video, setVideo] = useState(null);
    const [messages] = useCollectionData(query, { idField: 'id' });
    const [formValue, setFormValue] = useState('');
    const [nullFormValue, setNullFormValue] = useState('');
    const dummy = useRef(null);

    async function sendMessage(e) {
        e.preventDefault();
        setNullFormValue(null);

        if (formValue.trim() === '' && image === null) {
            setNullFormValue('Message is empty!');
            return;
        }
        const { uid, photoURL, displayName } = auth.currentUser;
        await messageRef.add({
            text: formValue,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid,
            photoURL,
            displayName,
            messageImage: image,
            messageVideo: video,
        });

        setNullFormValue('');
        setFormValue('');
        setImage(null);
        setVideo(null);
    }

    const selectImageOnClick = (e) => {
        e.preventDefault();
        document.getElementById('add-profile-pic').click();
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        const storage = getStorage();
        let storageRef;

        // You might want to organize your storage to separate images and videos
        if (file.type.includes('image')) {
            storageRef = ref(storage, `user-images/${file.name}`);
        } else if (file.type.includes('video')) {
            storageRef = ref(storage, `user-videos/${file.name}`);
        } else {
            // File is not an image or a video
            toast.error('File type not supported');
            return;
        }

        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setNullFormValue('Upload is ' + Math.trunc(progress) + '% done');
            },
            (error) => {
                toast.error('Upload failed');
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    if (file.type.includes('image')) {
                        setImage(downloadURL);
                    } else if (file.type.includes('video')) {
                        setVideo(downloadURL);
                    }
                });
            }
        );
    };

    useEffect(() => {
        if (image || video) {
            try {
                toast.success(image ? 'Image successfully added' : 'Video successfully added');
                setNullFormValue(image ? 'Image successfully added' : 'Video successfully added');
                return;
            } catch (error) {
                toast.error(error);
            }
        }
    }, [image, video]);

    const showMessages = messages?.map((msg) => <Message message={msg} key={msg.id} currentUser={currentUser} />);

    useEffect(() => {
        if (dummy.current) {
            dummy.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    return (
        <>
            <ToastContainer />
            <Helmet>
                <title>Chat room</title>
            </Helmet>
            <div className="d-flex flex-column justify-content-center align-items-center ">
                <Header currentUser={currentUser} auth={auth} />
                <section className="chatroom-container">
                    <section className="container message-container d-flex justify-content-center align-items-center">
                        <div className="container-fluid message-card">
                            <nav className="d-flex py-2 container-fluid border-bottom bg-light-subtle">
                                <ul className="mb-0 p-0 w-75">
                                    <li className="nav-item">
                                        <FontAwesomeIcon icon={faBars} />
                                    </li>
                                </ul>
                                <ul className="mb-0 p-0 w-25 d-flex justify-content-end ">
                                    <li className="nav-item">
                                        <Link to="/blink">
                                            <FontAwesomeIcon icon={faRightFromBracket} onClick={() => auth.signOut()} title="Sign out" />
                                        </Link>
                                    </li>
                                </ul>
                            </nav>
                            <div className="chat-room">
                                <div className="messages container-fluid">
                                    {showMessages}
                                    <div ref={dummy}></div>
                                </div>
                                <form className="d-flex gap-1 p-2 align-items-center pt-1" onSubmit={sendMessage}>
                                    <input
                                        type="file"
                                        className="d-none"
                                        id="add-profile-pic"
                                        onChange={handleFileChange}
                                        accept="image/png, image/jpeg, image/jpg, video/mp4, video/mov, video/avi"
                                    />
                                    <FontAwesomeIcon
                                        onClick={selectImageOnClick}
                                        icon={faPaperclip}
                                        title="Attach image"
                                        className="d-flex text-white fs-5 justify-content-center align-items-center px-2"
                                    />

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
                                                    <FontAwesomeIcon icon={faPaperPlane} title="Send message" />
                                                </>
                                            }
                                            handleOnClick={sendMessage}
                                        />
                                    ) : (
                                        <Button
                                            buttonStyles="btn-primary"
                                            buttonText={
                                                <>
                                                    <FontAwesomeIcon icon={faPaperPlane} title="Send message" />
                                                </>
                                            }
                                            handleOnClick={sendMessage}
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
