import React, { Component } from 'react'
import Logo from '../../Img/dotblog.png'
import Navigation from './Navigation/Navigation';
import Copyrights from '../copyrights/copyrights'
import Social from '../social/social'
import './menu.sass'

const Menu = () => {
 const lin = [
  {
   link: '#',
   text: 'Home'
  },
  {
   link: '#',
   text: 'Photography'
  },
  {
   link: '#',
   text: 'Travel'
  },
  {
   link: '#',
   text: 'Fashion'
  },
  {
   link: '#',
   text: 'About'
  },
  {
   link: '#',
   text: 'Contact'
  }
 ]
 return (
  <React.Fragment>
   <div className='Menu'>
    <div className='Menu-WrapperMenu'>
     <div className='Menu-Logo'><a href='#'><img src={Logo} alt='Logotype' /></a></div>
     <Navigation mod='menu-right' links={lin} />
     <div className='Menu-BottomInfomation'>
      <Copyrights />
      <Social />
     </div>
    </div>
   </div>
  </React.Fragment>
 )
}

export default Menu;