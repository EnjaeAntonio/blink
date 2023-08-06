import React, { useContext } from 'react';
import { firebase, auth } from '../config/FirebaseConfig';
import { sendPasswordResetEmail } from 'firebase/auth';
const AppContext = React.createContext();
export function useApp() {
    return useContext(AppContext);
}

async function forgotPassword(email) {
    return sendPasswordResetEmail(auth, email);
}

async function signInWithTwitter() {
    const provider = new firebase.auth.TwitterAuthProvider();
    return await auth.signInWithPopup(provider);
}

async function signInWithFacebook() {
    const provider = new firebase.auth.FacebookAuthProvider();
    return await auth.signInWithPopup(provider);
}

async function signInWithGoogle() {
    try {
        const provider = new firebase.auth.GoogleAuthProvider();
        return await auth.signInWithPopup(provider);
    } catch (error) {
        throw error;
    }
}

async function signUp(email, password, username) {
    return await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((result) => {
            return result.user.updateProfile({
                displayName: username,
            });
        });
}
async function signIn(email, password) {
    return await firebase.auth().signInWithEmailAndPassword(email, password);
}

export function AppProvider({ children }) {
    const defaultExports = { signInWithGoogle, signInWithTwitter, signInWithFacebook, forgotPassword, signUp, signIn };
    return <AppContext.Provider value={defaultExports}>{children}</AppContext.Provider>;
}

export default AppContext;
