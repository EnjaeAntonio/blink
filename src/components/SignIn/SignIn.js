import React from 'react'
import './SignIn.css'
function SignIn(props) {
  return (
    <>
      <button 
      className={`btn btn-primary btn-light fw-bold ${props.buttonStyles}`} 
      id={props.id} 
      onClick={props.handleOnClick}
      >{props.buttonText}</button>
    </>
  )
}

export default SignIn