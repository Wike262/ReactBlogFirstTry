import React from 'react';
import './author.sass'
import './author-mobile.sass'
import { Link } from 'react-router-dom'

const Author = (props) => {
 var noPhoto = 'https://firebasestorage.googleapis.com/v0/b/my-app-dd6a6.appspot.com/o/Images%2Fnophoto.jpg?alt=media&token=764110c3-1272-46e2-834b-3a15a82fc9aa';
 return (
  <Link className='Author' to={'/authors/' + props.authorID} >
   <div className='Author-Avatar'><img src={!!props.authorAvatar ? props.authorAvatar : noPhoto} alt='' /></div>
   <div className='Author-Name'>
    <p>Written by</p>
    <h2>{props.authorName} ,</h2>
   </div>
  </Link>
 )
}

export default Author;