import React from 'react';

import Post from '../../components/post/post'

const single = (props) => {
 return (
  <div className="Post-SingleWrapper">
   <div className="Post-Single Single">
    <Post post={props.location.state.post} author={props.location.state.author} postID={props.match.params.postID} modClass='Post-SingleContent' />
   </div>
  </div>
 )
}


export default single;