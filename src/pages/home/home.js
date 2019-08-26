import React from 'react';
import Menu from '../../components/menu/menu'
import Header from '../../components/header/header'
import Footer from '../../components/footer/footer'
import Post from '../../components/post/post'
import '../page.sass'

const posts = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

const Home = () => {
 return (
  <div className='Page-Home Page'>
   <Menu />
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
      {posts.map((post, i) => <Post key={i} id={post} />)}
     </div>
    </div>
    <Footer />
   </div>
  </div>
 )
}

export default Home;