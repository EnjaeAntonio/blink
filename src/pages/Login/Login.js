import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Link } from 'react-router-dom';
import InputField from '../../components/InputField/InputField';
import ButtonDark from '../../components/ButtonDark/ButtonDark';
import SignIn from '../../components/SignIn/SignIn';
import './Login.css';
import Button from '../../components/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faGoogle, faTwitter } from '@fortawesome/free-brands-svg-icons';
function Login() {
    const { signIn, signInWithGoogle } = useApp();
    const [email, setEmail] = useState('');
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
            setErrorMessage(error.message);
            setIsInfoValid(true);
            console.error(error);
        }
    }
    async function handleSignIn(e) {
        e.preventDefault();
        if (password !== '' && email !== '') {
            try {
                await signIn(email, password);
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
                        errorMessage = 'Email already in use';
                        break;
                    case 'auth/invalid-email':
                        errorMessage = 'Invalid credentials, please try again.';
                        break;
                    default:
                        errorMessage = error.message;
                }
                setIsInfoValid(true);
                setErrorMessage(errorMessage);
                console.error(error);
            }
        } else {
            setErrorMessage('Please fill in all required fields');
        }
    }

    return (
        <>
            <div className="login-container d-flex flex-column justify-content-center align-items-center ">
                <form
                    onSubmit={handleSignIn}
                    className="d-flex justify-content-center bg-light p-4"
                >
                    <div className="d-grid">
                        <h1 className="title fw-bold text-center">Login</h1>
                        <InputField
                            inputType="text"
                            inputId="email"
                            handleOnChange={setEmail}
                            value={email}
                            inputTypeStyle=""
                            inputLabel="Email"
                            colStyle="custom-col-style"
                            inputPlaceholder="Enter your email"
                        />
                        <InputField
                            inputType="text"
                            inputId="password"
                            handleOnChange={setPassword}
                            value={password}
                            error={isInfoValid}
                            errorMessage={isInfoValid ? errorMessage : null}
                            inputTypeStyle=""
                            inputLabel="Password"
                            colStyle="custom-col-style"
                            inputPlaceholder="Enter your password"
                        />
                        <div className="w-100 d-flex justify-content-end ">
                            <p className="generic-paragraph-small">
                                <Link className="generic-paragraph-small text-decoration-none">
                                    Forgot password?
                                </Link>
                            </p>
                        </div>
                        <ButtonDark
                            buttonText="Log in"
                            handleOnClick={handleSignIn}
                            buttonStyles="login-btn rounded-5"
                        />

                        <p className="generic-paragraph-small text-center mt-3 mb-2">
                            Or sign up using
                        </p>
                        <div className="d-flex justify-content-evenly">
                            <div className="facebook rounded-circle">
                                <Button buttonText={<FontAwesomeIcon icon={faFacebookF} />} />
                            </div>
                            <div className="google rounded-circle">
                            <Button buttonText={<FontAwesomeIcon icon={faGoogle} />} />

                            </div>
                            <div className="twitter rounded-circle">
                            <Button buttonText={<FontAwesomeIcon icon={faTwitter} />} />

                            </div>

                        </div>
                        <p className="generic-paragraph-small mb-0 mt-2">
                            Don't have an account? <Link to="/blink">Sign up</Link>
                        </p>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Login;
