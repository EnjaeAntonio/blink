import React from 'react';
import './SignIn.css';
function SignIn(props) {
    return (
        <>
            <button
                className={`btn ${props.className}`}
                id={props.id}
                onClick={props.handleOnClick}
            >
                {props.buttonText}
            </button>
        </>
    );
}

export default SignIn;
