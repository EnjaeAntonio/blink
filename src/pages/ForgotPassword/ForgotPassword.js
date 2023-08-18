import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Link } from 'react-router-dom';
import InputField from '../../components/InputField/InputField';
import Button from '../../components/Button/Button';
import HomeHeader from '../../components/HomeHeader/HomeHeader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from 'react-helmet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './ForgotPassword.css';
function ForgotPassword() {
    const { forgotPassword } = useApp();
    const [email, setEmail] = useState('');
    async function changePassword(e) {
        e.preventDefault();
        try {
            await forgotPassword(email);
            toast.success('Email has been sent!');
            setEmail('');
            return;
        } catch (error) {
            toast.error(error);
        }
    }

    return (
        <>
            <Helmet>
                <title>Reset password</title>
            </Helmet>
            <ToastContainer />
            <HomeHeader />
            <section className="container login-container d-flex flex-column justify-content-center align-items-center ">
                <form onSubmit={changePassword} className="card p-4 form login-form rounded-2 d-flex justify-content-center">
                    <div className="d-grid">
                        <h1 className="title fw-bold">Reset password</h1>
                        <div className="line mb-2"></div>
                        <InputField
                            inputType="text"
                            inputId="email"
                            handleOnChange={setEmail}
                            value={email}
                            inputTypeStyle="form-input text-white mb-4"
                            inputLabel="Email"
                            colStyle="custom-col-style"
                        />
                        <Button buttonText="Send" handleOnClick={changePassword} buttonStyles="login-btn rounded-5" />

                        <div className="separator py-3">
                            <div className="line"></div>
                            <span className="or-text">Or</span>
                            <div className="line"></div>
                        </div>

                        <div className="d-flex text-decoration-none cursor-pointer google justify-content-center align-items-center">
                            <Link to="/blink" className='no-outline w-100'>
                                <Button buttonText="Back to home" buttonStyles="text-white w-100" />
                            </Link>
                        </div>

                        <p className="generic-paragraph-small mb-0 mt-3">
                            Don't have an account? <Link to="/blink">Sign up</Link>
                        </p>
                    </div>
                </form>
            </section>
        </>
    );
}

export default ForgotPassword;
