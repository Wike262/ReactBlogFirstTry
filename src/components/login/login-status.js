import React from 'react';

import ClipLoader from 'react-spinners/ClipLoader';
import { FaSignOutAlt } from 'react-icons/fa';
import { IoIosSettings } from 'react-icons/io';
import { Link } from 'react-router-dom'
import * as firebase from 'firebase/app';

import 'firebase/firebase-firestore';
import 'firebaseui/dist/firebaseui.css';
import './login-status.sass'

var noPhoto = 'https://firebasestorage.googleapis.com/v0/b/my-app-dd6a6.appspot.com/o/Images%2Fnophoto.jpg?alt=media&token=764110c3-1272-46e2-834b-3a15a82fc9aa';

class LoginStatus extends React.Component {
 constructor(props) {
  super(props)
  this.state = {
   Auth: '',
   Token: '',
   Avatar: '',
   Name: '',
   Loading: true
  }
 }


 componentDidMount() {
  firebase.initApp = () => {
   firebase.auth().onAuthStateChanged((user) => {
    if (user) {
     user.getIdToken().then((accessToken) => {
      this.setState({
       Auth: true,
       Token: user.uid,
       Avatar: user.photoURL,
       Name: user.displayName,
       Loading: false
      })
      document.querySelector('.SingInOut').addEventListener('click', () => {
       firebase.auth().signOut();
      })
     });
    } else {
     this.setState({
      Auth: false.Auth,
      Token: null,
      Avatar: null,
      Name: null,
      Loading: false
     })
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
   this.state.Loading ?
    <ClipLoader sizeUnit={'px'}
     size={70}
     color={'gray'}
     loading={this.state.Loading} />
    :
    <div className='Account'>
     <div className='Account-Status Status'>
      <div className='Account-Wrapper Wrapper'>
       <Link to={'/author/' + this.state.Token}>
        {this.state.Auth && <img className='Account-Avatar' src={
         !!this.state.Avatar ?
          this.state.Avatar
          :
          noPhoto
        } alt='' />}
       </Link>
       <div className="Wrapper">
        <h3 className='Account-Name Name'>{this.state.Auth ? this.state.Name : ''}</h3>
        <div className="Account-Wrapper Wrapper">
         <Link to={this.state.Auth ? '/' : '/login'} className='Account-SingInOut SingInOut'>
          {this.state.Auth ?
           'Sign Out ' : 'Sign In '}
          <FaSignOutAlt />
         </Link>
         <Link to={{
          pathname: '/account-details',
          state: {
           Token: this.state.Token
          }
         }} className='Account-Settings Settings'>
          {this.state.Auth ?
           <div className='Wrapper' >Settigns <IoIosSettings /></div>
           : ''}
         </Link>
        </div>
       </div>
      </div>
     </div>
    </div>
  )
 }
}

export default LoginStatus;