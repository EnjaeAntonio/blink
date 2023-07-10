import React from 'react';
import './ButtonDisabled.css'

function ButtonDisabled(props) {
    return (
        <>
            <button className={`btn btn-primary btn-disabled fw-bold ${props.buttonStyles}`} id={props.id} onClick={props.handleOnClick}>{props.isLoading ? props.buttonImage ? <img src={props.buttonImage} alt={props.buttonText} className="btn-image" /> : props.buttonText : props.buttonText}</button>
        </>
    );
}

export default ButtonDisabled;