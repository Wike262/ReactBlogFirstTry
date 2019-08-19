import React, { Component } from 'react'
import NavLink from './NavigationLink';
import './Navigation.sass';

const Nav = () => {
 return (
  <div className="Menu-NavigationWrapper">
   <ul className="Menu-Navigation">
    <NavLink text="Home" />
    <NavLink text="Photography" />
    <NavLink text="Travel" />
    <NavLink text="Fashion" />
    <NavLink text="About" />
    <NavLink text="Contact" />

   </ul>
  </div>
 )
}

export default Nav;