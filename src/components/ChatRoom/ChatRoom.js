import React from 'react'
import Message from "../Message/Message";

function ChatRoom({ firestore, useCollectionData, currentUser }) {
    const messageRef = firestore.collection('messages');
    const query = messageRef.orderBy('createdAt').limit(25);

    const [messages] = useCollectionData(query, {idField: 'id'});
  return (
    <>
      <section>
      {messages &&
            messages.map((msg) => (
              <Message message={msg} key={msg.id} currentUser={currentUser} />
            ))}
      </section>
    </>
  )
}

export default ChatRoom