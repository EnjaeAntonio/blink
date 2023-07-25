import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Link } from 'react-router-dom';
import InputField from '../../components/InputField/InputField';
import ButtonDark from '../../components/ButtonDark/ButtonDark';
import SignIn from '../../components/SignIn/SignIn';
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
            <div className="signup-container d-flex flex-column justify-content-center align-items-center ">
                <form onSubmit={handleSignIn} className="d-flex flex-column bg-light p-4">
                    <h1 className="title">Welcome to Blink!</h1>
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
                    <ButtonDark
                        buttonText="Log in"
                        handleOnClick={handleSignIn}
                        buttonStyles="my-3"
                    />
                    <p className="generic-paragraph-small text-center mb-0">Or</p>
                    <SignIn
                        buttonText="Sign in with Google"
                        handleOnClick={handleSignInWithGoogle}
                        className="btn-primary mt-3"
                    />
                    <p className="generic-paragraph-small mb-0 mt-2">
                        Don't have an account? <Link to="/blink">Sign up</Link>
                    </p>
                </form>
            </div>
        </>
    );
}

export default Login;
