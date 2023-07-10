import React from "react";

function Button(props) {
  return (
		<>
			<button
				className={`btn ${props.buttonStyles}`}
				id={props.id}
				onClick={props.handleOnClick}>
				{props.buttonText}
			</button>
		</>
	);
}

export default Button;
