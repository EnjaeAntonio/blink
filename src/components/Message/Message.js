import React from 'react'

function Message(props) {
    const {text, uid, photoURL} = props.message;
    const messageClass = uid === (props.currentUser && props.currentUser.uid) ? 'sent' : 'received';
  return (
    <>
      <div className={`text-white ${messageClass}`}>
        <p>{text}</p>
        <img src={photoURL} />
      </div>
    </>
  )
}

export default Message