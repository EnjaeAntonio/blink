import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Link } from 'react-router-dom';
import InputField from '../../components/InputField/InputField';
import './Login.css';
import Button from '../../components/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import HomeHeader from '../../components/HomeHeader/HomeHeader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from 'react-helmet';
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
            toast.error(error.message);
            setIsInfoValid(true);
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
                toast.error(errorMessage);
            }
        } else {
            setErrorMessage('Please fill in all required fields');
        }
    }

    return (
        <>
            <Helmet>
                    <title>Login</title>
            </Helmet>
            <ToastContainer />
            <HomeHeader />
            <div className="container login-container d-flex flex-column justify-content-center align-items-center ">
                <form onSubmit={handleSignIn} className="card p-4 form login-form rounded-2 d-flex justify-content-center">
                    <div className="d-grid">
                        <h1 className="title fw-bold">Login</h1>
                        <div className='line mb-2'></div>
                        <InputField
                            inputType="text"
                            inputId="email"
                            handleOnChange={setEmail}
                            value={email}
                            inputTypeStyle="form-input text-white"
                            inputLabel="Email"
                            colStyle="custom-col-style"
                        />
                        <InputField
                            inputType="text"
                            inputId="password"
                            handleOnChange={setPassword}
                            value={password}
                            error={isInfoValid}
                            errorMessage={isInfoValid ? errorMessage : null}
                            inputTypeStyle="form-input text-white"
                            inputLabel="Password"
                            colStyle="custom-col-style"
                        />
                        <div className="w-100 d-flex justify-content-end ">
                            <p className="generic-paragraph-small">
                                <Link className="generic-paragraph-small text-decoration-none">Forgot password?</Link>
                            </p>
                        </div>
                        <Button buttonText="Login" handleOnClick={handleSignIn} buttonStyles="login-btn rounded-5" />

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
                                        <span className="ms-2 text-white">Login with Google</span>
                                    </>
                                }
                            />
                        </div>
                        <p className="generic-paragraph-small mb-0 mt-3">
                            Don't have an account? <Link to="/blink">Sign up</Link>
                        </p>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Login;
