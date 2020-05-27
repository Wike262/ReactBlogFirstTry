import React from 'react';
import Background from '../../Img/bg_1.webp';
import { Link } from 'react-router-dom';

import './header.sass';
import './header-mobile.sass';

export default (props) => {
 let tag = props.tag || null;
 return tag !== null ? (
  <>
   <div
    className='Header-Tag Header'
    style={{
     background: `url(${tag.background}) 100% 100%`,
     backgroundSize: 'cover',
     backgroundRepeat: 'no-repeat',
    }}
   >
    <div className='Overlay'></div>
    <div className='Header-Wrapper'>
     <div className='Header-Title Title'>
      <h1>{tag.name}</h1>
     </div>
     <div className='Header-Image'>
      <img src={tag.img} alt='Header' />
     </div>
     <div className='Header-Link Link'>
      <a href='/#'>Больше об "{tag.name}" ></a>
     </div>
    </div>
   </div>
  </>
 ) : (
  <>
   <div
    className='Header-Hello Header'
    style={{
     background:
      'url(' +
      (!!props.backgroundImg ? props.backgroundImg : Background) +
      ') 100% 100%',
     backgroundSize: 'cover',
     backgroundRepeat: 'no-repeat',
    }}
   >
    <div className='Overlay'></div>
    <div className='Header-Wrapper'>
     <div className='Header-Title Title'>
      <h1>Здравствуй незнакомец</h1>
     </div>
     <div className='Header-Image'>
      <img
       src='https://firebasestorage.googleapis.com/v0/b/my-app-dd6a6.appspot.com/o/Images%2Funnamed.jpg?alt=media&token=e30b3c66-b49e-4df7-94f1-b2c565f931c0'
       alt='Header'
      />
     </div>
     <div className='Header-Description Description'>
      <p>
       Это информационный портал где ты можешь найти множесто статьей на
       различные интересные темы.
      </p>
     </div>
     <div className='Header-Link Link'>
      <Link to='/about'>О нас ></Link>
     </div>
    </div>
   </div>
  </>
 );
};
