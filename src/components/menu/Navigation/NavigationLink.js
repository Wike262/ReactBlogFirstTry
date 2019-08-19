import React, { Component } from 'react'
import './NavigationLink.sass';

const NavLink = (props) => {
 return (
  <li className="Menu-NavigationLink">{props.text}</li>
 )
}

export default NavLink;