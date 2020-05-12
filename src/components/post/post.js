import React from 'react';
import PostInline from './post-inline'
import PostSingle from './post-single';

import firebase from 'firebase'
import './post.sass'
import './post-mobile.sass'

class Post extends React.Component {
 constructor(props) {
  super(props)
  this.state = {
   post: {},
   author: {},
  }
 }

 PostSinglePage(modClass) {
  return <PostSingle post={this.props.post} authorID={this.props.authorID} modClass={this.props.modClass} />
 }

 Posts(modClass) {
  let posts = []
  for (let [key, value] of Object.entries(this.state.post)) {
   posts.push(<PostInline post={value} author={value.authorID} modClass={modClass} id={key} key={key} />)
  }
  return posts
 }

 componentDidMount() {
  if (this.props.modClass !== 'Post-SingleContent') {
   firebase.functions().httpsCallable('posts')({ all: true })
    .then(result => {
     this.setState({
      post: result.data,
     })
    })
  }
 };

 render() {
  const modClass = !!this.props.modClass ? this.props.modClass : 'col-xl-4 col-md-6 col-12';
  return (
   <>
    {
     modClass === 'Post-SingleContent' ?
      this.PostSinglePage(modClass)
      :
      this.Posts(modClass)
    }
   </>
  )
 }
}

export default Post;