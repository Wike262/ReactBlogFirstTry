import React from 'react';
import * as firebase from 'firebase/app';
import 'firebase/firebase-firestore';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import FirebaseUIAuth from 'react-firebaseui-localized';

const uiConfig = {
 signInSuccessUrl: '/',
 signInOptions: [
  // Leave the lines as is for the providers you want to offer your users.
  firebase.auth.EmailAuthProvider.PROVIDER_ID,
 ],
 // tosUrl and privacyPolicyUrl accept either url string or a callback
 // function.
 // Terms of service url/callback.
};
class Login extends React.Component {
 constructor(props) {
  super(props);
  this.state = {};
 }

 // Initialize the FirebaseUI Widget using Firebase.
 // The start method will wait until the DOM is loaded.

 render() {
  return (
   <>
    <FirebaseUIAuth
     lang='ru'
     config={uiConfig}
     auth={firebase.auth()}
     firebase={firebase}
    />
    <div id='firebaseui-auth-container'></div>
   </>
  );
 }
}

export default Login;
