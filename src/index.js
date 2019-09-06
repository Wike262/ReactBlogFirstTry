import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.sass';
import Menu from './components/menu/menu'
import Home from './pages/home/home'
import About from './pages/about/about'
import Contact from './pages/contact/contact'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import * as firebase from 'firebase/app';

const config = {
 apiKey: 'AIzaSyAjyavp9xjnfj6mXmb9GfuQlSx64xaVl_Q',
 authDomain: 'my-app-dd6a6.firebaseapp.com',
 databaseURL: 'https://my-app-dd6a6.firebaseio.com',
 projectId: 'my-app-dd6a6',
 storageBucket: 'my-app-dd6a6.appspot.com',
 messagingSenderId: '404535255675',
 appId: '1:404535255675:web:bd0b11c177702760'
}

ReactDOM.render(
 <Router>
  <Menu />
  <div className='Page'>
   <Route exact path='/' component={Home} />
   <Route path='/about' component={About} />
   <Route path='/contact' component={Contact} />
  </div>
 </Router>,
 document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
