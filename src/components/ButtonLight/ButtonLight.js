import React from 'react';
import './ButtonLight.css'

function ButtonLight(props) {
    return (
        <>
            <span className={`btn btn-primary btn-light fw-bold ${props.buttonStyles}`} id={props.id} onClick={props.handleOnClick}>{props.buttonText}</span>
        </>
    );
}

export default ButtonLight;