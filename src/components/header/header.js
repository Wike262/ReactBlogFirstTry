import React from 'react';
import { Link } from 'react-router-dom';

import './header.sass';
import './header-mobile.sass';

export default (props) => {
 let backgroundDefault =
  'https://firebasestorage.googleapis.com/v0/b/my-app-dd6a6.appspot.com/o/Images%2Fbg_1.webp?alt=media&token=96f95ea3-6763-4b60-89a9-6ae97847c9ba';
 let about = props.about;
 let tag = props.tag || null;
 if (tag !== null) {
  return (
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
     </div>
    </div>
   </>
  );
 } else {
  if (!!props.title) {
   return (
    <>
     <div
      className='Header-Tag Header'
      style={{
       background: `url(${backgroundDefault}) 100% 100%`,
       backgroundSize: 'cover',
       backgroundRepeat: 'no-repeat',
      }}
     >
      <div className='Overlay'></div>
      <div className='Header-Wrapper'>
       <div className='Header-Title Title'>
        <h1>{props.title}</h1>
       </div>
      </div>
     </div>
    </>
   );
  } else {
   return (
    <>
     <div
      className={!!props.modClass ? props.modClass : 'Header-Hello Header'}
      style={{
       background:
        'url(' +
        (!!props.backgroundImg ? props.backgroundImg : backgroundDefault) +
        ') 100% 100%',
       backgroundSize: 'cover',
       backgroundRepeat: 'no-repeat',
      }}
     >
      <div className='Overlay'></div>
      <div className='Header-Wrapper'>
       <div className='Header-Title Title'>
        <h1>{!!props.title ? props.title : 'Здравствуй незнакомец'}</h1>
       </div>
       <div className='Header-Image'>
        <img
         src={
          !!props.img
           ? props.img
           : 'https://firebasestorage.googleapis.com/v0/b/my-app-dd6a6.appspot.com/o/Images%2Funnamed.jpg?alt=media&token=e30b3c66-b49e-4df7-94f1-b2c565f931c0'
         }
         alt='Header'
        />
       </div>
       <div className='Header-Description Description'>
        <p>
         {!!props.desc
          ? props.desc
          : 'Это информационный портал где ты можешь найти множесто статьей на различные интересные темы.'}
        </p>
       </div>
       <div className='Header-Link Link'>
        {!!about ? '' : <Link to='/about'>О нас ></Link>}
       </div>
      </div>
     </div>
    </>
   );
  }
 }
};
