import './assets/style/index.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Routes, Route } from 'react-router-dom';
import { firebase, firestore, auth } from './config/FirebaseConfig';
import ChatRoom from './pages/ChatRoom/ChatRoom';
import LoginPage from './pages/LoginPage/LoginPage';

function App() {
    const [user] = useAuthState(auth);

    return (
        <Routes>
            <Route exact path="/blink" element={<LoginPage firebase={firebase} auth={auth} />} />
            {user && (
                <Route
                    path="/chat"
                    element={
                        <ChatRoom
                            useCollectionData={useCollectionData}
                            firestore={firestore}
                            currentUser={user}
                            auth={auth}
                            firebase={firebase}
                        />
                    }
                />
            )}
        </Routes>
    );
}

export default App;
