import React from 'react';
import Input from './input/input'
import './callback.sass'

const callback = () => {
 return (
  <div className='callback'>
   <Input placeholder='Your Name' />
   <Input type='email' placeholder='Your Email' />
   <Input placeholder='Your Subject' />
   <Input type='textarea' placeholder='Message' />
  </div>
 )
}

export default callback;