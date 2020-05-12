import React from 'react';
import './input.sass'

export default (props) => {
 const type = props.type || 'text';
 const textArea = type.toLowerCase() === 'textarea' ? true : false;
 const placeholder = props.placeholder || '';
 const name = props.name || ' ';
 const id = props.id || '';
 const value = props.value || ''
 return (
  textArea ?
   <textarea className='Callback-Input TextArea' id={id} name={name} placeholder={placeholder}></textarea>
   :
   <input className='Callback-Input Input' defaultValue={value} id={id} name={name} type={type} placeholder={placeholder} ></input>
 )
}

