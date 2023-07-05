import React from "react";
import Message from "../../components/Message/Message";
import SignOut from "../../components/SignOut/SignOut";

function ChatRoom({ firestore, useCollectionData, currentUser, auth }) {
  const messageRef = firestore.collection("messages");
  const query = messageRef.orderBy("createdAt").limit(25);

  const [messages] = useCollectionData(query, { idField: "id" });

  return (
    <>
      <section>
        {messages &&
          messages.map((msg) => (
            <Message message={msg} key={msg.id} currentUser={currentUser} />
          ))}
        <SignOut
          currentUser={currentUser}
          buttonText="Sign out"
          handleOnClick={() => auth.signOut()}
        />
      </section>
    </>
  );
}

export default ChatRoom;
