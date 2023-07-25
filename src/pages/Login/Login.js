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
            setErrorMessage(error);
            setIsInfoValid(true);
            console.error(error);
        }
    }
    async function handleSignIn(e) {
        e.preventDefault();
        try {
            await signIn(email, password);
            navigate('/chat');
        } catch (error) {
            setErrorMessage(error)
            setIsInfoValid(true);
            console.error(error);
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
                        errors={isInfoValid}
                        errorMessage={isInfoValid ? errorMessage : null}
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
                        inputTypeStyle=""
                        inputLabel="Password"
                        colStyle="custom-col-style"
                        inputPlaceholder="Enter your password"
                    />
                    <p className="generic-paragraph-small">
                        Don't have an account? <Link to="/home">Sign up</Link>
                    </p>
                    <ButtonDark
                        buttonText="Log in"
                        handleOnClick={handleSignIn}
                        buttonStyles="mb-2"
                    />
                    <p className="generic-paragraph-small text-center">Or</p>
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

export default Login;
