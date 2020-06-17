import React from 'react';
import Social from '../../components/social/social';
import './header.sass';
import './header-mobile.sass';

export default (props) => {
 let { photoURL, displayName } = props.location.state.author;
 return (
  <div
   className='Header '
   style={{
    background: 'url(' + (!!photoURL ? photoURL : '') + ') 100% 100%',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
   }}
  >
   <div className='Overlay'></div>
   <div className='Header-Wrapper Profile'>
    <div className='Profile-Avatar Avatar'>
     <img src={photoURL} alt='' />
    </div>
    <div className='Profile-Hello Hello'>
     <p>Привет я</p>
    </div>
    <div className='Profile-Name Name'>
     <h1>{displayName}</h1>
    </div>
    <div className='Profile-Description Description'>
     <p></p>
    </div>
   </div>
  </div>
 );
};
