import React from 'react';
import { Link } from 'react-router-dom';

import './admin-menu.sass';

function Active(e) {
 let handeler = e.target;
 let links = document.querySelectorAll('.AdminMenu-Link');
 links = Array.from(links);
 links.map((link) => link.classList.remove('Active'));
 handeler.classList.add('Active');
}

export default (props) => {
 return (
  <ul className='AdminMenu'>
   <Link
    className='AdminMenu-Link Link'
    onClick={(e) => Active(e)}
    to='/admin/users'
   >
    Пользователи
   </Link>
   <Link
    className='AdminMenu-Link Link'
    onClick={(e) => Active(e)}
    to='/admin/posts'
   >
    Категории
   </Link>
   <Link
    className='AdminMenu-Link Link'
    onClick={(e) => Active(e)}
    to='/admin/posts'
   >
    Статьи
   </Link>
  </ul>
 );
};
