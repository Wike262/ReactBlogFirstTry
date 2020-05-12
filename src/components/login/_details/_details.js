import * as React from 'react';

import 'firebase/firestore';
import Input from '../../callback/input/input'
import ClipLoader from 'react-spinners/ClipLoader';
import { FaFileImage } from 'react-icons/fa';
import { FaCogs } from 'react-icons/fa';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import * as firebase from 'firebase'
import 'firebase/firebase-firestore'
import 'firebase/storage'
import 'firebaseui/dist/firebaseui.css';
import './account-details.sass'
import './account-details-mobile.sass'


const MySwal = withReactContent(Swal)


class LoginAccountDetail extends React.Component {
 constructor(props) {
  super(props)
  this.state = {
   name: '', //User account information
   lastName: '', //
   email: '', //
   photo: '', //
   phoneNumber: '', //
   role: false, //User privilages 
   loading: true,
   popup: false,
   response: false,
   error: false
  }
 }


 componentDidMount() {
  firebase.functions().httpsCallable('author')({ id: this.props.location.state.Token })
   .then(result => {
    this.setState({
     name: result.data.displayName.split(' ')[0],
     lastName: result.data.displayName.split(' ')[1],
     email: result.data.email,
     photo: result.data.photoURL,
     phoneNumber: result.data.phoneNumber,
    });
   })
   .then(result => {
    firebase.auth().onAuthStateChanged((user) => {
     firebase.auth().currentUser.getIdTokenResult()
      .then((idTokenResult) => {
       this.setState({
        role: !!idTokenResult.claims.admin ? 'admin' : '' || !!idTokenResult.claims.author ? 'author' : '' || 'user',
        loading: false,
       })
      })
    })
   })
 }

 updateInformation(e) {
  e.preventDefault()
  let name = this.state.name === document.getElementById('Name').value ? false : document.getElementById('Name').value;

  let lastName = this.state.lastName === document.getElementById('LastName').value ? false : document.getElementById('LastName').value;

  let phone = this.state.phoneNumber === document.getElementById('Phone').value ? false : document.getElementById('Phone').value;

  let email = this.state.email === document.getElementById('Email').value ? false : document.getElementById('Email').value;
  if (name !== false || lastName !== false) {
   var fullName = document.getElementById('Name').value + ' ' + document.getElementById('LastName').value;
  }
  else {
   fullName = false
  }
  MySwal.fire({
   title: 'Loading',
   onOpen: () => {
    MySwal.showLoading()
   }
  })
  firebase.functions().httpsCallable('updateUserInformation')({ uid: this.props.location.state.Token, name: fullName, phone: phone, email: email })
   .then(result => {
    if (!!result.data.displayName) {
     this.setState({
      name: result.data.displayName.split(' ')[0],
      lastName: result.data.displayName.split(' ')[1],
      email: result.data.email,
      photo: result.data.photoURL,
      phoneNumber: result.data.phoneNumber,
     })
     if (this.state.photo !== document.getElementById('AvatarPhoto').src) {
      this.updateAvatar()
     }
     else {
      MySwal.fire({
       title: 'Update Successful',
       icon: 'success'
      })
     }
    }
    else {
     console.error(result.data)
     MySwal.fire({
      icon: 'error',
      title: 'Something went wrong!',
     })
    }
   })

 }

 updateAvatar() {
  let reader = new FileReader();
  let file = document.getElementById('Avatar').files[0];
  reader.onload = function (e) {
   document.getElementById('AvatarPhoto').src = e.target.result;
  };
  reader.readAsDataURL(document.getElementById('Avatar').files[0]);
  let fileName = Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2);
  let fileType = file.name.slice(file.name.indexOf('.'))
  let storageREF = firebase.storage().ref('profilePictures/' + fileName + fileType);
  let task = storageREF.put(file);
  task.on('state_changed', () => { }, () => { }, () => {
   task.snapshot.ref.getDownloadURL().then((downloadURL) => {
    firebase.functions().httpsCallable('updateUserInformation')({ uid: this.props.location.state.Token, avatarURL: downloadURL })
     .then(result => {
      if (!!result.data.displayName) {
       this.setState({
        name: result.data.displayName.split(' ')[0],
        lastName: result.data.displayName.split(' ')[1],
        email: result.data.email,
        photo: result.data.photoURL,
        phoneNumber: result.data.phoneNumber,
        popup: true
       })
       MySwal.fire({
        title: 'Update Successful',
        icon: 'success'
       })
      }
      else {
       console.error(result.data)
       MySwal.fire({
        icon: 'error',
        title: 'Something went wrong!',
       })
      }
     })
   });
  })
 }

 updatePhoto(e) {
  let reader = new FileReader();
  reader.onload = (e) => document.getElementById('AvatarPhoto').src = e.target.result;
  reader.readAsDataURL(document.getElementById('Avatar').files[0]);
 }

 resetPassword() {
  firebase.auth().sendPasswordResetEmail(this.state.email)
   .then(() => { })
   .catch(error => console.error(error))
 }

 render() {
  return (
   <div className='Account-Details' >
    {
     !!this.state.loading ? <ClipLoader
      size={70}
      color={"gray"}
      loading={this.state.loading} /> : (
       <>
        <h1>Welcome</h1>
        <p>It's all off your information</p>
        <form className='Account-Info'>
         <div className={`Account-Role Role ${this.state.role}`} id='Role'>You'r status is: {this.state.role}</div>

         <label className='Account-Info-Label Label' htmlFor='Name'>Name:</label>
         <Input value={this.state.name} name='Name' id='Name' placeholder='First Name' />

         <label className='Account-Info-Label Label' htmlFor='LastName'>Last-Name:</label>
         <Input value={this.state.lastName} name='LastName' id='LastName' placeholder='Last Name' />

         <label className='Account-Info-Label Label' htmlFor='Email'>E-mail:</label>
         <Input value={this.state.email} name='Email' id='Email' placeholder='E-Mail' />

         <label className='Account-Info-Label Label' htmlFor='Phone'>Phone:</label>
         <Input value={this.state.phoneNumber} name='Phone' id='Phone' placeholder='Phone' />

         <div className='Avatar-Wrapper'>
          Avatar:
         <label className='Account-Info-Label Avatar-Label Label' htmlFor='Avatar'>
           <img className='Account-AvatarPhoto' id='AvatarPhoto' alt='Avatar' src={this.state.photo} />
           <div className='Input-Button Button'><FaFileImage style={{ marginRight: '10px' }} />Сhoose file</div>
           <input name='Avatar' id='Avatar' type='file' accept='image/x-png,image/gif,image/jpeg' onChange={e => this.updatePhoto(e)} />
          </label>

         </div>
         {/* Buttons from Firebase to manage user account */}
         <button className='Buttom-ResetPassword Button' onClick={this.resetPassword} id='ResetPassword'><FaCogs style={{ marginRight: '10px' }} />Reset password</button>
         {/*  */}

         <div className="Submit-Wrapper">
          <button type='Submit' onClick={e => this.updateInformation(e)} className='Submit-Button Button' id='Submit'>Submit</button>
         </div>
        </form>
       </>
      )
    }
   </div>
  )
 }
}

export default LoginAccountDetail;