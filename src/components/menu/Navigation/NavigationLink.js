import React, { Component } from 'react'
import './NavigationLink.sass';

const NavLink = (props) => {
 return (
  <li className={"Navigation-Link Navigation-Link-" + props.mod + " NavigationLink "}><a href={props.link}>{props.text}</a>
   {props.count > 0 && <span>({props.count})</span>}
  </li>
 )
}

export default NavLink;