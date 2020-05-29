import * as React from 'react';

import 'firebase/firestore';
import Input from '../../callback/input/input';
import ClipLoader from 'react-spinners/ClipLoader';
import { FaFileImage } from 'react-icons/fa';
import { FaCogs } from 'react-icons/fa';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import firebase from 'firebase';
import 'firebase/firebase-firestore';
import 'firebase/storage';
import 'firebaseui/dist/firebaseui.css';
import './account-details.sass';
import './account-details-mobile.sass';

const MySwal = withReactContent(Swal);

class LoginAccountDetail extends React.Component {
 constructor(props) {
  super(props);
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
   error: false,
  };
 }

 componentDidMount() {
  firebase
   .functions()
   .httpsCallable('author')({ id: this.props.location.state.Token })
   .then((result) => {
    this.setState({
     name: result.data.displayName.split(' ')[0],
     lastName: result.data.displayName.split(' ')[1],
     email: result.data.email,
     photo: result.data.photoURL,
     phoneNumber: result.data.phoneNumber,
    });
   })
   .then((result) => {
    firebase.auth().onAuthStateChanged((user) => {
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
        loading: false,
       });
      });
    });
   });
 }

 updateInformation(e) {
  e.preventDefault();
  let name =
   this.state.name === document.getElementById('Name').value
    ? false
    : document.getElementById('Name').value;

  let lastName =
   this.state.lastName === document.getElementById('LastName').value
    ? false
    : document.getElementById('LastName').value;

  let phone =
   this.state.phoneNumber === document.getElementById('Phone').value
    ? false
    : document.getElementById('Phone').value;

  let email =
   this.state.email === document.getElementById('Email').value
    ? false
    : document.getElementById('Email').value;
  if (name !== false || lastName !== false) {
   var fullName =
    document.getElementById('Name').value +
    ' ' +
    document.getElementById('LastName').value;
  } else {
   fullName = false;
  }
  MySwal.fire({
   title: 'Загрузка',
   onOpen: () => {
    MySwal.showLoading();
   },
  });
  firebase
   .functions()
   .httpsCallable('updateUserInformation')({
    uid: this.props.location.state.Token,
    name: fullName,
    phone: phone,
    email: email,
   })
   .then((result) => {
    if (!!result.data.displayName) {
     this.setState({
      name: result.data.displayName.split(' ')[0],
      lastName: result.data.displayName.split(' ')[1],
      email: result.data.email,
      photo: result.data.photoURL,
      phoneNumber: result.data.phoneNumber,
     });
     if (this.state.photo !== document.getElementById('AvatarPhoto').src) {
      this.updateAvatar();
     } else {
      MySwal.fire({
       title: 'Обновление успешно',
       icon: 'success',
      });
     }
    } else {
     console.error(result.data);
     MySwal.fire({
      icon: 'error',
      title: 'Что-то пошло не так!',
     });
    }
   });
 }

 updateAvatar() {
  let reader = new FileReader();
  let file = document.getElementById('Avatar').files[0];
  reader.onload = function (e) {
   document.getElementById('AvatarPhoto').src = e.target.result;
  };
  reader.readAsDataURL(document.getElementById('Avatar').files[0]);
  let fileName =
   Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2);
  let fileType = file.name.slice(file.name.indexOf('.'));
  let storageREF = firebase
   .storage()
   .ref('profilePictures/' + fileName + fileType);
  let task = storageREF.put(file);
  task.on(
   'state_changed',
   () => {},
   () => {},
   () => {
    task.snapshot.ref.getDownloadURL().then((downloadURL) => {
     firebase
      .functions()
      .httpsCallable('updateUserInformation')({
       uid: this.props.location.state.Token,
       avatarURL: downloadURL,
      })
      .then((result) => {
       if (!!result.data.displayName) {
        this.setState({
         name: result.data.displayName.split(' ')[0],
         lastName: result.data.displayName.split(' ')[1],
         email: result.data.email,
         photo: result.data.photoURL,
         phoneNumber: result.data.phoneNumber,
         popup: true,
        });
        MySwal.fire({
         title: 'Обновновление успешно',
         icon: 'success',
        });
       } else {
        console.error(result.data);
        MySwal.fire({
         icon: 'error',
         title: 'Что-то пошло не так!',
        });
       }
      });
    });
   },
  );
 }

 updatePhoto(e) {
  let reader = new FileReader();
  reader.onload = (e) =>
   (document.getElementById('AvatarPhoto').src = e.target.result);
  reader.readAsDataURL(document.getElementById('Avatar').files[0]);
 }

 resetPassword() {
  firebase
   .auth()
   .sendPasswordResetEmail(this.state.email)
   .then(() => {})
   .catch((error) => console.error(error));
 }

 render() {
  return (
   <div className='Account-Details'>
    {!!this.state.loading ? (
     <div className='Handler-Loading'>
      <ClipLoader size={70} color={'gray'} loading={this.state.loading} />
     </div>
    ) : (
     <>
      <form className='Account-Info row '>
       <div className='Welcome  col-12 '>
        <div>
         <h1>Привет</h1>
         <p>Здесь находится вся информация о тебе</p>
        </div>
        <div className={`Account-Role Role ${this.state.role}`} id='Role'>
         Твой уровень доступа:{' '}
         {this.state.role === 'admin'
          ? 'Администратор'
          : this.state.role === 'author'
          ? 'Автор'
          : 'Пользователь'}
        </div>
       </div>

       <label
        className='Account-Info-Label Label col-12 col-lg-6'
        htmlFor='Name'
       >
        Имя:
        <Input
         value={this.state.name}
         name='Name'
         id='Name'
         placeholder='First Name'
        />
       </label>

       <label
        className='Account-Info-Label Label col-12 col-lg-6'
        htmlFor='LastName'
       >
        Фамилия:
        <Input
         value={this.state.lastName}
         name='LastName'
         id='LastName'
         placeholder='Last Name'
        />
       </label>

       <label
        className='Account-Info-Label Label col-12 col-lg-6'
        htmlFor='Email'
       >
        E-mail:
        <Input
         value={this.state.email}
         name='Email'
         id='Email'
         placeholder='E-Mail'
        />
       </label>

       <label
        className='Account-Info-Label Label col-12 col-lg-6'
        htmlFor='Phone'
       >
        Телефон:
        <Input
         value={this.state.phoneNumber}
         name='Phone'
         id='Phone'
         placeholder='Phone'
        />
       </label>

       <div className='Avatar-Wrapper col-12 col-lg-6'>
        Аватарка:
        <label
         className='Account-Info-Label Avatar-Label Label'
         htmlFor='Avatar'
        >
         <img
          className='Account-AvatarPhoto'
          id='AvatarPhoto'
          alt='Avatar'
          src={this.state.photo}
         />
         <div className='Input-Button Button'>
          <FaFileImage style={{ marginRight: '10px' }} />
          Выберите файл
         </div>
         <input
          name='Avatar'
          id='Avatar'
          type='file'
          accept='image/x-png,image/gif,image/jpeg'
          onChange={(e) => this.updatePhoto(e)}
         />
        </label>
       </div>
       {/* Buttons from Firebase to manage user account */}
       <div className='Buttons col-lg-4'>
        <button
         className='Buttom-ResetPassword Button'
         onClick={this.resetPassword}
         id='ResetPassword'
        >
         <FaCogs style={{ marginRight: '10px' }} />
         Сбросить пароль
        </button>
        {/*  */}
       </div>
       <div className='Submit-Wrapper'>
        <button
         type='Submit'
         onClick={(e) => this.updateInformation(e)}
         className='Submit-Button Button'
         id='Submit'
        >
         Подтвердить
        </button>
       </div>
      </form>
     </>
    )}
   </div>
  );
 }
}

export default LoginAccountDetail;
