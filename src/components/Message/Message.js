import React from "react";

function Message(props) {
  const { text, uid, photoURL } = props.message;
  const messageClass =
    uid === (props.currentUser && props.currentUser.uid) ? "sent" : "received";
  return (
    <>
      <div className={`${props.messageClass}`}>
        <img src={photoURL} />
        <p>{text}</p>
      </div>
    </>
  );
}

export default Message;
