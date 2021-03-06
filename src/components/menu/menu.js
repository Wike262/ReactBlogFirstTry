import React from 'react';
import { FaBars } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';
import Logo from '../../Img/dotblog.png';
import LoginStatus from '../login/_status/_status';
import './menu.sass';
import './menu-mobile.sass';
import Navigation from './Navigation/Navigation';

export default () => {
 const lin = [
  {
   link: '/',
   text: 'Главная',
  },
  {
   link: '/tag',
   text: 'Категории',
  },
  {
   link: '/tag/travel',
   text: 'Путешествия',
   tag: 'Travel',
  },
  {
   link: '/tag/fashion',
   text: 'Мода',
   tag: 'Fashion',
  },
  {
   link: '/about',
   text: 'О нас',
  },
  {
   link: '/contact',
   text: 'Контакты',
  },
 ];
 return (
  <>
   <button onClick={handleClick} className='Menu-Mobile-Switcher'>
    <FaBars />
   </button>
   <div className='Menu Menu-mobile-close'>
    <button onClick={handleClick} className='Menu-Mobile-Close'>
     <FaTimes />
    </button>
    <div className='Menu-WrapperMenu'>
     <div className='Menu-Logo'>
      <a href='/'>
       <img src={Logo} alt='Logotype' />
      </a>
     </div>
     <Navigation mod='menu-right' links={lin} />
     <div className='Menu-BottomInfomation'>
      <LoginStatus />
     </div>
    </div>
   </div>
  </>
 );
};
function handleClick() {
 var menu = document.querySelector('.Menu');
 if (menu.classList.contains('Menu-mobile-close')) {
  menu.classList.remove('Menu-mobile-close');
  menu.classList.add('Menu-mobile-open');
 } else {
  menu.classList.remove('Menu-mobile-open');
  menu.classList.add('Menu-mobile-close');
 }
}
