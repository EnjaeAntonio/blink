import React from 'react';
import './Header.css';
import SignOut from '../SignOut/SignOut';
import { useNavigate, Link } from 'react-router-dom';
function Header({ currentUser, auth }) {
	return (
        <>
            <header className="container">
                <div className="container-fluid d-flex justify-content-between align-items-center py-2 ">
                    <label className="heading text-white fw-bold">Blink</label>
                    <nav className="nav">
                        <ul className="message-header d-flex align-items-center justify-content-center">
                            <li>
                                <label className="text-white">
                                    Hello! {currentUser.displayName}
                                </label>
                            </li>
                            <li className="sign-out-btn">
                                <Link to='/login'>
                                    <SignOut
                                        currentUser={currentUser}
                                        buttonText="Sign out"
                                        handleOnClick={() => auth.signOut()}
                                        className="btn-danger"
                                    />
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
        </>
    );
}

export default Header;
