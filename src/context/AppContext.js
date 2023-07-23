import React, { useContext } from 'react';
import { firebase, auth } from '../config/FirebaseConfig';

const AppContext = React.createContext();
export function useApp() {
    return useContext(AppContext);
}

function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
}


function signup(email, password) {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
}
async function signin(email, password) {
    return await firebase.auth().signInWithEmailAndPassword(email, password);
}

export function AppProvider({ children }) {
    const defaultExports = { signInWithGoogle, signup, signin };
    return <AppContext.Provider value={defaultExports}>{children}</AppContext.Provider>;
}

export default AppContext;
