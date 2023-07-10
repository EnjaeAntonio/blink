import React from 'react';
import './ButtonDark.css'

function ButtonDark(props) {
    return (
        <>
            <button className={`btn btn-primary btn-dark fw-bold ${props.buttonStyles}`} id={props.id} onClick={props.handleOnClick}>{props.buttonText}</button>
        </>
    );
}

export default ButtonDark;