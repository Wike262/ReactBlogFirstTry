import React from 'react';
// eslint-disable-next-line
import {
 // eslint-disable-next-line
 BrowserRouter as Switch,
 // eslint-disable-next-line
 Route,
 Link,
 useRouteMatch,
} from 'react-router-dom';

import './admin-menu.sass';

function Active(e) {
 let handeler = e.target;
 let links = document.querySelectorAll('.AdminMenu-Link');
 links = Array.from(links);
 links.map((link) => link.classList.remove('Active'));
 handeler.classList.add('Active');
}

export default (props) => {
 // eslint-disable-next-line
 let { path, url } = useRouteMatch();
 return (
  <ul className='AdminMenu'>
   <Link
    className='AdminMenu-Link Link'
    onClick={(e) => Active(e)}
    to={`${url}/users`}
   >
    Пользователи
   </Link>
   <Link
    className='AdminMenu-Link Link'
    onClick={(e) => Active(e)}
    to={`${url}/tags`}
   >
    Категории
   </Link>
   <Link
    className='AdminMenu-Link Link'
    onClick={(e) => Active(e)}
    to={`${url}/posts`}
   >
    Статьи
   </Link>
  </ul>
 );
};
