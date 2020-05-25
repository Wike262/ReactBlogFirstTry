import React from 'react'
import { Link } from 'react-router-dom'
import './NavigationLink.sass';

export default (props) => {
 if (props.tag) {
  return (
   <li className={"Navigation-Link Navigation-Link-" + props.mod + " NavigationLink "}><Link to={{
    pathname: props.link,
    state: {
     tag: props.tag
    }
   }}>{props.text}</Link>
    {props.count > 0 && <span>({props.count})</span>}
   </li>
  )
 } else {
  return (
   <li className={"Navigation-Link Navigation-Link-" + props.mod + " NavigationLink "}><Link to={props.link}>{props.text}</Link>
    {props.count > 0 && <span>({props.count})</span>}
   </li>
  )
 }

}