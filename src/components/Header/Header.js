import React from 'react';
import './Header.css';
import SignOut from '../SignOut/SignOut';
function Header({ currentUser, auth }) {
	return (
		<>
			<header className="container">
				<div class="container-fluid d-flex justify-content-between align-items-center py-2 ">
					<div class="title">
						<label className="heading text-white">Hello! {currentUser.displayName}</label>
					</div>
					<nav className="nav">
						<ul className="message-header d-flex align-items-center justify-content-center">
							<li className="sign-out-btn">
								<SignOut
									currentUser={currentUser}
									buttonText="Sign out"
									handleOnClick={() => auth.signOut()}
									className="btn-danger"
								/>{' '}
							</li>
						</ul>
					</nav>
				</div>
			</header>
		</>
	);
}

export default Header;
