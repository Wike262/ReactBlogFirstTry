import React from 'react';
import * as firebase from 'firebase/app';
import 'firebase/firebase-firestore';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';

const LoginStatus = () => {
 firebase.initApp = function () {
  firebase.auth().onAuthStateChanged(function (user) {
   if (user) {
    // User is signed in.
    var displayName = user.displayName;
    var email = user.email;
    var emailVerified = user.emailVerified;
    var photoURL = user.photoURL;
    var uid = user.uid;
    var phoneNumber = user.phoneNumber;
    var providerData = user.providerData;
    user.getIdToken().then(function (accessToken) {
     document.getElementById('Account-Name').textContent = displayName;
     document.getElementById('sign-in').textContent = 'Sign out';
    });
   } else {
    // User is signed out.
    document.getElementById('sign-in').textContent = 'Sign in';
   }
  }, function (error) {
   console.log(error);
  });
 };

 window.addEventListener('load', function () {
  firebase.initApp();
 });
 return (
  <>
   <div id="Account-Name"></div>
   <div id="sign-in"></div>
   <div className="settings">settings</div>
  </>
 )
}

export default LoginStatus;