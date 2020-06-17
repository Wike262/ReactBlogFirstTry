import React from 'react';
import ReactDOM from 'react-dom';

// eslint-disable-next-line
import Firebase from './components/firebaseApp/firebase';

import Menu from './components/menu/menu';
import Login from './components/login/login';
import error from './components/errors/404/404';
import AccountDetails from './components/login/_details/_details';

import Home from './pages/home/home';
import About from './pages/about/about';
import AuthorAbout from './pages/authorAbout/authorAbout';
import Tag from './pages/tag/tag';
import Tags from './pages/tag/tags';
import Contact from './pages/contact/contact';
import Single from './pages/single_post/single';
import Admin from './pages/admin/admin';
import CreatePost from './pages/createPost/createPost';
import Arhive from './pages/archive/archive';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.sass';

ReactDOM.render(
 <Router>
  <Menu />
  <div className='Page'>
   <Switch>
    <Route exact path='/' component={Home} />
    <Route path='/about' component={About} />
    <Route path='/contact' component={Contact} />
    <Route
     path='/account-details'
     component={(props) => <AccountDetails {...props} />}
    />
    <Route path='/login' component={Login} />
    <Route
     path={'/authors/:token'}
     component={(props) => <AuthorAbout {...props} />}
    />
    <Route path={'/tag/:tag'} component={(props) => <Tag {...props} />} />
    <Route
     path={'/archive/:date'}
     component={(props) => <Arhive {...props} />}
    />
    <Route exact path='/tag' component={(props) => <Tags {...props} />} />
    <Route
     path={'/posts/:postID'}
     component={(props) => <Single {...props} />}
    />
    <Route path='/createpost' component={CreatePost} />
    <Route path='/admin' component={Admin} />

    <Route component={error} />
   </Switch>
  </div>
 </Router>,
 document.getElementById('root'),
);
