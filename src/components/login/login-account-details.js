import React from 'react';
import * as firebase from 'firebase/app';
import 'firebase/firebase-firestore';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import Input from '../callback/input/input'

class LoginStatus extends React.Component {
 constructor(props) {
  super(props)
  this.state = {
   Name: '',
   LastName: '',
   Email: '',
   Avatar: '',
   Phone: ''
  }
 }
 componentDidMount() {
  firebase.initApp = () => {
   firebase.auth().onAuthStateChanged((user) => {
    if (user) {
     this.setState({
      Name: user.displayName.split(' ')[0],
      LastName: user.displayName.split(' ')[1],
      Email: user.email
     })
     user.getIdToken().then((accessToken) => {
      document.getElementById('Name').value = this.state.Name
      document.getElementById('LastName').value = this.state.LastName
      document.getElementById('ResetPassword').addEventListener('click', () => {
       firebase.auth().sendPasswordResetEmail(this.state.Email).then(() => {

       }).catch(function (error) {
        console.log(error)
       })
      })
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
 }
 render() {
  return (
   <div className='Account-Detail' >
    <h1>Welcome</h1>
    <p>To continue please fill fields</p>
    <div className='Account-Name'>
     <label htmlFor='Name'>Name:</label>
     <Input name='Name' id='Name' placeholder='First Name' />
     <label htmlFor='LastName'>Last-Name:</label>
     <Input name='LastName' id='LastName' placeholder='Last Name' />
     <label htmlFor='Email'>E-mail:</label>
     <Input name='Email' id='Email' placeholder='E-Mail' />
     <Input name='Avatar' id='Avatar' type='file' />
     <button className='Buttom-ResetPassword Button' id='ResetPassword'>Reset password</button>
    </div>
   </div>
  )
 }

}

export default LoginStatus;