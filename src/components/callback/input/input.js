import React from 'react';
import './input.sass'

const input = (props) => {
 const type = !!props.type ? props.type : 'text';
 const acc = !!props.accept ? props.accept : '';
 const textArea = type.toLowerCase() === 'textarea' ? true : false;
 const placeholder = !!props.placeholder ? props.placeholder : '';
 const name = !!props.name ? props.name : '';
 const id = !!props.id ? props.id : '';
 return (
  textArea ?
   <textarea className='Callback-Input TextArea' id={id} name={name} placeholder={placeholder}></textarea>
   :
   <input className='Callback-Input Input' id={id} name={name} type={type} placeholder={placeholder} accept={acc}></input>
 )
}

export default input;