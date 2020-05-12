import React from 'react';
import Header from '../../components/header/header'
import Footer from '../../components/footer/footer'
import Post from '../../components/post/post'
import '../page.sass'
import '../page-mobile.sass'

const posts = [0]

const Home = () => {
 return (
  <div className='Page-Home'>
   <div className='Content'>
    <Header />
    <div className='Section-Wrapper Articles container'>
     <div className='Section row'>
      <div className='Section-Title col-12'>
       <h2>Articles</h2>
      </div>
      <div className='Section-Description col-12'>
       <p>A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country.</p>
      </div>
      <Post postID={posts} />
     </div>
    </div>
    <Footer />
   </div>
  </div>
 )
}

export default Home;