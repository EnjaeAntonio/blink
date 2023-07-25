import React from "react";
import './Button.css'
function Button(props) {
  return (
      <>
          <button
              className={`btn ${props.buttonStyles}`}
              id={props.id}
              onClick={props.handleOnClick}
          >
              {props.buttonText}
          </button>
      </>
  );
}

export default Button;
