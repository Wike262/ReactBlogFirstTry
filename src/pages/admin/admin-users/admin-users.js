import React from 'react';
import firebase from 'firebase/app';
import 'firebase/functions';
import ClipLoader from 'react-spinners/ClipLoader';
import { FaPen } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';
import { FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

class AllUsers extends React.Component {
 constructor(props) {
  super(props);
  this.state = {
   users: [],
   loading: true,
  };
  this.Rows = this.Rows.bind(this);
 }
 componentDidMount() {
  firebase
   .functions()
   .httpsCallable('allUsers')({
    all: true,
   })
   .then((result) => {
    this.setState({
     users: result.data,
     loading: false,
    });
   });
 }
 Rows() {
  let row = [];
  for (let [key, value] of Object.entries(this.state.users)) {
   console.log(value);
   row.push(
    <tr
     key={key}
     data-name={value.displayName}
     data-img={value.photoURL}
     data-email={value.email}
     data-id={value.uid}
     data-role={
      !!value.customClaims.admin
       ? 'admin'
       : !!value.customClaims.author
       ? 'author'
       : 'user'
     }
    >
     <td>{value.displayName}</td>
     <td>{value.email}</td>
     <td>{value.uid}</td>
     <td>{`${!!value.disabled ? 'да' : 'нет'}`}</td>
     <td className='Edits'>
      <FaPen onClick={this.openEditPopup} />{' '}
      <FaTrashAlt onClick={this.openDeletePopup} />
     </td>
    </tr>,
   );
  }
  return row;
 }
 openDeletePopup(e) {
  let data = !!e.target.parentNode.parentNode.dataset.tag
   ? e.target.parentNode.parentNode.dataset
   : e.target.parentNode.parentNode.parentNode.dataset;
  document.getElementById('delete-user-id').innerHTML = data.id;
  document.body.classList.add('Background');
  document.querySelector('.Popup-Delete').classList.add('PopupDeleteOpen');
 }

 openEditPopup(e) {
  document.body.classList.add('Background');
  document.querySelector('.Popup').classList.add('PopupOpen');
  let data = !!e.target.parentNode.parentNode.dataset.tag
   ? e.target.parentNode.parentNode.dataset
   : e.target.parentNode.parentNode.parentNode.dataset;
  document.getElementById('name').value = data.name;
  document.getElementById('img').value = data.img;
  document.getElementById('email').value = data.email;
  document.getElementById('role').value = data.role;
  document.getElementById('user-id').innerHTML = data.id;
 }
 render() {
  return (
   <div className='Admin-ListAllUsers'>
    <div className='Popup'>
     <h1>
      Редактирование пользователя <span id='user-id'></span>
     </h1>
     <button
      className='Close-Popup'
      onClick={() => {
       document.body.classList.remove('Background');
       document.querySelector('.Popup').classList.remove('PopupOpen');
       document
        .querySelectorAll('.Tags-Buttons')
        .forEach((item) => item.classList.remove('Tags-Buttons-Selected'));
      }}
     >
      <FaTimes />
     </button>

     <label>
      Имя:
      <input
       className='Callback-Input Input'
       type='text'
       placeholder='Имя *'
       id='name'
      />
     </label>
     <label>
      Email:
      <input
       className='Callback-Input Input'
       type='text'
       placeholder='Email *'
       id='email'
      />
     </label>
     <label>
      Картинка:
      <input
       className='Callback-Input Input'
       type='text'
       placeholder='Ссылка на картинку *'
       id='img'
      />
     </label>

     <label>
      Права доступа:
      <input
       className='Callback-Input Input'
       type='text'
       placeholder='Права доступа *'
       id='role'
      />
     </label>
     <button onClick={this.editSubmit} className='Button-Submit'>
      Подтвердить
     </button>
    </div>
    <div className='Popup-Delete'>
     <h1>
      Вы уверены что хотите удалить пользователя{' '}
      <span id='delete-user-id'></span>?
     </h1>
     <button
      className='Close-Popup-Delete'
      onClick={() => {
       document.body.classList.remove('Background');

       document
        .querySelector('.Popup-Delete')
        .classList.remove('PopupDeleteOpen');
      }}
     >
      <FaTimes />
     </button>
     <div className='Buttons-Wrapper'>
      <button
       onClick={() => {
        document.body.classList.remove('Background');
        document
         .querySelector('.Popup-Delete')
         .classList.remove('PopupDeleteOpen');
       }}
       className='Button-Cancel'
      >
       Отменить
      </button>
      <button onClick={this.deleteSubmit} className='Button-Submit'>
       Подтвердить
      </button>
     </div>
    </div>
    {this.state.loading ? (
     <ClipLoader size={70} color={'gray'} loading={this.state.loading} />
    ) : (
     <table>
      <thead>
       <tr>
        <th>Имя:</th>
        <th>E-mail:</th>
        <th>Id:</th>
        <th>Отключен:</th>
        <th>Действия:</th>
       </tr>
      </thead>
      <tbody>
       <this.Rows />
      </tbody>
     </table>
    )}
   </div>
  );
 }
}
export default AllUsers;
