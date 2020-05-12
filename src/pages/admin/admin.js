import React from 'react';
import Users from './admin-users/admin-users'
import Posts from './admin-posts/admin-posts'
import { BrowserRouter as Switch, Route } from 'react-router-dom'

import './admin.sass'
import AdminMenu from './admin-menu/admin-menu'

export default (props) => {
 return (
  <div className="AdminPanel container">
   <div className="row">
    <div className="AdminPanel-AdminMenu">
     <AdminMenu />
    </div>
    <div className="AdminPanel-Content">
     <Switch>
      <Route path='/admin/users' component={Users} />
      <Route path='/admin/posts' component={Posts} />
     </Switch>
    </div>
   </div>
  </div>
 )
}

