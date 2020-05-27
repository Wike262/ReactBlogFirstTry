import React from 'react';
import { Link } from 'react-router-dom';
import './tag-card.sass';
export default (props) => {
 let title = props.title;
 let { img, background, name, description } = props.tag;
 return (
  <div className='Tag-Wrapper col-xl-4 col-md-6 col-12'>
   <Link
    to={{
     pathname: `tag/${title}`,
     state: {
      tag: title,
     },
    }}
   >
    <div
     className='Tag'
     style={{
      background: `url(${background}) 100% 100%`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
     }}
    >
     <div className='Overlay'></div>
     <div className='Tag-Content'>
      <div className='Tag-Title'>
       <h2>{name}</h2>
      </div>
      <div className='Tag-Description'>
       <p>{description}</p>
      </div>
      <div className='Tag-Img'>
       <img src={img} alt='Tag-Avatar' />
      </div>
     </div>
    </div>
   </Link>
  </div>
 );
};
