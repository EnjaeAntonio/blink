import React from 'react'
import SignIn from "../../components/SignIn/SignIn";
function LoginPage({ firebase, auth }) {

    const signInWithGoogle = () =>{
        const provider = new firebase.auth.GoogleAuthProvider
        auth.signInWithPopup(provider);
      }
      
  return (
    <>
        <SignIn
        buttonText="Sign in with Google"
        handleOnClick={signInWithGoogle}
        />  
    </>

  )
}

export default LoginPage