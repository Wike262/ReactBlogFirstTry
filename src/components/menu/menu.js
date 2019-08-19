import React, { Component } from 'react'
import Logo from '../../Img/dotblog.png'
import Navigation from './Navigation/Navigation.js';
import './menu.sass'

const Menu = () => {
 return (
  <div className="Menu">
   <div className="Menu-WrapperMenu">
    <div className="Menu-Logo"><img src={Logo} alt="" /></div>
    <Navigation />
   </div>
  </div>
 )
}

export default Menu;