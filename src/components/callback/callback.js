import React from 'react';
import Input from './input/input'
import './callback.sass'

const callback = () => {
 return (
  <form className='Callback'>
   <Input placeholder='Your Name' name='Name' id='Name' />
   <Input type='email' placeholder='Your Email' name='Email' id='Email' />
   <Input placeholder='Your Subject' name='Subject' id='Subject' />
   <Input type='textarea' placeholder='Message' name='Message' id='Message' />
   <button className='Callback-Button Button Button-Submit'>Send message</button>
  </form>
 )
}

export default callback;