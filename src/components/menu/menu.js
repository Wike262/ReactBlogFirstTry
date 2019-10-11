import React from 'react';
import { FaBars } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import Logo from '../../Img/dotblog.png';
import LoginStatus from '../login/login-status';
import './menu.sass';
import './menu-mobile.sass';
import Navigation from './Navigation/Navigation';

const Menu = () => {
 const lin = [
  {
   link: '/',
   text: 'Home'
  },
  {
   link: '/photography',
   text: 'Photography'
  },
  {
   link: '/tag/travel',
   text: 'Travel'
  },
  {
   link: '/tag/fashion',
   text: 'Fashion'
  },
  {
   link: '/about',
   text: 'About'
  },
  {
   link: '/contact',
   text: 'Contact'
  }
 ]
 return (
  <React.Fragment>
   <button onClick={handleClick} className="Menu-Mobile-Switcher"><FaBars /></button>
   <div className='Menu Menu-mobile-close'>
    <button onClick={handleClick} className="Menu-Mobile-Close"><FaTimes /></button>
    <div className='Menu-WrapperMenu'>
     <div className='Menu-Logo'><a href='/'><img src={Logo} alt='Logotype' /></a></div>
     <Navigation mod='menu-right' links={lin} />
     <div className='Menu-BottomInfomation'>
      <LoginStatus />
     </div>
    </div>
   </div>
  </React.Fragment>
 )
}
function handleClick() {
 var menu = document.querySelector('.Menu');
 if (menu.classList.contains('Menu-mobile-close')) {
  menu.classList.remove('Menu-mobile-close');
  menu.classList.add('Menu-mobile-open');
 }
 else {
  menu.classList.remove('Menu-mobile-open');
  menu.classList.add('Menu-mobile-close');
 }
}
export default Menu;