import React from 'react';
import './Header.css';
function Header({ currentUser }) {
	return (
        <>
            <header className="w-100">
                <div className="container d-flex justify-content-between align-items-center py-2 ">
                    <label className="heading text-white fw-bold">Blink</label>
                    <nav className="nav">
                        <ul className="message-header d-flex align-items-center justify-content-center">
                            <li>
                                <label className="text-white">
                                    Hello! {currentUser.displayName}
                                </label>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
        </>
    );
}

export default Header;
