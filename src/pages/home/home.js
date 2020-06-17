import React from 'react';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import Post from '../../components/post/post';
import About from '../about/about';
import '../page.sass';
import '../page-mobile.sass';

export default () => {
 return (
  <div className='Page-Home'>
   <div className='Content'>
    <Header />
    <div className='Section-Wrapper Articles container'>
     <div className='Section row'>
      <div className='Section-Title col-12'>
       <h2>Статьи</h2>
      </div>
      <div className='Section-Description col-12'>
       <p>
        Здесь вы можете найти статьи на совершенно различные темы. Удачи в
        поисках!
       </p>
      </div>
      <Post />
     </div>
    </div>
    <About home='true' />
    <Footer />
   </div>
  </div>
 );
};
