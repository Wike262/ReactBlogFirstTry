import React from 'react'
import NavLink from './NavigationLink';
import './Navigation.sass';

const Nav = (props) => {
 return (
  <div className='Navigation-Wrapper'>
   {props.title &&
    <div className={'Navigation-Title Navigation-Title-' + props.mod}><h3>{props.title}</h3></div>
   }

   <ul className={'Navigation Navigation-' + props.mod} >
    {props.links.map((links, i) =>
     <NavLink key={i} text={links.text} link={links.link} mod={props.mod} count={links.count} />
    )}
   </ul>
  </div>
 )
}

export default Nav;