import './assets/style/index.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Routes } from 'react-router-dom';
import { firebase, firestore, auth } from './config/FirebaseConfig';
import ChatRoom from './pages/ChatRoom/ChatRoom';
import LoginPage from './pages/LoginPage/LoginPage';

function App() {
    const [user] = useAuthState(auth);

    const content = user ? (
        <ChatRoom
            useCollectionData={useCollectionData}
            firestore={firestore}
            currentUser={user}
            auth={auth}
            firebase={firebase}
        />
    ) : (
        <LoginPage firebase={firebase} auth={auth} />
    );

    return (
        <>
            <div className="d-flex flex-column justify-content-center align-items-center ">
                {content}
            </div>
        </>
    );
}

export default App;
