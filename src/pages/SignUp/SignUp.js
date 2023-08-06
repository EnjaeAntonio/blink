import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';
import InputField from '../../components/InputField/InputField';
import { Link } from 'react-router-dom';
import {faGoogle} from '@fortawesome/free-brands-svg-icons';
import Button from '../../components/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HomeHeader from '../../components/HomeHeader/HomeHeader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from 'react-helmet';
function SignUp() {
    const {signInWithGoogle, signUp } = useApp();
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isInfoValid, setIsInfoValid] = useState(false);
    const navigate = useNavigate();

    async function handleSignInWithGoogle(e) {
        e.preventDefault();
        try {
            await signInWithGoogle();
            navigate('/chat');
        } catch (error) {
            toast.error(error.message);
            setIsInfoValid(true);
        }
    }

    async function handleSignUp(e) {
        e.preventDefault();
        if (username !== '' && password !== '' && email !== '') {
            try {
                await signUp(email, password, username);
                setIsInfoValid(false);
                setErrorMessage('');
                navigate('/chat');
            } catch (error) {
                let errorMessage;
                switch (error.code) {
                    case 'auth/user-not-found':
                        errorMessage = 'User not found. PLease try again';
                        break;
                    case 'auth/wrong-password':
                        errorMessage = 'Incorrect password';
                        break;
                    case 'auth/email-already-in-use':
                        errorMessage = 'Email already in use, please try again';
                        break;
                    case 'auth/invalid-email':
                        errorMessage = 'Invalid credentials, please try again.';
                        break;
                    default:
                        errorMessage = error.message;
                }
                setIsInfoValid(true);
                toast.error(errorMessage);
            }
        } else {
            setErrorMessage('Please fill in all required fields');
        }
    }

    return (
        <>
            <Helmet>
                <title>Sign up</title>
            </Helmet>
            <ToastContainer />
            <HomeHeader />
            <div className="signup-container d-flex flex-column justify-content-center align-items-center ">
                <form onSubmit={handleSignUp} className="signup-form p-4 form d-flex card rounded-2 flex-column ">
                    <h1 className="title fw-bold">Sign up</h1>
                    <div className="line mb-2"></div>
                    <InputField
                        inputType="text"
                        inputId="username"
                        maxLength={20}
                        handleOnChange={setUsername}
                        value={username}
                        inputTypeStyle="form-input text-white "
                        inputLabel="Username"
                        colStyle="custom-col-style"
                    />
                    <InputField
                        inputType="text"
                        inputId="email"
                        handleOnChange={setEmail}
                        value={email}
                        inputTypeStyle="form-input text-white "
                        inputLabel="Email"
                        colStyle="custom-col-style"
                    />
                    <InputField
                        inputType="text"
                        inputId="password"
                        handleOnChange={setPassword}
                        value={password}
                        errors={isInfoValid}
                        errorMessage={isInfoValid ? errorMessage : null}
                        inputTypeStyle="form-input text-white  mb-3"
                        inputLabel="Password"
                        colStyle="custom-col-style"
                    />
                    <Button buttonText="Create account" handleOnClick={handleSignUp} buttonStyles="signup-btn text-white rounded-5" />
                    <div className="separator py-3">
                        <div className="line"></div>
                        <span className="or-text">Or</span>
                        <div className="line"></div>
                    </div>
                    <div className="d-flex cursor-pointer google justify-content-center align-items-center">
                        <Button
                            handleOnClick={handleSignInWithGoogle}
                            buttonText={
                                <>
                                    <FontAwesomeIcon icon={faGoogle} />
                                    <span className="ms-2 text-white">Sign up with Google</span>
                                </>
                            }
                        />
                    </div>
                    <p className="generic-paragraph-small mb-0 mt-2">
                        Already have an account? <Link to="/login">Log in</Link>
                    </p>
                </form>
            </div>
        </>
    );
}

export default SignUp;
