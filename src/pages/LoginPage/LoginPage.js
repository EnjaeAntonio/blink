import React from "react";
import SignIn from "../../components/SignIn/SignIn";
import { useApp } from "../../context/AppContext";
function LoginPage() {
  const { signInWithGoogle } = useApp()
  return (
    <>
      <SignIn
        buttonText="Sign in with Google"
        handleOnClick={signInWithGoogle}
        className="btn-primary "
      />
    </>
  );
}

export default LoginPage;
