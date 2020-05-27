import React from 'react';

import ClipLoader from 'react-spinners/ClipLoader';
import { FaSignOutAlt } from 'react-icons/fa';
import { IoIosSettings } from 'react-icons/io';
import { Link } from 'react-router-dom';
import firebase from 'firebase/app';

import 'firebase/firebase-firestore';
import 'firebaseui/dist/firebaseui.css';
import './_status.sass';
import './_status-mobile.sass';

var noPhoto =
 'https://firebasestorage.googleapis.com/v0/b/my-app-dd6a6.appspot.com/o/Images%2Fnophoto.jpg?alt=media&token=764110c3-1272-46e2-834b-3a15a82fc9aa';

class LoginStatus extends React.Component {
 constructor(props) {
  super(props);
  this.state = {
   author: {},
   auth: '',
   token: '',
   avatar: '',
   name: '',
   admin: '',
   role: '',
   loading: true,
  };
 }

 singOut() {
  firebase.auth().signOut();
 }

 componentDidMount() {
  firebase.auth().onAuthStateChanged(
   (user) => {
    if (user) {
     user.getIdToken().then((accessToken) => {
      let userHandler = {
       photoURL: user.photoURL,
       displayName: user.displayName,
      };
      this.setState({
       author: userHandler,
       auth: true,
       token: user.uid,
       avatar: user.photoURL,
       name: user.displayName,
       loading: false,
      });
      document.querySelector('.SingInOut').addEventListener('click', () => {});
      firebase
       .auth()
       .currentUser.getIdTokenResult()
       .then((idTokenResult) => {
        this.setState({
         role: !!idTokenResult.claims.admin
          ? 'admin'
          : '' || !!idTokenResult.claims.author
          ? 'author'
          : '' || 'user',
        });
       });
     });
    } else {
     this.setState({
      auth: false.auth,
      toke: null,
      avatar: null,
      name: null,
      loading: false,
     });
    }
   },
   function (error) {
    console.log(error);
   },
  );
 }

 render() {
  return this.state.loading ? (
   <ClipLoader
    sizeUnit={'px'}
    size={70}
    color={'gray'}
    loading={this.state.loading}
   />
  ) : (
   <div className='Account'>
    <div className='Account-Status Status'>
     <div className='Account-Wrapper Wrapper'>
      <Link
       to={{
        pathname: `/authors/${this.state.token}`,
        state: {
         author: this.state.author,
        },
       }}
      >
       {this.state.auth && (
        <img
         className='Account-Avatar'
         src={!!this.state.avatar ? this.state.avatar : noPhoto}
         alt=''
        />
       )}
      </Link>
      <div className='Wrapper'>
       <h3 className='Account-Name Name'>
        {this.state.auth ? this.state.name : ''}
       </h3>
       <div className='Account-Wrapper Wrapper'>
        <Link
         onClick={this.singOut}
         to={this.state.auth ? '/' : '/login'}
         className='Account-SingInOut SingInOut'
        >
         {this.state.auth ? 'Выйти ' : 'Войти '}
         <FaSignOutAlt />
        </Link>
        <Link
         to={{
          pathname: '/account-details',
          state: {
           Token: this.state.token,
          },
         }}
         className='Account-Settings Settings'
        >
         {this.state.auth ? (
          <div className='Wrapper'>
           Настройки <IoIosSettings />
          </div>
         ) : (
          ''
         )}
        </Link>
       </div>
      </div>
     </div>
    </div>
    {this.state.role === 'admin' ? (
     <div className='Account-LinkToAdmin Link'>
      <Link to='/admin'>Администрирование</Link>
     </div>
    ) : (
     ''
    )}
   </div>
  );
 }
}

export default LoginStatus;
