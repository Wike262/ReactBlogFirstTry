import React from 'react';

import * as firebase from 'firebase/app';
import Input from '../callback/input/input'
import SomethingError from '../errors/error/error'
import ClipLoader from 'react-spinners/ClipLoader';
import { FaFileImage } from "react-icons/fa";

import 'firebase/firebase-firestore';
import 'firebaseui/dist/firebaseui.css';
import './account-details.sass'

var NoPhoto = 'https://firebasestorage.googleapis.com/v0/b/my-app-dd6a6.appspot.com/o/Images%2Fnophoto.jpg?alt=media&token=764110c3-1272-46e2-834b-3a15a82fc9aa'


function AvatarUpdate() {
 console.log(document.getElementById('Avatar').files[0])
 var reader = new FileReader();

 reader.onload = function (e) {
  document.getElementById('AvatarPhoto').src = e.target.result;
 };

 reader.readAsDataURL(document.getElementById('Avatar').files[0]);
}

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
   <>
    <h1>Welcome</h1>
    <p>To continue please fill fields</p>
    <form className='Account-Info'>
     <label className='Account-Info-Label Label' htmlFor='Name'>Name:</label>
     <Input name='Name' id='Name' placeholder='First Name' />
     <label className='Account-Info-Label Label' htmlFor='LastName'>Last-Name:</label>
     <Input name='LastName' id='LastName' placeholder='Last Name' />
     <label className='Account-Info-Label Label' htmlFor='Email'>E-mail:</label>
     <Input name='Email' id='Email' placeholder='E-Mail' />
     <div className="Avatar-Wrapper">
      Avatar:
     <label className='Account-Info-Label Avatar-Label Label' htmlFor='Avatar'>
       <img className='Account-AvatarPhoto' id='AvatarPhoto' alt='Avatar' />
       <div className="Input-Button"><FaFileImage style={{ marginRight: '10px' }} />Сhoose file</div>
       <Input name='Avatar' id='Avatar' type='file' accept='image/x-png,image/gif,image/jpeg' />
      </label>

     </div>

     <button className='Buttom-ResetPassword Button' id='ResetPassword'>Reset password</button>
    </form>
   </>
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
   });
   await fetch('http://localhost:5000/my-app-dd6a6/us-central1/author?id=' + this.props.location.state.Token)
    .then(async (response) => {
     await response.json()
      .then((response) => {
       this.setState({
        Name: response.displayName.split(' ')[0],
        LastName: response.displayName.split(' ')[1],
        Email: response.email,
        Avatar: response.photoURL,
       });
      });
    });
   this.setState({
    Loading: false
   });
   document.getElementById('Name').value = this.state.Name;

   document.getElementById('LastName').value = this.state.LastName;
   document.getElementById('Email').value = this.state.Email;
   document.getElementById('AvatarPhoto').src = (!!this.state.Avatar ? this.state.Avatar : NoPhoto);

   document.getElementById('Avatar').addEventListener('change', AvatarUpdate);

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