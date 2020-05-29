import React from 'react';
import PostInline from './post-inline';
import PostSingle from './post-single';
import ClipLoader from 'react-spinners/ClipLoader';

import firebase from 'firebase';
import './post.sass';
import './post-mobile.sass';

class Post extends React.Component {
 constructor(props) {
  super(props);
  this.state = {
   tag: null,
   post: this.props.creatingPost || {},
   author: {},
   loading: true,
  };
 }

 componentDidUpdate(prevProps) {
  if (
   prevProps.tag !== this.props.tag &&
   prevProps.modClass !== 'Post-SingleContent'
  ) {
   firebase
    .functions()
    .httpsCallable('posts')({ tag: this.props.tag.name })
    .then((result) => {
     this.setState({
      post: result.data,
      loading: false,
     });
    });
  }
  if (prevProps.creatingPost !== this.props.creatingPost) {
   this.setState({
    post: this.props.creatingPost,
   });
  }
 }
 PostSinglePage(modClass) {
  return this.props.creating !== 'true' ? (
   <PostSingle
    post={this.props.post}
    authorID={this.props.authorID}
    modClass={this.props.modClass}
   />
  ) : (
   <PostSingle
    post={this.state.post}
    modClass={this.props.modClass}
    creating='true'
   />
  );
 }

 Posts(modClass) {
  let posts = [];
  for (let [key, value] of Object.entries(this.state.post)) {
   posts.push(
    <PostInline
     post={value}
     author={value.authorID}
     modClass={modClass}
     id={key}
     key={key}
    />,
   );
  }
  return posts;
 }

 componentDidMount() {
  if (!!this.props.tag) {
   firebase
    .functions()
    .httpsCallable('posts')({ tag: this.props.tag.name })
    .then((result) => {
     this.setState({
      post: result.data,
      loading: false,
     });
    });
  } else {
   if (this.props.modClass !== 'Post-SingleContent') {
    if (this.props.creating !== 'true') {
     firebase
      .functions()
      .httpsCallable('posts')({ all: true })
      .then((result) => {
       this.setState({
        post: result.data,
        loading: false,
       });
      });
    }
   } else {
    this.setState({ loading: false });
   }
  }
 }

 render() {
  const modClass = !!this.props.modClass
   ? this.props.modClass
   : 'col-xl-4 col-md-6 col-12';
  return (
   <>
    {this.state.loading ? (
     <ClipLoader size={70} color={'gray'} loading={this.state.loading} />
    ) : modClass === 'Post-SingleContent' ? (
     this.PostSinglePage(modClass)
    ) : (
     this.Posts(modClass)
    )}
   </>
  );
 }
}

export default Post;
