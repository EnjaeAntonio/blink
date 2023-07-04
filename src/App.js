import './assets/style/index.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Routes } from "react-router-dom";

import ChatRoom from "./pages/ChatRoom/ChatRoom";
import LoginPage from "./pages/LoginPage/LoginPage";

firebase.initializeApp({
  apiKey: "AIzaSyBfkXcOnsMP8GWu9KCNXrwaRZ765ja5zIk",
  authDomain: "messaging-app-70b23.firebaseapp.com",
  projectId: "messaging-app-70b23",
  storageBucket: "messaging-app-70b23.appspot.com",
  messagingSenderId: "444464786607",
  appId: "1:444464786607:web:8ad39291f7e9bb68e6f85a",
  measurementId: "G-6LP5S0BMP3"
});

const firestore = firebase.firestore();
const auth = firebase.auth();

function App() {
  const [user] = useAuthState(auth); 
  
  return (
      <>
        {user ? 
            <ChatRoom 
              useCollectionData={useCollectionData}
              firestore={firestore}
              currentUser={user}
              auth={auth}
            />
         : 
            <LoginPage 
              firebase={firebase} 
              auth={auth} 
            />
        }
      </>
  );
}


export default App;
