import React from 'react';
import * as firebase from 'firebase/app';
import 'firebase/firebase-firestore'
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'

const Login = () => {
 // FirebaseUI config.
 var uiConfig = {
  signInSuccessUrl: '/',
  signInOptions: [
   // Leave the lines as is for the providers you want to offer your users.
   firebase.auth.GoogleAuthProvider.PROVIDER_ID,
   firebase.auth.EmailAuthProvider.PROVIDER_ID,
   firebase.auth.PhoneAuthProvider.PROVIDER_ID,
  ],
  // tosUrl and privacyPolicyUrl accept either url string or a callback
  // function.
  // Terms of service url/callback.
  tosUrl: '/terms-of-service',
  // Privacy policy url/callback.
  privacyPolicyUrl: function () {
   window.location.assign('/privacy-policy');
  }
 };
 // Initialize the FirebaseUI Widget using Firebase.
 var ui = new firebaseui.auth.AuthUI(firebase.auth());
 // The start method will wait until the DOM is loaded.
 ui.start('#firebaseui-auth-container', uiConfig);
 return (
  <>
   <h1>Welcome to My Awesome App</h1>
   <div id="firebaseui-auth-container"></div>
  </>
 )
}

export default Login;