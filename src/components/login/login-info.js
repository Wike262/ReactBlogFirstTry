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
     document.getElementById('sign-in-status').textContent = 'Signed in';
     document.getElementById('sign-in').textContent = 'Sign out';
     document.getElementById('account-details').textContent = JSON.stringify({
      displayName: displayName,
      email: email,
      emailVerified: emailVerified,
      phoneNumber: phoneNumber,
      photoURL: photoURL,
      uid: uid,
      accessToken: accessToken,
      providerData: providerData
     }, null, '  ');
    });
   } else {
    // User is signed out.
    document.getElementById('sign-in-status').textContent = 'Signed out';
    document.getElementById('sign-in').textContent = 'Sign in';
    document.getElementById('account-details').textContent = 'null';
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
   <div id="sign-in-status"></div>
   <div id="sign-in"></div>
  </>
 )
}

export default LoginStatus;