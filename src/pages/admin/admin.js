import React from 'react';
import Users from './admin-users/admin-users';
import Posts from './admin-posts/admin-posts';
import Category from './category/category';
// eslint-disable-next-line
import {
 // eslint-disable-next-line
 BrowserRouter as Router,
 Switch,
 Route,
 useRouteMatch,
} from 'react-router-dom';

import './admin.sass';
import AdminMenu from './admin-menu/admin-menu';

export default (props) => {
 // eslint-disable-next-line
 let { path, url } = useRouteMatch();
 return (
  <div className='AdminPanel container'>
   <div className='row'>
    <div className='AdminPanel-AdminMenu'>
     <AdminMenu />
    </div>
    <div className='AdminPanel-Content'>
     <Switch>
      <Route path={`${path}/users`} component={Users} />
      <Route path={`${path}/tags`} component={Category} />
      <Route path={`${path}/posts`} component={Posts} />
     </Switch>
    </div>
   </div>
  </div>
 );
};
