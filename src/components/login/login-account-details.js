import React from 'react';

import * as firebase from 'firebase/app';
import 'firebase/firestore';
import Input from '../callback/input/input'
import SomethingError from '../errors/error/error'
import ClipLoader from 'react-spinners/ClipLoader';
import { FaFileImage } from 'react-icons/fa';
import { FaCogs } from 'react-icons/fa';


import 'firebase/firebase-firestore'
import 'firebase/storage'
import 'firebaseui/dist/firebaseui.css';
import './account-details.sass'
import './account-details-mobile.sass'

var NoPhoto = 'https://firebasestorage.googleapis.com/v0/b/my-app-dd6a6.appspot.com/o/Images%2Fnophoto.jpg?alt=media&token=764110c3-1272-46e2-834b-3a15a82fc9aa'


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
    <p>It's all off your information</p>
    <form className='Account-Info'>
     <div className='Account-Role Role' id='Role'></div>

     <label className='Account-Info-Label Label' htmlFor='Name'>Name:</label>
     <Input name='Name' id='Name' placeholder='First Name' />

     <label className='Account-Info-Label Label' htmlFor='LastName'>Last-Name:</label>
     <Input name='LastName' id='LastName' placeholder='Last Name' />

     <label className='Account-Info-Label Label' htmlFor='Email'>E-mail:</label>
     <Input name='Email' id='Email' placeholder='E-Mail' />

     <label className='Account-Info-Label Label' htmlFor='Phone'>Phone:</label>
     <Input name='Phone' id='Phone' placeholder='Phone' />

     <div className='Avatar-Wrapper'>
      Avatar:
     <label className='Account-Info-Label Avatar-Label Label' htmlFor='Avatar'>
       <img className='Account-AvatarPhoto' id='AvatarPhoto' alt='Avatar' />
       <div className='Input-Button Button'><FaFileImage style={{ marginRight: '10px' }} />Сhoose file</div>
       <Input name='Avatar' id='Avatar' type='file' accept='image/x-png,image/gif,image/jpeg' />
      </label>

     </div>
     {/* Buttons from Firebase to manage user account */}
     <button className='Buttom-ResetPassword Button' id='ResetPassword'><FaCogs style={{ marginRight: '10px' }} />Reset password</button>
     {/*  */}

     <div className="Submit-Wrapper">
      <button type='Submit' className='Submit-Button Button' id='Submit'>Submit</button>
     </div>
    </form>
   </>
  )
 }

}


class LoginAccountDetail extends React.Component {
 constructor(props) {
  super(props)
  this.state = {
   Name: '', //User account information
   LastName: '', //
   Email: '', //
   Avatar: '', //
   Phone: '', //
   Admin: false, //User privilages 
   Author: false, //
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
        Phone: response.phoneNumber,
       });
      });
    });
   await firebase.auth().currentUser.getIdTokenResult().then((idTokenResult) => {
    this.setState({
     Admin: !!idTokenResult.claims.admin,
     Author: !!idTokenResult.claims.author,
    })
   })
   this.setState({
    Loading: false
   });
   document.getElementById('Name').value = this.state.Name;
   document.getElementById('LastName').value = this.state.LastName;
   document.getElementById('Email').value = this.state.Email;
   document.getElementById('Phone').value = this.state.Phone;
   document.getElementById('AvatarPhoto').src = (!!this.state.Avatar ? this.state.Avatar : NoPhoto);

   if (this.state.Admin) {
    document.getElementById('Role').innerHTML = 'You\'r status is: administator'
    document.getElementById('Role').classList.add('AdminRole')
   } else {
    if (this.state.Author) {
     document.getElementById('Role').innerHTML = 'You\'r status is: author'
     document.getElementById('Role').classList.add('AuthorRole')
    }
   }
   // 
   document.getElementById('Submit').addEventListener('click', (e) => {
    e.preventDefault()
    let name = this.state.Name === document.getElementById('Name').value ? 0 : document.getElementById('Name').value;

    let lastName = this.state.LastName === document.getElementById('LastName').value ? 0 : document.getElementById('LastName').value;

    let phone = this.state.Phone === document.getElementById('Phone').value ? 0 : document.getElementById('Phone').value;

    let email = this.state.Email === document.getElementById('Email').value ? 0 : document.getElementById('Email').value;
    if (name !== 0 || lastName !== 0) {
     var nameFULL = document.getElementById('Name').value + ' ' + document.getElementById('LastName').value;
    }
    else {
     nameFULL = 0
    }
    fetch('http://localhost:5000/my-app-dd6a6/us-central1/updateUserInformation?id=' + this.props.location.state.Token + '&name=' + nameFULL + '&phone=' + phone + '&email=' + email + '&avatarURL=0')
     .then((response) => {
     })
   })
   document.getElementById('Avatar').addEventListener('change', (e) => {
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onload = function (e) {
     document.getElementById('AvatarPhoto').src = e.target.result;
    };
    reader.readAsDataURL(document.getElementById('Avatar').files[0]);
    let rand = Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2);
    let fileName = rand
    let fileType = file.name.slice(file.name.indexOf('.'))
    let storageREF = firebase.storage().ref('profilePictures/' + rand + fileType);
    let task = storageREF.put(file);
    task.on('state_changed', () => { }, () => { }, () => {
     task.snapshot.ref.getDownloadURL().then((downloadURL) => {
      fetch('http://localhost:5000/my-app-dd6a6/us-central1/updateUserInformation?id=' + this.props.location.state.Token + '&name=0&phone=0&email=0&avatarURL=' + fileName + fileType)
       .then((response) => {
       })
     });
    })


   });
   document.getElementById('ResetPassword').addEventListener('click', () => {
    firebase.auth().sendPasswordResetEmail(this.state.Email)
     .then(() => { })
     .catch(function (error) { console.log(error) })
   })
  }
 };

 render() {
  var user = !!this.props.location.state ? this.props.location.state.Token : false
  return (
   <div className='Account-Details'>
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