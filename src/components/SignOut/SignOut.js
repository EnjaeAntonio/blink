import React from "react";
import "./SignOut.css";

function SignOut(props) {
  return (
    props.currentUser && (
      <>
        <button
          className={`btn ${props.className}`}
          id={props.id}
          onClick={props.handleOnClick}
        >
          {props.buttonText}
        </button>
      </>
    )
  );
}

export default SignOut;
