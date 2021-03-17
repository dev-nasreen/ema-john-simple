import firebase from "firebase/app";
import "firebase/auth";
import { useContext, useState } from "react";
import { FcGoogle } from 'react-icons/fc';
import { IoMdLogOut } from 'react-icons/io';
import {FaFacebook } from 'react-icons/fa';
import {AiFillTwitterCircle } from 'react-icons/ai';
import {FaGithub } from 'react-icons/fa';
import firebaseConfig from "./Firebase.config";
import './LogIn.css'
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}


function LogIn() {
  const [newUser, setNewUser] = useState(true);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    photo: '',
    error: ''
  })

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const provider = new firebase.auth.GoogleAuthProvider();
  const fbProvider = new firebase.auth.FacebookAuthProvider();
  const gitProvider = new firebase.auth.GithubAuthProvider();
  const twProvider = new firebase.auth.TwitterAuthProvider();

  const handleSignIn = () => {
    firebase.auth()
      .signInWithPopup(provider)
      .then((result) => {
        const { displayName, photoURL, email } = result.user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL
        }
        setUser(signedInUser);
        console.log(displayName, photoURL, email);
      })
      .catch(err => {
        console.log(err);

      })
  }
  const handleSignOut = () => {
    firebase.auth().signOut()
      .then(res => {
        const signedOutUser = {
          isSignedIn: false,
          name: '',
          photo: '',
          email: '',
          success: false
        }
        setUser(signedOutUser);
      })
      .catch(err => {
          console.log(err);
      })
  }
  const handleChange = (e) => {

    let isFormValid = true;
    if (e.target.name === 'email') {
      isFormValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value);
    }
    if (e.target.name === 'password') {
      // const isPasswordValid= e.target.value.length > 6;
      isFormValid = /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{6,}$/.test(e.target.value);

    }
    if (isFormValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
      console.log(newUserInfo);
    }


  }
  const handleSubmit = (e) => {
    // console.log(user.email);
    // console.log(user.password);
    if (newUser && user.email && user.password) {
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          const newUserInfo = { ...user };
          newUserInfo.success = true;
          newUserInfo.error = '';
          setUser(newUserInfo);
          updateUserInfo(user.name);
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
    }

    if (!newUser && user.email && user.password) {
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          const newUserInfo = { ...user };
          newUserInfo.success = true;
          newUserInfo.error = '';
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo);
          history.replace(from);
          console.log('sign in user info', res.user)
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
    }
    e.preventDefault();
  }

  const handleFacebookSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(fbProvider)
      .then((result) => {
        const { displayName, photoURL, email } = result.user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL
        }
        setUser(signedInUser);
        console.log(displayName, photoURL, email);
      })
      .catch(err => {
        console.log(err);

      })
  }
  const handleGithubSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(gitProvider)
      .then((result) => {
        const { displayName, photoURL, email } = result.user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL
        }
        setUser(signedInUser);
        console.log(displayName, photoURL, email);
      })
      .catch(err => {
        console.log(err);

      })
  }

  const handleTwitterSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(twProvider)
      .then((result) => {
        const { displayName, photoURL, email } = result.user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL
        }
        setUser(signedInUser);
        console.log(displayName, photoURL, email);
      })
      .catch(err => {
        console.log(err);

      })
  }

 const updateUserInfo = name => {
  var user = firebase.auth().currentUser;

  user.updateProfile({
    displayName: name,
   
  }).then(function() {
   console.log('User name updated successfully')
  }).catch(function(error) {
   console.log(error)
  });
 }
  return (
    <>
    <div className="main">
      <div className="container">
        <div className="col-md-6 mx-auto bg-white">
        {
        user.isSignedIn && <div> <p>Welcome, {user.name}</p>
          <p>Your email id: {user.email}</p>
          <p> <img src={user.photo} alt="high" /></p></div>
      }

        {user.isSignedIn && <span onClick={handleSignOut}><IoMdLogOut/></span>} 
        </div>
      </div>
    

{    user.isSignedIn ||  

<div className="container">
        <div className="row">
          <div className="col-6 mx-auto">
            <div className="my-form">
            <form onSubmit={handleSubmit}>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" onChange={() => setNewUser(!newUser)} name="newUser"/>
              <label className="form-check-label" htmlFor="newUser">
              <h5>New user Sign UP</h5>
              </label>
            </div>
              <div className="mb-3">
              {newUser && <input type="text"  onBlur={handleChange} className="form-control" id="exampleFormControlInput1" placeholder="Your Name" />}
              </div>
              <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
                <input type="email" name="email" className="form-control" onBlur={handleChange} id="exampleFormControlInput1" placeholder="name@example.com" />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Password</label>
                <input type="password" name="password" className="form-control" onBlur={handleChange} id="exampleFormControlInput1" placeholder="password" />
              </div>
              <div className="mb-3">
              <input type="submit" value={newUser ? 'Sign Up' : 'Sign In'} className="btn btn-primary" />
              
              </div>
            </form>
            {
                user.success && <p style={{ color: 'green' }}>User {newUser ? 'created' : 'Logged In'} successfully.</p>
              }
              <p style={{ color: 'red' }}>{user.error}</p>

              <div className="sign-in-with-social">
              <h1>Or Sign In with</h1>
              <div className="icon">
              <span onClick={handleSignIn}><FcGoogle/> </span>
              <span onClick={handleSignIn}><FaFacebook/></span>
              <span onClick={handleSignIn}><AiFillTwitterCircle/></span> 
              <span onClick={handleSignIn}><FaGithub/></span>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>}
    </div>
  </>
  );
}

export default LogIn;
