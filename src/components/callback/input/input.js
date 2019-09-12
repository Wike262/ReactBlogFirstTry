import React from 'react';
import './input.sass'

const input = (props) => {
 const type = props.type === undefined ? 'text' : props.type;
 const textArea = type.toLowerCase() === 'textarea' ? true : false;
 const placeholder = props.placeholder === undefined ? '' : props.placeholder;
 const name = props.name === undefined ? '' : props.name;
 const id = props.id === undefined ? '' : props.id;
 return (
  textArea ? <textarea className='Callback-Input TextArea' id={id} name={name} placeholder={placeholder}></textarea> : <input className='Callback-Input Input' id={id} name={name} type={type} placeholder={placeholder}></input>
 )
}

export default input;