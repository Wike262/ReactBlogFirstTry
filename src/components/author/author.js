import React from 'react';
import './author.sass'
import './author-mobile.sass'
import { Link } from 'react-router-dom'

const Author = (props) => {
 return (
  <Link className='Author' to={'/authors/' + props.authorID} >
   <div className='Author-Avatar'><img src={props.authorAvatar} alt='' /></div>
   <div className='Author-Name'>
    <p>Written by</p>
    <h2>{props.authorName} ,</h2>
   </div>
  </Link>
 )
}

export default Author;