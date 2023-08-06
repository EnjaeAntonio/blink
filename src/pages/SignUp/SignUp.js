import React, { useState } from 'react';
import SignIn from '../../components/SignIn/SignIn';
import { useApp } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';
import InputField from '../../components/InputField/InputField';
import ButtonDark from '../../components/ButtonDark/ButtonDark';
import { Link } from 'react-router-dom';
import { faFacebookF, faGoogle, faTwitter } from '@fortawesome/free-brands-svg-icons';
import Button from '../../components/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
function SignUp() {
    const { signInWithGoogle, signUp } = useApp();
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isInfoValid, setIsInfoValid] = useState(false);
    const navigate = useNavigate();

    async function handleSignInWithGoogle() {
        try {
            await signInWithGoogle();
            navigate('/chat');
        } catch (error) {
            console.error('Failed to sign in with Google: ', error);
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
                setErrorMessage(errorMessage);
            }
        } else {
            setErrorMessage('Please fill in all required fields');
        }
    }

    return (
        <>
            <div className="signup-container d-flex flex-column justify-content-center align-items-center ">
                <form onSubmit={handleSignUp} className="signup-form d-flex card rounded-2 flex-column bg-light p-4">
                    <h1 className="title fw-bold text-center">Welcome to Blink!</h1>
                    <InputField
                        inputType="text"
                        inputId="username"
                        maxLength={20}
                        handleOnChange={setUsername}
                        value={username}
                        inputTypeStyle="bg-light"
                        inputLabel="Username"
                        colStyle="custom-col-style"
                    />
                    <InputField
                        inputType="text"
                        inputId="email"
                        handleOnChange={setEmail}
                        value={email}
                        inputStyle=""
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
                        inputTypeStyle="form-input mb-3"
                        inputLabel="Password"
                        colStyle="custom-col-style"
                    />
                    <Button buttonText="Create account" handleOnClick={handleSignUp} buttonStyles="signup-btn text-white rounded-5" />
                    <p className="generic-paragraph-small text-center my-3">Or</p>
                    <div className="d-flex justify-content-center align-items-center">
                        <div className="d-flex w-75 justify-content-evenly">
                            <div className="facebook rounded-circle">
                                <Button buttonText={<FontAwesomeIcon icon={faFacebookF} />} />
                            </div>
                            <div className="google rounded-circle">
                                <Button handleOnClick={handleSignInWithGoogle} buttonText={<FontAwesomeIcon icon={faGoogle} />} />
                            </div>
                            <div className="twitter rounded-circle">
                                <Button buttonText={<FontAwesomeIcon icon={faTwitter} />} />
                            </div>
                        </div>
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
