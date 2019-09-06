import React from 'react';
import Input from './input/input'
import './callback.sass'

const callback = () => {
 return (
  <form className='Callback'>
   <Input placeholder='Your Name' />
   <Input type='email' placeholder='Your Email' />
   <Input placeholder='Your Subject' />
   <Input type='textarea' placeholder='Message' />
   <button className='Callback-Button Button Button-Submit'>Send message</button>
  </form>
 )
}

export default callback;