import React, { useContext } from 'react';
import { firebase, auth } from '../config/FirebaseConfig';
import { useNavigate } from 'react-router-dom';
const AppContext = React.createContext();
export function useApp() {
    return useContext(AppContext);
}

function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
}


function signUp(email, password, username) {
    return firebase.auth().createUserWithEmailAndPassword(email, password).then((result) =>{
        return result.user.updateProfile({
            displayName: username
        })
    });
}
async function signIn(email, password) {
    return await firebase.auth().signInWithEmailAndPassword(email, password);
}

export function AppProvider({ children }) {
    const defaultExports = { signInWithGoogle, signUp, signIn };
    return <AppContext.Provider value={defaultExports}>{children}</AppContext.Provider>;
}

export default AppContext;
