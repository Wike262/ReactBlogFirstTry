import React from 'react';

import Error404 from '../../components/errors/404/404'
import Post from '../../components/post/post'

export default (props) => {
 if (!!props.location.state && !!props.location.state.author && !!props.match.params.postID) {
  return (
   <div className="Post-SingleWrapper">
    <div className="Post-Single Single">
     <Post post={props.location.state.post} authorID={props.location.state.author} postID={props.match.params.postID} modClass='Post-SingleContent' />
    </div>
   </div>
  )
 }
 else {
  return (<Error404 />)
 }
}


