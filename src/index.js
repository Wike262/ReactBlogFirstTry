import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.sass';
import Menu from './components/menu/menu'
import Home from './pages/home/home'
import About from './pages/about/about'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
 <Router>
  <Menu />
  <div className="Page">
   <Route exact path='/' component={Home} />
   <Route path='/about' component={About} />
  </div>
 </Router>,
 document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
