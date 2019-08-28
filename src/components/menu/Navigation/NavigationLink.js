import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './NavigationLink.sass';

const NavLink = (props) => {
 return (
  <li className={"Navigation-Link Navigation-Link-" + props.mod + " NavigationLink "}><Link to={props.link}>{props.text}</Link>
   {props.count > 0 && <span>({props.count})</span>}
  </li>
 )
}

export default NavLink;