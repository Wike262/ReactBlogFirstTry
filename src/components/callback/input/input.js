import React from 'react';
import './input.sass'

const input = (props) => {
 const type = props.type === undefined ? 'text' : props.type;
 const textArea = type.toLowerCase() === 'textarea' ? true : false;
 const placeholder = props.placeholder === undefined ? '' : props.placeholder;
 return (
  textArea ? <textarea className='Callback-Input TextArea' placeholder={placeholder}></textarea> : <input className='Callback-Input Input' type={type} placeholder={placeholder}></input>
 )
}

export default input;