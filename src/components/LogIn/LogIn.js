import React, { useContext } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./Firebase.config.js";
import { useState } from "react";
import './LogIn.css';
import { FcGoogle } from 'react-icons/fc';
import signup from '../../images/signup.jpg'
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';



if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
   
    const [newUser, setNewUser] = useState({isSignedIn: false,
        name: ''});
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        rePassword: '',
        photo: '',
        error: ''
    })
    const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };
   

   const handleGoogleSignIn = () =>{
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    const {displayName, email} = result.user;
    const signedInUser = {name: displayName, email, isSignedIn: true,}
    setLoggedInUser(signedInUser);
    history.replace(from);
    console.log(signedInUser);
  }).catch((error) => {
    const errorMessage = error.message;
    const email = error.email;
    console.log(errorMessage, email)
  });
  }

  const handleChange = (e) => {
    let isFormValid = true;
    if (e.target.name === 'email') {
      isFormValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value);
    }
    if (e.target.name === 'password' ) {
      isFormValid = /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{6,}$/.test(e.target.value);

    }
    if (isFormValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  }

  const updateUserInfo = name => {
    let user = firebase.auth().currentUser;
    user.updateProfile({
      displayName: name,
     
    }).then(() => {
     console.log('User name updated successfully')
    }).catch(error => {
     console.log(error)
    });
   }

  const handleSignIn = (e) => {
    console.log(user.email, user.password);
   
    if (newUser && user.email && user.password && user.password === user.rePassword) {
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          const newUserInfo = { ...user };
          newUserInfo.success = true;
          newUserInfo.error = '';
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo);
           history.replace(from);
           updateUserInfo(user.name);
          console.log('sign in user info', res.user)
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo);
          history.replace(from);
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
          setLoggedInUser(newUserInfo);
          history.replace(from);
        });
    }
    e.preventDefault();
  }

    return (
        <>
        <div className="main">
                <div className="form-container">
                    <div className="container">
                    <div className="signup-content row">
                        <div className="signup-form col-md-6 col-10 mx-auto gy-3">
                            <h2 className="form-title">{newUser ? 'Sign Up' : 'Sign In'}</h2>
                            <form  onSubmit={handleSignIn} className="register-form" id="register-form">
                               {newUser && <div className="form-group">
                                    <input type="text" name="name" onBlur={handleChange} id="name"  placeholder="Your Name" required/>
                                </div>}
                                <div className="form-group">
                                    <input type="email" name="email" onBlur={handleChange} id="email" placeholder="Your Email" required/>
                                </div>
                                <div className="form-group">
                                    <input type="password" name="password" onBlur={handleChange} id="pass"  placeholder="Password" required/>
                                </div>
                               {newUser && <div className="form-group">
                                    <input type="password" name="rePassword" onBlur={handleChange} id="re_pass"  placeholder="Repeat your password" required/>
                                    {user.password === user.rePassword || <span className="text-danger">Password not matched.</span>}
                                </div>}
                                
                                <div className="form-group form-button">
                                    <input type="submit" name="signup" id="signup" value={newUser ?"Register" : "Login"}/>
                                </div>
                                
                            </form>
                            <div className="social-login">
                                    <span className="social-label">Or Login with</span>
                                    <ul className="socials">
                                        <li><span onClick={handleGoogleSignIn}><FcGoogle/> </span></li>
                                    </ul>
                                </div>
                        </div>
                        <div className="signup-image col-md-6">
                            <img src={signup} alt="sing up" />
                            <span className="signup-image-link">{newUser ? "Sign In" : "Create Account"}<Link onClick={() =>setNewUser(!newUser) }>{newUser ? 'LogIn' : "Sign Up"}</Link> </span>
                        </div>
                    </div>
                    </div>
                </div>
</div>
</>
    );
};

export default Login;
