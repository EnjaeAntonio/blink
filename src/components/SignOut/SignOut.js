import React from 'react'
import './SignOut.css'

function SignOut(props) {
  return props.currentUser && (
    <>
        <span 
        className={`btn btn-primary btn-dark fw-bold ${props.buttonStyles}`} 
        id={props.id} 
        onClick={props.handleOnClick}
        >{props.buttonText}</span>
    </>
  )
}

export default SignOut