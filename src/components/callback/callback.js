import React from 'react';
import Input from './input/input';
import './callback.sass';

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
   <button className='Callback-Button Button Button-Submit'>
    Отправить сообщение
   </button>
  </form>
 );
};

export default callback;
