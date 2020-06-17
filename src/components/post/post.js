import React from 'react';
import PostInline from './post-inline';
import PostSingle from './post-single';
import ClipLoader from 'react-spinners/ClipLoader';
import { FaAngleRight } from 'react-icons/fa';
import { FaAngleLeft } from 'react-icons/fa';

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
   currentPage: 1,
   count: 0,
  };
  this.Pagination = this.Pagination.bind(this);
  this.changePage = this.changePage.bind(this);
  this.changePageNext = this.changePageNext.bind(this);
  this.changePagePrev = this.changePagePrev.bind(this);
 }

 componentDidUpdate(prevProps, prevState) {
  if (
   prevProps.tag !== this.props.tag &&
   prevProps.modClass !== 'Post-SingleContent'
  ) {
   firebase
    .functions()
    .httpsCallable('posts')({
     tag: this.props.tag.name,
     page: this.state.currentPage,
    })
    .then((result) => {
     this.setState({
      post: result.data,
      loading: false,
     });
    });
  }
  if (!!this.props.tag && prevState.currentPage !== this.state.currentPage) {
   firebase
    .functions()
    .httpsCallable('posts')({
     tag: this.props.tag.name,
     page: this.state.currentPage,
    })
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
  if (prevState.currentPage !== this.state.currentPage && !this.props.tag) {
   this.setState({
    loading: true,
   });
   firebase
    .functions()
    .httpsCallable('posts')({ page: this.state.currentPage })
    .then((result) => {
     this.setState({
      post: result.data,
      loading: false,
     });
    });
  }
 }

 componentDidMount() {
  if (!!this.props.tag) {
   firebase
    .functions()
    .httpsCallable('tagInfo')({ tag: this.props.tagName })
    .then((result) => {
     if (result.data.count > 6) {
      this.setState({
       count: result.data.count,
      });
     }
     firebase
      .functions()
      .httpsCallable('posts')({ tag: this.props.tag.name, page: 1 })
      .then((result) => {
       this.setState({
        post: result.data,
        loading: false,
       });
      });
    });
  } else {
   if (this.props.modClass !== 'Post-SingleContent') {
    if (this.props.creating !== 'true') {
     firebase
      .functions()
      .httpsCallable('posts')({ count: true })
      .then((result) => {
       this.setState({
        count: result.data,
       });
       if (result.data > 6) {
        firebase
         .functions()
         .httpsCallable('posts')({ page: 1 })
         .then((result) => {
          this.setState({
           post: result.data,
           loading: false,
          });
         });
       } else {
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
      });
    }
   } else {
    this.setState({ loading: false });
   }
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
 changePage(e) {
  this.setState({
   currentPage: +e.target.innerHTML,
  });
 }
 changePagePrev(e) {
  if (this.state.currentPage > 1) {
   this.setState({
    currentPage: this.state.currentPage - 1,
   });
  }
 }
 changePageNext(e) {
  if (this.state.currentPage < this.state.count) {
   this.setState({
    currentPage: this.state.currentPage + 1,
   });
  }
 }
 Pagination() {
  let pages = Math.ceil(this.state.count / 6);
  let pagination = [];
  pagination.push(
   <button key='left' onClick={this.changePagePrev}>
    <FaAngleLeft />
   </button>,
  );
  for (let i = 1; i <= pages; i++) {
   pagination.push(
    <button
     className={this.state.currentPage === i ? 'Current' : ''}
     key={i}
     onClick={this.changePage}
    >
     {i}
    </button>,
   );
  }
  pagination.push(
   <button key='right' onClick={this.changePageNext}>
    <FaAngleRight />
   </button>,
  );
  return pagination;
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
    {this.state.count > 6 ? (
     <div className='Pagination col-12'>
      <this.Pagination />
     </div>
    ) : (
     ''
    )}
   </>
  );
 }
}

export default Post;
