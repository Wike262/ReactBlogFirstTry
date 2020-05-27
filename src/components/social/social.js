import React from 'react';
import { FaFacebookF } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import { FaLinkedinIn } from 'react-icons/fa';
import './social.sass';

const social = (props) => {
 return (
  <div className='Social'>
   <div className='Social-Wrapper'>
    <ul className='Social-List'>
     <li
      className={
       'Social-Link' + (!!props.mod ? ' Social-Link-' + props.mod : '')
      }
     >
      <a href='https://ru-ru.facebook.com/'>
       <FaFacebookF />
      </a>
     </li>
     <li
      className={
       'Social-Link' + (!!props.mod ? ' Social-Link-' + props.mod : '')
      }
     >
      <a href='https://twitter.com/?lang=ru'>
       <FaTwitter />
      </a>
     </li>
     <li
      className={
       'Social-Link' + (!!props.mod ? ' Social-Link-' + props.mod : '')
      }
     >
      <a href='https://www.instagram.com/?hl=ru'>
       <FaInstagram />
      </a>
     </li>
     <li
      className={
       'Social-Link' + (!!props.mod ? ' Social-Link-' + props.mod : '')
      }
     >
      <a href='https://ru.linkedin.com'>
       <FaLinkedinIn />
      </a>
     </li>
    </ul>
   </div>
  </div>
 );
};

export default social;
