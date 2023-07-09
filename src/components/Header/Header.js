import React from 'react'
import './Header.css';
import SignOut from "../SignOut/SignOut";
function Header({currentUser, auth}) {
  return (
		<div className="sign-out-btn">
			<SignOut
				currentUser={currentUser}
				buttonText="Sign out"
				handleOnClick={() => auth.signOut()}
			/>
		</div>
	);
}

export default Header