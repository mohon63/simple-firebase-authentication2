import './App.css';
import app from './firebase.init';
import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useState } from 'react';


const auth = getAuth(app);


function App() {
  const [user, setUser] = useState({});

  const googleProvider = new GoogleAuthProvider();
  const gitHubProvider = new GithubAuthProvider();

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then(result => {
        const user = result.user;
        setUser(user)
        console.log(user);
      })
      .catch(error => {
        console.log('error', error);
      })
  };

  const handleGitHubSignIn = () => {
    signInWithPopup(auth, gitHubProvider)
      .then((result) => {
        const user = result.user;
        console.log(user)
      }).catch((error) => {
        console.log('error', error);
      });
  }

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser({})
      })
      .catch(error => {
        setUser({})
      })
  };

  const handleGitHubSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser({})
      })
      .catch(error => {
        setUser({})
      })
  }
  return (
    <div className="App">
      {/* {condition ? true: false} */}
      {user.email ?
        <>
          <button onClick={handleSignOut}> Sing Out</button>
          <button onClick={handleGitHubSignOut}>GitHub Sing Out</button>
        </>
        :
        <>
          <button onClick={handleGoogleSignIn}>Google sing in</button>
          <button onClick={handleGitHubSignIn}>GitHub singIn</button>
        </>
      }
      <h2>Name: {user.displayName}</h2>
      <p>I know your email address <span style={{ fontWeight: 'bold' }}>{user.email}</span></p>

      <div>
        <img style={{ borderRadius: '50%', }} src={user.photoURL} alt="" />
      </div>
    </div>
  );
}

export default App;
