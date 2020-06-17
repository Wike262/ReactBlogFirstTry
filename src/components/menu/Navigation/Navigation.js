import React from 'react';
import NavLink from './NavigationLink';
import './Navigation.sass';

export default (props) => {
 return (
  <div className='Navigation-Wrapper'>
   {props.title && (
    <div className={'Navigation-Title Navigation-Title-' + props.mod}>
     <h3>{props.title}</h3>
    </div>
   )}

   <ul className={'Navigation Navigation-' + props.mod}>
    {props.links.map((links, i) => (
     <NavLink
      key={i}
      text={links.text}
      link={links.link}
      mod={props.mod}
      count={links.count}
      tag={links.tag}
      date={links.date}
     />
    ))}
   </ul>
  </div>
 );
};
