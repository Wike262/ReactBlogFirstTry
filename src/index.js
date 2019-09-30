import React from 'react';
import ReactDOM from 'react-dom';

import Menu from './components/menu/menu'
import Login from './components/login/login'
import error from './components/404/404'

import Home from './pages/home/home'
import About from './pages/about/about'
import Contact from './pages/contact/contact'
import Single from './pages/single_post/single'

import AccountDetails from './components/login/login-account-details'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.sass';

// const config = {
//  apiKey: 'AIzaSyAjyavp9xjnfj6mXmb9GfuQlSx64xaVl_Q',
//  authDomain: 'my-app-dd6a6.firebaseapp.com',
//  databaseURL: 'https://my-app-dd6a6.firebaseio.com',
//  projectId: 'my-app-dd6a6',
//  storageBucket: 'my-app-dd6a6.appspot.com',
//  messagingSenderId: '404535255675',
//  appId: '1:404535255675:web:bd0b11c177702760'
// }

ReactDOM.render(
 <Router>
  <Menu />
  <div className='Page'>
   <Switch>
    <Route exact path='/' component={Home} />
    <Route path='/about' component={About} />
    <Route path='/contact' component={Contact} />
    <Route path='/account-details' component={AccountDetails} />
    <Route path='/login' component={Login} />
    <Route path={'/author/:token'} component={About} />
    <Route path={'/posts/:postID'} component={props => <Single {...props} />} />
    <Route component={error} />
   </Switch>
  </div>
 </Router>,
 document.getElementById('root'));