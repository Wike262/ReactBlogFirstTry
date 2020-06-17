import React from 'react';
import Input from './input/input';
import './callback.sass';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import firebase from 'firebase/app';
import 'firebase/functions';
const MySwal = withReactContent(Swal);

const callback = () => {
 return (
  <form className='Callback'>
   <Input placeholder='Ваше имя' name='Name' id='Name' />
   <Input type='email' placeholder='Ваш Email' name='Email' id='Email' />
   <Input placeholder='Ваш телефон' name='Subject' id='Subject' />
   <Input
    type='textarea'
    placeholder='Ваше сообщение'
    name='Message'
    id='Message'
   />
   <button
    className='Callback-Button Button Button-Submit'
    onClick={(e) => {
     e.preventDefault();
     MySwal.fire({
      title: 'Загрузка',
      onOpen: () => {
       MySwal.showLoading();
      },
     });
     let name = document.getElementById('Name').value;

     let phone = document.getElementById('Subject').value;

     let email = document.getElementById('Email').value;

     let message = document.getElementById('Message').value;
     firebase
      .functions()
      .httpsCallable('sendMail')({
       email,
       name,
       phone,
       message,
      })
      .then((result) => {
       if (!!result.data) {
        MySwal.fire({
         title: 'Обновновление успешно',
         icon: 'success',
        }).then((result) => {
         if (result.value) {
          window.location.reload();
         }
        });
       } else {
        MySwal.fire({
         icon: 'error',
         title: 'Что-то пошло не так!',
        });
       }
      });
    }}
   >
    Отправить сообщение
   </button>
  </form>
 );
};

export default callback;
