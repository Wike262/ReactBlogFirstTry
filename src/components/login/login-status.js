import React from 'react';
import * as firebase from 'firebase/app';
import 'firebase/firebase-firestore';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import ClipLoader from 'react-spinners/ClipLoader';
import { Link } from 'react-router-dom'
import './login-status.sass'

class LoginStatus extends React.Component {
 constructor(props) {
  super(props)
  this.state = {
   Auth: '',
   loading: true
  }
 }


 componentDidMount() {
  firebase.initApp = () => {
   firebase.auth().onAuthStateChanged((user) => {
    if (user) {
     // User is signed in.
     user.getIdToken().then((accessToken) => {
      this.setState({
       Auth: true,
       loading: false
      })
      document.getElementById('Account-Name').textContent = user.displayName;
      document.getElementById('SingInOut').addEventListener('click', () => {
       firebase.auth().signOut();
      })
      document.getElementById('SingInOut').textContent = 'Sign out';
      document.getElementById('Settings').textContent = 'settings';

     });
    } else {
     // User is signed out.
     document.getElementById('SingInOut').textContent = 'Sign in';
     document.getElementById('Account-Name').textContent = '';
     document.getElementById('Settings').textContent = '';
    }
   }, function (error) {
    console.log(error);
   });
  };

  window.addEventListener('load', function () {
   firebase.initApp();
  });
 }


 render() {
  return (
   this.state.loading ? <ClipLoader sizeUnit={"px"}
    size={150}
    color={'gray'}
    loading={this.state.loading} /> :

    <div className="Account">
     <div className='Account-Status Status'>
      <img className='Account-Avatar' src='https://firebasestorage.googleapis.com/v0/b/my-app-dd6a6.appspot.com/o/Images%2Fnophoto.jpg?alt=media&token=764110c3-1272-46e2-834b-3a15a82fc9aa' alt="" />
      <div className='Account-Name Name' id="Account-Name"></div>
      <Link to={this.state.Auth ? '/' : '/login'} className='Account-SingInOut' id="SingInOut" />
      <Link to={'/account-details'} className="Account-Settings Settings" id='Settings'></Link>
     </div>
    </div>

  )
 }

}

export default LoginStatus;