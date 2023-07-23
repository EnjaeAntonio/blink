import React, { useState } from 'react';
import SignIn from '../../components/SignIn/SignIn';
import { useApp } from '../../context/AppContext';
import './LoginPage.css';
import InputField from '../../components/InputField/InputField';
import ButtonDark from '../../components/ButtonDark/ButtonDark';
function LoginPage() {
    const { signInWithGoogle, signUp } = useApp();
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPasswrod] = useState('');
    const [errorMessage, setErrorMessage] = useState('')
    const [isInfoValid, setIsInfoValid] = useState(false)
    async function handleSubmit(e) {
      e.preventDefault();
      if(username !== '' && password !== '' && email !== ''){
        try {
          await signUp(email, password,username)
          setIsInfoValid(false);
          setErrorMessage('');
        } catch (error) {
          setIsInfoValid(true);
          setErrorMessage(error.message)
        }
      }
    }
    return (
        <>
            <div className="signin-container d-flex flex-column justify-content-center align-items-center ">
                <h1>Welcome to Blink!</h1>
                <form onSubmit={handleSubmit} className="d-flex flex-column ">
                    <InputField
                        inputType="text"
                        inputId="username"
                        maxLength={20}
                        handleOnChange={setUsername}
                        value={username}
                        inputStyle=""
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
                        handleOnChange={setPasswrod}
                        value={password}
                        inputStyle=""
                        inputLabel="Password"
                        colStyle="custom-col-style"
                        inputPlaceholder="Enter your password"
                    />
                    <ButtonDark buttonText="Sign Up" handleOnClick={handleSubmit} />
                    <SignIn
                        buttonText="Sign in with Google"
                        handleOnClick={signInWithGoogle}
                        className="btn-primary "
                    />
                </form>
            </div>
        </>
    );
}

export default LoginPage;
