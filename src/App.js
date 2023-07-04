import './assets/style/index.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import SignIn from "./components/SignIn/SignIn";
import SignOut from "./components/SignOut/SignOut";
import ChatRoom from "./components/ChatRoom/ChatRoom";
import { Routes } from "react-router-dom";

firebase.initializeApp({
  apiKey: "AIzaSyBfkXcOnsMP8GWu9KCNXrwaRZ765ja5zIk",
  authDomain: "messaging-app-70b23.firebaseapp.com",
  projectId: "messaging-app-70b23",
  storageBucket: "messaging-app-70b23.appspot.com",
  messagingSenderId: "444464786607",
  appId: "1:444464786607:web:8ad39291f7e9bb68e6f85a",
  measurementId: "G-6LP5S0BMP3"
});

const signInWithGoogle = () =>{
  const provider = new firebase.auth.GoogleAuthProvider
  auth.signInWithPopup(provider);
}


const firestore = firebase.firestore();
const auth = firebase.auth();

function App() {
  const [user] = useAuthState(auth); // User signed in is object, user signed out is null 
  
  return (
    <>
      <Routes>
        {user ?
          <ChatRoom 
          useCollectionData={useCollectionData}
          firestore={firestore}
          currentUser={user}
          />  
          : 
          <SignIn
          buttonText="Sign in with Google"
          handleOnClick={signInWithGoogle}
          />  
          }
          <SignOut 
          currentUser={user}
          buttonText="Sign out"
          handleOnClick={() => auth.signOut()}
          />
      </Routes>
    </>
  );
}

export default App;
