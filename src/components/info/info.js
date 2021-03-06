import React from 'react';
import { IconContext } from 'react-icons';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { FaPhone } from 'react-icons/fa';
import { FaEnvelope } from 'react-icons/fa';
import './info.sass';

function ModificationEqual(modification1, modification2) {
 if (modification1 && modification2) {
  if (
   modification1.toString().toLowerCase() ===
   modification2.toString().toLowerCase()
  ) {
   return true;
  } else return false;
 } else return false;
}

const info = (props) => {
 const mod = props.mod;
 return (
  <div
   className={
    'Info-Wrapper' + (ModificationEqual(mod, 'contact') ? ' container' : '')
   }
  >
   <ul
    className={
     'Info Info-' +
     mod.toString().toLowerCase() +
     (ModificationEqual(mod, 'contact') ? ' row' : '')
    }
   >
    <li
     className={
      'Info-Address' +
      (ModificationEqual(mod, 'contact') ? ' col-xl-4 col-md-6 col-12' : '')
     }
    >
     {ModificationEqual(mod, 'footer') ? (
      <IconContext.Provider
       value={{ color: '#ffffff', style: { width: '40px' } }}
      >
       <div>
        <FaMapMarkerAlt />
       </div>
      </IconContext.Provider>
     ) : (
      ''
     )}
     <span>{ModificationEqual(mod, 'contact') ? 'Адрес: ' : ''}</span>
     г.Краснодар ул. Селезнева д. 108
    </li>
    <li
     className={
      'Info-Tepelhone' +
      (ModificationEqual(mod, 'contact') ? ' col-xl-4 col-md-6 col-12' : '')
     }
    >
     {ModificationEqual(mod, 'footer') ? (
      <IconContext.Provider
       value={{ color: '#ffffff', style: { width: '40px' } }}
      >
       <div>
        <FaPhone />
       </div>
      </IconContext.Provider>
     ) : (
      ''
     )}
     <span>{ModificationEqual(mod, 'contact') ? 'Телефон: ' : ''}</span>
     <a href='tel:+7(900)235-49-19'>+7 (900) 235-49-19</a>
    </li>
    <li
     className={
      'Info-Email' +
      (ModificationEqual(mod, 'contact') ? ' col-xl-4 col-md-6 col-12' : '')
     }
    >
     {ModificationEqual(mod, 'footer') ? (
      <IconContext.Provider
       value={{ color: '#ffffff', style: { width: '40px' } }}
      >
       <div>
        <FaEnvelope />
       </div>
      </IconContext.Provider>
     ) : (
      ''
     )}
     <span>{ModificationEqual(mod, 'contact') ? 'E-mail: ' : ''}</span>
     <a href='mailto:	dotblogportal@gmail.com'> dotblogportal@gmail.com</a>
    </li>
   </ul>
  </div>
 );
};

export default info;
