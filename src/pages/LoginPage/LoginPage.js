import React, { useState } from 'react';
import SignIn from '../../components/SignIn/SignIn';
import { useApp } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import InputField from '../../components/InputField/InputField';
import ButtonDark from '../../components/ButtonDark/ButtonDark';
import { Link } from 'react-router-dom';
function LoginPage() {
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
                setIsInfoValid(true);
                setErrorMessage(error.message);
            }
        }
    }

    return (
        <>
            <div className="signup-container d-flex flex-column justify-content-center align-items-center ">
                <form onSubmit={handleSignUp} className="d-flex flex-column bg-light p-4">
                    <h1 className="title ">Welcome to Blink!</h1>
                    <InputField
                        inputType="text"
                        inputId="username"
                        maxLength={20}
                        handleOnChange={setUsername}
                        value={username}
                        inputTypeStyle="bg-light"
                        inputLabel="Username"
                        colStyle="custom-col-style"
                        inputPlaceholder="Enter your username"
                    />
                    <InputField
                        inputType="text"
                        inputId="email"
                        handleOnChange={setEmail}
                        value={email}
                        errors={isInfoValid}
                        errorMessage={isInfoValid ? errorMessage : null}
                        inputStyle=""
                        inputLabel="Email"
                        colStyle="custom-col-style"
                        inputPlaceholder="Enter your email"
                    />
                    <InputField
                        inputType="text"
                        inputId="password"
                        handleOnChange={setPassword}
                        value={password}
                        inputStyle=""
                        inputLabel="Password"
                        colStyle="custom-col-style"
                        inputPlaceholder="Enter your password"
                    />
                    <p className="generic-sub-paragraph">
                        Already have an account? <Link>Log in</Link>
                    </p>
                    <ButtonDark buttonText="Sign Up" handleOnClick={handleSignUp} />
                    <SignIn
                        buttonText="Sign in with Google"
                        handleOnClick={handleSignInWithGoogle}
                        className="btn-primary "
                    />
                </form>
            </div>
        </>
    );
}

export default LoginPage;
