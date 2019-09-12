import React from 'react';
import * as firebase from 'firebase/app';
import 'firebase/firebase-firestore';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import Input from '../callback/input/input'

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
     document.getElementById('Name').textContent = displayName
    });
   } else {
   }
  }, function (error) {
   console.log(error);
  });
 };

 window.addEventListener('load', function () {
  firebase.initApp();
 });
 return (
  <div className="Account-Detail">
   <h1>Welcome</h1>
   <p>To continue please fill fields</p>
   <div className="Account-Name">
    <label htmlFor="name">Name:</label>
    <Input name='Name' id='Name' placeholder='First Name' />
   </div>
  </div>

 )
}

export default LoginStatus;