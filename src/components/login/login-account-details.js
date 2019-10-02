import React from 'react';

import * as firebase from 'firebase/app';
import Input from '../callback/input/input'
import SomethingError from '../errors/error/error'
import ClipLoader from 'react-spinners/ClipLoader';

import 'firebase/firebase-firestore';
import 'firebaseui/dist/firebaseui.css';

function Account(Loading) {
 if (Loading) {
  return (
   <ClipLoader sizeUnit={'px'}
    size={200}
    color={'gray'}
    loading={Loading} />
  )
 }
 else {
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


class LoginAccountDetail extends React.Component {
 constructor(props) {
  super(props)
  this.state = {
   Name: '',
   LastName: '',
   Email: '',
   Avatar: '',
   Phone: '',
   Loading: false
  }
 }


 async componentDidMount() {
  if (this.props.location.state.Token) {
   this.setState({
    Loading: true
   })
   var user;
   await fetch('http://localhost:5000/my-app-dd6a6/us-central1/author?id=' + this.props.location.state.Token)
    .then(async (response) => {
     await response.json()
      .then((response) => {
       this.setState({
        Name: response.displayName.split(' ')[0],
        LastName: response.displayName.split(' ')[1],
        Email: response.email,
       })
       console.log(response.displayName)

      })
    })
   this.setState({
    Loading: false
   })
   document.getElementById('Name').value = this.state.Name
   document.getElementById('LastName').value = this.state.LastName
   document.getElementById('Email').value = this.state.Email

   document.getElementById('ResetPassword').addEventListener('click', () => {
    firebase.auth().sendPasswordResetEmail(this.state.Email).then(() => {

    }).catch(function (error) {
     console.log(error)
    })
   })
  }

 };
 render() {
  var user = !!this.props.location.state ? this.props.location.state.Token : false
  return (
   <div className="Account-Details">
    {
     !!user ?
      user = Account(this.state.Loading) :
      <SomethingError />
    }
   </div>
  )
 }
}

export default LoginAccountDetail;